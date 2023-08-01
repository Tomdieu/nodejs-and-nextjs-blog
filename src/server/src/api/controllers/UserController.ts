import { Request, Response } from "express";
import bcrypt from "bcrypt";
import generateToken from "../../utils/generateToken";
import verifyPassword from "../../utils/verifyPassword";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class UserController {
  static async authenticate(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (username !== "" && password !== "") {
        const user = await prisma.user.findUnique({
          where: { username },
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            email: true,
            is_superuser: true,
            joined_on: true,
            password: true,
          },
        });
        if (user) {
          const isValidPassword = await verifyPassword(password, user.password);
          console.log("isValid Password ", isValidPassword);
          if (isValidPassword) {
            const userToken = (
              await prisma.token.findUnique({ where: { userId: user.id } })
            )?.token;
            const deviceInfo = req.useragent;
            const ipAddress = req.ip;
            await prisma.loginHistory.create({
              data: {
                userAgent: deviceInfo?.source,
                browser: deviceInfo?.browser,
                os: deviceInfo?.os,
                isMobile: deviceInfo?.isMobile,
                ipAddress,
                userId: user.id,
              },
            });
            if (userToken) {
              return res.status(200).json({ user: user, token: userToken });
            } else {
              const newUserToken = await prisma.token.create({
                data: { userId: user.id, token: generateToken(user.username) },
              });
              return res
                .status(200)
                .json({ user: user, token: newUserToken.token });
            }
          } else {
            res.status(401).json({
              error:
                "Invalid credentials. Please check your username and password.",
            });
          }
        }
      } else {
        res.status(401).json({
          error:
            "Invalid credentials. Please check your username and password.",
        });
      }
    } catch (error) {
      res.status(401).json({
        error: "Invalid credentials. Please check your username and password.",
      });
    }
  }
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          first_name: true,
          last_name: true,
          email: true,
          is_superuser: true,
          joined_on: true,
          posts: true,
        },
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch users." });
    }
  }
  static async getUser(req: Request, res: Response) {
    const userId = Number(req.params.id);
    try {
      if (userId) {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            email: true,
            is_superuser: true,
            joined_on: true,
            posts: true,
          },
        });
        if (!user) {
          res.status(404).json({ error: "User not found" });
        }
        res.status(200).send(user);
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  static async createUser(req: Request, res: Response) {
    const {
      username,
      first_name = "",
      last_name = "",
      email,
      password,
    } = req.body;
    try {
      const existingUser = await prisma.user.findMany({
        where: { OR: [{ username }, { email }] },
      });
      console.log({ existingUser });
      if (existingUser.length > 0) {
        if (existingUser[0].username === username) {
          return res.status(409).json({ error: "Username already talken." });
        } else {
          return res.status(409).json({ error: "Email already exists." });
        }
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const token = generateToken(username);
      const newUser = await prisma.user.create({
        data: {
          email,
          username,
          first_name,
          last_name,
          password: hashedPassword,
          token: {
            create: {
              token,
            },
          },
        },
      });
      res.status(201).send(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create a new user." });
    }
  }

  static async updateUser(req: Request, res: Response) {
    const userId = +req.params.id;
    const {
      username,
      first_name,
      last_name,
      email,
      is_admin = false,
    } = req.body;
    try {
      const user = await prisma.user.findMany({
        take: 1,
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      const existingUser = await prisma.user.findUnique({
        where: {
          username,
          NOT: {
            id: userId,
          },
        },
      });
      if (existingUser) {
        return res.status(409).json({ error: "Username already taken." });
      }

      const userToUpdate = await prisma.user.findUnique({
        where: { id: userId },
      });

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          username: username || userToUpdate?.username,
          first_name: first_name || userToUpdate?.first_name,
          last_name: last_name || userToUpdate?.last_name,
          email: email || userToUpdate?.email,
          is_superuser: is_admin || userToUpdate?.is_superuser,
        },
      });

      res.status(200).send(updatedUser);
    } catch (err) {
      res.status(500).json({ error: "Failed to update user." });
    }
  }
  // Delete user by ID
  static async deleteUser(req: Request, res: Response) {
    const userId = +req.params.id;

    try {
      const deletedUser = await prisma.user.delete({ where: { id: userId } });
      res
        .status(200)
        .json({ message: "User deleted successfully.", user: deletedUser });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete user." });
    }
  }
}
