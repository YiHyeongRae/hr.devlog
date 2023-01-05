import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

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
function MainCircleList(data: any) {
  // console.log("메인 써클 리스트", data);
  const router = useRouter();
  console.log(data);
  const goToContent: Function = (content: any) => {
    router.push(
      {
        pathname: `/post/${content.no}`,
        query: { post_url: content.post_url },
      },
      `/post/${content.no}`
    );
  };

  return (
    <CircleWrap>
      {data &&
        data?.data?.map((listItem: any) => {
          const mnfTag = listItem.post_tag.split(",");
          return (
            <CircleList key={listItem.no} onClick={() => goToContent(listItem)}>
              <ThunmbNail></ThunmbNail>
              <div style={{ padding: "25px" }}>
                <ThunmbNailTitle>{listItem.post_title}</ThunmbNailTitle>
                <TagWrap>
                  {mnfTag &&
                    mnfTag.map((tag: any, i: any) => {
                      return <PostTag key={i}>{tag}</PostTag>;
                    })}
                </TagWrap>
              </div>
            </CircleList>
          );
        })}
    </CircleWrap>
  );
}

{
  /* <Image
src={"/"}
alt={"이미지"}
layout="fill"
style={{ borderRadius: "10px 10px 0 0 " }}
/> */
}

export default MainCircleList;
