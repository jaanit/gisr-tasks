import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
export const classNames = (...args: string[]): string => {
  return args.join(" ");
};

export function extractName(fullName: string): string {
  const words = fullName?.split(" ");
  let w = "";
  for (let i = 0; i < words?.length; i++) {
    w += words[i][0];
  }
  return w;
}

export function PrismaAdapter(prisma: typeof prisma): Adapter {
  return {
    async createUser(data) {
      return await prisma.user.create({ data });
    },
    async getUser(id: string) {
      return await prisma.user.findUnique({ where: { id } });
    },
    async getUserByEmail(email: string) {
      return await prisma.user.findUnique({ where: { email } });
    },
    async updateUser(user) {
      return await prisma.user.update({ where: { id: user.id }, data: user });
    },
    async deleteUser(id: string) {
      return await prisma.user.delete({ where: { id } });
    },
  };
}

export const prisma = new PrismaClient();