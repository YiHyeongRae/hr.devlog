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

export default function view(req: NextApiRequest, res: NextApiResponse) {
  // console.log("view console =====", req);
  db.query(
    `UPDATE blog_post SET view = view+1 WHERE no = ${req.body.data.postNo}`,
    function (err: any, result: any) {
      if (err) {
        // console.log("인서트 에러", err);
      } else {
        // console.log("인서트 성공 ?", result);
        // res.json("인서트 제이슨", result);
      }
    }
  );
}
