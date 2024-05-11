import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Login } from '../../entity/login';
import { Repository } from 'typeorm';

@Provide()
export class LoginService {
  @InjectEntityModel(Login)
  loginModel: Repository<Login>;

  async getLoginInfoByUser(username: string) {
    let userInfo = await this.loginModel.findOne({
      where: {
        username,
      },
    });
    return userInfo;
  }
}
