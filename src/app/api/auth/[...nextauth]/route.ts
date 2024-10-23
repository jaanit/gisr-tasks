import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { AuthOptions } from "next-auth";
import { Loginschema } from "@/schema/schema";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        password: {},
        email: {},
      },
      async authorize(credentials) {
        const res = Loginschema.safeParse(credentials);

        if (res.success === false) return null;
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          return null;
        }

        const passwordIsMatch = await bcrypt.compare(credentials?.password as string, user.password);
        if (!passwordIsMatch) {
          return null;
        }

        // if (user.role === "manager") {
        //   return user;
        // }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
