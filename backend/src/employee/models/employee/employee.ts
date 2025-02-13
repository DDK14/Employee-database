import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

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
        type: DataType.DATE,
        allowNull: false,
      })
      dateOfJoining!: Date;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      })
      employeeCode!: string;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      })
      personalEmail!: string;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
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
