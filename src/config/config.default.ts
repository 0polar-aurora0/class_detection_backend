/*
 * @Author: fuzhenghao
 * @Date: 2024-05-03 14:36:31
 * @LastEditTime: 2024-05-12 03:22:15
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\config\config.default.ts
 */
// src/config/config.default.ts

import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import path = require('path');
import { StudentInfo } from '../entity/studentInfo';
import { Login } from '../entity/login';

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
      entities: [StudentInfo, Login],
      database: path.join(__dirname, '../../sql/class_detection_db.db'),
      synchronize: false,
      logging: true,
    },
  } as MidwayConfig;
};
