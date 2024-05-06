/*
 * @Author: fuzhenghao
 * @Date: 2024-05-06 14:17:33
 * @LastEditTime: 2024-05-06 17:03:26
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\service\studentInfoService\studentInfo.ts
 */
import { Provide } from '@midwayjs/core';
import { IStudentInfoOptions } from '../../interface';
import { studentInfo_responseData } from './mock';

@Provide()
export class StudentInfoService {
  async getStudentInfo(options: IStudentInfoOptions) {
    return studentInfo_responseData;
  }
}
