import { GetStaticPropsContext, NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import SEO from "../../components/SEO";

import { DataTypes } from "../../components/SideTagNav";
import AdsTerminal from "../../components/AdsTerminal";
import { getCookie, setCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";
import { postDesc } from "../../data/post/postDesc";
import { postInfo } from "../../data/post/postInfo";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

const PostWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #1e1e1f;
  overflow-y: scroll;
`;

const PostHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  /* text-overflow: ellipsis;
  white-space: nowrap; */
`;

const PostTitle = styled.div`
  width: 100%;
  font-size: 18px;
  padding: 16px 0;
  font-weight: 700;
  color: #fff;
  font-family: "MapleLight";
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  /* text-overflow: ellipsis;
  white-space: nowrap; */
`;
const TagWrap = styled.ul`
  width: 100%;
  margin: 8px 0;
`;

const PostTag = styled.li`
  display: inline-block;
  margin: 0 6px;
  color: #00c4ff;
`;

const PostContainer = styled.div`
  width: 100%;
  font-family: "MapleLight";
  padding: 16px;
  padding-bottom: 32px;
`;
interface PostDataTypes {
  date: string;
  like: number;
  no: number;
  post_cate: string;
  post_tage: string;
  post_title: string;
  post_url: string;
  view: number;
}
interface PostTypes {
  post: string;
  tag: Array<string>;
  title: string;
  data: Array<PostDataTypes>;
  date: string;
  view: number;
  desciprtion: string;
  test: any;
  info: any;
}

type ViewCheckTypes = {
  no: number;
  expire: string;
};
const Post: NextPage<PostTypes> = ({
  post,

  title,

  info,
}) => {
  // utterances를 불러올 div ref
  const router = useRouter();
  const commentsRef = useRef<HTMLDivElement | null>(null);

  const [text, setText] = useState("");
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", post, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // 파일 다운로드 및 내용 가져오기
        const fileContent = xhr.responseText;

        // 파일 내용을 출력하거나 다른 작업을 수행

        setText(fileContent);
      }
    };
    xhr.send();
  }, [info]);

  // const fileReader = new FileReader();

  // const markdownText = fileReader.readAsText(post)

  // utterances script 로드
  const loadCommnets: Function = () => {
    const commentsEl = commentsRef.current?.firstChild;

    if (commentsEl) commentsRef.current?.removeChild(commentsEl);

    const scriptEl = document.createElement("script");
    scriptEl.src = "https://utteranc.es/client.js";
    scriptEl.async = true;
    scriptEl.crossOrigin = "anonymous";
    scriptEl.setAttribute("repo", "YiHyeongRae/hr.devlog-comment");
    scriptEl.setAttribute("issue-term", "pathname");
    scriptEl.setAttribute("theme", `dark-blue`);
    scriptEl.setAttribute("label", "Blog-comment");
    scriptEl.onload = (ev) => {
      const comments = document.getElementById("comments-container");
      if (comments && comments.children[1]) {
        //@ts-ignore
        comments.children[1].style.display = "none";
      }
    };
    commentsRef.current?.appendChild(scriptEl);
  };

  // useEffect로 utterances 실행

  const updateView: Function = async (no: number | string) => {
    try {
      await axios.post(process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/post/view", {
        data: {
          postNo: no,
        },
      });
    } catch (error: any) {
      console.log("조회수 증가 실패", error);
    }
  };
  useEffect(() => {
    loadCommnets();
    // **** 조회수 중복방지 ****
    // 한개의 쿠키 및 오브젝트로 관리
    // 쿠키의 expire는 고정, 쿠키 안의 object에 각 게시글별 object 따로 설정
    // isChecked : [
    //   {
    //     no:8
    //     expire:2023-04-05
    //   },
    //   {
    //     no:10
    //     expire:2023-04-08
    //   },
    // ]
    // no, expire 비교해서 object 안에 해당 게시글 no 있을 시 조회수 증가 X
    // 해당 no 없을 시 조회수 증가 및 object 안에 key-value 설정
    // 쿠키를 읽을 때 expire 만료되었다면 해당 key-value 삭제
    // const date = new Date();
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDate();
    // const today = `${year}-${month < 10 ? `0${month}` : month}-${
    //   day < 10 ? `0${day}` : day
    // }`;
    // // 게시글 만료일 설정
    // const after7DaysTimeStemp =
    //   new Date(today).getTime() + 7 * 24 * 60 * 60 * 1000;
    // const after7DaysYear = new Date(after7DaysTimeStemp).getFullYear();
    // const after7DaysMonth = new Date(after7DaysTimeStemp).getMonth() + 1;
    // const after7DaysDay = new Date(after7DaysTimeStemp).getDate();
    // const expireView = `${after7DaysYear}-${
    //   after7DaysMonth < 10 ? `0${after7DaysMonth}` : after7DaysMonth
    // }-${after7DaysDay < 10 ? `0${after7DaysDay}` : after7DaysDay}`;
    // // console.log("게시글 중복방지 설정 만료일", expireView);
    // // 현재 게시글 정보 object 생성
    // const viewCheck: ViewCheckTypes = {
    //   no: Number(router.query.PostId),
    //   expire: expireView,
    // };
    // // 쿠키 만료일 설정
    // const after14DaysTimeStemp =
    //   new Date(today).getTime() + 14 * 24 * 60 * 60 * 1000;
    // const after14DaysYear = new Date(after14DaysTimeStemp).getFullYear();
    // const after14DaysMonth = new Date(after14DaysTimeStemp).getMonth() + 1;
    // const after14DaysDay = new Date(after14DaysTimeStemp).getDate();
    // const expireCookie = `${after14DaysYear}-${
    //   after14DaysMonth < 10 ? `0${after14DaysMonth}` : after14DaysMonth
    // }-${after14DaysDay < 10 ? `0${after14DaysDay}` : after14DaysDay}`;
    // // console.log("hr-view 쿠키 만료일", expireCookie);
    // // 쿠키에 박혀있는걸 가져온다면 이거
    // const viewCheckArr: Array<ViewCheckTypes> = getCookie("hr-view")
    //   ? JSON.parse(String(getCookie("hr-view")))
    //   : [];
    // // console.log("현재 게시글 정보 object", viewCheck);
    // // console.log(
    // //   "현재 개사굴 no 가 있는지 체크\nfilter 돌리기 때문에 length !== 0 이라면 중복방지 설정된 상태",
    // //   viewCheckArr?.filter((item: ViewCheckTypes) => item.no === data[0].no)
    // // );
    // // console.log(
    // //   "가져온 쿠키",
    // //   getCookie("hr-view") ? JSON.parse(String(getCookie("hr-view"))) : []
    // // );
    // if (
    //   viewCheckArr.filter(
    //     (item: ViewCheckTypes) => item.no === Number(router.query.PostId)
    //   ).length === 0
    // ) {
    //   // alert("조회수 증가 UP");
    //   const copyViewCheckArr = [...viewCheckArr];
    //   copyViewCheckArr.push(viewCheck);
    //   setCookie("hr-view", JSON.stringify(copyViewCheckArr), {
    //     expires: new Date(expireCookie),
    //   });
    //   // console.log(
    //   //   "현재 게시글 조회수가 1 증가하고, 쿠키에 조회수 중복 방지가 설정되었습니다."
    //   // );
    //   updateView(Number(router.query.PostId));
    // } else {
    //   // console.log(
    //   //   "현재 게시글 조회수 중복방지가 설정되어있으므로, 조회수는 증가하지 않았습니다."
    //   // );
    //   // 만료날짜가 오늘과 겹치지 않는 것만 추출
    //   const checkExpire = viewCheckArr.filter(
    //     (item: ViewCheckTypes) =>
    //       new Date(item.expire).getTime() !== new Date(today).getTime()
    //   );
    //   // 만료된 정보 삭제를 위해 쿠키 다시 셋팅
    //   setCookie("hr-view", JSON.stringify(checkExpire), {
    //     expires: new Date(expireCookie),
    //   });
    // }
  }, []);

  return (
    <PostWrap>
      <SEO title={`${info.title}`} desc={info.desciprtion || ""} />
      <h2>{title}</h2>
      <PostHeader>
        <PostTitle>
          <p style={{ color: "#d082c4", width: "100%" }}>Import</p>{" "}
          <p
            style={{ color: "#88deff", width: "100%", lineHeight: 2 }}
          >{`${info.title}`}</p>{" "}
          <p style={{ color: "#d082c4" }}>From</p>{" "}
          <p style={{ color: "#d88e74" }}>{`"../HR-DEVLOG";`}</p>
        </PostTitle>
        <div
          style={{
            display: "flex",
            fontFamily: "MapleLight",
            fontSize: "14px",
            flexWrap: "wrap",
            marginBottom: "6px",
          }}
        >
          <p style={{ color: "#379edc", marginRight: "6px" }}>{`const`}</p>
          <p style={{ color: "#ea68dc" }}>{`{`}</p>
          <TagWrap>
            {info.tag &&
              info.tag.map((tags: string, i: number) => {
                return (
                  <PostTag key={i} style={{ lineHeight: 2 }}>
                    {info.tag.length - 1 === i ? `${tags}` : `${tags},`}
                  </PostTag>
                );
              })}
          </TagWrap>
          <p style={{ color: "#ea68dc", marginRight: "6px" }}>{`}`}</p>
          <p style={{ marginRight: "6px" }}>=</p>
          <p style={{ color: "#d7d89f" }}>{`useHRDEVLOG`}</p>
          <p style={{ color: "#ea68dc" }}>( )</p>
          <p>{`;`}</p>
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "MapleLight",
            fontSize: "14px",
            flexWrap: "wrap",
            lineHeight: "30px",
          }}
        >
          <p style={{ color: "#379edc", marginRight: "6px" }}>{`const`}</p>
          <p style={{ color: "#ea68dc" }}>{`{`}</p>
          <p
            style={{ margin: "0 10px", color: "#00c4ff" }}
          >{`date, ${info.date}`}</p>
          <p style={{ color: "#ea68dc", marginRight: "6px" }}>{`}`}</p>
          <p style={{ marginRight: "6px" }}>=</p>
          <div style={{ display: "flex" }}>
            <p style={{ color: "#d7d89f" }}>{`useHRDEVLOG`}</p>
            <p style={{ color: "#ea68dc" }}>( )</p>
            <p>{`;`}</p>
          </div>
        </div>
        {/* <div
          style={{
            display: "flex",
            fontFamily: "MapleLight",
            fontSize: "14px",
            flexWrap: "wrap",
            lineHeight: "30px",
          }}
        >
          <p style={{ color: "#379edc", marginRight: "6px" }}>{`const`}</p>
          <p style={{ color: "#ea68dc" }}>{`{`}</p>
          <p
            style={{ margin: "0 10px", color: "#00c4ff" }}
          >{`view, ${view}`}</p>
          <p style={{ color: "#ea68dc", marginRight: "6px" }}>{`}`}</p>
          <p style={{ marginRight: "6px" }}>=</p>
          <p style={{ color: "#d7d89f" }}>{`useHRDEVLOG`}</p>
          <p style={{ color: "#ea68dc" }}>( )</p>
          <p>{`;`}</p>
        </div> */}
      </PostHeader>
      <PostContainer>
        <MarkdownPreview
          source={text}
          warpperElement={{ "data-color-mode": "dark" }}
        />

        <div ref={commentsRef} />
      </PostContainer>
      {/* <AdsTerminal /> */}
    </PostWrap>
  );
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
  // 환경변수로 node에서 허가되지 않은 인증TLS통신을 거부하지 않겠다고 설정

  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  // console.log("what is params", params);
  const s3TextURL = postDesc.get(String(params?.PostId));
  const info = postInfo.get(String(params?.PostId));

  // const res = await fetch("http://localhost:3000/api/selectDb");
  // const res = await fetch("https://hr-devlog.vercel.app/api/selectDb");

  // const res = await fetch(
  //   process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/selectDb"
  // );
  // const data = await res.json();
  // const searchPost = data.filter(
  //   (item: DataTypes) => item.no === Number(params?.PostId)
  // );

  // const url = searchPost[0].post_url;
  // let postData;

  // await fetch(url)
  //   .then((response) => response.text())
  //   .then((data: string) => {
  //     postData = data;
  //   });
  // const tagArr = searchPost[0].post_tag.split(",");
  // const tags = tagArr;
  // const title = searchPost[0].post_title;
  // const date = searchPost[0].date;
  // const view = searchPost[0].view;
  // const desciprtion = searchPost[0].description;
  return {
    props: {
      post: s3TextURL,
      info: info,
      // tag: tags,
      // title: title,
      // date: date,
      // data: data,
      // view: view,
      // desciprtion: desciprtion,
    },
  };

  // return {
  //   props: {},
  // };
}

export async function getStaticPaths() {
  // const res = await fetch(
  //   process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/selectDb"
  // );
  // const pathRes: Array<DataTypes> = await res.json();
  // const paths = pathRes.map((path: DataTypes) => ({
  //   params: { PostId: path.no.toString() },
  // }));

  let myPostIdArray: any = [];

  for (let i = 1; i < postInfo.size + 1; i++) {
    const copyArray = [...myPostIdArray];
    const obj = { params: { PostId: String(i) } };
    myPostIdArray.push(obj);
  }
  // console.log("?zzz", myPostIdArray);
  const paths = myPostIdArray;
  return {
    paths,
    fallback: "blocking",
  };
}

export default Post;
