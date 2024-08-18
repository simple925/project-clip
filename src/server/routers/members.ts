import { prisma } from "@/server/prisma";
import { router, procedure } from "@/server/trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const defaultMemberSelect = {
  id: true,
  name: true,
  position: true,
  hire_date: true,
  birth_date: true,
  contact_number: true,
  email: true,
  address: true,
  emergency_contact_number: true,
} satisfies Prisma.MembersSelect;

export const membersRouter = router({
  getMemberById: procedure
    .input(
      z.object({
        id: z.string(), // id는 string으로 처리합니다
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const member = await prisma.members.findUnique({
        where: { id }, // id로 조회
        select: defaultMemberSelect,
      });
      if (!member) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `해당 아이디 멤버 없음 '${id}'`,
        });
      }
      return member;
    }),

  // List members with pagination
  list: procedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(), // Cursor as id
      })
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const members = await prisma.members.findMany({
        select: defaultMemberSelect,
        take: limit + 1,
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          id: "desc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (members.length > limit) {
        const nextItem = members.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        members: members.reverse(),
        nextCursor,
      };
    }),

  createMember: procedure
    .input(
      z.object({
        id: z.string().min(1).max(32),
        account_id: z.string().min(1).max(32),
        name: z.string().min(1).max(255),
        position: z.string().min(1).max(100),
        hire_date: z.date(),
        birth_date: z.date(),
        contact_number: z.string().min(1).max(20),
        email: z.string().email().max(255),
        address: z.string().optional(),
        emergency_contact_number: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const member = await prisma.members.create({
        data: input,
        select: defaultMemberSelect,
      });
      return member;
    }),

  updateMember: procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        position: z.string().optional(),
        contact_number: z.string().optional(),
        email: z.string().email().optional(),
        address: z.string().optional(),
        emergency_contact_number: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.members.update({
        where: { id: input.id },
        data: {
          name: input.name,
          position: input.position,
          contact_number: input.contact_number,
          email: input.email,
          address: input.address,
          emergency_contact_number: input.emergency_contact_number,
        },
        select: defaultMemberSelect,
      });
    }),

  deleteMember: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.members.delete({
        where: { id: input.id },
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
      const account = await prisma.accounts.findUnique({
        where: { username: input.username },
      });

      if (!account) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }

      const passwordMatch = await bcrypt.compare(
        input.password,
        account.password
      );

      if (!passwordMatch) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }

      const member = await prisma.members.findUnique({
        where: { account_id: account.id },
        select: defaultMemberSelect,
      });

      return member;
    }),
});