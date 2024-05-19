/*
 * @Author: wanglinxiang
 * @Date: 2024-05-12 03:13:39
 * @LastEditTime: 2024-05-19 11:08:09
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\controller\imageDetection.ts
 */
import {
  Inject,
  Controller,
  Post,
  Context,
  Body,
  Files,
  Fields,
} from '@midwayjs/core';
import { ImageService } from '../service/imageService/image';
import { DetectPythonService } from '../service/detectPythonService/fetchGet';
import { ImageDetectService } from '../service/imageDetectService/imageDetect';
import { StudentInfoService } from '../service/studentInfoService/studentInfo';
import { get } from '../utils';
import { detectionServer } from '../config/static';
import { uuid } from '../utils/uuid';
// import { detectionServer } from '../config/static';
// import { get } from '../utils';
// import { convertImageToBase64Buffer } from '../utils/data';
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
  async detectionPost(@Files() files, @Fields() fields): Promise<any> {
    // let { data } = body;
    console.log({ files, fields });
    let resultImageLists = [];
    let localImageInfo;
    for (let index = 0; index < resultImageLists.length; index++) {
      const imagePathName = resultImageLists[index].data;

      // let bufferImageData = convertImageToBase64Buffer(resultImageLists[index].data)
      let requestURL = `${detectionServer}?path=${imagePathName}`;
      let resultInfo = await get(requestURL);
      if (resultInfo) {
        //获取处理后的数据
        let result = await this.detectPythonService.dataHandle(
          resultInfo,
          imagePathName
        );

        let student_id = uuid(10);

        //判断学生信息是否存在
        this.studentInfoService
          .ExistsStudentInfo({
            student_id,
          })
          .then(async exists => {
            console.log({ exists });
            //不存在则新增一位学生
            if (!exists) {
              //配置学生信息
              let studentInfo = {
                id: uuid(10),
                student_id,
                avator: uuid(10),
                detection_face_feature: uuid(10),
              };
              await this.studentInfoService.InsertStudentInfo(studentInfo);
            }
          });

        //将图片和数据存储进数据库并设置默认学生数据
        this.imageDetectService.saveImageDetectResult(result, student_id);
        localImageInfo = result;
      } else {
        localImageInfo = null;
      }
    }
    resultImageLists.push(localImageInfo);
    return { resCode: 10000, resMes: '处理完毕', resultImageLists };
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
