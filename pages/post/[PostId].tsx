import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import SEO from "../../components/SEO";
import axios from "axios";
import Comments from "../../components/Comments";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

// const Comments = dynamic(() => import("../../components/Comments"), {
//   ssr: false,
// });

const PostWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #1e1e1f;
`;

const PostHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const PostTitle = styled.h2`
  width: 100%;
  font-size: 25px;
  padding: 16px 0;
  font-weight: 700;
  color: #fff;
  font-family: "MapleLight";
`;
const TagWrap = styled.ul``;

const PostTag = styled.li`
  display: inline-block;
  margin: 0 6px;
  color: #00c4ff;
`;

const PostContainer = styled.div`
  width: 100%;
  font-family: "MapleLight";
  padding: 16px;
`;

// const ContentBox = styled.div`
//   margin-top: 20px;
// `;
// const ContentTitle = styled.h3`
//   font-size: 20px;
//   color: #eee;
// `;

// const ContentDesc = styled.p`
//   margin-top: 20px;
//   font-size: 12px;
//   color: #ccc;
// `;

const Post: NextPage = ({ post, tag, title }: any) => {
  // console.log("data,data2,data3", post, tag, title);
  const router = useRouter();
  // console.log("라우터체크", router);
  // const [postData, setPostData] = useState<any>();

  // console.log("??????", data);

  // useEffect(() => {
  //   // url === https://hr.devlog.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/1669958981317:2022-12-05.txt
  //   fetch(url)
  //     .then((response) => response.text())
  //     .then((data: any) => {
  //       setPostData(data);
  //     });
  // }, []);

  // class Content extends React.Component {
  //   render() {
  //     const stringData = postData;
  //     return (
  //       <div
  //         className="toastui-editor-contents"
  //         dangerouslySetInnerHTML={{ __html: stringData }}
  //       ></div>
  //     );
  //   }
  // }
  // useEffect(() => {
  //   console.log(data2[0].post_tag);
  //   const
  // }, []);
  return (
    <PostWrap>
      <SEO title={`${title}`} />
      <PostHeader>
        <PostTitle>
          <span style={{ color: "#d082c4" }}>Import</span>{" "}
          <span style={{ color: "#88deff" }}>{`${title}`}</span>{" "}
          <span style={{ color: "#d082c4" }}>From</span>{" "}
          <span style={{ color: "#d88e74" }}>{`"../HR-DEVLOG";`}</span>
        </PostTitle>
        <div
          style={{
            display: "flex",
            fontFamily: "MapleLight",
            fontSize: "14px",
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
        {/* <Content />
        <div style={{ display: "none" }}>
          <TuiViewer init
          ialValue={""} />
        </div> */}
        <MarkdownPreview source={post} />
        <Comments />
      </PostContainer>
    </PostWrap>
  );
};

export async function getServerSideProps(context: any) {
  // 환경변수로 node에서 허가되지 않은 인증TLS통신을 거부하지 않겠다고 설정
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  // const res = await fetch("http://localhost:3000/api/selectDb");
  // const res = await fetch("https://hr-devlog.vercel.app/api/selectDb");

  // 파라미터로 넣기 ? Host: <host>:<port>
  const res = await axios.get(
    process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/selectDb"
  );
  const data = await res.data;
  // console.log("res", res);
  // console.log("data", data);

  const searchPost = data.filter(
    (item: any) => item.no === Number(context.query.PostId)
  );
  // console.log("써치", searchPost);
  // console.log("context-data", context);
  const url = searchPost[0].post_url;
  let postData;
  // const asdf = await axios.post(url);

  await fetch(url)
    .then((response) => response.text())
    .then((data: any) => {
      postData = data;
    });

  // const res2 = await axios.get(
  //   process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/selectDb"
  // );
  // console.log("res2?", res2);
  const tagArr = searchPost[0].post_tag.split(",");
  const tags = tagArr;
  const title = searchPost[0].post_title;

  return {
    props: { post: postData, tag: tags, title: title }, // will be passed to the page component as props
  };

  // return {
  //   props: {},
  // };
}

export default Post;
