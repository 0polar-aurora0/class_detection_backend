/*
 * @Author: wanglinxiang
 * @Date: 2024-05-06 14:17:33
 * @LastEditTime: 2024-05-19 18:14:40
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

  async getStudentInfoAll(filterInfo) {
    let allStudentInfo;
    console.log({ filterInfo });

    if (filterInfo) {
      allStudentInfo = await this.studentInfoModel.findBy(filterInfo); //  v0.3.x
    } else {
      allStudentInfo = await this.studentInfoModel.find(); //  v0.3.x
    }
    console.log('All StudentInfo from the db: ', allStudentInfo);
    return allStudentInfo;
  }

  async InsertStudentInfo(studentInfo) {
    console.log({ studentInfo });
    await this.studentInfoModel.insert(studentInfo); //  v0.3.x
  }

  async UpdateStudentInfo(studentInfo) {
    console.log({ studentInfo });
    await this.studentInfoModel.save(studentInfo); //  v0.3.x
  }

  async ExistsStudentInfo(studentInfo) {
    return await this.studentInfoModel.existsBy(studentInfo); //  v0.3.x
  }

  async DeleteStudentInfo(studentInfo) {
    console.log({ studentInfo });
    return await this.studentInfoModel.delete({ id: studentInfo.id }); //  v0.3.x
  }
}
