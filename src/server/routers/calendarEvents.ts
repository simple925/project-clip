import { prisma } from "@/server/prisma";
import { router, procedure } from "@/server/trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

// 기본적으로 선택할 CalendarEvents 필드 정의
const defaultCalendarEvents = {
  id: true,
  created_by: true,
  calendar_group_id: true,
  title: true,
  description: true,
  start_date: true,
  end_date: true,
  created_at: true,
  updated_at: true,
  CalendarGroups: {
    select: {
      id: true,
      name: true,
      description: true,
      color: true,
    },
  },
  Members: {
    select: {
      id: true,
      account_id: true,
      name: true,
    },
  },
} satisfies Prisma.CalendarEventsSelect;

export const calendarEventsRouter = router({
  // 특정 사용자의 CalendarEvents 조회
  getCalendarEventsByAccountId: procedure
    .input(
      z.object({
        account_id: z.string(), // account_id를 입력으로 받음
      })
    )
    .query(async ({ input }) => {
      const { account_id } = input;

      // 특정 사용자의 CalendarEvents 조회
      const calendarEvents = await prisma.calendarEvents.findMany({
        where: {
          Members: {
            account_id: account_id,
          },
        },
        select: defaultCalendarEvents,
      });

      if (!calendarEvents || calendarEvents.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `해당 계정 ID에 대한 캘린더 이벤트가 없습니다: '${account_id}'`,
        });
      }
      return calendarEvents;
    }),

  // 특정 CalendarGroup의 CalendarEvents 조회
  getCalendarEventsByCalendarGroupId: procedure
    .input(
      z.object({
        calendar_group_id: z.string(), // ID는 문자열로 입력받음
      })
    )
    .query(async ({ input }) => {
      const { calendar_group_id } = input;
      const calendarEvents = await prisma.calendarEvents.findMany({
        where: { calendar_group_id: calendar_group_id },
        select: defaultCalendarEvents,
      });

      if (!calendarEvents || calendarEvents.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `해당 캘린더 그룹 ID에 대한 이벤트가 없습니다: '${calendar_group_id}'`,
        });
      }
      return calendarEvents;
    }),
    
  // 캘린더 이벤트 목록 조회 (페이지네이션)
  listCalendarEvents: procedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(), // Cursor는 id로 사용
      })
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const calendarEvents = await prisma.calendarEvents.findMany({
        select: defaultCalendarEvents,
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
      if (calendarEvents.length > limit) {
        const nextItem = calendarEvents.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        calendarEvents: calendarEvents.reverse(),
        nextCursor,
      };
    }),

  // 캘린더 이벤트 생성
  createCalendarEvents: procedure
    .input(
      z.object({
        calendar_group_id: z.string().nullish(),
        title: z.string(),
        description: z.string().nullish(),
        start_date: z.string(),
        end_date: z.string(),
        created_by: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const calendarEvent = await prisma.calendarEvents.create({
        data: {
          id: "", // Add an empty string as the value for the id property
          calendar_group_id: input.calendar_group_id,
          title: input.title,
          description: input.description,
          start_date: new Date(input.start_date),
          end_date: new Date(input.end_date),
          created_by: input.created_by,
        },
        select: defaultCalendarEvents,
      });
      return calendarEvent;
    }),

  // 캘린더 이벤트 수정
  updateCalendarEvents: procedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        start_date: z.string(),
        end_date: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const updateData: Prisma.CalendarEventsUpdateInput = {};

      if (input.title) {
        updateData.title = input.title;
      }

      if (input.description) {
        updateData.description = input.description;
      }

      if (input.start_date) {
        updateData.start_date = new Date(input.start_date);
      }

      if (input.end_date) {
        updateData.end_date = new Date(input.end_date);
      }
      
      return prisma.calendarEvents.update({
        where: { id: input.id },
        data: updateData,
        select: defaultCalendarEvents,
      });
    }),

  // 캘린더 이벤트 삭제
  deleteCalendarEvents: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.calendarEvents.delete({
        where: { id: input.id },
      });
    }),
});
