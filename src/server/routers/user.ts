import { prisma } from "@/server/prisma";
import { router, procedure } from '@/server/trpc';
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
// 테이블 별로 작업
// vo 만든다고 생각하세용
const defaultUserSelect = {
  userUUID: true,
  userName: true,
  userPhoneNm: true,
  userDepartment: true,
  userGrade: true,
  totalVacation: true,
  usedVacation: true,
} satisfies Prisma.UserSelect;

export const userRouter = router({
  getUserById: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        select: defaultUserSelect,
      });
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user with id '${id}'`,
        });
      }
      return user;
    }),

  // List users with pagination
  list: procedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // Cursor as userUUID
      })
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const users = await prisma.user.findMany({
        select: defaultUserSelect,
        take: limit + 1,
        cursor: cursor
          ? {
            userUUID: cursor,
          }
          : undefined,
        orderBy: {
          userUUID: 'desc',
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (users.length > limit) {
        const nextItem = users.pop()!;
        nextCursor = nextItem.userUUID;
      }

      return {
        users: users.reverse(),
        nextCursor,
      };
    }),

  createUser: procedure
    .input(
      z.object({
        id: z.number().min(1).max(32),
        userUUID: z.string().min(1).max(32),
        name: z.string().min(1).max(32),
        username: z.string().min(1).max(32),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: input,
        select: defaultUserSelect,
      });
      return user;
    }),

  updateUser: procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        username: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.user.update({
        where: { id: parseInt(input.id) },
        data: {
          name: input.name,
          username: input.username,
        },
      });
    }),

  deleteUser: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.user.delete({
        where: { id: parseInt(input.id) },
      });
    }),

  // Login procedure
  login: procedure
    .input(
      z.object({
        username: z.string().min(1),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { username: input.username },
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid username or password',
        });
      }

      const passwordMatch = await bcrypt.compare(input.password, user.password);

      if (!passwordMatch) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid username or password',
        });
      }

      return {
        id: user.id,
        userUUID: user.userUUID,
        name: user.name,
        username: user.username,
      };
    }),
});