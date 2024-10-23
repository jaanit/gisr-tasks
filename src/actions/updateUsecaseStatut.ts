"use server";

import { prisma } from "@/helpers/helpers";
import { ApiSchema, UsecaseSchema } from "@/schema/schema";
import { z } from "zod";
import { PrismaClient, Usecase } from "@prisma/client";
import { revalidatePath } from "next/cache";
export const updateUsecaseStatut = async (u: Usecase, statut: string) => {


    try {
        await prisma.usecase.update({
            where: {
                id: u.id,
            },
            data: {
                statut: statut,
            },
        });
    }
    catch (e) {
        console.log(e);
        return false;
    }
    revalidatePath("/usecases");
    return true;
};