import { Prisma, PrismaClient } from "@prisma/client";
import { procedure, router } from "../trpc";
import { z } from "zod";

const prisma = new PrismaClient();

const defaultAccountSelect = {
  id: true,
  username: true,
  password: true,
  created_at: true,
  updated_at: true,
  last_login: true,
  is_deleted: true,
  comment: true
} satisfies Prisma.AccountsSelect

export const accountsRouter = router({

  getAcuntInfo: procedure.query(async () => {
    const users = await prisma.accounts.findMany({
      select: defaultAccountSelect,
    });
    // console.log("user: ", users)
    return users;
  })
})