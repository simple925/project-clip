// import { gptRouter } from "./routers/gpt";
import { userRouter } from './routers/user'
import { router } from "./trpc";
import { membersRouter } from './routers/members'; // Import the value of UserRouter
import { accountsRouter } from './routers/accounts';
import { notificationsRouter } from './routers/notifications';
import { leaveRequestsRouter } from "./routers/leaveRequests";


export const appRouter = router({
    user: userRouter,
    accounts: accountsRouter,
    members: membersRouter,
    notifications: notificationsRouter,
    leaveRequests: leaveRequestsRouter,
});

export type AppRouter = typeof appRouter;