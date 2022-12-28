import type { NextApiRequest, NextApiResponse } from "next";

const db = require("../../../common/config/db");

export default function login(req: NextApiRequest, res: NextApiResponse) {
  db.query(
    `SELECT * FROM master WHERE id="${req.body.loginData.id}"`,
    function (err: any, result: any) {
      if (err) {
        // console.log("salt 에러", err);
      } else {
        // console.log("salt 성공 ?", result);
        res.send(result);
      }
    }
  );
}
