import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: Request) => {
        try {
            // 데이터베이스 연결 확인
            await prisma.$connect();

            return await fetchRequestHandler({
                endpoint: "/api/trpc",
                req,
                router: appRouter,
                createContext: () => ({}),
            });
        } catch (error) {
            console.error("TRPC 요청 실패:", error);

            return new Response("내부 서버 오류", { status: 500 });
    } finally {
    await prisma.$disconnect();
    }
};

export { handler as GET, handler as POST };