import axios from "axios";
const API_URL="http://localhost:3000";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveDraft = async (data:any,draftId?:number    ) =>{
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