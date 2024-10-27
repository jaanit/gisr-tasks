"use server";
import bcrypt from "bcrypt";
import { prisma } from "@/helpers/helpers";
import { Prisma } from "@prisma/client";
import { UserSchema } from "@/schema/schema";

import { z } from "zod";
import { revalidatePath } from "next/cache";

export const signUp = async (values: z.infer<typeof UserSchema>) => {
  const Error = {
    isError: true,
    message: "",
  };
  //  crrypt password
  values.password = await bcrypt.hash(values.password, 10);

  const res = UserSchema.safeParse(values);
  if (res.success === false) {
    Error.isError = false;
    Error.message = res.error.message;
    return Error;
  }
  try {
    await prisma.user.create({
      data: values,
    });
       
  } catch (e) {
    console.log("Prisma error: .......------");
    Error.isError = false;
    Error.message = `Erreur inattendue`;
    return Error;
  }
  console.log("pooooooooooos -------  111");
  revalidatePath("/usecases");

  Error.isError = true;
  Error.message = ``;
  return Error;
};
