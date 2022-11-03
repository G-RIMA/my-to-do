import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const itemId = req.query.id
  const {title, content, id} = req.body
    // DELETE
    if (req.method === 'DELETE') {
        const note = await prisma.task.delete({
            where: { id: Number(itemId) }
        })
        res.json(note)
    } 
    // UPDATE
    else if (req.method === 'PUT') {
      const note = await prisma.task.update({
        where: { id: Number(itemId) },
        data: {
          title,
          content
        }
      })
      res.status(200).json({ message: 'Task updated' })
    } 
    else {
        console.log("Task not modified")
        res.status(400).json({ message: "Task not modified" })
    }
}