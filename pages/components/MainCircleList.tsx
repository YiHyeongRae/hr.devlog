import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

const CircleWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  list-style: none;
`;

const CircleList = styled.li`
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 25px;
  cursor: pointer;
`;

const ThunmbNail = styled.div`
  box-sizing: border-box;
  width: 200px;
  height: 200px;
  border: 1px solid #999;
  border-radius: 100px;
  text-align: center;
  line-height: 200px;

  // animation: fadeInOut 5s linear infinite;
`;

const ThunmbNailTitle = styled.div`
  margin-top: 25px;
  font-size: 16px;
  text-align: center;
`;

function MainCircleList(data: any) {
  // console.log("추첮ㄱ", data);
  const router = useRouter();
  // console.log("홈에서 받은 데이터", data);

  // function test() {
  //   fetch("http://localhost:3000/api/selectDb")
  //     .then((res) => console.log("!!!", res))
  //     .then((data) => console.log("???", data));
  // }

  // useEffect(() => {
  //   test();
  // }, []);
  const goToContent: Function = (content: any) => {
    router.push({
      pathname: `/${content.no}`,
      query: { post_url: content.post_url },
    });
  };
  return (
    <CircleWrap>
      {data.data.map((listItem: any) => {
        return (
          <CircleList key={listItem.no} onClick={() => goToContent(listItem)}>
            <ThunmbNail>썸네일</ThunmbNail>
            <ThunmbNailTitle>타이틀</ThunmbNailTitle>
          </CircleList>
        );
      })}
      {/* <CircleList onClick={() => goToContent(1)}>
        <ThunmbNail>썸네일</ThunmbNail>
        <ThunmbNailTitle>타이틀</ThunmbNailTitle>
      </CircleList>
      <CircleList onClick={() => goToContent(1)}>
        <ThunmbNail>썸네일</ThunmbNail>
        <ThunmbNailTitle>타이틀</ThunmbNailTitle>
      </CircleList>
      <CircleList onClick={() => goToContent(1)}>
        <ThunmbNail>썸네일</ThunmbNail>
        <ThunmbNailTitle>타이틀</ThunmbNailTitle>
      </CircleList>
      <CircleList onClick={() => goToContent(1)}>
        <ThunmbNail>썸네일</ThunmbNail>
        <ThunmbNailTitle>타이틀</ThunmbNailTitle>
      </CircleList> */}
    </CircleWrap>
  );
}

export default MainCircleList;
