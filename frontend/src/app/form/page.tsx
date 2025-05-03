/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {Form,Input,Button, DatePicker, message, DatePickerProps, Card, Descriptions, Modal, Upload} from "antd"
import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState } from "react";
import { dbpush, deleteDraft, getDraftsById, getEmployeeById, saveDraft } from "../services/api";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import FileUpload from "../components/FileUpload";

const formCardStyle = { maxWidth: "500px", margin: "0 auto", padding: "20px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" };
const buttonStyle = { margin: "10px" };

const Form1=({next, form ,data,setData,draft,saveExit}:{next:any,form:any,data:any,setData:any,draft:any, saveExit:any})=>{
    // const [form] =Form.useForm();
    const nextPage= async ()=>{
        
        const values = await form.validateFields();
            setData({...data,...values,
                dateOfJoining: values.dateOfJoining ? dayjs(values.dateOfJoining).format("YYYY-MM-DD") : "",
            }); 
            next();
    };
   
return(
    <Card title="Enter the employee details" style={formCardStyle}>
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
            <div style={{textAlign:"right"}}>
                <Button type="primary" onClick={nextPage} style={buttonStyle} >Next</Button>
                <Button variant="outlined" color="danger" onClick={draft} style={buttonStyle}>Save & Continue</Button>
               
            </div>
            <div style={{textAlign:"center", marginTop:5}}>
            <Button type="primary" danger onClick={saveExit} style={buttonStyle}>Exit</Button>
            </div>
        </Form>
    </Card>
)
};
const Form2=({next,prev,form, data,setData,draft,saveExit}:{next:any,prev:any,form:any,data:any,setData:any,draft:any,saveExit:any})=>{

    const nextPage= async ()=>{
        
        const values = await form.validateFields();
            setData({...data,...values}); 
            next();
    };
    return(
        <Card title="Enter contact information" style={formCardStyle}>
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
            
            <div style={{textAlign:"right"}}>
            <Button type="dashed" onClick={prev} style={buttonStyle}>Back</Button>
            <Button type="primary" onClick={nextPage} style={buttonStyle}>Next</Button>
            <Button variant="outlined" color="danger" onClick={draft} style={buttonStyle}>Save & Continue</Button>
            
            </div>
            <div style={{textAlign:"center", marginTop:5}}>
            <Button type="primary" danger onClick={saveExit} style={buttonStyle}>Exit</Button>
            </div>
           
        </Form>
        </Card>
    )
}

//form3
const Form3=({prev, next , form ,data,setData, draft, saveExit}:{prev:any,next:any ,form:any,data:any    ,setData:any,draft:any,saveExit:any})=>{
    const nextPage= async ()=>{
        const values = await form.validateFields();
            setData({...data,...values}); 
            next();
    };
    return(
        <Card title="Job details" style={formCardStyle}>
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

                {/* <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Upload Supporting Documents</h3>
                    <FileUpload employeeId={data.employeeId} />
                </div> */}
            <div style={{textAlign:"right"}}>
            <Button type="dashed" onClick={prev} style={buttonStyle}>Back</Button>
            <Button type="primary" onClick={nextPage} style={buttonStyle}>Next</Button>
            <Button variant="outlined" color="danger" onClick={draft} style={buttonStyle}>Save & Continue</Button>
            </div>
            <div style={{textAlign:"center", marginTop:5}}>
            <Button type="primary" danger onClick={saveExit} style={buttonStyle}>Exit</Button>
            </div>
        </Form>
        </Card>
    )
}

