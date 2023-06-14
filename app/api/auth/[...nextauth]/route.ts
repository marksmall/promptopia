import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "~/utils/database";

import { UserModel } from "~/models/user";

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw Error("Auth credentials are required for this app to run");
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await UserModel.findOne({
        email: session?.user?.email,
      });

      if (session.user) {
        session.user.id = sessionUser?._id.toString();
      }

      return session;
    },
    async signIn({ user }) {
      try {
        await connectToDB();

        // check if user already exists.
        const userExists = await UserModel.findOne({ email: user?.email });

        // If no user exists, create one.
        if (!userExists) {
          await UserModel.create({
            email: user?.email,
            username: user?.name?.replace(" ", "").toLowerCase(),
            image: user?.image,
          });
        }

        return true;
      } catch (error) {
        console.log("Error Signing In: ", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
