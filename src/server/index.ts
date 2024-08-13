import { router, procedure, createCallerFactory } from './trpc';
import { userRouter } from './routers/user'; // Import the value of UserRouter
import { accountsRouter } from './routers/accounts';

export const appRouter = router({
    // 우리가 사용할 api
    // hello: helloRouter,
    user: userRouter, // Use the value of UserRouter
    accounts: accountsRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;