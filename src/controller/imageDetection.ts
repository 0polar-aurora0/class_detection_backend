/*
 * @Author: wanglinxiang
 * @Date: 2024-05-12 03:13:39
 * @LastEditTime: 2024-05-15 16:56:06
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\controller\imageDetection.ts
 */
import { Inject, Controller, Post, Context } from '@midwayjs/core';

import { DetectionService } from '../service/detectionService/detection';
// import { ImageService } from '../service/imageService/image';

@Controller('/detectionRequest')
export class DetectionController {
  @Inject()
  ctx: Context;

  @Inject()
  detectionService: DetectionService;

  // @Inject()
  // imageService: ImageService;

  @Post('/detectionPost')
  async detectionPost(): Promise<any> {
    // stop node detection, use python server detection
    // this.detectionService.detect();
    // this.imageService.saveImage;
    console.log(this.ctx);

    return { result: true };
  }
}
