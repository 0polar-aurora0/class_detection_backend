/*
 * @Author: wanglinxiang
 * @Date: 2024-05-06 14:17:33
 * @LastEditTime: 2024-05-19 03:14:51
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\service\studentInfoService\studentInfo.ts
 */
import { Provide } from '@midwayjs/core';
import { studentInfo_responseData } from './mock';
import { StudentInfo } from '../../entity/studentInfo';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';

@Provide()
export class StudentInfoService {
  async getStudentInfo(options: any) {
    return studentInfo_responseData;
  }

  @InjectEntityModel(StudentInfo)
  studentInfoModel: Repository<StudentInfo>;

  async getStudentInfoAll() {
    let allStudentInfo = await this.studentInfoModel.find(); //  v0.3.x
    console.log('All StudentInfo from the db: ', allStudentInfo);
    return allStudentInfo || [];
  }

  async InsertStudentInfo(studentInfo) {
    console.log({studentInfo});
    await this.studentInfoModel.insert(studentInfo); //  v0.3.x
  }

  async ExistsStudentInfo(studentInfo) {
    return await this.studentInfoModel.exists(studentInfo); //  v0.3.x
  }
}
