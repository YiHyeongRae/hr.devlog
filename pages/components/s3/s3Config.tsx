export const s3Config = {
  bucketName: "hr.devlog",
  dirName: "test-directory" /* Optional */,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  s3Url:
    "http://hr.devlog.s3-website.ap-northeast-2.amazonaws.com/" /* Optional */,
};
