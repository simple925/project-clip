// 라우터 정의
import { z } from 'zod';
import { procedure, router } from '../trpc';
import { accountsRouter } from './accounts';

export const appRouter = router({
  // 프로시저 추가
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
    accounts: accountsRouter,
});

// export type definition of API
// 클라이언트에서 서버 코드를 가져오는 것을 방지 할 수 있음
export type AppRouter = typeof appRouter;