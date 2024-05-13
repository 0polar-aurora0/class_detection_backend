/*
 * @Author: fuzhenghao
 * @Date: 2024-05-12 03:14:10
 * @LastEditTime: 2024-05-13 11:49:22
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\service\loginService\login.ts
 */
import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { UserInfo } from '../../entity/userInfo';
import { Repository } from 'typeorm';

@Provide()
export class LoginService {
  @InjectEntityModel(UserInfo)
  UserModel: Repository<UserInfo>;

  async getLoginInfoByUser(username: string) {
    console.log({ username_query: username });
    let userInfo = await this.UserModel.findOne({
      where: {
        username,
      },
    });
    return userInfo;
  }
}
