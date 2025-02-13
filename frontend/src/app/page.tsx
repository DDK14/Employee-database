"use client";
import {  useRouter } from "next/navigation";
import { Button } from "antd";
import '@ant-design/v5-patch-for-react-19';

export default function Home(){
  const router=useRouter();
  // const pathName=usePathname();
  // const searchQuery=useSearchParams()
  // const [form] =Form.useForm();
  const starting=()=>{
    // form.validateFields()
    //     .then((values)=>{
    //         router.push(`/form?${new URLSearchParams(values).toString()}`);
    //     })
    // console.log("hello")
    console.log("Navigating to /form/form1");
    // asdasad
    // const url=`${pathName}`
    // console
    router.push('/form/form1')
  };
  return(
    <div style={{ textAlign: "center", padding: "20px"}}>
      <h1>Welcome</h1>
      <p>Click below to start filling the form</p>
      <Button type="primary"onClick={starting}>
        Start Form
      </Button>
    </div>
  );
};
