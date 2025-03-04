/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {Form,Input,Button, DatePicker, message, DatePickerProps} from "antd"
import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState } from "react";
import { dbpush, deleteDraft, getEmployeeById, saveDraft } from "../services/api";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Form1=({next, form ,data,setData,draft}:{next:any,form:any,data:any,setData:any,draft:any})=>{
    // const [form] =Form.useForm();
    const nextPage= async ()=>{
        
        const values = await form.validateFields();
            setData({...data,...values,
                dateOfJoining: values.dateOfJoining ? dayjs(values.dateOfJoining).format("YYYY-MM-DD") : "",
            }); 
            next();
    };
   
return(
    <div className="bg-white text-black">
        <h2>Enter the details</h2>
        <Form form={form} layout="vertical">
            <Form.Item label="Name" name={"name"} rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input/>
            </Form.Item>

            <Form.Item label="Proposed Role" name={"proposedRole"} rules={[{ required: true, message: 'Please input your role!' }]}>
                <Input/>
            </Form.Item>

            <Form.Item label=" Location" name={"location"} rules={[{ required: true, message: 'Please input your Location!' }]}>
                <Input/>
            </Form.Item>

            <Form.Item label="Date of Joining" name={"dateOfJoining"} rules={[{ required: true, message: 'Required' }]}>
                <DatePicker onChange={(date, dateString) => setData({ ...data, dateOfJoining: dateString })} />
            </Form.Item>

            <Form.Item label="Employee Code" name="employeeCode" rules={[{ required: true, message: 'Please input employee code!' }]}>
                <Input />
            </Form.Item>
            <Button type="primary" onClick={nextPage} >Next</Button>
            <Button variant="outlined" color="danger" onClick={draft} style={{ marginLeft: 15 }}>Save & Continue</Button>
        </Form>
    </div>
)
};
const Form2=({next,prev,form, data,setData,draft}:{next:any,prev:any,form:any,data:any,setData:any,draft:any})=>{

    const nextPage= async ()=>{
        
        const values = await form.validateFields();
            setData({...data,...values}); 
            next();
    };
    return(
        <div className="bg-white text-black">
        <h2>Page 2</h2>
        <Form form={form} layout="vertical">
            <Form.Item label="Personal Email" name="personalEmail" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Official Email" name="officialEmail" rules={[{ required: true, type: 'email', message: 'Please input a valid official email!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Contact Number" name="contactNumber" rules={[{ required: true, message: 'Please input contact number!' },
            {
                pattern:/^[0-9]{10}$/,
                message:"Contact Number should be exactly 10 digits"
            }

            ]}>
                <Input maxLength={10}/>
            </Form.Item>

            <Form.Item label="Emergency Contact Number" name="emergencyContactNumber" rules={[{ required: true, message: 'Please input emergency contact number!' },
                {
                    pattern:/^[0-9]{10}$/,
                    message:"Emergency Contact Number should be exactly 10 digits"
                }
            ]}>
                <Input maxLength={10}/>
            </Form.Item>
            
            <Button type="dashed" onClick={prev}>Back</Button>
            <Button type="primary" onClick={nextPage}>Next</Button>
            <Button variant="outlined" color="danger" onClick={draft} style={{ marginLeft: 15 }}>Save & Continue</Button>
        </Form>
    </div>
    )
}

//form3
const Form3=({prev, next , form ,data,setData, draft}:{prev:any,next:any ,form:any,data:any    ,setData:any,draft:any})=>{
    const nextPage= async ()=>{
        const values = await form.validateFields();
            setData({...data,...values}); 
            next();
    };
    return(
        <div className="bg-white text-black">
        <h2>Page 3</h2>
        <Form form={form} layout="vertical">
            <Form.Item label="Business Unit" name="businessUnit" rules={[{ required: true, message: 'Please input business unit!' }]}>
                <Input/>
            </Form.Item>

            <Form.Item label="Department" name="department" rules={[{ required: true, message: 'Please input department!' }]}>
                <Input/>
            </Form.Item>

            <Form.Item label="Reporting Manager" name="reportingManager" rules={[{ required: true, message: 'Please input reporting manager!' }]}>
                <Input/>
            </Form.Item>

            <Button type="dashed" onClick={prev}>Back</Button>
            <Button type="primary" onClick={nextPage}>Next</Button>
            <Button variant="outlined" color="danger" onClick={draft} style={{ marginLeft: 15 }}>Save & Continue</Button>
        </Form>
    </div>
    )
}

