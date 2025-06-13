/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, message, Modal, Upload, UploadProps } from "antd";
import UploadedOutlined from "@ant-design/icons"
// import axios from "axios";

interface Props{
    employeeId:number;
    onClose: ()=>void;
    onSuccess: ()=>void;
}

const UploadFile = ({employeeId,onClose,onSuccess}:Props)=>{
    const uploadProps={
        name:"file",
        multiple:true,
        action:`http://localhost:3000/files/upload/${employeeId}`,
        onChange(info:any){
            if(info.file.status==='done'){
                message.success(`${info.file.name} file uploaded successfully`);
            }
            else if (info.file.status ==="error"){
                message.error(`${info.file.name} file upload failed`);
            }
        },
    }
    return(
        <Modal
            open
            title="Upload Files"
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>Cancel</Button>,
                <Button key="done" type="primary" onClick={()=>{
                    onClose();
                    if(onSuccess) onSuccess();
                }}>Done</Button>
            ]}>
                <Upload.Dragger {...uploadProps}>
                    <p>Click or drag file to this area to upload</p>
                </Upload.Dragger>
            </Modal>
    )
}

export default UploadFile;

















// //to upload files
// const FileUpload=({employeeId}:{employeeId:number}) =>{
//     const props:UploadProps={
//         name:'file',
//         action:`http://localhost:3000/upload/${employeeId}`,
//         onChange(info){
//             if(info.file.status==='done'){
//                 message.success(`${info.file.name} file uploaded successfully`);
//             }
//             else if (info.file.status ==="error"){
//                 message.error(`${info.file.name} file upload failed`);
//             }
//         },
//         showUploadList:true,
//         withCredentials:false,
//     }
//     return(
//         <div style={{marginTop:"20px"}}>
//             <Upload{...props}>
//                 <Button icon={<UploadedOutlined />}>Click to upload</Button>
//             </Upload>
//         </div>
//     )
// }
// export default FileUpload;
