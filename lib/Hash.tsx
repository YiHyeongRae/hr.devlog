import crypto from "crypto";
import axios from "axios";

interface HashModules {
  pwHashing: Function;
}

const Hash: HashModules = {
  pwHashing: async (userId: string, unHashedPw: string) => {
    const res = await axios.post("https://hr-devlog.vercel.app/api/user/salt", {
      loginData: { id: userId },
    });
    // const res = await axios.post("http://localhost:3000/api/user/salt", {
    //   loginData: { id: userId },
    // });
    // console.log("Hash res", res);
    const salt = res.data[0].salt;

    console.log("Hash Salt ======", salt);
    return new Promise(async (resolve, reject) => {
      crypto.pbkdf2(unHashedPw, salt, 1000, 64, "sha512", (err, key) => {
        if (err) reject(err);
        resolve(key.toString("base64"));
        //resolve(console.log("리졸브 값", key.toString("base64")));
      });
    });
  },
};

export default Hash;
