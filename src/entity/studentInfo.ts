/*
 * @Author: fuzhenghao
 * @Date: 2024-05-09 15:55:27
 * @LastEditTime: 2024-05-09 17:48:53
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\entity\studentInfo.ts
 */
// entity/studentInfo.ts
import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn } from 'typeorm';

@EntityModel()
export class StudentInfo {
  @PrimaryColumn()
  id: string;

  @Column()
  student_id: string;

  @Column()
  avator: String;

  @Column()
  detection_face_feature: string;
}