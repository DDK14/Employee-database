import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github'
// import { handlers } from "@/auth";
const handler= NextAuth({
    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID!,
            clientSecret:process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    secret:process.env.AUTH_SECRET,
    callbacks:{
        async session({session}){
            return session;
        },
    }
});
export {handler as GET, handler as POST};