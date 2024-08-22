import { prisma } from "@/server/prisma";
import { router, publicProcedure } from "@/server/trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

// 기본적으로 선택할 Notifications 필드 정의
const defaultNotificationSelect = {
    id: true,
    created_by: true,
    title: true,
    content: true,
    type: true,
    created_at: true,
    updated_at: true,
    is_deleted: true,
    notes: true,
} satisfies Prisma.NotificationsSelect;

export const notificationsRouter = router({
    // 공지사항 ID로 조회
    getNotificationById: publicProcedure
        .input(
            z.object({
                id: z.string(), // ID는 문자열로 입력받음
            })
        )
        .query(async ({ input }) => {
            const { id } = input;
            const notification = await prisma.notifications.findUnique({
                where: { id: id },
                select: defaultNotificationSelect,
            });
            if (!notification) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `No notification with id '${id}'`,
                });
            }
            return notification;
        }),

    // 공지사항 목록 조회 (페이지네이션)
    listNotifications: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.string().nullish(), // Cursor는 id로 사용
            })
        )
        .query(async ({ input }) => {
            const limit = input.limit ?? 50;
            const { cursor } = input;

            const notifications = await prisma.notifications.findMany({
                select: defaultNotificationSelect,
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
            if (notifications.length > limit) {
                const nextItem = notifications.pop()!;
                nextCursor = nextItem.id;
            }

            return {
                notifications: notifications.reverse(),
                nextCursor,
            };
        }),

    // 공지사항 생성
    createNotification: publicProcedure
        .input(
            z.object({
                id: z.string().min(1).max(32),
                created_by: z.string().nullish(),
                title: z.string().min(1).max(255),
                content: z.string(),
                type: z.string().min(1).max(2),
                notes: z.string().nullish(),
            })
        )
        .mutation(async ({ input }) => {
            const notification = await prisma.notifications.create({
                data: {
                    id: input.id,
                    created_by: input.created_by,
                    title: input.title,
                    content: input.content,
                    type: input.type,
                    notes: input.notes,
                },
                select: defaultNotificationSelect,
            });

            return notification;
        }),

    // 공지사항 정보 수정
    updateNotification: publicProcedure
        .input(
            z.object({
                id: z.string(),
                title: z.string().optional(),
                content: z.string().optional(),
                type: z.string().optional(),
                notes: z.string().optional(),
                is_deleted: z.boolean().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const updateData: Prisma.NotificationsUpdateInput = {};

            if (input.title) {
                updateData.title = input.title;
            }

            if (input.content) {
                updateData.content = input.content;
            }

            if (input.type) {
                updateData.type = input.type;
            }

            if (input.notes) {
                updateData.notes = input.notes;
            }

            if (typeof input.is_deleted !== "undefined") {
                updateData.is_deleted = input.is_deleted;
            }

            return prisma.notifications.update({
                where: { id: input.id },
                data: updateData,
            });
        }),

    // 공지사항 삭제
    deleteNotification: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.notifications.delete({
                where: { id: input.id },
            });
        }),
});