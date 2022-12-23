import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Login: Function = () => {
  interface userDataType {
    userId: string | undefined;
    userPw: string | undefined;
  }
  const [userData, setUserData] = useState<userDataType>();

  interface userIdType {
    e: React.ChangeEvent<HTMLInputElement> | string;
  }
  const [userId, setUserId] = useState<string | undefined>();
  const [userPw, setUserPw] = useState<string | undefined>();

  const enterLogin: Function = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.keyCode === 13 ? signIn("admin", { userId, userPw }) : {};
  };
  return (
    <div className="content-wrap">
      <form>
        <fieldset>
          <legend>Admin Login</legend>
          <p>
            <label htmlFor="user-id">ID</label>
            <input
              id="user-id"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setUserId(e.target.value)
              }
              autoComplete="off"
              onKeyDown={(e) => enterLogin(e)}
            />
          </p>
          <p>
            <label htmlFor="user-pw">PW</label>
            <input
              id="user-pw"
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setUserPw(e.target.value)
              }
              onKeyDown={(e) => enterLogin(e)}
            />
          </p>
          <p>
            <button
              onClick={() => signIn("admin", { userId, userPw })}
              type="button"
            >
              로그인
            </button>
          </p>
        </fieldset>
      </form>
      <style jsx>
        {`
          form {
            display: flex;
            justify-content: center;
          }
          fieldset {
            display: flex;
            flex-basis: 300px;
            flex-direction: column;
          }
          legend {
            text-align: center;
            font-size: 30px;
          }
          p {
            margin-top: 20px;
            width: 100%;
          }
          label {
            display: inline-block;
            width: 10%;
          }
          input {
            width: 90%;
            text-indent: 10px;
            border: 0;
            padding: 0;
          }
          button {
            width: 100%;
            padding: 10px 0;
            background-color: #fff;
            color: #000;
            border: 0;
            font-family: "MapleLight";
          }
        `}
      </style>
    </div>
  );
};

export default Login;
