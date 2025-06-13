/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const API_URL="http://localhost:3000";

interface Employee {
    id: number;
    name: string;
    department: string;
    reportingManager: string;
    files?: string[];
}

export const saveDraft = async (data:any,draftId?:number) =>{
    console.log("saving in draft")

    //if draftId present, then update that draft entry only
    const url=draftId ? `${API_URL}/employee/draft?draftId=${draftId}` : `${API_URL}/employee/draft`
        const response=await axios.post(url,data);
        return response.data;
}
export const finalSubmit = async (draftId:number) =>{
    const response=await axios.post(`${API_URL}/employee/final/${draftId}`);
    return response.data;
}
export const dbpush= async(data:any) =>{
    console.log("Data being sent",data)
    try{
        const res=await axios.post(`${API_URL}/employee/submit`,data);
        return res.data;
    }
    catch(error){
        console.error("Problem in submission",error);
        throw error;
    }
}

export const deleteDraft=async(draftId?:number)=>{
    try{
        const response=await axios.delete(`${API_URL}/drafts/${draftId}`);
        return response.data;
    }
    catch(error){
        console.error("Error in deleting draft",error);
    }
}

export const getEmployees= async(withFiles=false): Promise<Employee[]> =>{
    try{
        const res=await axios.get(`${API_URL}/employee`);
        const employees=res.data;
        if(!withFiles) return employees;

        const withFilesData=await Promise.all(
            employees.map(async (emp:any)=>{
                try{
                    const fileRes=await axios.get(`${API_URL}/files/upload/${emp.id}`);
                    return {...emp,files:fileRes.data.map((f:any)=>f.path)};
                }
                catch{
                    return {...emp,files:[]};
                }
            })
        )
        return withFilesData;
    }
    catch(error){
        console.error("Error in returing the employees",error);
        return [];
    }
}

export const getEmployeeById= async(id:number)=>{
    try{
        const res= await axios.get(`${API_URL}/employee/${id}`);
        return res.data;
    }
    catch(error){
        console.error(`error in fetching employee with id: ${id}`, error)
    }
}

export const getDrafts= async() =>{
    try{
        const res=await axios.get(`${API_URL}/drafts`);
        return res.data;
    }
    catch(error){
        console.error(`error in fetching drafts`,error)
    }
}

export const getDraftsById = async(draftId:number)=>{
    try{
        const res=await axios.get(`${API_URL}/drafts/${draftId}`);
        return res.data;
    }
    catch(error){
        console.error(`error in fetching draft with draftId: ${draftId}`,error);
    }
}

export const getFilesById = async(id:number)=>{
    const res= await axios.get(`${API_URL}/files/list/${id}`);
    return res.data;
}

//delete file
export const deleteFileById = async (empId:number, fileUrl:string)=>{
    const res=await axios.delete(`${API_URL}/files/delete/${empId}`,{
        data:{fileUrl},
    });
    return res.data;
}