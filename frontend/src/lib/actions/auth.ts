"use server"

import { signIn, signOut } from "@/auth.config"

 export const login = async () =>{
    await signIn("github", {redirectTo:"/"});
 }
 export const logout = async () =>{
    await signOut({redirectTo:"/"});
 }