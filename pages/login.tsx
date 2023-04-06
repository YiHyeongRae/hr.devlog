import { useSession, signIn, signOut } from "next-auth/react";
import Router, { useRouter } from "next/router";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const PopupWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #323233;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const PopupContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const PopupTitle = styled.p``;
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

  const idRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const login: Function = async () => {
    await signIn("admin", { userId, userPw, redirect: false }).then(
      (result: any) => {
        result.status === 401
          ? alert("비밀번호 또는 아이디가 틀렸습니다")
          : router.push("/");
      }
    );
  };

  const [cert, setCert] = useState<string>();
  const [certState, setCertState] = useState<boolean>(true);
  const checkCert: Function = () => {
    if (cert !== process.env.NEXT_PUBLIC_LOGIN_CONFIRM) {
      alert("Good-Bye,Stranger");
      router.replace("/");
    } else {
      setCertState(false);
      if (idRef.current) {
        idRef.current.focus();
      }
    }
  };

  const enterCert: Function = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (cert !== "") {
        checkCert();
      }
    }
  };
  // useEffect(() => {
  //   const confirmMaster = prompt();

  //   if (confirmMaster !== "dev.yihr") {
  //     alert("Good-Bye,Stranger");
  //     router.replace("/");
  //   }
  // }, []);
  return (
    <div className="content-wrap" style={{ width: "100%" }}>
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
              ref={idRef}
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
            <button onClick={() => login()} type="button">
              로그인
            </button>
          </p>
        </fieldset>
      </form>
      {certState && (
        <PopupWrapper>
          <PopupContent>
            <PopupTitle>Who Are You?</PopupTitle>

            <input
              type="text"
              style={{ margin: "10px 0" }}
              onChange={(e) => setCert(e.currentTarget.value)}
              onKeyDown={(e) => enterCert(e)}
              autoFocus
            />
            <button type="button" onClick={() => checkCert()}>
              확인
            </button>
          </PopupContent>
        </PopupWrapper>
      )}

      <style jsx>
        {`
          form {
            display: flex;
            justify-content: center;
            align-items: center;
            height: calc(100vh - 91.5px);
          }
          fieldset {
            display: flex;
            flex-basis: 300px;
            flex-direction: column;
            justify-content: center;

            align-items: center;
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
