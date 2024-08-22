import { Prisma, PrismaClient } from "@prisma/client";
import { procedure, router } from "../trpc";
import { z } from "zod";

const prisma = new PrismaClient();

const selectMembersForAuth = {
  id: true,
  account_id: true,
  name: true,  
  image: true,
  email: true,
} satisfies Prisma.MembersSelect

export const membersRouter = router({

  getMembersForAuth: procedure.query(async () => {
    const data = await prisma.members.findMany({
      select: selectMembersForAuth,
    });
    return data;
  }),
  inputMembers: procedure.input(
    z.object({
      id: z.string(),
      name: z.string(),
      email: z.string()
    }),
  ).mutation(async (opts) => {
    const inputData = await prisma.members.createMany({
      data: [
        {
        id: opts.input.id,
        name: opts.input.name,
        email: opts.input.email
        }
      ],
      skipDuplicates: true,
    })
    return inputData;
  }),
  updateMembers: procedure.input(
    z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      updated_at: z.date(),
      // 사원 정보 수정 시 필요한 데이터들 추후 추가
    }),
  ).mutation(async (opts) => {
    // console.log("opts > ", opts)
    const updateData = await prisma.members.update({
      where: {
        id: opts.input.id,
      },
      data: {
        name: opts.input.name,
        email: opts.input.email,
        updated_at: opts.input.updated_at,
      },
    })
    // return { success: true }
    // return updateData;
  })
})