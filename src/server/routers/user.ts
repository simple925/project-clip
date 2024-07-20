import { prisma } from "@/server/prisma";
import { router, procedure } from '@/server/trpc';
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

// vo 만든다고 생각하세용
const defaultUserSelect = {
  id: true,
  userUUID: true,
  name: true,
  username: true,
} satisfies Prisma.UserSelect;

export const userRouter = router({
  hello: procedure
    .input(z.object({})) // No input needed for this endpoint
    .query(async () => {
      console.log("Hello world!"); // Log to server console
      return "Hello world!"; // Return the message
    }),
  list: procedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const items = await prisma.user.findMany({
        select: defaultUserSelect,
        take: limit + 1,
        cursor: cursor
          ? {
            id: parseInt(cursor),
          }
          : undefined,
        orderBy: {
          id: 'desc',
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop()!;
        nextCursor = nextItem.id.toString();
      }

      return {
        items: items.reverse(),
        nextCursor,
      };
    }),

  byId: procedure
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

  add: procedure
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

  getAllUser: procedure.query(async () => {
    const users = await prisma.user.findMany({
      select: defaultUserSelect,
    });
    return users;
  }),

  getMemberById: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return prisma.user.findUnique({
        where: { id: parseInt(input.id) },
      });
    }),

  createMember: procedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.user.create({
        data: {
          userUUID: generateUserUUID(),
          name: input.name,
          username: input.username,
        },
      });
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
});
function generateUserUUID(): any {
  throw new Error("에러!");
}
/*
const membersRouter = router({
    getAllMembers: async () => {
      return prisma.members.findMany();
    },

    getMemberById: async ({ id }: { id: string }) => {
      return prisma.members.findUnique({
        where: { id },
      });
    },

    createMember: async ({ name, email }: { name: string; email: string }) => {
      return prisma.members.create({
        data: {
          name,
          email,
        },
      });
    },

    updateMember: async ({ id, name, email }: { id: string; name?: string; email?: string }) => {
      return prisma.members.update({
        where: { id },
        data: {
          name,
          email,
        },
      });
    },

    deleteMember: async ({ id }: { id: string }) => {
      return prisma.members.delete({
        where: { id },
      });
    },
  });
  export type MembersRouter = typeof membersRouter;
  
  export default membersRouter;
  */