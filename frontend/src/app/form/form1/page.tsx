"use client";
import { useRouter, useSearchParams } from "next/navigation"
import {Form,Input,Button, DatePicker} from "antd"
import { useEffect } from "react";
import '@ant-design/v5-patch-for-react-19';
//  console.log("form1");
const Form1=()=>{
    const router=useRouter();
    const searchParams=useSearchParams();
    const [form] =Form.useForm();
    useEffect(()=>{
        const params=Object.fromEntries(searchParams.entries())
        console.log(params)
        form.setFieldsValue(params);
    },[searchParams,form])  
    const nextPage=()=>{
        
        form.validateFields()
        .then((values)=>{
            router.push(`/form/form2?${new URLSearchParams(values).toString()}`);
        })
        // router.push({
        //     pathname:"/form/form2",
        //     query:form.getFieldsValue(true),
        // });
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
export default Form1;