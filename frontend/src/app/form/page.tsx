/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import { useRouter } from "next/navigation"
import {Form,Input,Button, DatePicker, message, DatePickerProps} from "antd"
import '@ant-design/v5-patch-for-react-19';
import { useState } from "react";
import { dbpush } from "../services/api";
import dayjs, { Dayjs } from "dayjs";
// import { finalSubmit, saveDraft } from "../services/api";
//  console.log("form1");
const Form1=({next,data,setData}:{next:any,data:any,setData:any})=>{
    const [form] =Form.useForm();
    const nextPage= async ()=>{
        
        const values = await form.validateFields();
            setData({...data,...values,
                dateOfJoining: values.dateOfJoining ? dayjs(values.dateOfJoining).format("YYYY-MM-DD") : "",
            }); 
            next();
    };
    const dataChange:DatePickerProps["onChange"]=(date)=>{
        setData({
            ...data,
            dateOfJoining:date ?dayjs(date).format("YYYY-MM-DD"):null
        });
    }
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
        </Form>
    </div>
)
};
const Form2=({next,prev,data,setData}:{next:any,prev:any,data:any,setData:any})=>{
    const [form] =Form.useForm();
    const nextPage= async ()=>{
        
        const values = await form.validateFields();
            setData({...data,...values}); 
            next();
    };
    return(
        <div>
        <h2>Page 2</h2>
        <Form form={form} layout="vertical">
            <Form.Item label="Personal Email" name="personalEmail" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Official Email" name="officialEmail" rules={[{ required: true, type: 'email', message: 'Please input a valid official email!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Contact Number" name="contactNumber" rules={[{ required: true, message: 'Please input contact number!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Emergency Contact Number" name="emergencyContactNumber" rules={[{ required: true, message: 'Please input emergency contact number!' }]}>
                <Input />
            </Form.Item>
            
            <Button type="dashed" onClick={prev}>Back</Button>
            <Button type="primary" onClick={nextPage}>Next</Button>
        </Form>
    </div>
    )
}

//form3
const Form3=({prev, next ,data,setData}:{prev:any,next:any ,data:any    ,setData:any})=>{
    const [form] =Form.useForm();
    const nextPage= async ()=>{
        const values = await form.validateFields();
            setData({...data,...values}); 
            next();
    };
    return(
        <div>
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
        </Form>
    </div>
    )
}

const SubmitPage=({data,submit}:{data:any; submit:any})=>{
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
    // const [draftId,setDraftId]=useState<number| undefined>(undefined)  //i.e it starts as undefined, but if we update it then takes number  
    const nextStep =() => setStep(step+1);
    const prevStep = () => setStep(step-1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading,setLoading]=useState(false);
    // const handleSaveDraft=async (value:any)=>{
    //     // const res= await saveDraft({...data,...value},draftId);
    //     // if(!draftId &&res.id){
    //     //     console.log("New id",res.id);
    //     //     setDraftId(res.id);
    //     // }
    //     // setData({...data,...value});
    //     setData(prevData=>({...prevData,...value}));
    // }
    const handleSubmit = async () =>{
        console.log("Submission", data);
        setLoading(true);
        try{
            await dbpush(data);
            message.success("form Submitted")
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
            {step===1 && <Form1 next={nextStep} data={data} setData={setData}/>}
            {step===2 && <Form2 next={nextStep} prev={prevStep} data={data} setData={setData}/>}
            {step===3 && <Form3 prev={prevStep} next={nextStep} data={data} setData={setData}/>}
            {step===4 && <SubmitPage data={data} submit={handleSubmit}/>}
        </div>
    )
};
export default Complete;