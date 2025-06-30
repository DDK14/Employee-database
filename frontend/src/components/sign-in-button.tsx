"use client"

import { login } from "@/lib/actions/auth"
import { Button } from "antd"

export const SignInButton =()=>{
    return <Button type="primary"onClick={()=>login()} className="px-6 py-2 text-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300"  >
        Sign in with Github
      </Button>
}