import { router, procedure, createCallerFactory } from './trpc';
import { userRouter } from './routers/user'; // Import the value of UserRouter
export const appRouter = router({
    // 우리가 사용할 api
    // hello: helloRouter,
    user: userRouter, // Use the value of UserRouter
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;