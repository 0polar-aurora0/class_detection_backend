export interface commonResponse {
  success: boolean;
  message: string;
  resCode: string | number;
}

export interface IGetStudentInfoResponse extends commonResponse {
  data: IStudentInfoOptions[];
}

export interface IGetLoginResponse extends commonResponse {
  data: boolean;
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
