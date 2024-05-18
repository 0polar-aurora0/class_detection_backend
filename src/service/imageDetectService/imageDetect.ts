/*
 * @Author: fuzhenghao
 * @Date: 2024-05-18 14:31:24
 * @LastEditTime: 2024-05-19 02:47:34
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\service\imageDetectService\imageDetect.ts
 */
import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { ImageDetectionResult } from '../../entity/imageDetectionResult';
import { Repository } from 'typeorm';
import { TDetectData } from '../../interface';
import { uuid } from '../../utils/uuid';

@Provide()
export class ImageDetectService {
  @InjectEntityModel(ImageDetectionResult)
  ImageDetectionResultModel: Repository<ImageDetectionResult>;

  /**
   * @description: 多对多关系,存储图片处理结果
   * @return
   */
  async saveImageDetectResult(
    imageDetectResult: TDetectData,
    fixed_student_id?: string
  ) {
    console.log({ ccc: imageDetectResult.imageName });

    let { detectTargetList } = imageDetectResult;
    for (let index = 0; index < detectTargetList.length; index++) {
      let imageDetectInfo = new ImageDetectionResult();
      //配置学生id
      if (fixed_student_id) {
        imageDetectInfo.student_id = fixed_student_id;
      } else {
        imageDetectInfo.student_id = uuid(10);
      }
      imageDetectInfo.image_id = imageDetectResult.imageName;
      //默认唯一识别id
      imageDetectInfo.record_id = uuid(10);
      //默认随机id
      imageDetectInfo.video_id = uuid(10);
      //默认随机id
      imageDetectInfo.result_file_id = uuid(10);
      //存入类型汉字
      // imageDetectInfo.detect_result_type = detectTargetList[index].type;
      //存入类型number
      imageDetectInfo.detect_result_type = detectTargetList[index].type_value;
      //此处不使用save避免student_id替代检测
      await this.ImageDetectionResultModel.insert(imageDetectInfo);
      // console.log(
      //   `${imageDetectResult.imageName}中${imageDetectInfo.student_id}已经存储成功`
      // );
    }
  }

  async getImageDetectInfo(filterInfo: any) {
    console.log({ filterInfo });
    let allImageDetectInfo;
    if (filterInfo) {
      allImageDetectInfo = await this.ImageDetectionResultModel.findBy(
        filterInfo
      ); //  v0.3.x
    } else {
      allImageDetectInfo = await this.ImageDetectionResultModel.find(); //  v0.3.x
    }
    // console.log('All ImageDetectInfo from the db: ', allImageDetectInfo);
    return allImageDetectInfo || [];
  }

  async imageDetectInfo(record_id: string) {
    await this.ImageDetectionResultModel.delete({ record_id }); //  v0.3.x
    console.log('Delete ImageDetectInfo from the db: ', { record_id });
  }
}
