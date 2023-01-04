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
  // db.query(
  //   `INSERT INTO blog_post (post_url) VALUES ("${req.body.data.urlKey.url}")`,
  //   function (err: any, result: any) {
  //     if (err) {
  //       console.log("인서트 에러", err);
  //     } else {
  //       console.log("인서트 성공 ?", result);
  //       // res.json("인서트 제이슨", result);
  //     }
  //   }
  // );
}
