/*
 * @Author: fuzhenghao
 * @Date: 2024-05-12 03:14:10
 * @LastEditTime: 2024-05-19 17:04:21
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\service\loginService\login.ts
 */
/*
 * @Author: wanglinxiang
 * @Date: 2024-05-12 03:14:10
 * @LastEditTime: 2024-05-13 11:49:22
 * @LastEditors: wanglinxiang
 * @Description:
 * @FilePath: \class_detection_backend\src\service\loginService\login.ts
 */
import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { UserInfo } from '../../entity/userInfo';
import { Repository } from 'typeorm';
import { TLoginRegisterForm } from './login.interface';

@Provide()
export class LoginService {
  @InjectEntityModel(UserInfo)
  UserModel: Repository<UserInfo>;

  async getLoginInfoByUser(username: string) {
    let userInfo = await this.UserModel.findOne({
      where: {
        username,
      },
    });
    return userInfo;
  }

  async loginRegister(loginRegisterForm: TLoginRegisterForm) {
    // let username_exists = this.getUsernameExits(lLoginRegisterForm);
    // if (!username_exists) {
    this.UserModel.insert(loginRegisterForm).then(data => {
      console.log({ data });
    });
    // }
  }

  async getUsernameExits(loginRegisterForm: TLoginRegisterForm) {
    return await this.UserModel.existsBy({
      username: loginRegisterForm.username,
    }).then(username_exists => {
      return username_exists;
    });
  }
}
