// import { gptRouter } from "./routers/gpt";
import { userRouter } from './routers/user'
import { router } from "./trpc";
import { membersRouter } from './routers/members'; // Import the value of UserRouter
import { accountsRouter } from './routers/accounts';
import { notificationsRouter } from './routers/notifications';
import { leaveRequestsRouter } from "./routers/leaveRequests";
import { crudRouter } from './routers/crud';
import { permissionRouter } from './routers/permission';

export const appRouter = router({
    user: userRouter,
    accounts: accountsRouter,
    members: membersRouter,
    notifications: notificationsRouter,
    leaveRequests: leaveRequestsRouter,
    crud: crudRouter,
    permission: permissionRouter,
});

export type AppRouter = typeof appRouter;