/*
 * @Author: wanglinxiang
 * @Date: 2024-05-03 14:36:31
 * @LastEditTime: 2024-05-19 10:12:45
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\config\config.default.ts
 */
// src/config/config.default.ts

import path = require('path');
import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import { StudentInfo } from '../entity/studentInfo';
import { UserInfo } from '../entity/userInfo';
import { ImageDetectionResult } from '../entity/imageDetectionResult';
import { uploadWhiteList } from '@midwayjs/upload';
import { staticPosition } from './static';
// import { join } from 'path';
// import { tmpdir } from 'os';

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
      entities: [StudentInfo, UserInfo, ImageDetectionResult],
      database: path.join(__dirname, '../../sql/class_detection_db.db'),
      synchronize: false,
      logging: true,
    },
    upload: {
      // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
      mode: 'file',
      // fileSize: string, 最大上传文件大小，默认为 10mb
      fileSize: '10mb',
      // whitelist: string[]，文件扩展名白名单
      whitelist: uploadWhiteList.filter(ext => ext !== '.pdf'),
      // tmpdir: string，上传的文件临时存储路径
      // tmpdir: join(tmpdir(), 'midway-upload-files'),
      //设置静态文件服务器路径
      tmpdir: staticPosition,
      // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
      // cleanTimeout: 5 * 60 * 1000, //不设置清除时间
      // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
      base64: true,
      // 仅在匹配路径到 /api/upload 的时候去解析 body 中的文件信息
      // match: /\/detectionRequest\/detectionPost/,
    },
    // koa静态服务器托管配置
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
