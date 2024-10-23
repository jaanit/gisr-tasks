"use server";
import { prisma } from "@/helpers/helpers";
import { Prisma, Usecase } from "@prisma/client";

export const search = async (query: string) => {
  const usecases = await prisma.$queryRawUnsafe<Usecase[]>('SELECT * FROM "Usecase" WHERE nom LIKE $1', `%${query}%`);
  return usecases;
};
