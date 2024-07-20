import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server";

const handler = async (req: Request) => {
        try {
            return await fetchRequestHandler({
                endpoint: "/api/trpc",
                req,
                router: appRouter,
                createContext: () => ({}),
            });
        } catch (error) {
            console.error("TRPC 요청 실패:", error);
            return new Response("내부 서버 오류", { status: 500 });
        }
    };

export { handler as GET, handler as POST };