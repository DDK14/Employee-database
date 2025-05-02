import { Button, message, Upload, UploadProps } from "antd";
import UploadedOutlined from "@ant-design/icons"
// import axios from "axios";

//to upload files
const FileUpload=({employeeId}:{employeeId:number}) =>{
    const props:UploadProps={
        name:'file',
        action:`http://localhost:3000/upload/${employeeId}`,
        onChange(info){
            if(info.file.status==='done'){
                message.success(`${info.file.name} file uploaded successfully`);
            }
            else if (info.file.status ==="error"){
                message.error(`${info.file.name} file upload failed`);
            }
        },
        showUploadList:true,
        withCredentials:false,
    }
    return(
        <div style={{marginTop:"20px"}}>
            <Upload{...props}>
                <Button icon={<UploadedOutlined />}>Click to upload</Button>
            </Upload>
        </div>
    )
}
export default FileUpload;
