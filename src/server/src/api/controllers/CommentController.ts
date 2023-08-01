import { Response } from "express";
import { Request } from "../../types/index";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CommentController {
  static async getAllComments(req: Request, res: Response) {
    try {
      const comments = await prisma.comment.findMany({
        include: { replies: true, user: true, post: true },
      });

      res.status(200).json(comments);
    } catch (error) {
      res.status(505).send({ error: "Something went wrong" });
    }
  }
  static async retrieveComment(req:Request,res:Response) {
    try {
      const id = +(req.params.id)
      const comment = await prisma.comment.findUnique({where:{id}})
      if(!comment){
        return res.status(404).send({error:'Not Found'})
      }
      return res.status(200).json(comment)
    } catch (error) {
      res.status(505).send({ error: "Could Not Fetch Comment" });
      
    }
  }
  static async createComment(req: Request, res: Response) {
    const { postId, content, parentId = null } = req.body;
    const userId = Number(req.user_id);

    const comment = await prisma.comment.create({
      data: {
        content,
        parentId,
        postId,
        userId,
      },
      include: { replies: true, user: true, post: true },
    });

    return res.status(201).json(comment);
  }

  static async updateComment(req: Request, res: Response) {
    const { content } = req.body;
    const id = Number(req.params.id);

    const comment = await prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      return res.status(404).send({ error: "Not Found" });
    }
    if (content) {
      const updatedComment = await prisma.comment.update({
        where: { id },
        data: { content },
      });
      return res.status(200).json(updatedComment);
    } else {
      return res.status(200).send(comment);
    }
  }

  static async deleteComment(req: Request, res: Response) {
    const id = Number(req.params.id);
    const comment = await prisma.comment.delete({ where: { id } });

    if (comment) {
      res.status(204).send({ message: "Deleted" });
    } else {
      res.status(404).send({ error: "Not Found" });
    }
  }
}
