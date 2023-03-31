// import type { NextApiRequest, NextApiResponse } from "next";
// const db = require("../../common/config/db");

// export default function postReg(req: NextApiRequest, res: NextApiResponse) {
//   db.query(
//     "INSERT INTO blog_post (
//     function (err: any, data: any) {
//       if (!err) {
//         res.send(data);
//       } else {
//         console.log(err);
//         res.send(err);
//       }
//     }
//   );
// }
import type { NextApiRequest, NextApiResponse } from "next";

const db = require("../../../common/config/db");

export default function postReg(req: NextApiRequest, res: NextApiResponse) {
  console.log("postReg console =====", req);
  db.query(
    `INSERT INTO blog_post (post_title,post_tag,post_url,post_cate,date) VALUES ("${req.body.data.postTitle}","${req.body.data.postTag}","${req.body.data.urlKey}","${req.body.data.postCate}","${req.body.data.postDate}")`,
    function (err: any, result: any) {
      if (err) {
        console.log("인서트 에러", err);
      } else {
        console.log("인서트 성공 ?", result);
        // res.json("인서트 제이슨", result);
      }
    }
  );
}
