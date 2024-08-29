import { z } from 'zod'
import { publicProcedure, router } from '@/server/trpc'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient

export const crudRouter = router({
    getAccounts: 
        publicProcedure.query(async () => {
            return await prisma.accounts.findMany()
        }),
    addAccount: publicProcedure
        .input(z.object({id: z.string(), username: z.string(), password: z.string()}))
        .mutation(async ({ input }) => {
            await prisma.accounts.create({
                data: {
                    id: input.id,
                    username: input.username,
                    password: input.password
                }
            })
        }),
    updateAccount: publicProcedure
        .input(z.object({id: z.string(), username: z.string(), password: z.string()}))
        .mutation(async ({ input }) => {
            await prisma.accounts.update({
                where: {
                    id: input.id
                },
                data: {
                    username: input.username,
                    password: input.password
                }
            })
        }),
    deleteAccount: publicProcedure
        .input(z.object({id: z.string()}))
        .mutation(async ({ input }) => {
            await prisma.accounts.delete({
                where: {
                    id: input.id
                }
            })
        })

})