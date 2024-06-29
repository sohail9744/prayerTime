import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios"; // You might use axios for HTTP requests

const authOptions = NextAuth({
  providers: [
    CredentialsProvider({
      // name: "Credentials",
      // credentials: {
      //   email: {
      //     label: "Email",
      //     type: "text",
      //     placeholder: "jsmith@example.com",
      //   },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials) {
        const { name, email, password, page } = credentials;
        console.log("user credentials", email, password, page);
        try {
          if (page === "signIn") {
            const existingUser = await userSignIn(email, password);
            // console.log("EXISTING USER", existingUser);
            let user = existingUser;
            return user;
          }

          if (page === "signUp") {
            const newUser = await userSignUp(name, email, password);
            console.log("NEW USER with SIGNUP", newUser);
            let user = newUser;
            return user;
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
      const obj = {
        ...token?.user?.user,
        jwt: token.user.jwt,
      };
      // console.log("setting session", { obj, session });
      session = obj; // Assign user details from the token to the session object
      return session;
    },
    async jwt({ token, user, session }) {
      // console.log("JWT Callback Method", token, user, session);
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: true,
});

const userSignUp = async (title, email, password) => {
  // console.log("user details", title, email, password);
  try {
    const { data, status } = await axios.post(
      `${process.env.HOSTNAME}/api/users`,
      {
        title: title,
        username: email,
        email: email,
        password: password,
        confirmed: true,
        blocked: false,
        role: "1",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEV_API_TOKEN}`,
        },
      }
    );
    if (status === 200 || 201) {
      const authResponse = await axios.post(
        `${process.env.HOSTNAME}/api/auth/local`,
        { identifier: data?.email, password: password },
        {
          headers: {
            Authorization: `Bearer ${process.env.DEV_API_TOKEN}`,
          },
        }
      );
      // console.log("SIGNUP: New User JWT", authResponse);
      return authResponse?.data;
    } else {
      throw new Error("No user found with the email");
    }
  } catch (error) {
    console.log("ERROR!", error.message);
    throw new Error("User is already exist buy this email");
  }
};

const userSignIn = async (email, password) => {
  try {
    // Check if the user exist in the database
    let { data, status } = await axios.get(
      `${process.env.HOSTNAME}/api/users?filters[email][$eq]=${email}`,
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
        `${process.env.HOSTNAME}/api/auth/local`,
        { identifier: email, password: password },
        {
          headers: {
            Authorization: `Bearer ${process.env.DEV_API_TOKEN}`,
          },
        }
      );
      return authResponse?.data;
      // console.log("USER DETAIL!", user);
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
