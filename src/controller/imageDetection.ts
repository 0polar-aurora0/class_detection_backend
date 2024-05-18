/*
 * @Author: wanglinxiang
 * @Date: 2024-05-12 03:13:39
 * @LastEditTime: 2024-05-19 03:47:32
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\controller\imageDetection.ts
 */
import { Inject, Controller, Post, Context, Body } from '@midwayjs/core';
import { ImageService } from '../service/imageService/image';
import { DetectPythonService } from '../service/detectPythonService/fetchGet';
import { ImageDetectService } from '../service/imageDetectService/imageDetect';
import { uuid } from '../utils/uuid';
import { detectionServer } from '../config/static';
import { get } from '../utils';
import { StudentInfoService } from '../service/studentInfoService/studentInfo';
// import { DetectionService } from '../service/detectionService/detection';
// import { ImageService } from '../service/imageService/image';

@Controller('/detectionRequest')
export class DetectionController {
  @Inject()
  ctx: Context;

  @Inject()
  detectPythonService: DetectPythonService;

  @Inject()
  imageService: ImageService;

  @Inject()
  imageDetectService: ImageDetectService;

  @Inject()
  studentInfoService: StudentInfoService;

  @Post('/detectionPost')
  async detectionPost(@Body() body): Promise<any> {
    let { data } = body;
    console.log({ body });

    let imageName = uuid(10);
    let resultInfo = await this.imageService
      .saveImage(data, imageName)
      .then(imagePathName => {
        const requestURL = `${detectionServer}?path=${imagePathName}`;
        let res = get(requestURL);
        return res;
      });
    console.log({ resultInfo });
    if (resultInfo) {
      //获取处理后的数据
      let result = this.detectPythonService.dataHandle(resultInfo, imageName);
      for (let index = 0; index < resultInfo.totalTargetNum; index++) {
        //创建新的学生信息,不适用mockid
        let student_id = uuid(10);
        let studentInfo = {
          studentId: student_id,
          id: uuid(10),
          avator: null,
          detection_face_feature: null,
        };
        //存储学生信息
        this.studentInfoService.InsertStudentInfo(studentInfo);
        //将图片和数据存储进数据库
        this.imageDetectService.saveImageDetectResult(resultInfo, student_id);
      }
      return result;
    }

    return null;
  }

  @Post('/detectionHistoryPost')
  async detectionHistoryPost(@Body() body): Promise<any> {
    console.log({ body });
    let { current, pageSize, sorter, filter, ...others } = body;
    const allHistoryList = await this.imageDetectService.getImageDetectInfo({
      ...others,
    });
    return {
      success: true,
      resCode: 10000,
      message: 'OK',
      data: allHistoryList,
    };
  }

  @Post('/detectionHistoryDelete')
  async detectionHistoryDelete(@Body() body): Promise<any> {
    let { record_id } = body;
    console.log({ body });
    await this.imageDetectService.imageDetectInfo(record_id);
    return {
      success: true,
      resCode: 10000,
      resMes: '删除成功',
    };
  }
}
