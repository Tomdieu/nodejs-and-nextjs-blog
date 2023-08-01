import { NextFunction, Response } from "express";
import { Request } from "../../types/index.d";
import { PrismaClient } from '@prisma/client';

const primsa = new PrismaClient()

export default async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).send({error:'Unauthorized please provide credentials'});
  }
  const userToken = await primsa.token.findUnique({ where: { token } });

  if (!userToken) {
    return res.status(403).send({error:'Forbidden please provide a valid token'});
  }
  req.user_id = userToken.userId;

  next();
}
