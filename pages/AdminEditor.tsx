// import TuiEditor from "./components/ToastEditor";
import type { NextPage } from "next";
import React, { useRef, useState } from "react";
import { useS3Upload } from "next-s3-upload";
import axios from "axios";
import Editor from "../components/MDEditor/MDEditor";
import { ICommand } from "@uiw/react-md-editor/lib/commands";
import Image from "next/image";
import styled from "styled-components";
import AutoHeightImage from "../components/AutoHeightImage";

const ImageWrapper = styled.div`
  position: relative;
  & > span {
    position: unset !important;
  }
`;

const CircleWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  list-style: none;
  margin: 50px 0;
`;

const CircleList = styled.li`
  box-sizing: border-box;
  box-shadow: 0 0 10px #333;
  cursor: pointer;
  border-radius: 10px;
`;

const ThunmbNail = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  border-radius: 10px 10px 0 0;

  border: 1px solid #999;
  // animation: fadeInOut 5s linear infinite;
`;

const ThunmbNailTitle = styled.div`
  text-align: center;
  width: 100%;
  padding: 25px;
  font-size: 16px;
`;

const AdminEditor: NextPage = () => {
  const title3: ICommand = {
    name: "title3",
    keyCommand: "title3",
    buttonProps: { "aria-label": "Insert title3" },
    icon: (
      <svg width="12" height="12" viewBox="0 0 520 520">
        <path
          fill="currentColor"
          d="M15.7083333,468 C7.03242448,468 0,462.030833 0,454.666667 L0,421.333333 C0,413.969167 7.03242448,408 15.7083333,408 L361.291667,408 C369.967576,408 377,413.969167 377,421.333333 L377,454.666667 C377,462.030833 369.967576,468 361.291667,468 L15.7083333,468 Z M21.6666667,366 C9.69989583,366 0,359.831861 0,352.222222 L0,317.777778 C0,310.168139 9.69989583,304 21.6666667,304 L498.333333,304 C510.300104,304 520,310.168139 520,317.777778 L520,352.222222 C520,359.831861 510.300104,366 498.333333,366 L21.6666667,366 Z M136.835938,64 L136.835937,126 L107.25,126 L107.25,251 L40.75,251 L40.75,126 L-5.68434189e-14,126 L-5.68434189e-14,64 L136.835938,64 Z M212,64 L212,251 L161.648438,251 L161.648438,64 L212,64 Z M378,64 L378,126 L343.25,126 L343.25,251 L281.75,251 L281.75,126 L238,126 L238,64 L378,64 Z M449.047619,189.550781 L520,189.550781 L520,251 L405,251 L405,64 L449.047619,64 L449.047619,189.550781 Z"
        />
      </svg>
    ),
    execute: (state: any, api: any) => {
      console.log(1);
    },
  };
  const [S3File, setS3File] = useState<any>();
  // const setPostDesc: Function = (e: any) => {
  //   console.log("?z", e);
  //   setS3File(e);
  // };

  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const getTime = date.getTime();

  const uniqName = `${getTime}:${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }.txt`;

  const { uploadToS3 } = useS3Upload();
  const handleFileChange = async () => {
    try {
      let url = await uploadToS3(S3File, {
        endpoint: {
          request: {
            headers: {},
            body: {
              fileName: uniqName,
            },
          },
        },
      });
      await axios.post("https://hr-devlog.vercel.app/api/regist/postReg", {
        data: {
          urlKey: url,
        },
      });
    } catch (error: any) {
      alert("업로드에 실패했습니다.");
    }
  };
  // console.log(S3File);

  const [postTitle, setPostTitle] = useState<string>();
  const [postTag, setPostTag] = useState<string[]>();

  const handlePostTag: Function = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("태그 핸들러", e.currentTarget.value);
    // console.log("split", e.currentTarget.value.split(","));

    let splitArr = [];
    splitArr = e.currentTarget.value.split(",");
    setPostTag(splitArr);
  };

  const [thumbNail, setThumbNail] = useState<any>();
  const thumnailInput = useRef<any>(null);
  const fileTest: Function = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = thumnailInput.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setThumbNail(reader.result);
    };
  };
  return (
    <>
      <h2>ADMIN EDITOR</h2>

      <CircleWrap>
        <CircleList>
          <ThunmbNail>
            <Image
              src={thumbNail}
              alt={"이미지"}
              layout="fill"
              style={{ borderRadius: "10px 10px 0 0 " }}
            />
          </ThunmbNail>
          <ThunmbNailTitle>{postTitle || "타이틀"}</ThunmbNailTitle>
        </CircleList>
      </CircleWrap>
      <div data-color-mode="dark">
        <div className="wmde-markdown-var"> </div>
        <div className="title-editor">
          <p>
            <label>제목</label>
            <input
              type="text"
              onChange={(e) => setPostTitle(e.currentTarget.value)}
            />
          </p>
          <p>
            <label>태그</label>
            <input type="text" onChange={(e) => handlePostTag(e)} />
          </p>
          <p>
            <label>썸네일</label>
            <input
              id="thumb-nail"
              type="file"
              accept="image/*"
              onChange={(e) => fileTest(e)}
              ref={thumnailInput}
            />
          </p>
        </div>

        <Editor setS3File={setS3File} />
      </div>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <button
          style={{ padding: 25 }}
          type="button"
          onClick={() => handleFileChange()}
        >
          게시글 업로드
        </button>
      </div>

      <style jsx>
        {`
          .title-editor {
            margin-right: 20px;
            margin-left: 20px;
          }
          .title-editor p {
            display: flex;
            margin-bottom: 10px;
          }
          .title-editor label {
            margin-right: 10px;
            line-height: 27.5px;
            flex-grow: 0;
            width: 10%;
          }
          .title-editor input {
            flex-grow: 1;
            text-indent: 15px;
          }

          h2 {
            margin: 20px 0;
            text-align: center;
            font-size: 30px;
          }
          ul {
            margin: 20px;
          }
          li {
            margin-bottom: 10px;
            font-family: MapleLight;
          }
          input {
            outline: none;
            background-color: #111;
            border: 1px solid #fff;
            color: #fff;
            padding: 5px;
          }
        `}
      </style>
    </>
  );
};

export default AdminEditor;

AdminEditor.defaultProps = {
  auth: true,
};
