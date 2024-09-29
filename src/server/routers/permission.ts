import { publicProcedure, router } from "@/server/trpc";
import { z } from "zod";
import { prisma } from "../prisma";

export const permissionRouter = router({
  // 권한관리 modal 호출
  managePermissions: publicProcedure
  .query(async () => {
    return await prisma.permissions.findMany({
      orderBy: {
        name: 'asc'
      }
    })
  }),
  // 권한 추가
  insertPermission: publicProcedure.input(
    z.object({
      id: z.string(),
      name: z.string(),
      notes: z.string()
    })
  ).mutation(async ({input}) => {
    await prisma.permissions.create({
      data: {
        id: input.id,
        name: input.name,
        notes: input.notes,
      }
    })

  }),
  // 권한 내용 수정
  updatePermission: publicProcedure.input(
    z.object({
      id: z.string(),
      name: z.string(),
      notes: z.string()
    })
  ).mutation(async ({input}) => {
    await prisma.permissions.update({
      where: {
        id: input.id
      },
      data: {
        name: input.name,
        notes: input.notes
      }
    })

  }),
  // 권한 삭제
  deletePermission: publicProcedure.input(
    z.object({
      id: z.string()
    })
  ).mutation(async ({input}) => {
    await prisma.permissions.delete({
      where: {
        id: input.id
      }
    })

  })

})