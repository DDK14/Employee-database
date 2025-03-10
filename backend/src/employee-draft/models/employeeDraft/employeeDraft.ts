import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table
export class EmployeeDraft extends Model<EmployeeDraft>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    id!:number;
    @Column({
        type:DataType.STRING,
        })
    name!:string;
    @Column({
        type: DataType.STRING,
           })
      proposedRole!: string;
    
      @Column({
        type: DataType.STRING,
           })
      location!: string;
    
      @Column({
        type: DataType.STRING,
           })
      dateOfJoining!: string;
     
      
      @Column({
        type: DataType.STRING,
             
      })
      employeeCode!: string;
      
      @Column({
        type: DataType.STRING,
             
      })
      personalEmail!: string;

      @Column({
        type: DataType.STRING,
             
      })
      officialEmail!: string;
    
      @Column({
        type: DataType.STRING,
           })
      contactNumber!: string;
    
      @Column({
        type: DataType.STRING,
           })
      emergencyContactNumber!: string;
    
      @Column({
        type: DataType.STRING,
           })
      businessUnit!: string;
    
      @Column({
        type: DataType.STRING,
           })
      department!: string;
    
      @Column({
        type: DataType.STRING,
           })
      reportingManager!: string;
    
}
