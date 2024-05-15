/*
 * @Author: wanglinxiang
 * @Date: 2024-05-12 03:13:39
 * @LastEditTime: 2024-05-13 12:01:51
 * @LastEditors: wanglinxiang
 * @Description:
 * @FilePath: \class_detection_backend\src\controller\login.ts
 */
import {
  Inject,
  Controller,
  Post,
  // Query,
  Context,
  Body,
  // ContentType,
  // HttpCode,
} from '@midwayjs/core';

// import { IGetLoginResponse } from '../interface';
import { LoginService } from '../service/loginService/login';

@Controller('/loginRequest')
export class LoginController {
  @Inject()
  ctx: Context;

  @Inject()
  loginService: LoginService;

  // @ContentType('application/json')
  // @HttpCode(403)
  @Post('/loginPost')
  async loginPost(
    // @Query('username') username: any,
    @Body() body
  ): Promise<any> {
    // console.log({ username });
    console.log({ body });
    let { username, password } = body;
    const userInfo = await this.loginService.getLoginInfoByUser(username);
    console.log({ userInfo, password, aa: userInfo?.password });
    console.log(userInfo?.password === password);
    if (userInfo) {
      if (userInfo?.password && !(userInfo.password === password)) {
        return {
          resCode: 9002,
          resMes: '登录失败，密码错误',
        };
      } else {
        return {
          resCode: 10000,
          resMes: '登录成功',
        };
      }
    } else {
      return {
        resCode: 9001,
        resMes: '登录失败，账号不存在',
      };
    }
    // body.resCode = 10000;
    // body.resMes = '登录成功';
  }
}
