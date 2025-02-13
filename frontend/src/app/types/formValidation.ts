import {z} from "zod"
export const schema=z.object({
    name:z.string().min(2,"Name is required"),
    proposedRole:z.string().min(2,"Role is required"),
    location:z.string().min(2,"Location is required"),
    dateOfJoining: z.string().min(2, "Date of Joining is required"),
    employeeCode: z.string().min(2, "Employee Code is required"),
    personalEmail: z.string().email("Invalid email address"),
    officialEmail: z.string().email("Invalid email address"),
    contactNumber:z.number({
        required_error: "Contact Number is required",
        invalid_type_error: "Contact Number must be a number"
    }),
    emergencyContactNumber:z.number({
        required_error: "Emergency Contact Number is required",
        invalid_type_error: "Emergency Contact Number must be a number"
    }),
    businessUnit: z.string().min(2, "Business Unit is required"),
    department: z.string().min(2, "Department is required"),
    reportingManager: z.string().min(2, "Reporting Manager is required"),
})
