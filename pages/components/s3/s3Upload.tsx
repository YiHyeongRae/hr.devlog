import ReactS3Client from "react-aws-s3-typescript";
import { s3Config } from "./s3Config";

export const uploadFile = async ({ file, fileNumber }: any) => {
  /* Import s3 config object and call the constrcutor */
  const s3 = new ReactS3Client(s3Config);

  /* You can use the default directory defined in s3Config object
   * Or you can a define custom directory to upload when calling the
   * constructor using js/ts object destructuring.
   *
   * const s3 = new ReactS3Client({
   *      ...s3Config,
   *      dirName: 'custom-directory'
   * });
   *
   */

  // console.log("여기에는 제대로 들어옴? ", file, fileNumber);

  const filename = `tset-file-name-${fileNumber}`; /* Optional */

  /* If you do not specify a file name, file will be uploaded using uuid generated
   * by short-UUID (https://www.npmjs.com/package/short-uuid)
   */

  try {
    const res = await s3.uploadFile(file, filename);

    console.log(res);
    /*
     * {
     *   Response: {
     *     bucket: "bucket-name",
     *     key: "directory-name/filename-to-be-uploaded",
     *     location: "https:/your-aws-s3-bucket-url/directory-name/filename-to-be-uploaded"
     *   }
     * }
     */
  } catch (exception) {
    console.log(exception);
    /* handle the exception */
  }
};
