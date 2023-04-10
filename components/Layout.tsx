/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useRouter } from "next/router";
import React, { Suspense, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";
import Footer from "./Footer";
import Header from "./Header";
import SideTagNav from "./SideTagNav";
import { getCookie, setCookie, CookieValueTypes } from "cookies-next";
import loadConfig from "next/dist/server/config";
import { DataTypes } from "../components/SideTagNav";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const LayoutWrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrap = styled.div`
  display: flex;
  width: calc(100% - 36px);
  /* height: 100%; */
  /* height: calc(100vh - 32px); */
  /* overflow-y: scroll; */
  /* overflow-x: scroll; */
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const TapWrap = styled.ul`
  background-color: #2c2d2d;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  /* text-overflow: ellipsis;
  white-space: nowrap; */
  /* -ms-overflow-style: none; */
  flex-shrink: 0;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TapTitle = styled.li`
  list-style-type: none;
  font-family: "MapleLight";
  font-size: 12px;
  border-right: 1px solid #252526;
  padding: 10px 0;
  flex-basis: 100px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex: 0 0 auto; */
`;

const TapText = styled.p`
  width: 50px;

  /* margin-left: 16px; */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const SmallSpinner = styled.p`
  display: inline-block;
  margin: 14px 0;
  width: 50px;
  height: 50px;
  border: 4px solid rgba(232, 235, 237, 0.5);
  border-top: 4px solid #0066b8;
  border-radius: 50%;

  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerWrap = styled.div`
  height: calc(100vh - 42px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Layout(props: { children: React.ReactNode }) {
  // const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const router = useRouter();

  // const { data } = useSWRImmutable("/api/selectDb", fetcher);
  const { data, isLoading } = useSWR("/api/selectDb", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // console.log("?Data?", data);
  const [BoardTap, setBoardTap] = useState<DataTypes[]>([]);
  // console.log("boardTap?", BoardTap);
  const boardTapHandler: Function = (index: number) => {
    const cookieArr = [];
    cookieArr.push(index);
    // console.log("BoardTap", index);

    // setCookie("TapState", JSON.stringify(cookieArr));
    const getCookieTapState: CookieValueTypes = getCookie("TapState");

    if (getCookieTapState === undefined) {
      setCookie("TapState", JSON.stringify(cookieArr));
    } else {
      const parseJsonArr: Array<number> = JSON.parse(String(getCookieTapState));

      if (!parseJsonArr.some((item: number) => item === index)) {
        parseJsonArr.push(index);
        setCookie("TapState", JSON.stringify(parseJsonArr));
      }
      // console.log("getTapState Parse", JSON.parse(getCookieTapState));
    }
    const afterCookie: CookieValueTypes = getCookie("TapState");
    const parseJsonArr = JSON.parse(String(afterCookie));
    // console.log("TapState Parse", JSON.parse(getTapState));
    // console.log("boardTapHandler", index);
    const newArr: DataTypes[] = [...BoardTap];
    // console.log("newArr1", newArr);

    // console.log("parseJsonArr", parseJsonArr);

    parseJsonArr.map((index: number) => {
      const search = newArr.some(
        (item: DataTypes) => item.no === Number(index)
      );

      if (!search) {
        const filter = data.filter(
          (item: DataTypes) => item.no === Number(index)
        );

        newArr.push(filter[0]);
      }
    });
    // console.log("newArr", newArr);
    setBoardTap(newArr);
    // const search = data.filter((item: any) => item.no === Number(index));
    // // console.log(search);

    // if (!newArr.some((item: any) => item.no === search[0].no)) {
    //   newArr.push(search[0]);
    //   setBoardTap(newArr);
    // }
  };

  useEffect(() => {
    // console.log("cookie로 tap 생성하기");
    const newArr = [...BoardTap];
    const refreshCookie: CookieValueTypes = getCookie("TapState");
    // console.log("1", newArr);
    if (refreshCookie !== undefined) {
      const parseJsonArr = JSON.parse(String(refreshCookie));
      // console.log("parseJsonArr", parseJsonArr);
      // console.log("2newArr", newArr);

      parseJsonArr.map((index: number) => {
        const search = newArr.some(
          (item: DataTypes) => item && item.no === Number(index)
        );
        // console.log(data);
        // console.log("?", isLoading);
        if (!search) {
          const filter = data?.filter(
            (item: DataTypes) => item && item.no === Number(index)
          );
          // console.log("filter?", filter);
          // console.log("useEffect filter", filter);
          if (filter !== undefined && filter.length !== 0) {
            newArr.push(filter[0]);
          }
          // filter !== undefined ? newArr.push(filter[0]) : {};
          // newArr.push(filter[0]);
        }
      });
      setBoardTap(newArr);
    }
  }, [isLoading]);

  // 쿠키에는 post_no 만 저장
  // 쿠키에서 no 가져와서 boardTap 에 no에 맞는 data 꽃아주기
  const selectPost: Function = (index: string) => {
    // console.log("????", index);
    // console.log(data);
    // console.log("?", index.substring(6));
    // console.log("selectPost");
    const search = data.filter(
      (item: DataTypes) => item.no === Number(item && index.substring(6))
    );
    //console.log(search);
    // console.log(index);
    // router.push(
    //   {
    //     pathname: `/post/${index.substring(6)}`,
    //     query: { post_url: search[0].post_url },
    //   },
    //   `/post/${index.substring(6)}`
    // );
    router.push(
      {
        pathname: `/post/${index.substring(6)}`,
      },
      `/post/${index.substring(6)}`
    );
  };

  const deletePost: Function = (index: number) => {
    // console.log("받아온 tap.no", index);
    const newArr = [...BoardTap];
    const getCookieTapState: CookieValueTypes = getCookie("TapState");

    const filtering: DataTypes[] = newArr.filter(
      (item: DataTypes) => item && item.no !== index
    );
    // console.log("필터링", filtering);
    //console.log("delete filtering", filtering);
    setBoardTap(filtering);
    const parseJsonArr: Array<number> = JSON.parse(String(getCookieTapState));
    // console.log("delete cookie parse", parseJsonArr);
    const filteringCookie = parseJsonArr.filter(
      (item: number) => item && item !== index
    );
    // console.log(filteringCookie);
    setCookie("TapState", JSON.stringify(filteringCookie));
    router.push(filtering.length === 0 ? "/" : `/post/${filtering[0].no}`);
  };

  return isLoading ? (
    <SpinnerWrap>
      <SmallSpinner />
    </SpinnerWrap>
  ) : (
    <LayoutWrap className="Layout">
      <Header />
      {/* <Nav /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#1e1e1f",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <SideTagNav data={data} boardTap={boardTapHandler} />
        {
          <ContentWrap>
            {router.pathname !== "/AdminEditor" ? (
              <TapWrap>
                {BoardTap &&
                  BoardTap.map((tap: DataTypes, i: number) => {
                    // console.log("tap", tap);
                    // console.log("substring", router.asPath.substring(6));

                    return (
                      <TapTitle
                        key={i}
                        style={{
                          cursor: "pointer",
                          color:
                            router.asPath.substring(6) === String(tap && tap.no)
                              ? "#deb77f"
                              : "#909090",
                          backgroundColor:
                            router.asPath.substring(6) === String(tap && tap.no)
                              ? "#1e1e1f"
                              : "",
                        }}
                        onClick={() => selectPost(`/post/${tap && tap.no}`)}
                      >
                        <TapText
                        // style={{
                        //   width: "100px",
                        //   textOverflow: "ellipsis",
                        //   overflow: "hidden",
                        //   whiteSpace: "nowrap",
                        // }}
                        >
                          {tap && tap.post_title}
                        </TapText>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          style={{
                            cursor: "pointer",
                            width: "18px",
                            height: "18px",
                          }}
                          onClick={(e) => {
                            [e.stopPropagation(), deletePost(tap && tap.no)];
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </TapTitle>
                    );
                  })}
              </TapWrap>
            ) : (
              <></>
            )}
            {props.children}
          </ContentWrap>
        }
      </div>

      <Footer />
    </LayoutWrap>
  );
}

export default Layout;
