import { APIRoute } from "next-s3-upload";

export default APIRoute.configure({
  key(req) {
    // console.log("분기 태워야함", req.body.type);

    // return `post/${req.body.no}/${req.body.fileName}`;
    if (req.body.type === "image") {
      return `hr-devlog-image/${req.body.fileName}`;
    } else {
      return `hr-devlog-text/${req.body.fileName}`;
    }
    // console.log("파일네임 어디서 가져옴 ?",req.body)
  },
});