const SubmitPage=({data,submit,}:{data:any; submit:any})=>{
    return(
        <Card title="Final Review" className="bg-white text-black shadow-lg p-5">
            <Descriptions bordered column={2} layout="vertical">
                <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
                <Descriptions.Item label="Proposed Role">{data.proposedRole}</Descriptions.Item>
                <Descriptions.Item label="Location">{data.location}</Descriptions.Item>
                <Descriptions.Item label="Date of Joining">{data.dateOfJoining}</Descriptions.Item>
                <Descriptions.Item label="Employee Code">{data.employeeCode}</Descriptions.Item>
                <Descriptions.Item label="Personal Email">{data.personalEmail}</Descriptions.Item>
                <Descriptions.Item label="Official Email">{data.officialEmail}</Descriptions.Item>
                <Descriptions.Item label="Contact Number">{data.contactNumber}</Descriptions.Item>
                <Descriptions.Item label="Emergency Contact">{data.emergencyContactNumber}</Descriptions.Item>
                <Descriptions.Item label="Business Unit">{data.businessUnit}</Descriptions.Item>
                <Descriptions.Item label="Department">{data.department}</Descriptions.Item>
                <Descriptions.Item label="Reporting Manager">{data.reportingManager}</Descriptions.Item>
            </Descriptions>

            <div className="flex justify-end mt-4">
                <Button type="primary" onClick={submit}>Submit</Button>
            </div>
        </Card>
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
    const draftFormId=searchParams.get("draftId");
    useEffect(()=>{
        console.log("Query Params -> id:", employeeId, "draftId:", draftFormId);

            const fetchEmployee= async()=>{
                console.log("getempl")
                try{
                    if(employeeId){
                        console.log("gfaisnoda")
                    const employeeData=await getEmployeeById(Number(employeeId));
                    setData(employeeData);
                    console.log("try to fill form",employeeData)
                    form.setFieldsValue({
                        ...employeeData,
                        dateOfJoining: employeeData.dateOfJoining ? dayjs(employeeData.dateOfJoining) : null,
                    })}
                    else if(draftFormId){
                        const draftData=await getDraftsById(Number(draftFormId));
                        setDraftId(Number(draftFormId))
                        setData(draftData)
                        form.setFieldsValue({
                            ...draftData,
                            dateOfJoining: draftData.dateOfJoining ? dayjs(draftData.dateOfJoining) : null,
                        })
                    }
                }catch(error){
                    console.error("Failed to fetch employee details",error);
                }
            
            
        }
        fetchEmployee();
        
    },[employeeId,draftFormId,form]);


// exit prompt
    const handleExitPrompt= async ()=>{
        Modal.confirm({
            title:'Do you want to save before leaving?',
            style:{top:20},
            content:'You have unsaved data. Would you like to save it as draft before leaving?',
            okText:'Yes, Save draft',
            cancelText:'No, Exit without Saving',
            onOk: async()=>{
                await handleSaveAndExit();
            },
            onCancel:()=>{
                router.push('/list');
            }
        })
    }


    //to save draft and continue to next page
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



    //to save & exit
    const handleSaveAndExit= async () =>{
        try{
            const values=await form.validateFields();
            const updatedValues={
                ...data,
                ...values,
            }
            const res=await saveDraft(updatedValues,draftId|| (employeeId? Number(employeeId):undefined));
            if(res.id && !draftId){
                setDraftId(res.id);
            }
            message.success("Draft saved successfully. Redirecting...")
            router.push("/list");
        }
        catch(error){
            message.error("Failed to save & exit")
            console.error("Error in save & exit", error);
        }
    }




    // to submit the final data to the main db and delete that draft
    const handleSubmit = async () =>{
        console.log("Submission", data);
        setLoading(true);
        try{
            const finalData={
                ...data,
                id:employeeId? Number(employeeId) :undefined
            }
            await dbpush(finalData);

            // if(files && files.length>0){
            //     const formData=new FormData();
            //     files.for
            // }

            message.success(employeeId?"Employee details updated successfully" : "Form submitted");
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
    }
    return(
        <div className="bg-gray-100 min-h-screen p-6">  
            {step===1 && <Form1 next={nextStep} form={form} data={data} setData={setData} draft={handleSaveDraft} saveExit={handleExitPrompt}/>}
            {step===2 && <Form2 next={nextStep} form={form} prev={prevStep} data={data} setData={setData} draft={handleSaveDraft} saveExit={handleExitPrompt}/>}
            {step===3 && <Form3 prev={prevStep} form={form} next={nextStep} data={data} setData={setData} draft={handleSaveDraft} saveExit={handleExitPrompt}/>}
            {step===4 && <SubmitPage data={data} submit={handleSubmit}/>}
        </div>
    )
};
export default Complete;