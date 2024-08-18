import { router, procedure, createCallerFactory } from './trpc';
import { membersRouter } from './routers/members'; // Import the value of UserRouter
import { accountsRouter } from './routers/accounts';
import { notificationsRouter } from './routers/notifications';
import { leaveRequestsRouter } from "./routers/leaveRequests";

export const appRouter = router({
  // 우리가 사용할 api
  // hello: helloRouter,
  accounts: accountsRouter,
  members: membersRouter,
  notifications: notificationsRouter,
  leaveRequests: leaveRequestsRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;