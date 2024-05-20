/*
 * @Author: fuzhenghao
 * @Date: 2024-05-16 23:19:47
 * @LastEditTime: 2024-05-19 03:26:18
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\config\static.ts
 */

// import path = require('path');

//python detect server config
export const detectionServer = 'http://127.0.0.1:7020/detect';
//static file service storage position
// export const staticPosition = path.join(__dirname, '../app/public');
export const staticPosition = `K:/class_detection_backend/src/app/public`;
export const tmpdirPosition = `K:/class_detection_backend/src/app/tmpdir`;
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
export const studentDefaultMock = {
  id: '78592',
  student_id: '111122223333',
  avator: 'xregdtdgh',
  detection_face_feature: 'fsewfsedf',
};
