import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { User } from "./lib/models/user.model";
import { connectToDB } from "./lib/utils";

const login = async (credentials) => {
  // credentials come from login form
  try {
    await connectToDB();
    const user = await User.findOne({
      username: credentials.username,
    });
    // we can check also it the role is admin
    if (!user)
      throw new Error("Wrong credentials from login in auth.js on !user!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );
    // we add another Condition pas = pas case there is pass we not encrypt it
    if (!isPasswordCorrect && user.password !== credentials.password)
      throw new Error("Wrong credentials!");
    // every thing okay then send our user

    return user;
  } catch (error) {
    console.log(`failed login from auth.js => ${error}`);
    throw new Error("Failed to login!");
  }
};

/*
instead of export default we can destructure our signIn and signOut functions that we can use 
in the login page also destruct auth session,
so using this function we can fetch our user and use it in the side bar
--session by default expire after 1 month
*/
export const { signIn, signOut, auth } = NextAuth({
  // to spread all auth config here in the provider that will make the auth process and save session for user after login correct
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
          // next will take this user and send it to session
        } catch (error) {
          // login process is fail
          return null;
        }
      },
    }),
  ],
  /*  
  when you login next auth by default is storing you email address into JWT token
  but we can change it we can store any else , also use new callbacks
  */
  callbacks: {
    /*
    but to reach this data inside our component we should pass the token info to session
    */
    async jwt({ token, user }) {
      if (user) {
        // send other info to the token
        token.username = user.username;
        token.img = user.img;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // send other info to the token
        session.user.username = token.username;
        session.user.img = token.img;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
});
