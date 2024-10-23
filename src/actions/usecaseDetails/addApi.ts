"use server";

import { extractName, prisma } from "@/helpers/helpers";
import { ApiSchema } from "@/schema/schema";
import { Prisma, Usecase } from "@prisma/client";
import { isAfter, isEqual } from "date-fns";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
export const addApi = async (values: z.infer<typeof ApiSchema>, id: string) => {

  if (!values.date_creation)
      values.date_creation = new Date()
  const Error = {
    isError: true,
    message: "",
    messageDateCreation: "",
    messageDateUat: "",
    messageDateProd: "",

  };

  const res = ApiSchema.safeParse(values);
  if (res.success === false) {
    Error.isError = false;
    Error.message = res.error.message;
    return Error;
  }

  if (isAfter(values.date_creation as Date, values.date_uat as Date) || isEqual(values.date_creation as Date, values.date_uat as Date)) {
    Error.isError = false;
    Error.messageDateUat = "La date de création doit précéder la date de mise en production (UAT).";

    return Error;
  }

  if ((isAfter(values.date_uat as Date, values.date_prod as Date) || isEqual(values.date_uat as Date, values.date_prod as Date))) {
    Error.isError = false;
    Error.messageDateProd = "La date UAT doit être inférieure à la date mise en PROD.";
    return Error;
  }

  if (isAfter(values.date_creation as Date, values.date_prod as Date) || isEqual(values.date_creation as Date, values.date_prod as Date)) {
    Error.isError = false;
    Error.messageDateProd = "La date de mise en production ne peut pas être inférieure à la date de création.";
    return Error;
  }


  if (isAfter(values.date_creation as Date, new Date())) {
    Error.isError = false;
    Error.messageDateCreation = "La date de création ne doit pas être postérieure à la date actuelle.";
    return Error;
  }


try {
  await prisma.api.create({
    data: {
      usecaseId: id,
      ...values,
      statut: values.date_prod ? "PROD" : values.date_uat ? "UAT" : "EN COURS",
      // nom: "API_" + extractName(values.producteur)+ "_" + u.nom + "_" + values.nom,
    
    },
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
  
  revalidatePath("/usecases"+ id+"page=1");

  Error.isError = true;
  Error.message = ``;
  return Error;
};