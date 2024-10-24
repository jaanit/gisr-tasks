import { PrismaClient } from "@prisma/client";

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

declare global {
  var prisma: PrismaClient;
}

export const prisma = global.prisma || new PrismaClient();