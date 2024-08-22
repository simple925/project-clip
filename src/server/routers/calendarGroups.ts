import { prisma } from "@/server/prisma";
import { router, procedure } from "@/server/trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

// 기본적으로 선택할 CalendarGroup 필드 정의
const defaultCalendarGroups = {
  id: true,
  name: true,
  description: true,
  color: true, // 필드 추가
  created_at: true,
  updated_at: true,
  created_by: true,
  CalendarEvents: true,
  Members: {
    select: {
      id: true,
      account_id: true,
      name: true,
    },
  },
} satisfies Prisma.CalendarGroupsSelect;

export const calendarGroupsRouter = router({

  getCalendarGroupsByAccountId: procedure
    .input(
      z.object({
        account_id: z.string(), // account_id를 입력으로 받음
      })
    )
    .query(async ({ input }) => {
      const { account_id } = input;

      // Members 테이블에서 account_id로 조회하여 관련된 CalendarGroups 가져오기
      const member = await prisma.members.findFirst({
        where: { account_id },
        select: {
          CalendarGroups: {
            select: defaultCalendarGroups,
          },
        },
      });

      if (!member || !member.CalendarGroups) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `해당 계정 ID의 캘린더 그룹 없음 '${account_id}'`,
        });
      }
      return member.CalendarGroups;
    }),

  // CalendarGroup ID로 조회
  getCalendarGroupById: procedure
    .input(
      z.object({
        id: z.string(), // ID는 문자열로 입력받음
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const calendarGroups = await prisma.calendarGroups.findUnique({
        where: { id: id },
        select: defaultCalendarGroups,
      });
      if (!calendarGroups) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No leave request with id '${id}'`,
        });
      }
      return calendarGroups;
    }),

  // 캘린더 그룹 목록 조회 (페이지네이션)
  listCalendarGroups: procedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(), // Cursor는 id로 사용
      })
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const calendarGroups = await prisma.calendarGroups.findMany({
        select: defaultCalendarGroups,
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
      if (calendarGroups.length > limit) {
        const nextItem = calendarGroups.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        calendarGroups: calendarGroups.reverse(),
        nextCursor,
      };
    }),

  // 캘린더 그룹 생성
  createCalendarGroup: procedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().nullish(),
        color: z.string().nullish(),
        created_by: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const calendarGroup = await prisma.calendarGroups.create({
        data: {
          name: input.name,
          description: input.description,
          color: input.color,
          created_by: input.created_by,
        },
        select: defaultCalendarGroups,
      });

      return calendarGroup;
    }),

  // 캘린더 그룹 수정
  updateCalendarGroup: procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        color: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const updateData: Prisma.CalendarGroupsUpdateInput = {};

      if (input.name) {
        updateData.name = input.name;
      }

      if (input.description) {
        updateData.description = input.description;
      }

      if (input.color) {
        updateData.color = input.color;
      }

      return prisma.calendarGroups.update({
        where: { id: input.id },
        data: updateData,
        select: defaultCalendarGroups,
      });
    }),

  // 캘린더 그룹 삭제
  deleteCalendarGroup: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.calendarGroups.delete({
        where: { id: input.id },
      });
    }),
});