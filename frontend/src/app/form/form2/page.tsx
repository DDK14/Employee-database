"use client";
import { useRouter, useSearchParams } from "next/navigation"
import {Form,Input,Button} from "antd"
import { useEffect } from "react";
import '@ant-design/v5-patch-for-react-19';

const Form2=()=>{
    const router=useRouter();
    const searchParams=useSearchParams();
    // const queryData=router.query;
    const [form]=Form.useForm();
    useEffect(()=>{
            const params=Object.fromEntries(searchParams.entries())
            form.setFieldsValue(params);
        },[searchParams,form])  
    const nextPage=()=>{
        form.validateFields()
        .then((values)=>{
            const existing=Object.fromEntries(searchParams.entries())
            // console.log(existing,"exisitng")
            router.push(`/form/form3?${new URLSearchParams({...existing,...values}).toString()}`);
        })
    };
    // const customFormat = value => `custom format: ${value.format("YYYY-MM-DD")}`;   
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
            
            <Button type="dashed" onClick={()=> router.back()}>Back</Button>
            <Button type="primary" onClick={nextPage}>Next</Button>
        </Form>
    </div>
    )
}
export default Form2;