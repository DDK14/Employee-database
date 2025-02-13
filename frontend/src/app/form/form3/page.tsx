"use client";
import { useRouter, useSearchParams } from "next/navigation"
import {Form,Input,Button} from "antd"
import { useEffect } from "react";
import '@ant-design/v5-patch-for-react-19';

const Form3=()=>{
    const router=useRouter();
    // const queryData=router.query;
    const searchParams=useSearchParams();
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
            router.push(`/form/final?${new URLSearchParams({...existing,...values}).toString()}`);
        })
        // router.push({
        //     pathname:"/form/final",
        //     query:{...queryData,...form.getFieldsValue(true)},
        // });
    };
    // const customFormat = value => `custom format: ${value.format("YYYY-MM-DD")}`;   
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

            <Button type="dashed" onClick={()=> router.back()}>Back</Button>
            <Button type="primary" onClick={nextPage}>Next</Button>
        </Form>
    </div>
    )
}
export default Form3;