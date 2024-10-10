import { prisma } from "@/server/prisma";
import { router, publicProcedure } from '@/server/trpc';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs'; // 암호화와 비교를 위해 bcrypt 사용

// 기본적으로 선택할 Account 필드 정의
const defaultAccountSelect = {
    id: true,
    username: true,
    created_at: true,
    updated_at: true,
    last_login: true,
} satisfies Prisma.AccountsSelect;

export const accountsRouter = router({
    // 사용자 ID로 계정 조회
    getAccountById: publicProcedure
        .input(
            z.object({
                id: z.string(), // ID는 문자열로 입력받음
            })
        )
        .query(async ({ input }) => {
            const { id } = input;
            const account = await prisma.accounts.findUnique({
                where: { id: id },
                select: defaultAccountSelect,
            });
            if (!account) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `No account with id '${id}'`,
                });
            }
            return account;
        }),

    // 계정 목록 조회 (페이지네이션)
    listAccounts: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.string().nullish(), // Cursor는 id로 사용
            })
        )
        .query(async ({ input }) => {
            const limit = input.limit ?? 50;
            const { cursor } = input;

            const accounts = await prisma.accounts.findMany({
                select: defaultAccountSelect,
                take: limit + 1,
                cursor: cursor
                    ? {
                        id: cursor,
                    }
                    : undefined,
                orderBy: {
                    id: 'desc',
                },
            });

            let nextCursor: typeof cursor | undefined = undefined;
            if (accounts.length > limit) {
                const nextItem = accounts.pop()!;
                nextCursor = nextItem.id;
            }

            return {
                accounts: accounts.reverse(),
                nextCursor,
            };
        }),

    // 계정 생성
    createAccount: publicProcedure
        .input(
            z.object({
                id: z.string().min(1).max(32),
                username: z.string().min(1).max(50),
                password: z.string().min(8).max(255),
            })
        )
        .mutation(async ({ input }) => {
            const hashedPassword = await bcrypt.hash(input.password, 10); // 암호화하여 저장

            const account = await prisma.accounts.create({
                data: {
                    id: input.id,
                    username: input.username,
                    password: hashedPassword,
                },
                select: defaultAccountSelect,
            });

            return account;
        }),

    // 계정 정보 수정
    updateAccount: publicProcedure
        .input(
            z.object({
                id: z.string(),
                username: z.string().optional(),
                password: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const updateData: Prisma.AccountsUpdateInput = {};

            if (input.username) {
                updateData.username = input.username;
            }

            if (input.password) {
                updateData.password = await bcrypt.hash(input.password, 10); // 새 비밀번호 암호화
            }

            return prisma.accounts.update({
                where: { id: input.id },
                data: updateData,
            });
        }),

    // 계정 삭제
    deleteAccount: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.accounts.delete({
                where: { id: input.id },
            });
        }),

    // 로그인 절차
    login: publicProcedure
        .input(
            z.object({
                username: z.string().min(1),
                password: z.string().min(1),
            })
        )
        .mutation(async ({ input }) => {
            console.log('로그인 시도:', input.username, input.password);
            const account = await prisma.accounts.findUnique({
                where: { username: input.username },
            });

            if (!account) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: '유효하지 않은 아이디 또는 비밀번호입니다.',
                });
            }

            const passwordMatch = await bcrypt.compare(input.password, account.password);
            console.log('입력된 비밀번호:', input.password);
            console.log('저장된 해시된 비밀번호:', account.password);
            console.log('비교 결과:', passwordMatch);

            if (!passwordMatch) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: '유효하지 않은 아이디 또는 비밀번호입니다.',
                });
            }

            // 로그인 성공 시 last_login 갱신
            await prisma.accounts.update({
                where: { id: account.id },
                data: { last_login: new Date() },
            });

            return {
                id: account.id,
                username: account.username,
                last_login: account.last_login,
            };
        }),
    
    // 사원등록되지 않은 계정 리스트
    getUnRegisteredAccounts: publicProcedure
        .query(async () => {
        return prisma.accounts.findMany({
            where: {
                Members: {
                    none: {}, // Employees 테이블에 등록되지 않은 계정을 필터링
                },
            },
            select: {
                id: true,
                username: true,
            },
        });
    }),
});