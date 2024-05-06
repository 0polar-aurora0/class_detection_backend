export interface IGetStudentInfoResponse {
  success: boolean;
  message: string;
  resCode: string | number;
  data: IStudentInfoOptions[];
}

/**
 * @description StudentInfo-Service parameters
 */
export interface IStudentInfoOptions {
  id?: string;
  student_id?: string;
  avator?: any;
  detection_face_feature?: any;
}
