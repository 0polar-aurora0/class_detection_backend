/*
 * @Author: fuzhenghao
 * @Date: 2024-05-16 23:19:47
 * @LastEditTime: 2024-05-16 23:19:47
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\config\static.ts
 */

import path = require('path');

//python detect server config
export const detectionServer = 'http://127.0.0.1:7020/detect';
export const staticPosition = path.join(__dirname, '../app/public');
export const name_CN = [
  '举手',
  '阅读',
  '写作',
  '使用手机',
  '低头',
  '靠在桌子上',
];
export const names_EN = [
  'hand-raising',
  'reading',
  'writing',
  'using phone',
  'bowing the head',
  'leaning over the table',
];
