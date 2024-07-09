import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            return handleGet(req, res);
        case 'POST':
            return handlePost(req, res);
        case 'PUT':
            return handlePut(req, res);
        case 'DELETE':
            return handleDelete(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

// GET /api/user (select)
async function handleGet(req, res) {
    const { tableName } = req.query;
    try {
        const result = await (prisma as any)[tableName].findMany();
        res.status(200).json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: '내부 서버 오류' });
    } finally{
        await prisma.$disconnect();
    }
}

// POST /api/user (insert)
async function handlePost(req, res) {
    const { tableName, data } = req.body;
    try {
        const result = await (prisma as any)[tableName].create({ data });
        // create씁니다 
        res.status(201).json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: '내부 서버 오류' });
    } finally{
        await prisma.$disconnect();
    }
}

// PUT /api/user (update)
async function handlePut(req, res) {
    const { tableName, id, data } = req.body;
    try {
        const result = await (prisma as any)[tableName].update({
            where: {id: id},
            data: data
        });
        res.status(200).json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: '내부 서버 오류' });
    } finally{
        await prisma.$disconnect();
    }
}

// DELETE /api/user (delete)
async function handleDelete(req, res) {
    const { tableName, id } = req.body;
    try {
        const result = await (prisma as any)[tableName].delete({
            where: {id: id}
        }); 
        res.status(200).json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: '내부 서버 오류' });
    } finally{
        await prisma.$disconnect();
    }   
}