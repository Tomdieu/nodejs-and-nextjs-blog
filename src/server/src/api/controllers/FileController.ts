import { Response } from "express";
import { Request } from "../../types";
import { PrismaClient } from "@prisma/client";
import { FileSerializer } from "../serializers";
import getFileDestination from "../../utils/getFileDestination";

const prisma = new PrismaClient();

export default class FileController {
  static async list(req: Request, res: Response) {
    const files = await prisma.file.findMany();
    return res.status(200).send(FileSerializer(files, req));
  }

  static async retrieve(req: Request, res: Response) {
    const id = Number(req.params.id);
    const file = await prisma.file.findUnique({ where: { id } });
    if (file) {
      return res.status(200).send(FileSerializer(file, req));
    } else {
      res.status(404).send({ error: "Not Found" });
    }
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const file = req.file;
    const fileObj = await prisma.file.findUnique({ where: { id } });
    if (fileObj) {
      if (file) {
        const updatedFile = await prisma.file.update({
          where: { id },
          data: { url: getFileDestination(file) + file.filename },
        });

        return res.status(200).send(FileSerializer(updatedFile, req));
      }
    } else {
      return res.status(404).send({ error: "Not Found" });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const image = await prisma.file.delete({ where: { id } });
    if (image) {
      return res.status(204).json({ message: "Deleted" });
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  }
}
