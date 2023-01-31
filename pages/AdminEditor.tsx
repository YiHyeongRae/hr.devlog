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

const CircleWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  list-style: none;
  margin: 50px 0;
`;

const CircleList = styled.li`
  width: 500px;

  box-sizing: border-box;
  box-shadow: 0 0 10px #333;
  cursor: pointer;
  border-radius: 10px;
`;

const ThunmbNail = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 500px;
  height: 300px;
  border-radius: 10px 10px 0 0;

  border: 1px solid #999;
  // animation: fadeInOut 5s linear infinite;
`;

const ThunmbNailTitle = styled.div`
  text-align: center;
  width: 100%;

  font-size: 16px;
`;

const TagWrap = styled.ul`
  margin-top: 25px;
`;

const PostTag = styled.li`
  display: inline-block;
  font-size: 10px;
  font-family: "MapleLight";
  padding: 10px;
  background-color: #333;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
`;
const PostTitle = styled.div`
  display: flex;

  align-items: center;
  width: 100%;
  font-size: 25px;
  padding: 16px 0;
  font-weight: 700;
  color: #fff;
  font-family: "MapleLight";
`;
const TagTitle = styled.div`
  display: flex;

  align-items: center;
  font-size: 16px;
  padding: 16px 0;
  font-weight: 700;
  color: #fff;
  font-family: "MapleLight";
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

  const [postTitle, setPostTitle] = useState<string>();
  const [postTag, setPostTag] = useState<string>();

  const [tag, setTag] = useState<string[]>();

  const { uploadToS3 } = useS3Upload();
  const handleFileChange = async () => {
    try {
      const url = await uploadToS3(S3File, {
        endpoint: {
          request: {
            headers: {},
            body: {
              fileName: uniqName,
            },
          },
        },
      });
      // console.log("? url object? ?", url);
      const response = await axios
        .post(process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/regist/postReg", {
          data: {
            postTitle: postTitle,
            postTag: postTag,
            urlKey: url.url,
          },
        })
        .then(() => alert("업로드가 완료됐습니다."));
      // console.log("504?", response);
    } catch (error: any) {
      console.log(error);
      alert("업로드에 실패했습니다.");
    }
  };

  const handlePostTag: Function = (e: React.ChangeEvent<HTMLInputElement>) => {
    let splitArr = [];
    splitArr = e.currentTarget.value.split(",");
    setTag(splitArr);
    setPostTag(e.currentTarget.value);
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
      {/* <h2>ADMIN EDITOR</h2> */}
      {/* <p style={{ textAlign: "center", fontSize: 20 }}>
        홈에서 보여지는 카드 모양 미리보기
      </p>
      <CircleWrap>
        <CircleList>
          <ThunmbNail>
            <Image
              src={thumbNail || "/"}
              alt={"이미지"}
              layout="fill"
              style={{ borderRadius: "10px 10px 0 0 " }}
            />
          </ThunmbNail>
          <div style={{ padding: "25px" }}>
            <ThunmbNailTitle>{postTitle || "타이틀"}</ThunmbNailTitle>
            <TagWrap>
              {tag &&
                tag.map((tag: any, i: any) => {
                  return <PostTag key={i}>{tag}</PostTag>;
                })}
            </TagWrap>
          </div>
        </CircleList>
      </CircleWrap> */}
      <div data-color-mode="dark">
        <div className="wmde-markdown-var"> </div>
        <div className="title-editor">
          <PostTitle>
            <p style={{ color: "#d082c4", flexShrink: 0 }}>export default</p>
            <input
              type="text"
              placeholder="TITLE OF POST"
              onChange={(e) => setPostTitle(e.currentTarget.value)}
              style={{
                color: "#88deff",
                border: 0,
                flexGrow: 0,
                background: "none",
                fontSize: 25,
                margin: "0 6px",
                flexBasis: 100,
              }}
            />{" "}
            {/* <span style={{ color: "#d082c4" }}>From</span>{" "}
            <span style={{ color: "#d88e74" }}>{`"../HR-DEVLOG";`}</span> */}
          </PostTitle>
          <TagTitle>
            <p style={{ color: "#d082c4", flexShrink: 0 }}>export</p>
            <p style={{ color: "#379edc", marginRight: "6px" }}>&nbsp;const</p>
            <p style={{ color: "#ea68dc" }}>{`{`}</p>
            <input
              type="text"
              onChange={(e) => handlePostTag(e)}
              placeholder="TAG OF POST"
              style={{
                color: "#00c4ff",
                border: 0,
                display: "inline-block",
                background: "none",
                fontSize: 16,
                margin: "0 6px",
                textAlign: "center",
              }}
            />{" "}
            <p style={{ color: "#ea68dc", marginRight: "6px" }}>{`}`}</p>
            <p style={{ marginRight: "6px" }}>=</p>
            <p style={{ color: "#d7d89f" }}>{`setHrDevLogRds`}</p>
            <p style={{ color: "#ea68dc" }}>( )</p>
            <p>{`;`}</p>
            {/* <span style={{ color: "#d082c4" }}>From</span>{" "}
            <span style={{ color: "#d88e74" }}>{`"../HR-DEVLOG";`}</span> */}
          </TagTitle>

          {/* <p>
            <label>썸네일</label>
            <input
              id="thumb-nail"
              type="file"
              accept="image/*"
              onChange={(e) => fileTest(e)}
              ref={thumnailInput}
            />
          </p> */}
        </div>

        <Editor setS3File={setS3File} />
      </div>
      {/* <div style={{ textAlign: "center", marginBottom: 20 }}>
        <button
          style={{ padding: 25 }}
          type="button"
          onClick={() => handleFileChange()}
        >
          게시글 업로드
        </button>
      </div> */}

      <style jsx>
        {`
          .title-editor {
            margin-right: 20px;
            margin-left: 20px;
          }

          .title-editor input {
            flex-grow: 0;
            border: 0;
            outline: none;
          }
          .title-editor input::placeholder {
            color: #88deff;
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
        `}
      </style>
    </>
  );
};

export default AdminEditor;

AdminEditor.defaultProps = {
  auth: true,
};
