import { prisma } from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    const {title, content} = req.body

    try {
        await prisma.task.create({
            data: {
                title,
                content
            }
        })
        res.status(200).json({message: "Task Added"})
    } catch (error) {
        console.log("Failed");
        res.status(400).json({ message: "error"})

    }
}