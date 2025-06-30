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
    router.push('/form')
  };
  return(
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome</h1>
      <p className="text-lg text-gray-600 mb-6">Click below to start filling the form</p>
      <Button type="primary"onClick={starting} className="px-6 py-2 text-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300"  >
        Start Form
      </Button>
      </div>
    </div>
  );
};
