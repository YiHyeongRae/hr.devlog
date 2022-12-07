import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../common/config/db");

export default function selectDb(req: NextApiRequest, res: NextApiResponse) {
  db.query(`SELECT * FROM blog_post`, function (err: any, result: any) {
    if (err) {
      // console.log(err);
      res.send(err);
    } else {
      // console.log("결과는 ?", result);
      res.json(result);
    }
  });
}
