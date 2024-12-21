import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import prisma from "./prisma";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    })
  ],
  callbacks: {
    async session({session}) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email || "",
        },
      });
      
      if (user) {
        session.user = {
          ...user
        };
      }
      return session;
    }
  },
  adapter: PrismaAdapter(prisma),
};
