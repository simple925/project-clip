import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchAccounts() {
    try {
        const accounts = await prisma.accounts.findMany();
        return accounts;
    } catch (error) {
        console.error('Error fetching accounts:', error);
        return null;
    } finally {
        await prisma.$disconnect();
    }
}