/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button, Modal, Table } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"
import { deleteFileById, getEmployees, getFilesById } from "../services/api";
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
    const[previewFile, setPreviewFile]=useState<string| null>(null);
    const fetchEmployeeById= async()=>{
        setLoading(true);
        try{
            // console.log("hello")
            const data=await getEmployees(true);
            const employeeWithFiles=await Promise.all(
                data.map(async (emp:Employee)=>{
                    try{
                        const files=await getFilesById(emp.id);
                        return {...emp,files};
                    }
                    catch(err){
                        console.error("Failed to fetch files", err);
                        return {...emp,files:[]};
                    }
                })
            )
            setEmployee(employeeWithFiles);
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
    useEffect(()=>{
        
        fetchEmployeeById();
    },[])

    //to upload
    const handleUpload=(id:number)=>{
        setUploadingEmpId(id);
    }
    const handleUploadSuccess=async ()=>{
        await fetchEmployeeById();
        setUploadingEmpId(null);
        message.success("Files uploaded successfully")
    }

    //to programtic download files
    const downloadFile = async (url:string, fileName:string)=>{
        try{
            const res=await fetch(url);
            const blob= await res.blob();
            const link=document.createElement("a");
            link.href=URL.createObjectURL(blob);
            link.download=fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }catch(err){
            console.error("download Failed", err);
        }
    }



    //to delete
    const handleDeleteFile= async (empId:number, fileUrl:string)=>{
        try{
            await deleteFileById(empId,fileUrl);
            message.success("file deleted");
            fetchEmployeeById();
        }catch(error){
            message.error("failed to delete file");
            console.log(error);
        }
    }


    //to preview
    const handlePreview= async(url:string)=>{
        setPreviewFile(url);
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
                        record.files.map((file:string,index:number)=>{
                            const fileName = file.split("/").pop()?.split("?")[0]|| `file-${index}`;
                            const decode=decodeURIComponent(fileName);

                            const cleanFileName=decode.replace(/\d{13,}|%[0-9A-F]{2}/gi, "").replace(/\s+/g, " ").trim();
                            // const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName || "");
                            // const isPDF = /\.pdf$/i.test(fileName || "");
                            // const isVideo = /\.(mp4|webm|ogg)$/i.test(fileName || "");
                            
                            return (
                                <div key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded cursor-pointer flex gap-2 items-center">
                                <span onClick={() => downloadFile(file,fileName)}>
                                   📥 {cleanFileName}
                                </span>
                                <button onClick={()=> handleDeleteFile(record.id,file)} title="Delete">🗑️</button>
                                <button onClick={()=> handlePreview(file)} title="Preview">👁️</button>
                                </div>
                            );
                        })
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
                    onSuccess={handleUploadSuccess}
                />
            )}

            <Modal open={!!previewFile}
                onCancel={()=>setPreviewFile(null)}
                footer={null}
                width={800} 
                styles={{
                    body:{ height:'80vh', padding:0},
                }}
                centered
            >
                {previewFile && (
                    <iframe src={previewFile} className="w-full h-full" title="File Preview"></iframe>
                )}
                
            </Modal>
        </div>
    )

}
export default EmployeeList;