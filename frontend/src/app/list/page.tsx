/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button, Table } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"
import { getEmployees } from "../services/api";
import { message } from "antd";
import { ColumnsType } from "antd/es/table";

interface Employee{
    id:number;
    name:string;
    department:string;
    reportingManager:string;
}

const EmployeeList = () =>{
    const[employee,setEmployee]=useState([]);
    const[loading,setLoading]=useState(false);
    const router=useRouter();
    useEffect(()=>{
        const fetchEmployee= async()=>{
            setLoading(true);
            try{
                const data=await getEmployees();
                setEmployee(data);
            }
            catch(error){
                message.error('Failed to fetch Employees')
                console.error("Error fetching employees",error)
            }
            finally{
                setLoading(false);
            }
        }
        fetchEmployee();
    },[])
    // const handleEdit=(id:number)=>{
    //     route.push(`/form?id=${id}`)
    // }
    const columns:ColumnsType<Employee>=[
        {title:"Name", dataIndex:"name", key:"name"},
        {title:"Department", dataIndex:"department", key:"department"},
        {title:"Reporting Manager" , dataIndex:"reportingManager",key:"reportingManager"},
        {
            title:"Actions",
            key:"actions",
            render:(_: any,record: any):React.ReactNode=>{
                return <Button type="primary" onClick={() => router.push(`/form?id=${record.id}`)}>
                    Edit
                </Button>;
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
            
        </div>
    )

}
export default EmployeeList;