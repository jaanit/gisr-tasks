"use server";

import { prisma } from "@/helpers/helpers";
import { UsecaseSchema } from "@/schema/schema";
import { Prisma } from "@prisma/client";
import { isAfter, isEqual } from "date-fns";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const modifyUsecase = async (values: z.infer<typeof UsecaseSchema>, id: string) => {
  const Error = {
    isError: true,
    message: "",
  };

  const res = UsecaseSchema.safeParse(values);
  if (res.success === false) {
    Error.isError = false;
    Error.message = res.error.message;
    return Error;
  }

  if (  isAfter(values.date_creation as Date, values.date_mep as Date) ||  isEqual(values.date_creation as Date, values.date_mep as Date)) {
    Error.isError = false;
    Error.message = "La date de mise en production ne peut pas être inférieure à la date de création.";
    return Error;
  }

  if ( isAfter(values.date_creation as Date, new Date())) {
    Error.isError = false;
    Error.message = "La date de création ne doit pas être postérieure à la date actuelle.";
    return Error;
  }

  try {
        await prisma.usecase.update({
        where: { id},
        data: values
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
    Error.message = `Erreur inattendue`;
    return Error;
  }
  revalidatePath("/usecases");

  Error.isError = true;
  Error.message = ``;
  return Error;
};