/*
 * @Author: fuzhenghao
 * @Date: 2024-05-18 14:33:27
 * @LastEditTime: 2024-05-19 02:07:20
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\entity\imageDetectionResult.ts
 */
import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn } from 'typeorm';

@EntityModel('imageDetectionResult')
export class ImageDetectionResult {
  @PrimaryColumn()
  record_id: string;

  @Column()
  student_id: string;

  @Column()
  video_id: String;

  @Column()
  image_id: string;

  @Column()
  result_file_id: string;

  @Column()
  detect_result_type: number;
}
