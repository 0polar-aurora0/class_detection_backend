/*
 * @Author: wanglinxiang
 * @Date: 2024-05-03 14:36:31
 * @LastEditTime: 2024-05-14 15:12:20
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\config\config.default.ts
 */
// src/config/config.default.ts

import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import path = require('path');
import { StudentInfo } from '../entity/studentInfo';
import { UserInfo } from '../entity/userInfo';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1714490419759_5816',
    egg: {
      port: 7001,
    },
    // security: {
    //   csrf: false,
    // },
    webSocket: {
      // port: 7001,
    },
    orm: {
      type: 'sqlite',
      entities: [StudentInfo, UserInfo],
      database: path.join(__dirname, '../../sql/class_detection_db.db'),
      synchronize: false,
      logging: true,
    },
   
    // 静态服务器托管配置
    // staticFile: {
    //   dirs: {
    //     default: {
    //       prefix: '/',
    //       dir: 'xxx',
    //     },
    //   }
    // },
  } as MidwayConfig;
};
