import { publicProcedure, router } from "@/server/trpc";
import { z } from "zod";
import { prisma } from "../prisma";

export const permissionRouter = router({
  // 권한관리 modal 호출
  managePermissions: publicProcedure
  .query(async () => {
    return await prisma.permissions.findMany()
  }),
  // 권한 추가
  insertPermission: publicProcedure.input(
    z.object({

    })
  ).mutation(async ({input}) => {

  }),
  // 권한 내용 수정
  updatePermission: publicProcedure.input(
    z.object({

    })
  ).mutation(async ({input}) => {

  }),
  // 권한 삭제
  deletePermission: publicProcedure.input(
    z.object({

    })
  ).mutation(async ({input}) => {

  })

})