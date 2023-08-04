import { PrismaClient } from "@prisma/client";
import { Request } from "../../types";
import { Response } from "express";

const prisma = new PrismaClient();

export default class LikeController {
  static async createPostLike(req: Request, res: Response) {
    try {
      const { postId } = req.body;
      const userId = Number(req.user_id);
      const postLike = await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      return res.status(201).json(postLike);
    } catch (error) {
      res.status(505).send({ error: "Something went wrong" });
    }
  }

  

  static async getPostLikes(req: Request, res: Response) {
    try {
      const postId = +req.params.id;
      const postLikes = await prisma.like.findMany({
        where: { postId },
        include: { user: { select: { id: true, username: true } } },
      });
      return res.status(200).json(postLikes);
    } catch (error) {
      res.status(505).send({ error: "Something went wrong" });
    }
  }

}
