/*
 * @Author: wanglinxiang
 * @Date: 2024-04-30 23:20:19
 * @LastEditTime: 2024-05-19 18:15:44
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\controller\studentInfo.ts
 */
import { Inject, Controller, Post, Context, Body } from '@midwayjs/core';

import { IGetStudentInfoResponse } from '../interface';
import { StudentInfoService } from '../service/studentInfoService/studentInfo';

@Controller('/studentInfoRequest')
export class StudentInfoController {
  @Inject()
  ctx: Context;

  @Inject()
  studentInfoService: StudentInfoService;

  @Post('/studentInfoPost')
  async postStudentInfo(@Body() body): Promise<IGetStudentInfoResponse> {
    console.log({ body });

    let studentInfoList;
    let { current, pageSize, sorter, filter, ...others } = body;

    studentInfoList = await this.studentInfoService.getStudentInfoAll({
      ...others,
    });

    return {
      success: true,
      resCode: 10000,
      message: '查询成功',
      data: studentInfoList,
    };
  }

  @Post('/studentInfoUpdate')
  async updateStudentInfo(@Body() body): Promise<any> {
    console.log({ body });
    await this.studentInfoService.UpdateStudentInfo(body);
    return { success: true, resCode: 10000, message: '修改成功' };
  }

  @Post('/studentInfoAdd')
  async addStudentInfo(@Body() body): Promise<any> {
    console.log({ body });
    await this.studentInfoService.InsertStudentInfo(body);
    return { success: true, resCode: 10000, message: '新增成功' };
  }

  @Post('/studentInfoDelete')
  async deleteStudentInfo(@Body() body): Promise<any> {
    console.log({ body });
    await this.studentInfoService.DeleteStudentInfo(body);
    return { success: true, resCode: 10000, message: '删除成功' };
  }
}
