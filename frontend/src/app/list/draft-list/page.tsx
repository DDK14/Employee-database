"use client"

import { deleteDraft, getDrafts } from "@/app/services/api";
import { Button, message } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"


interface Draft {
    id:number;
    name:string;
    proposedRole:string;
}
const DraftList=() =>{
    const [drafts,setDrafts]=useState<Draft[]>([]);
    const router=useRouter();
    useEffect(()=>{
        const fetchDrafts= async() =>{
            try{
                const data=await getDrafts();
                setDrafts(data);
            }
            catch(error){
                message.error("failed to fetch drafts");
                console.error("Error fetching drafts",error);
            }
        }
        fetchDrafts();
    },[])

    const columns:ColumnsType<Draft>= [
        {title:"Name", dataIndex:"name", key:"name"},
            {title:"Proposed Role", dataIndex:"proposedRole", key:"proposedRole"},
            {
                title:"Actions",
                key:"actions",
                render:(record):React.ReactNode=>{
                    return (
                        <div className="flex gap-3">
                    <Button type="primary" onClick={() => router.push(`/form?draftId=${record.id}`)}>
                        Resume
                    </Button>
                    <Button danger onClick={async()=> {
                        try{
                            await deleteDraft(record.id);
                            message.success("Draft deleted successfully");
                            setDrafts((prev)=>prev.filter((d) => d.id !== record.id));
                        }
                        catch(error){
                            console.error("delete draft error", error);
                        }

                    }}
                    >Delete</Button>
                    </div>
                )},
            }
    ];
    return(
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="bg-white shadow-md p-4 flex justify-between items-center mb-4 rounded-lg">
                <h2 className="text-xl font-bold text-black">Draft List</h2>
                <div className="flex gap-2">
                <Button type="default" onClick={() => router.push("/form")}>
                Back to Form
                </Button>
                <Button type="primary" onClick={() => router.push("/list")}>
                Employee List
                </Button>
                </div>  
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
                <Table columns={columns} dataSource={drafts} rowKey={"id"}/>
            </div>

        </div>
    )
}
export default DraftList;

