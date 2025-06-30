/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {  useRouter } from "next/navigation";
import { Button } from "antd";
import '@ant-design/v5-patch-for-react-19';
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { githubSign } from "./services/api";
// import { login, logout } from "@/lib/actions/auth";


export default function Home(){
  const router=useRouter();
  const [employeeId,setEmployeeId]=useState<number | null>(null);
  // const pathName=usePathname();
  // const searchQuery=useSearchParams()
  // const [form] =Form.useForm();
  // const starting=()=>{
  //   // form.validateFields()
  //   //     .then((values)=>{
  //   //         router.push(`/form?${new URLSearchParams(values).toString()}`);
  //   //     })
  //   // console.log("hello")
  //   console.log("Navigating to /form/form1");
  //   // asdasad
  //   // const url=`${pathName}`
  //   // console v
  //   router.push('/form')
  // };
// const session=await auth();
  const {data:session}=useSession();
  useEffect(()=>{
    if(session?.user?.email){
      console.log("Github session: ", session)
      githubSign(session.user.email)
      // .then(res=>res.json())
      .then(data=>{
        if(data?.id){
          console.log("Received employeeId", data.id)
          setEmployeeId(data.id);
        }
        else{
          console.warn("No employeeId",data)
        }
        
      })
    }
  },[session])
  const handleStart= () =>{
    if(!employeeId) return alert("Employee ID not ready");
    router.push(`/form?id=${employeeId}`);
  }
  return(
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome</h1>
      <p className="text-lg text-gray-600 mb-6">Click below to start filling the form</p>
      {
        session? (
          <>
          <Button type="primary"onClick={handleStart} className="px-6 py-2 text-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300"  >
        Start Form
      </Button>
      <div className="mt-4"><Button onClick={()=>signOut()} danger>Sign Out</Button></div>
          </>
        ):(
          <Button onClick={()=>signIn()}>Sign In </Button>
        )
      }
      
      </div>
    </div>
  );
};
