"use client";
import { useSearchParams } from "next/navigation"
import {Form,Input,Button,DatePicker, message} from "antd"
import { useEffect, useState } from "react";
import { finalSubmit, saveDraft } from "../../services/api";
import '@ant-design/v5-patch-for-react-19';

const Final=()=>{
    // const router=useRouter();
    const [form]=Form.useForm();
    const [loading,setLoading]=useState(false);
    const searchparam=useSearchParams();    
    // const {name,proposedRole,location,dateOfJoining,employeeCode,personalEmail,officialEmail,contactNumber,emergencyContactNumberbusinessUnit, department, reportingManager}=router.query;
    // useEffect(()=>{
    //     form.setFieldValue({name,proposedRole,location,dateOfJoining,employeeCode,personalEmail,officialEmail,contactNumber,emergencyContactNumberbusinessUnit, department, reportingManager},[router.query,form]);
        
    // })


    useEffect(()=>{
        const params=Object.fromEntries(searchparam.entries())
        form.setFieldsValue(params);
    },[searchparam,form])


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const submit=async (values:any)=>{
        setLoading(true);
            try{
                const draftResponse=await saveDraft(values);
                const draftId=draftResponse?.id;
                if(!draftId){
                    throw new Error("Draft ID not found");
                }
                await finalSubmit(draftId);
                message.success("form submitted successfully");
            }
            catch(error){
                console.error("Error",error);
                message.error("Submission failed.");
            }
            finally{
                setLoading(false);
            }
    };
    // const customFormat = value => `custom format: ${value.format("YYYY-MM-DD")}`;   
    return(
        <div>
        <h2>Final Submission</h2>
        <Form form={form} layout="vertical" onFinish={submit}>
        <Form.Item label="Name" name={"name"} rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input disabled/>
            </Form.Item>

            <Form.Item label="Proposed Role" name={"proposedRole"} rules={[{ required: true, message: 'Please input your role!' }]}>
                <Input disabled/>
            </Form.Item>

            <Form.Item label=" Location" name={"location"} rules={[{ required: true, message: 'Please input your Location!' }]}>
                <Input disabled/>
            </Form.Item>

            <Form.Item label="Date of Joining" name={"dateOfJoining"} rules={[{ required: true, message: 'Required' }]}>
                <DatePicker/>
            </Form.Item>

            <Form.Item label="Employee Code" name="employeeCode" rules={[{ required: true, message: 'Please input employee code!' }]}>
                <Input disabled />
            </Form.Item>

            <Form.Item label="Personal Email" name="personalEmail" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
                <Input disabled/>
            </Form.Item>

            <Form.Item label="Official Email" name="officialEmail" rules={[{ required: true, type: 'email', message: 'Please input a valid official email!' }]}>
                <Input disabled/>
            </Form.Item>

            <Form.Item label="Contact Number" name="contactNumber" rules={[{ required: true, message: 'Please input contact number!' }]}>
                <Input disabled/>
            </Form.Item>

            <Form.Item label="Emergency Contact Number" name="emergencyContactNumber" rules={[{ required: true, message: 'Please input emergency contact number!' }]}>
                <Input disabled/>
            </Form.Item>

            <Form.Item label="Business Unit" name="businessUnit" rules={[{ required: true, message: 'Please input business unit!' }]}>
                <Input disabled/>
            </Form.Item>

            <Form.Item label="Department" name="department" rules={[{ required: true, message: 'Please input department!' }]}>
                <Input disabled/>
            </Form.Item>

            <Form.Item label="Reporting Manager" name="reportingManager" rules={[{ required: true, message: 'Please input reporting manager!' }]}>
                <Input disabled/>
            </Form.Item>
            
            <Button type="primary" htmlType="submit" loading={loading}>
                Submit
            </Button>
        </Form>
    </div>
    )
}
export default Final;