/*
 * @Author: fuzhenghao
 * @Date: 2024-05-04 22:45:30
 * @LastEditTime: 2024-05-12 03:12:57
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\entity\login.ts
 */
// entity/login.ts
import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn } from 'typeorm';

@EntityModel()
export class Login {

  @PrimaryColumn()
  username: string;
  
  @Column()
  password: string;
}
