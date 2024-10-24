"use server";

import { prisma } from "@/helpers/helpers";
import { ApiSchema } from "@/schema/schema";
import { Api, Prisma } from "@prisma/client";
import { isAfter, isEqual } from "date-fns";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const deleteApi = async (id: string) => {

    const Error = {
        isError: true,
        message: "",
        messageDateCreation: "",
        messageDateUat: "",
        messageDateProd: "",
      
      };

    try {
        await prisma.api.delete({
            where: { id: id },
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            Error.isError = false;
            Error.message = `Ces champs doivent être uniques: ${e.meta?.target?.toString() as string}`;
            return Error;
          }
        }
    
        Error.isError = false;
        Error.message = `Erreur inattendue ${e}`;
        return Error;
      }
      revalidatePath("/usecases"+ id);
    
      Error.isError = true;
      Error.message = ``;
      return Error;
}