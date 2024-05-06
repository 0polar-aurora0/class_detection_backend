CREATE TABLE "detection_result_info" (
  "time" text,
  "result" text,
  "detection_key" blob
);

CREATE TABLE "student_info" (
  "id" INTEGER NOT NULL,
  "student_id" text,
  "avator" blob,
  "detection_face_feature" blob,
  PRIMARY KEY ("id")
);

CREATE TABLE "user_info" (
  "username" text NOT NULL,
  "password" integer,
  PRIMARY KEY ("username")
);

