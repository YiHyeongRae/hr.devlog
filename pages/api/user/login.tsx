import type { NextApiRequest, NextApiResponse } from "next";

const db = require("../../../common/config/db");

export default function login(req: NextApiRequest, res: NextApiResponse) {
  // console.log("로그인~", req.body.loginData.id);
  // console.log(
  //   "로그인 api id/pw ======",
  //   req.body.loginData.id,
  //   req.body.loginData.pw
  // );

  // const url = req.body.urlData;
  db.query(
    `SELECT * FROM master WHERE id="${req.body.loginData.id}"`,
    function (err: any, result: any) {
      // if (err) {
      //   console.log("조회 에러", err);
      // } else {
      //   console.log("조회 성공 ?", result);

      // }
      // console.log("result?", result);
      if (!err && req.body.loginData.pw === result[0].salt_pw) {
        res.send({
          loginState: true,
          user: {
            id: result[0].id,
            nickname: result[0].nickname,
            authority: result[0].authority,
          },
        });
      } else if (!err && req.body.loginData.pw !== result[0].salt_pw) {
        res.send({
          loginState: false,
          user: {},
          error: "비밀번호가 일치하지 않습니다.",
        });
      } else if (err) {
        res.send({
          error: err,
        });
      }
    }
  );
}
