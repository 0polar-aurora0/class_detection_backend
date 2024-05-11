import { Inject, Controller, Post, Query, Context } from '@midwayjs/core';

import { IGetLoginResponse } from '../interface';
import { LoginService } from '../service/loginService/login';

@Controller('/login')
export class LoginController {
  @Inject()
  ctx: Context;

  @Inject()
  loginService: LoginService;
  IGetLoginResponse;

  @Post('/loginPost')
  async postStudentInfo(
    @Query('username') username: string
  ): Promise<IGetLoginResponse> {
    // const user = id
    //   ? await this.studentInfoService.getStudentInfo(id)
    //   : await this.studentInfoService.getStudentInfoAll();
    const userInfo = await this.loginService.getLoginInfoByUser(username);
    console.log({ userInfo });
    return { success: true, resCode: 10000, message: 'OK', data: true };
  }
}
