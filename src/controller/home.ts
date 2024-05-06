/*
 * @Author: fuzhenghao
 * @Date: 2024-04-30 23:20:19
 * @LastEditTime: 2024-05-07 00:47:19
 * @LastEditors: fuzhenghao
 * @Description: 
 * @FilePath: \class_detection_backend\src\controller\home.ts
 */
import { Controller, Get } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Get('/')
  async home() {
    return '管理系统已经启动!';
  }
}
