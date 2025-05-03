/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button, Table, Tag } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"
import { getEmployees } from "../services/api";
import { message } from "antd";
import { ColumnsType } from "antd/es/table";
import UploadFile from "../components/FileUpload";

interface Employee{
    id:number;
    name:string;
    department:string;
    reportingManager:string;
    files?:string[];
}

const EmployeeList = () =>{
    const[employee,setEmployee]=useState<Employee[]>([]);
    const[loading,setLoading]=useState(false);
    const router=useRouter();
    const[uploadingEmpId,setUploadingEmpId]=useState<number | null>(null);
    useEffect(()=>{
        const fetchEmployeeById= async()=>{
            setLoading(true);
            try{
                console.log("hello")
                const data=await getEmployees(true);
                setEmployee(data);
                console.log("fetching employee data: ",data)
            }
            catch(error){
                message.error('Failed to fetch Employees')
                console.error("Error fetching employees",error)
            }
            finally{
                setLoading(false);
            }
        }
        fetchEmployeeById();
    },[])
    // const handleEdit=(id:number)=>{
    //     route.push(`/form?id=${id}`)
    // }

    const handleUpload=(id:number)=>{
        setUploadingEmpId(id);
    }
    const columns:ColumnsType<Employee>=[
        {title:"Name", dataIndex:"name", key:"name"},
        {title:"Department", dataIndex:"department", key:"department"},
        {title:"Reporting Manager" , dataIndex:"reportingManager",key:"reportingManager"},
        {
            title:"Files",
            key:"files",
            render:(_:any,record:Employee) =>(
                <div className="flex flex-wrap gap-2">
                    {record.files && record.files.length > 0 ?(
                        record.files.map((file:string,index:number)=>(
                            
                            <Tag color="blue" key={index}>
                                <a 
                                    href={file} 
                                    
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    download
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    {file.split("/").pop()}
                                </a>
                            </Tag>
                            
                        ))
                    ):(
                        <span className="text-gray-500">No files uploaded</span>
                    )}
                </div>
            )
        },
        {
            title:"Actions",
            key:"actions",
            render:(_: any,record: any):React.ReactNode=>{
                return (
                    <div className="flex-gap-2">
                        <Button type="primary" onClick={() => router.push(`/form?id=${record.id}`)}>
                            Edit
                        </Button>
                        <Button onClick={()=> handleUpload(record.id)}>Upload File</Button>
                    </div>
                )
            },
        }
    ];

    return(
        <div  className="bg-gray-100 min-h-screen p-6">
            {/* Navbar */}
            <div className="bg-white shadow-md p-4 flex justify-between items-center mb-4 rounded-lg">
                <h2 className="text-xl font-bold text-black">Employee List</h2>
                <div className="flex gap-2">
                <Button type="default" onClick={() => router.push("/form")}>
                Back to Form
                </Button>
                <Button type="primary" onClick={() => router.push("/list/draft-list")}>
                Draft List
                </Button>
            </div>    
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
            <Table columns={columns} dataSource={employee} loading={loading} rowKey={"id"}/>
            </div>
            
            {uploadingEmpId!==null &&(
                <UploadFile
                    employeeId={uploadingEmpId}
                    onClose={()=>setUploadingEmpId(null)}
                    onSuccess={()=> router.push("/list")}
                />
            )}
        </div>
    )

}
export default EmployeeList;