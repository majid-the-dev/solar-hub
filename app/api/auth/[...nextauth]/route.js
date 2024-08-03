import NextAuth from "next-auth/next";
import { User } from "@/models/Users";
import * as mongoose from "mongoose";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

mongoose.connect(process.env.MONGODB_URI);

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        try {
          const user = await User.findOne({ email });
          if (user) {
            const passwordOk = await bcrypt.compare(password, user.password);
            if (passwordOk) {
              // Return user properties in an object
              const userData = {
                id: user._id.toString(),
                email: user.email,
                fullName: user.fullName,
                phone: user.phone,
                streetAddress: user.streetAddress,
                city: user.city,
                state: user.state,
                role: user.role,
              };
              return userData;
            }
          }
          return null; // or throw an error
        } catch (error) {
          console.error(error);
          return { error: "Invalid credentials" }; // or throw an error
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // if (user) {
      //   // Destructure user object into token
      //   token = { ...token, ...user };
      // }
      // return token;
      if (trigger === "update" && session?.user) {
        return { ...token, ...session.user };
      }

      if (user) {
        return { ...token, ...user };
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        // Destructure token object into session user
        // session.user = { ...session.user, ...token };
        session.user = {
          id: token.id,
          email: token.email,
          fullName: token.fullName,
          phone: token.phone,
          streetAddress: token.streetAddress,
          city: token.city,
          state: token.state,
          role: token.role,
        };
      }
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
