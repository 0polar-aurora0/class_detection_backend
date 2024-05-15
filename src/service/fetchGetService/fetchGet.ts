/*
 * @Author: fuzhenghao
 * @Date: 2024-05-15 21:56:27
 * @LastEditTime: 2024-05-16 00:25:54
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\service\fetchGetService\fetchGet.ts
 */
import { Provide } from '@midwayjs/core';
// import fetch from 'node-fetch';
// import fetch from '../../utils/node-fetch/src/index'

@Provide()
export class FetchGetService {
  async fetchService(url) {
    return fetch(url, {})
      .then(response => {
        console.log({ response });
      })
      .catch(error => {
        // 处理请求错误
        console.error(error);
      });
  }
}
