/*
 * @Author: wanglinxiang
 * @Date: 2024-05-12 03:13:39
 * @LastEditTime: 2024-05-20 15:02:19
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
import { detectionServer, staticPosition } from '../config/static';
import { uuid } from '../utils/uuid';
import path = require('path');
import fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
// import { convertImageToBase64String } from '../utils/data';
// import { convertImageToBase64Buffer } from '../utils/data';
// const fs = require('fs');
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
    console.log({ ctx: this.ctx });
    console.log({ requestContext: this.ctx.requestContext });
    console.log({ files, fields });

    const imageHandle = async (imagePathName, filename) => {
      console.log({ imagePathName, filename });
      let requestURL = `${detectionServer}?path=${imagePathName}`;
      let localImageInfo;
      let resultInfo;
      let resultImageLists = []; //定义图片处理结果
      try {
        resultInfo = await get(requestURL);
      } catch (error) {
        resultInfo = null;
      }
      if (resultInfo) {
        //获取处理后的数据
        let result = await this.detectPythonService.dataHandle(
          resultInfo,
          imagePathName
        );
        let { detectTargetList } = result;
        //对每张图片中的人脸进行新增学生信息
        for (let index = 0; index < detectTargetList.length; index++) {
          let element = detectTargetList[index];
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
          //配置带有学生id的数据
          result.detectTargetList[index] = { ...element, student_id };
          //将图片和数据存储进数据库并设置默认学生数据
          this.imageDetectService.saveImageDetectResult(result, student_id);
          localImageInfo = result;
        }
      } else {
        localImageInfo = null;
      }
      resultImageLists.push({
        imageInfo: localImageInfo,
        imageSrc: imagePathName,
        imageName: filename,
      });
      return resultImageLists;
    };

    let resultImageLists = []; //定义图片处理结果
    let video_uuid;
    //当前设置多个文件上传处理效果
    for (let index = 0; index < files.length; index++) {
      let localFile = files[index]; //获取当前文件绝对路径
      let imagePathName = localFile.data.replace(/\\/g, '/'); //规范文件绝对路径
      let filename = path.basename(imagePathName); //获取文件名
      let file_ext = path.extname(imagePathName); //获取文件扩展名

      if (file_ext == '.jpg' || file_ext == '.png' || file_ext == '.img') {
        resultImageLists = await imageHandle(imagePathName, filename);
      } else if (file_ext == '.mp4') {
        //视频文件拆解
        // 使用 FFmpeg 拆分视频成为帧
        video_uuid = uuid(10);
        let videoDividStorageFileDir = `${staticPosition}/${video_uuid}`;
        let outputFolderPath = `${videoDividStorageFileDir}/frame-%d.png`;
        if (!fs.existsSync(outputFolderPath)) {
          fs.mkdirSync(outputFolderPath, { recursive: true });
        }
        await ffmpeg(imagePathName)
          .output(outputFolderPath) // 输出帧文件名格式
          .on('end', () => {
            console.log('拆分完成');
          })
          .on('error', err => {
            console.error('拆分出错:', err);
          })
          .run();

        // 同步读取文件夹中的内容
        try {
          let files = await fs.readdirSync(videoDividStorageFileDir);
          console.log('文件夹中的文件名称:', files);
          for (let index = 0; index < files.length; index++) {
            let local_filename = files[index];
            let local_imagePathName = `${videoDividStorageFileDir}/${local_filename}`;
            resultImageLists = await imageHandle(
              local_imagePathName,
              local_filename
            );
          }
        } catch (err) {
          console.error('读取文件夹内容出错:', err);
        }
      }
    }
    return { resCode: 10000, resMes: '处理完毕', video_uuid, resultImageLists };
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
