import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios"; // You might use axios for HTTP requests

const authOptions = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password, page } = credentials;
        console.log(email, password, page);
        try {
          if (page === "signIn") {
            const existingUser = await userSignIn(email, password);
            let user = existingUser;
            return user;
          }

          if (page === "signUp") {
            return await userSignUp(email, password);
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // For other providers or direct credentials
      return true;
    },
    async session({ user, session, token }) {
      session.user = token.user; // Assign user details from the token to the session object
      console.log({ SESSION: session, USER: user });
      return session;
    },
    async jwt({ token, user }) {
      // console.log("JWT Callback Method", token, user);
      if (user) {
        token.user = user; // Persist user details in the JWT if user object is present
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: true,
});

const userSignUp = async (email, password) => {
  try {
    const SignUpResponse = await axios.post(
      `${process.env.STRAPI_URL}/api/users`,
      {
        username: email,
        email: email,
        password: password,
        confirmed: true,
        blocked: false,
        role: "2",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEV_API_TOKEN}`,
        },
      }
    );
    return SignUpResponse?.data;
  } catch (error) {
    console.log("ERROR!", error.message);
    throw new Error(error.message);
  }
};

const userSignIn = async (email, password) => {
  try {
    // Check if the user exist in the database
    let { data, status } = await axios.get(
      `${process.env.STRAPI_URL}/api/users?filters[email][$eq]=${email}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DEV_API_TOKEN}`,
        },
      }
    );

    if (status === 200 && data.length > 0) {
      //If the user exist in the database then get the user details with JWT
      // console.log("Process DETAILS of SignIn", status, email, password);
      const authResponse = await axios.post(
        `${process.env.STRAPI_URL}/api/auth/local`,
        { identifier: email, password: password },
        {
          headers: {
            Authorization: `Bearer ${process.env.DEV_API_TOKEN}`,
          },
        }
      );
      return authResponse?.data;
      // // console.log("USER DETAIL!", user);
      // return user;
    } else {
      throw new Error("No user found with the email");
    }
  } catch (error) {
    console.log("ERROR!", { error });
    throw new Error(error?.message);
  }
};

export { authOptions as POST, authOptions as GET };
