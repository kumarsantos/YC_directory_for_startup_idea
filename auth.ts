import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Authors from "./models/author";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  // callbacks: {
  //   // authorized({ request, auth }) {
  //   //   const { pathname } = request.nextUrl
  //   //   if (pathname === "/middleware-example") return !!auth
  //   //   return true
  //   // },

  //   async signIn({ user, account, profile }) {
  //     try {
  //       if (!profile?.id) {
  //         throw new Error("No GitHub ID found in profile.");
  //       }
  //       const existingUser = await Authors.findById(profile?.id);
  //       if (!existingUser) {
  //         await Authors.create({
  //           _id: profile?.id,
  //           name: user?.name,
  //           username: profile?.login,
  //           imageUrl: user?.image,
  //           email: user?.email,
  //           bio: profile?.bio,
  //         });
  //       }
  //       return true; // Allow sign-in
  //     } catch (error) {
  //       console.error("Sign-in error:", error);
  //       return false; // Deny sign-in
  //     }
  //   },
  //   async jwt({ token, account, profile }) {
  //     if (account && profile) {
  //       const user = await Authors.findById(profile?.id);
  //       if(!user){
  //         return token;
  //       };
  //       token["id"] = user?._id;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }: { session: any; token: any }) {
  //     session["id"] = token?.id;
  //     return session;
  //   },
  //   // basePath: "/auth",
  //   // session: { strategy: "jwt" },
  
  // },
  debug: process.env.NODE_ENV === "development",
});
