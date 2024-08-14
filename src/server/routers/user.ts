// import { gptRouter } from "./routers/gpt";
import { z } from 'zod'

import { publicProcedure, router } from "../trpc";

export const userRouter = router({
//   gpt: gptRouter,
    getUsers: publicProcedure.query(() => {
        return [
            { name: 'aa', race: 'Orc'},
            { name: 'bb', race: 'Orc'},
        ]
    }),
    addUser: publicProcedure
    .input(z.object({name: z.string(), race: z.string()}))
    .mutation((opts: { input: any; }) => {
        const { input } = opts
    })
});