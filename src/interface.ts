export interface commonResponse {
  success: boolean;
  message: string;
  resCode: string | number;
}

export interface IGetStudentInfoResponse extends commonResponse {
  data: IStudentInfoOptions[];
}

export interface IGetLoginResponse extends commonResponse {
  data: {
    loginSuccess: boolean;
    message?: string;
  };
}

/**
 * @description StudentInfo-Service parameters
 */
export interface IStudentInfoOptions {
  id?: string;
  student_id: string;
  avator: any;
  detection_face_feature?: any;
}

export interface TDetectTargetInfo {
  chooseName: string;
  corporationList: Array<number>;
  confidence: string | number;
  // type: string;
  type_value: number;
  corporation_x_min: number;
  corporation_y_min: number;
  corporation_x_max: number;
  corporation_y_max: number;
  student_id?: string;
}
export interface TPercentInfo {
  type: string;
  value: number;
}

export interface TTimeInfo {
  timeStart: any;
  timeEnd: any;
  timeSpend?: any;
}

export interface TDetectData {
  imageName: string;
  timeInfo?: TTimeInfo;
  detectTargetList: Array<TDetectTargetInfo>;
  percentList: Array<TPercentInfo>;
  totalTargetNum: number;
}

export interface IDetectResponseByserver {
  choose_list: Array<string>;
  cls_list: Array<number>;
  cls_percents: Array<number>;
  conf_list: Array<string>;
  location_list: Array<Array<number>>;
  target_nums: number;
}
