/*
 * @Author: fuzhenghao
 * @Date: 2024-04-30 23:20:19
 * @LastEditTime: 2024-05-06 17:41:41
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\controller\studentInfo.ts
 */
import { Inject, Controller, Post, Query, Context } from '@midwayjs/core';

import { IGetStudentInfoResponse } from '../interface';
import { StudentInfoService } from '../service/studentInfoService/studentInfo';
import { studentInfo_responseData } from '../service/studentInfoService/mock';

@Controller('/studentInfo')
export class StudentInfoController {
  @Inject()
  ctx: Context;

  @Inject()
  studentInfoService: StudentInfoService;

  @Post('/studentInfoPost')
  async postStudentInfo(
    @Query('id') id?: string
  ): Promise<IGetStudentInfoResponse> {
    const user = id
      ? await this.studentInfoService.getStudentInfo({ id })
      : studentInfo_responseData;
    return { success: true, resCode: 10000, message: 'OK', data: user };
  }
}
