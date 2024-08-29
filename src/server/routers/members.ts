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
  ).mutation(async ({input}) => {
    const inputData = await prisma.members.createMany({
      data: [
        {
        id: input.id,
        name: input.name,
        email: input.email
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
      // 사원 정보 수정 시 필요한 데이터들 추후 추가
    }),
  ).mutation(async ({input}) => {
    const updateData = await prisma.members.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        email: input.email,
      },
    })
  }),
  deleteMembers: procedure.input(
    z.object({
      id: z.string(),
    }),
  ).mutation(async ({input}) => {
    const deleteData = await prisma.members.delete({
      where: {
        id: input.id
      }
    })
  })
})