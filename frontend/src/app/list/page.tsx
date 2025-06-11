/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button, Table, Tag, Modal, Image, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getEmployees } from "../services/api";
import { ColumnsType } from "antd/es/table";
import UploadFile from "../components/FileUpload";

interface Employee {
  id: number;
  name: string;
  department: string;
  reportingManager: string;
  files?: string[];
}

const EmployeeList = () => {
  const [employee, setEmployee] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [uploadingEmpId, setUploadingEmpId] = useState<number | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewContent, setPreviewContent] = useState<{
    url: string;
    type: string;
    name: string;
  } | null>(null);

  const fetchEmployeeById = async () => {
    setLoading(true);
    try {
      const data = await getEmployees(true);
      console.log("Fetched employee data with files:", data);
      setEmployee(data);
    } catch (error) {
      message.error("Failed to fetch Employees");
      console.error("Error fetching employees", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeById();
  }, []);

  const handleUpload = (id: number) => {
    setUploadingEmpId(id);
  };

  const handleUploadSuccess = async () => {
    await fetchEmployeeById();
    setUploadingEmpId(null);
    message.success("Files uploaded successfully");
  };

  const handlePreview = (url: string, type: string, name: string) => {
    if (type === 'pdf' || type === 'other') {
      window.open(url, '_blank');
      return;
    }
    setPreviewContent({ url, type, name });
    setPreviewVisible(true);
  };

  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
      message.error('Failed to download file');
    }
  };

  const columns: ColumnsType<Employee> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Reporting Manager", dataIndex: "reportingManager", key: "reportingManager" },
    {
      title: "Files",
      key: "files",
      render: (_: any, record: Employee) => (
        <div className="flex flex-wrap gap-2">
          {record.files && record.files.length > 0 ? (
            record.files.map((file: string, index: number) => {
              const fileName = file.split("/").pop() || "";
              const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);
              const isPDF = /\.pdf$/i.test(fileName);
              const isVideo = /\.(mp4|webm|ogg)$/i.test(fileName);

              return (
                <Tag color="blue" key={index} className="flex items-center gap-1">
                  <div className="flex items-center gap-1">
                    <span 
                      className="text-xs cursor-pointer hover:text-blue-500" 
                      onClick={() => handlePreview(file, isImage ? 'image' : isPDF ? 'pdf' : isVideo ? 'video' : 'other', fileName)}
                    >
                      {fileName}
                    </span>
                    <Button 
                      type="link" 
                      size="small" 
                      onClick={() => handleDownload(file, fileName)}
                      className="p-0 ml-1"
                    >
                      ⬇️
                    </Button>
                  </div>
                </Tag>
              );
            })
          ) : (
            <span className="text-gray-500">No files uploaded</span>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any): React.ReactNode => {
        return (
          <div className="flex-gap-2">
            <Button type="primary" onClick={() => router.push(`/form?id=${record.id}`)}>
              Edit
            </Button>
            <Button onClick={() => handleUpload(record.id)}>Upload File</Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white shadow-md p-4 flex justify-between items-center mb-4 rounded-lg">
        <h2 className="text-xl font-bold text-black">Employee List</h2>
        <div className="flex gap-2">
          <Button type="default" onClick={() => router.push("/form")}>Back to Form</Button>
          <Button type="primary" onClick={() => router.push("/list/draft-list")}>Draft List</Button>
        </div>
      </div>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <Table columns={columns} dataSource={employee} loading={loading} rowKey={"id"} />
      </div>

      {uploadingEmpId !== null && (
        <UploadFile
          employeeId={uploadingEmpId}
          onClose={() => setUploadingEmpId(null)}
          onSuccess={handleUploadSuccess}
        />
      )}

      <Modal
        open={previewVisible}
        title={previewContent?.name}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width={previewContent?.type === 'pdf' ? '80%' : 600}
      >
        {previewContent?.type === 'image' && (
          <Image src={previewContent.url} alt={previewContent.name} style={{ maxHeight: '70vh', objectFit: 'contain' }} />
        )}
        {previewContent?.type === 'pdf' && (
          <iframe
            src={previewContent.url}
            style={{ width: '100%', height: '80vh' }}
            title="PDF Preview"
          ></iframe>
        )}
        {previewContent?.type === 'video' && (
          <video controls style={{ width: '100%' }}>
            <source src={previewContent.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {previewContent?.type === 'other' && (
          <p>Preview not available for this file type.</p>
        )}
      </Modal>
    </div>
  );
};

export default EmployeeList;
