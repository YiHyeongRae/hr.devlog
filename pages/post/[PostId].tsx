import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import SEO from "../../components/SEO";
import { server } from "../../common/config";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

const PostWrap = styled.div`
  padding: 30px;
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
`;

const PostHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #aaa;
`;

const PostTitle = styled.h2`
  width: 100%;
  font-size: 25px;
  font-weight: 700;
  color: #fff;
`;
const TagWrap = styled.ul`
  margin: 25px 0;
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

const PostContainer = styled.div`
  width: 100%;
  font-family: "MapleLight";
  margin-top: 25px;
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

const Post: NextPage = ({ data }: any) => {
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

  return (
    <PostWrap>
      <SEO title={`${router.query.PostId}번 게시글`} />
      <PostHeader>
        <PostTitle>{`${router.query.PostId}번 게시글`}</PostTitle>
        <TagWrap>
          <PostTag>태그1</PostTag>
          <PostTag>태그1</PostTag>
          <PostTag>태그1</PostTag>
          <PostTag>태그1</PostTag>
          <PostTag>태그1</PostTag>
          <PostTag>태그1</PostTag>
          <PostTag>태그1</PostTag>
          <PostTag>태그1</PostTag>
          <PostTag>태그1</PostTag>
          <PostTag>태그1</PostTag>
          <PostTag>태그1</PostTag>
          <PostTag>태그1</PostTag>
        </TagWrap>
      </PostHeader>
      <PostContainer>
        {/* <Content />
        <div style={{ display: "none" }}>
          <TuiViewer init
          ialValue={""} />
        </div> */}
        <MarkdownPreview source={data} />
      </PostContainer>
    </PostWrap>
  );
};

export async function getServerSideProps(context: any) {
  // 환경변수로 node에서 허가되지 않은 인증TLS통신을 거부하지 않겠다고 설정
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  // const url = context.query.post_url;
  // console.log("1:::::", context.query);
  // console.log("2:::::", context);
  // console.log("?????", url);

  const res = await fetch(`https://hr-devlog.vercel.app/api/selectDb`);
  const data = await res.json();
  // console.log("2:::::", context.query.PostId);
  // console.log("::::::::", await res.json());
  const url = data[context.query.PostId].post_url;
  let postData;
  await fetch(url)
    .then((response) => response.text())
    .then((data: any) => {
      postData = data;
    });

  return {
    props: { data: postData }, // will be passed to the page component as props
  };
}

export default Post;
