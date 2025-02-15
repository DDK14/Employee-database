/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import { useRouter } from "next/navigation"
import {Form,Input,Button, DatePicker} from "antd"
import '@ant-design/v5-patch-for-react-19';
import { useState } from "react";
import { saveDraft } from "../services/api";
//  console.log("form1");
const Form1=({next,data,setData}:{next:any,data:any,setData:any})=>{
    const [form] =Form.useForm();
    const nextPage= async ()=>{
        
        const values = await form.validateFields();
            setData({...data, ...values});
            await saveDraft({...data,...values}); 
            next();
    };
return(
    <div>
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
                <DatePicker/>
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
            setData({...data, ...values});
            await saveDraft({...data,...values}); 
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
const Form3=({prev, submit ,data,setData}:{prev:any,submit:any ,data:any,setData:any})=>{
    const [form] =Form.useForm();
    const submitting= async ()=>{
        const values = await form.validateFields();
            setData({...data, ...values});
            await saveDraft({...data,...values});
            submit();
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
            <Button type="primary" onClick={submitting}>Next</Button>
        </Form>
    </div>
    )
}




const Complete=()=>{
    const [step,setStep]=useState(1);      //that is initialstate=1
    const [data,setData]=useState({});      //stores all values from the form
    const nextStep =() => setStep(step+1);
    const prevStep = () => setStep(step-1);
    const handleSubmit = () =>{
        console.log("Submission", data);
    }
    return(
        <div>
            {step===1 && <Form1 next={nextStep} data={data} setData={setData}/>}
            {step===2 && <Form2 next={nextStep} prev={prevStep} data={data} setData={setData}/>}
            {step===3 && <Form3 prev={prevStep} submit={handleSubmit} data={data} setData={setData}/>}
        </div>
    )
};
export default Complete;