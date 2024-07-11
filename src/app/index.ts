// lib/prisma.js

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as typeof global & {
    prisma?: PrismaClient;
};

export const prisma: PrismaClient = 
    globalForPrisma.prisma ??
    new PrismaClient()