"use client"

import { useRouter } from "next/router";
import { useEffect, useState } from "react"

const DraftList=() =>{
    const [drafts,setDrafts]=useState([]);
    const router=useRouter();
    useEffect(()=>{
        axios.get("/form/")
    })
}