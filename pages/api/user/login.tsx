import type { NextApiRequest, NextApiResponse } from "next";

const db = require("../../../common/config/db");

export default function login(req: NextApiRequest, res: NextApiResponse) {
  // console.log("여기서 어떻게 뜨는지 함 보자고~", req.body.data);

  // const url = req.body.urlData;
  db.query(``, function (err: any, result: any) {
    if (err) {
      console.log("인서트 에러", err);
    } else {
      console.log("인서트 성공 ?", result);
      // res.json("인서트 제이슨", result);
    }
  });
}
