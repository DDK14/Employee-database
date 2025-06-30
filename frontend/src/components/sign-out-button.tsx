"use client"

import { logout } from "@/lib/actions/auth"
import { Button } from "antd"

export const SignOutButton =()=>{
    return <Button type="primary"onClick={()=>logout()} className="px-6 py-2 text-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300"  >
        Sign Out
      </Button>
}