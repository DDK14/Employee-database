import axios from "axios";
const API_URL="http://localhost:3000";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveDraft = async (data:any) =>{
        const response=await axios.post(`${API_URL}/employee/draft`,data);
        return response.data;
}
export const finalSubmit = async (draftId:number) =>{
    const response=await axios.post(`${API_URL}/employee/final/${draftId}`);
    return response.data;
}