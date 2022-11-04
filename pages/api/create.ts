import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type Data = {
    title: string;
    content: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if (req.method === "POST") {
        const {title, content} = JSON.parse(req.body) as Data;

        const create = await prisma.task.create({
            data: {
                title,
                content,
            },

        })
        res.status(400).json(create)

    }
}