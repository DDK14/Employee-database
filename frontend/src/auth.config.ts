/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth"
import Github from "next-auth/providers/github";
export const autoConfig:NextAuth={
    providers:[Github({
        clientId:process.env.GITHUB_CLIENT_ID!,
        clientSecret:process.env.GITHUB_CLIENT_SECRET!,
    })],
    secret:process.env.AUTH_SECRET,
    callbacks:{
        async session({session,token,user}){
            return session;
        }
    }
};