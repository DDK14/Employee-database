/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const API_URL="http://localhost:3000";
export const saveDraft = async (data:any,draftId?:number) =>{
    console.log("saving in draft")

    //if draftId present, then update that draft entry only
    const url=draftId ? `${API_URL}/employee/draft?draft=${draftId}` : `${API_URL}/employee/draft`
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