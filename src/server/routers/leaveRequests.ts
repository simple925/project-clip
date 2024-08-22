import { prisma } from "@/server/prisma";
import { router, procedure } from "@/server/trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

// 기본적으로 선택할 LeaveRequests 필드 정의
const defaultLeaveRequestSelect = {
    id: true,
    created_by: true,
    resolved_by: true,
    start_date: true,
    end_date: true,
    reason: true,
    approved: true,
    created_at: true,
    updated_at: true,
} satisfies Prisma.LeaveRequestsSelect;

export const leaveRequestsRouter = router({
    getLeaveRequestByAccountId: procedure
        .input(
            z.object({
                account_id: z.string(), // account_id를 입력으로 받음
            })
        )
        .query(async ({ input }) => {
            const { account_id } = input;
            const member = await prisma.members.findFirst({
                where: { account_id }, // account_id로 조회
                select: defaultLeaveRequestSelect,
            });
            if (!member) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `해당 계정 ID의 휴가계 없음 '${account_id}'`,
                });
            }
            return member;
        }),
    // 휴가계 ID로 조회
    getLeaveRequestById: procedure
        .input(
            z.object({
                id: z.string(), // ID는 문자열로 입력받음
            })
        )
        .query(async ({ input }) => {
            const { id } = input;
            const leaveRequest = await prisma.leaveRequests.findUnique({
                where: { id: id },
                select: defaultLeaveRequestSelect,
            });
            if (!leaveRequest) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `No leave request with id '${id}'`,
                });
            }
            return leaveRequest;
        }),

    // 휴가계 목록 조회 (페이지네이션)
    listLeaveRequests: procedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.string().nullish(), // Cursor는 id로 사용
            })
        )
        .query(async ({ input }) => {
            const limit = input.limit ?? 50;
            const { cursor } = input;

            const leaveRequests = await prisma.leaveRequests.findMany({
                select: defaultLeaveRequestSelect,
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
            if (leaveRequests.length > limit) {
                const nextItem = leaveRequests.pop()!;
                nextCursor = nextItem.id;
            }

            return {
                leaveRequests: leaveRequests.reverse(),
                nextCursor,
            };
        }),

    // 휴가계 생성
    createLeaveRequest: procedure
        .input(
            z.object({
                created_by: z.string().nullish(),
                resolved_by: z.string().nullish(),
                start_date: z.date(),
                end_date: z.date(),
                reason: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const leaveRequest = await prisma.leaveRequests.create({
                data: {
                    created_by: input.created_by,
                    resolved_by: input.resolved_by,
                    start_date: input.start_date,
                    end_date: input.end_date,
                    reason: input.reason,
                },
                select: defaultLeaveRequestSelect,
            });

            return leaveRequest;
        }),

    // 휴가계 정보 수정
    updateLeaveRequest: procedure
        .input(
            z.object({
                id: z.string(),
                resolved_by: z.string().optional(),
                start_date: z.date().optional(),
                end_date: z.date().optional(),
                reason: z.string().optional(),
                approved: z.boolean().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const updateData: Prisma.LeaveRequestsUpdateInput = {};

            if (input.resolved_by) {
                updateData.resolved_by = input.resolved_by;
            }

            if (input.start_date) {
                updateData.start_date = input.start_date;
            }

            if (input.end_date) {
                updateData.end_date = input.end_date;
            }

            if (input.reason) {
                updateData.reason = input.reason;
            }

            if (typeof input.approved !== "undefined") {
                updateData.approved = input.approved;
            }

            return prisma.leaveRequests.update({
                where: { id: input.id },
                data: updateData,
                select: defaultLeaveRequestSelect,
            });
        }),

    // 휴가계 삭제
    deleteLeaveRequest: procedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.leaveRequests.delete({
                where: { id: input.id },
            });
        }),
});