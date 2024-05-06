/*
 * @Author: fuzhenghao
 * @Date: 2024-05-03 14:36:31
 * @LastEditTime: 2024-05-06 15:00:13
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\config\config.default.ts
 */
// src/config/config.default.ts

import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import path = require('path');

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
    orm: {
      type: 'sqlite',
      database: path.join(__dirname, '../../sql/class_detection_db.db'),
      synchronize: true,
      logging: true,
    },
  } as MidwayConfig;
};
