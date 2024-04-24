import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios"; // You might use axios for HTTP requests
import { headers } from "next/headers";

const authOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        action: { label: "Action", type: "text" }, // Used to distinguish between sign-in and sign-up
      },
      async authorize(credentials) {
        const { action, email, password } = credentials;

        if (action === "signup") {
          // Handle sign-up
          const { data, status } = await axios.get(
            `${process.env.STRAPI_URL}/api/users?filters[email][$eq]=${email}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.DEV_API_TOKEN}`,
              },
            }
          );

          if (status === 200 && data.length > 0) {
            // User exists, handle as needed, possibly by updating session data
            return data;
          } else {
            return false;
          }
        } else {
          // Handle sign-in
          const response = await fetch(`${process.env.STRAPI_URL}/api/users`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.DEV_API_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: email, // Assuming username is the email
              email: email,
              password: password,
              role: "2",
            }),
          });
          const data = await response.json();
          if (response.ok) {
            return data;
          } else {
            throw new Error(data.message || "Unable to sign in");
          }
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        // Use the email from Google to check the user in Strapi
        try {
          const { data, status } = await axios.get(
            `${process.env.STRAPI_URL}/api/users?filters[email][$eq]=${profile.email}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.DEV_API_TOKEN}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("bhai line number 79 data arha hai", data);
          if (status === 200 && data.length > 0) {
            const user = data; // Define user with the first object from data array
            return user;
          } else {
            // User does not exist, create them in Strapi
            const newUser = await axios.post(
              `${process.env.STRAPI_URL}/api/users`,
              {
                headers: {
                  Authorization: `Bearer ${process.env.DEV_API_TOKEN}`,
                  "Content-Type": "application/json",
                },
              },
              {
                username: profile.email, // Assuming username is the email
                email: profile.email,
                password: profile.at_hash,
                role: "1", // Authenticated
              }
            );

            if (newUser.status === 200) {
              return true; // User creation successful, proceed with sign in
            } else {
              throw new Error("Failed to create a new user in Strapi.");
            }
          }
        } catch (error) {
          console.error("Error in Google sign-in:", error);
          return false; // Return false to reject the sign-in
        }
      }
      // For other providers or direct credentials
      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token }) {
      if (user) {
        token.user = user; // Persist user details in the JWT
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: true, // Enable debug logs
});

export { authOptions as POST, authOptions as GET };
