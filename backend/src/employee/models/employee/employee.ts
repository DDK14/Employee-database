import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table
export class Employee extends Model<Employee>{
  @PrimaryKey
  @AutoIncrement  
  @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    id!:number;
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    name!:string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      proposedRole!: string;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      location!: string;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      dateOfJoining!: string;
      
      @Column({
        type: DataType.STRING,
        allowNull: false,
        
      })
      employeeCode!: string;
      
      @Column({
        type: DataType.STRING,
        allowNull: false,
        
      })
      personalEmail!: string;
      
      @Column({
        type: DataType.STRING,
        allowNull: false,
        
      })
      officialEmail!: string;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      contactNumber!: string;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      emergencyContactNumber!: string;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      businessUnit!: string;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      department!: string;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      reportingManager!: string;
    
}
