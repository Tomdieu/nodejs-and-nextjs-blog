import { Response } from "express";
import { Post, Request } from "../../types";
import fileType from "../../utils/fileType";
import { PrismaClient } from "@prisma/client";
import getFileDestination from "../../utils/getFileDestination";
import { PostSerializer } from "../serializers";

const prisma = new PrismaClient();

export default class PostController {
  static async getAllPosts(req: Request, res: Response) {
    const posts = await prisma.post.findMany({
      include: {
        user: { select: { username: true } },
        postMedia: {
          include: {
            file: true,
          },
        },
        comments: { include: { replies: true, user: true } },
      },
    });
    return res.status(200).send(PostSerializer(posts, req));
  }

  static async getUserPosts(req: Request, res: Response) {
    const posts = await prisma.post.findMany({
      where: {
        userId: req.user_id,
      },
      include: {
        user: { select: { username: true } },
        postMedia: {
          include: {
            file: true,
          },
        },
        comments: { include: { replies: true, user: true } },
      },
    });
    return res.status(200).send(PostSerializer(posts, req));
  }

  static async createPost(req: Request, res: Response) {
    const {title, content } = req.body;
    const user_id = req.user_id;
    const files = req.files;
    if (user_id) {
      const postMedia: any[] = [];
      if (files) {
        for (let i = 0; i < Number(files.length); i++) {
          const mediaType = fileType(files[i]);
          const file: Express.Multer.File = files[i];
          const image_media = await prisma.file.create({
            data: { url: getFileDestination(file) + file.filename },
          });
          postMedia.push({
            fileId: image_media.id,
            fileType: mediaType,
          });
        }
      }
      const post = await prisma.post.create({
        data: {
          content,
          title,
          userId: user_id,
          postMedia: {
            create: postMedia,
          },
        },
        include: {
          postMedia: {
            include: {
              file: true
            },
          },
          comments: { include: { replies: true, user: true } },
        },
      });
      return res.status(201).send(PostSerializer(post, req));
    } else {
      res.sendStatus(403);
    }
  }

  static async getPost(req: Request, res: Response) {
    const id = Number(req.params.id);
    const post = await prisma.post.findUnique({
      where: { id },
      include: { postMedia: { include: { file: true } } },
    });
    if (!post) {
      return res.status(404).send({ error: "Not Found" });
    }
    return res.status(200).send(PostSerializer(post, req));
  }

  static async updatePost(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { title,content,published =false} = req.body;
    let post: Post | null;
    post = (await prisma.post.findUnique({ where: { id } })) as Post;

    if (!post) {
      return res.status(404).send({ error: "Not Found" });
    }

    post = (await prisma.post.update({
      where: { id },
      data: {
        content:content||post.content,
        title:title||post.title,
        published:published||post.published
      },
      include: { postMedia: { include: { file: true } } },
    })) as Post;
    return res.status(200).send(post);
  }
  static async deletePost(req: Request, res: Response) {
    const id = +req.params.id;
    const post = await prisma.post.findUnique({ where: { id } });
    const user = await prisma.user.findUnique({ where: { id: req.user_id } });
    if (!post) {
      return res.status(404).send({ error: "Not Found" });
    }
    if (post.userId !== req.user_id && user?.is_superuser == false) {
      return res.status(403).send({ message: "Forbiden" });
    }
    await prisma.post.delete({ where: { id } });
    return res.sendStatus(204);
  }

  static async getComments(req: Request, res: Response) {
    const postId = +req.params.id;
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { replies: true, user: true },
    });
    return res.status(200).send(comments);
  }
}
