import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import SEO from "../../components/SEO";
import axios from "axios";
// import Comments from "../../components/Comments";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

const Comments = dynamic(() => import("../../components/Comments"), {
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
  padding: 0 32px;
  /* text-overflow: ellipsis;
  white-space: nowrap; */
`;

const PostTitle = styled.h2`
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
  padding: 0 32px;
`;

const Post: NextPage = ({ post, tag, title }: any) => {
  useEffect(() => {
    const test = document.getElementsByClassName("test");
    console.log(test);
  }, []);
  return (
    <PostWrap>
      <SEO title={`${title}`} />
      <PostHeader>
        <PostTitle>
          <p style={{ color: "#d082c4", width: "100%" }}>Import</p>{" "}
          <p style={{ color: "#88deff", width: "100%" }}>{`${title}`}</p>{" "}
          <p style={{ color: "#d082c4" }}>From</p>{" "}
          <p style={{ color: "#d88e74" }}>{`"../HR-DEVLOG";`}</p>
        </PostTitle>
        <div
          style={{
            display: "flex",
            fontFamily: "MapleLight",
            fontSize: "14px",
            flexWrap: "wrap",
          }}
        >
          <p style={{ color: "#379edc", marginRight: "6px" }}>{`const`}</p>
          <p style={{ color: "#ea68dc" }}>{`{`}</p>
          <TagWrap>
            {tag &&
              tag.map((tags: any, i: any) => {
                //  dconsole.log(tags);
                return (
                  <PostTag key={i}>
                    {tag.length - 1 === i ? `${tags}` : `${tags},`}
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
      </PostHeader>
      <PostContainer>
        <MarkdownPreview source={post} className="test" />

        <Comments />
      </PostContainer>
    </PostWrap>
  );
};

export async function getStaticProps(context: any) {
  // 환경변수로 node에서 허가되지 않은 인증TLS통신을 거부하지 않겠다고 설정

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  // const res = await fetch("http://localhost:3000/api/selectDb");
  // const res = await fetch("https://hr-devlog.vercel.app/api/selectDb");

  const res = await fetch(
    process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/selectDb"
  );
  const data = await res.json();

  const searchPost = data.filter(
    (item: any) => item.no === Number(context.params.PostId)
  );

  const url = searchPost[0].post_url;
  let postData;

  await fetch(url)
    .then((response) => response.text())
    .then((data: any) => {
      postData = data;
    });

  const tagArr = searchPost[0].post_tag.split(",");
  const tags = tagArr;
  const title = searchPost[0].post_title;

  return {
    props: { post: postData, tag: tags, title: title },
  };

  // return {
  //   props: {},
  // };
}

export async function getStaticPaths() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/selectDb"
  );
  const pathRes: any = await res.json();

  const paths = pathRes.map((path: any) => ({
    params: { PostId: path.no.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default Post;
