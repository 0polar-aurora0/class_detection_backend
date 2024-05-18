/*
 * @Author: fuzhenghao
 * @Date: 2024-05-15 21:56:27
 * @LastEditTime: 2024-05-19 02:03:01
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\service\detectPythonService\fetchGet.ts
 */
import { Provide } from '@midwayjs/core';
import {
  IDetectResponseByserver,
  TDetectData,
  TDetectTargetInfo,
  TPercentInfo,
} from '../../interface';
import { name_CN } from '../../config/static';
// import fetch from 'node-fetch';
// import fetch from '../../utils/node-fetch/src/index'

@Provide()
export class DetectPythonService {
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

  async dataHandle(
    response: IDetectResponseByserver,
    imageName: string
  ): Promise<TDetectData> {
    let {
      choose_list,
      cls_list,
      cls_percents,
      conf_list,
      location_list,
      target_nums,
    } = response;
    let resData: TDetectData = {
      imageName: '',
      detectTargetList: [],
      percentList: [],
      totalTargetNum: 0,
      timeInfo: undefined,
    };
    let detectTargetList: Array<TDetectTargetInfo> = [];
    let percentList: Array<TPercentInfo> = [];

    for (let index = 0; index < conf_list.length; index++) {
      let detectTarget: TDetectTargetInfo = {
        corporation_x_min: 0,
        corporation_y_min: 0,
        corporation_x_max: 0,
        corporation_y_max: 0,
        chooseName: '',
        corporationList: [],
        confidence: '',
        // type: '',
        type_value: 0,
      };
      detectTarget.confidence = conf_list[index];
      detectTarget.chooseName = choose_list[index + 1];
      detectTarget.corporationList = location_list[index];
      // detectTarget.type = name_CN[cls_list[index]];
      detectTarget.type_value = cls_list[index];
      detectTargetList.push(detectTarget);
      let position = location_list[index];
      detectTarget.corporation_x_min = position[0];
      detectTarget.corporation_y_min = position[1];
      detectTarget.corporation_x_max = position[2];
      detectTarget.corporation_y_max = position[3];
    }

    for (let index = 0; index < cls_percents.length; index++) {
      // let element = cls_percents[index];
      let percentInfo = {
        type: name_CN[index],
        value: cls_percents[index],
      };
      percentList.push(percentInfo);
    }

    resData.detectTargetList = detectTargetList;
    resData.percentList = percentList;
    resData.totalTargetNum = target_nums;
    resData.imageName = imageName;
    console.log({ aaa: resData.imageName });

    return resData;
  }
}