const SubmitPage=({data,submit,}:{data:any; submit:any})=>{
    return(
        <div>
            <h2>Final  review</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Button type="primary" onClick={submit}>Submit</Button>
        </div>
    )
}




const Complete=()=>{
    const [step,setStep]=useState(1);      //that is initialstate=1
    const [data,setData]=useState({});      //stores all values from the form
    const [draftId,setDraftId]=useState<number| undefined>(undefined)  //i.e it starts as undefined, but if we update it then takes number  
    const nextStep =() => setStep(step+1);
    const prevStep = () => setStep(step-1);
    const searchParams=useSearchParams();
    const employeeId=searchParams.get("id");
    const [form] =Form.useForm();
    const [loading,setLoading]=useState(false);
    const router=useRouter();

    useEffect(()=>{
        if(employeeId){
            const fetchEmployee= async()=>{
                try{
                    const employeeData=await getEmployeeById(Number(employeeId));
                    setData(employeeData);
                    form.setFieldsValue({
                        ...employeeData,
                        dateOfJoining: employeeData.dateOfJoining ? dayjs(employeeData.dateOfJoining) : null,
                    })
                }catch(error){
                    console.error("Failed to fetch employee details",error);
                }
            }
            fetchEmployee();
        }
        
    },[employeeId,form]);

    const handleSaveDraft=async ()=>{
        try{
            console.log("before draftid",draftId)
            const values=await form.validateFields();
            const updatedValues={
                ...data,...values,
                // dateOfJoining: values.dateOfJoining ? dayjs(values.dateOfJoining).format("YYYY-MM-DD"):"",
            };
            if(employeeId){
                await saveDraft(updatedValues,Number(employeeId));
                message.success("Draft updated successfully");
            }else{
                const res= await saveDraft(updatedValues,draftId);
                    if(res.id && !draftId){
                        console.log(draftId ? "Updated Draft ID:" : "New Draft ID:", res.id);
                        setDraftId(res.id);
                    }
            }
            setData(updatedValues)
            message.success("Draft updated");
            nextStep();
        }
        catch(error){
            message.error("Submission to draft Failed ");
            console.error("Error",error);
        }
    }


    const handleSubmit = async () =>{
        console.log("Submission", data);
        setLoading(true);
        try{
            const finalData={
                ...data,
                id:employeeId? Number(employeeId) :undefined
            }
            await dbpush(finalData);
            message.success(employeeId?"Employee details updated successfully" : "Form submitted");
            // if(employeeId){
            //     await dbpush(finalData)
            //     message.success("Employee details updated successfully");
            // }else{
            //     await dbpush({...data});
            //     message.success("form Submitted")
            // }
            if(draftId){
                await deleteDraft(draftId);
                console.log("draft Deleted after final submission");
                setDraftId(undefined);
            }
            router.push("/list");
            
            
        } catch(error){
            message.error("Submission failed")
            console.error("Failed",error);

        }finally{
            setLoading(false)
        }
        // const res=await saveDraft({...data,...newData},draftId);
        // if(!draftId && res.id){
        //     console.log("New id",res.id);
        //     setDraftId(res.id);
        // }
        // const finalDraftId= draftId || res.id;
        // if(finalDraftId){
        //     await finalSubmit(finalDraftId);
        //     console.log("final submission with finalDraftId", finalDraftId);
        // }
    }
    return(
        <div>
            {step===1 && <Form1 next={nextStep} form={form} data={data} setData={setData} draft={handleSaveDraft}/>}
            {step===2 && <Form2 next={nextStep} form={form} prev={prevStep} data={data} setData={setData} draft={handleSaveDraft}/>}
            {step===3 && <Form3 prev={prevStep} form={form} next={nextStep} data={data} setData={setData} draft={handleSaveDraft}/>}
            {step===4 && <SubmitPage data={data} submit={handleSubmit}/>}
        </div>
    )
};
export default Complete;