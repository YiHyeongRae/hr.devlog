import axios from "axios";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";
import Footer from "./Footer";
import Header from "./Header";
import SideTagNav from "./SideTagNav";
import { getCookie, setCookie } from "cookies-next";
import loadConfig from "next/dist/server/config";

const fetcher = (url: any) => fetch(url).then((r) => r.json());

const ContentWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const TapWrap = styled.ul`
  background-color: #2c2d2d;
  display: flex;
`;
const TapTitle = styled.li`
  list-style-type: none;
  font-family: "MapleLight";
  font-size: 12px;
  line-height: 37.5px;

  border-right: 1px solid #252526;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
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

function Layout({ children }: any) {
  // const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const router = useRouter();

  // const { data } = useSWRImmutable("/api/selectDb", fetcher);
  const { data, isLoading } = useSWR("/api/selectDb", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  console.log(isLoading);

  const [BoardTap, setBoardTap] = useState<Array<object>>([]);
  // console.log("boardTap?", BoardTap);
  const boardTapHandler: Function = (index: number) => {
    const cookieArr = [];
    cookieArr.push(index);
    // console.log("BoardTap", index);

    // setCookie("TapState", JSON.stringify(cookieArr));
    const getCookieTapState: any = getCookie("TapState");
    if (getCookieTapState === undefined) {
      setCookie("TapState", JSON.stringify(cookieArr));
    } else {
      const parseJsonArr = JSON.parse(getCookieTapState);
      if (!parseJsonArr.some((item: any) => item === index)) {
        parseJsonArr.push(index);
        setCookie("TapState", JSON.stringify(parseJsonArr));
      }
      // console.log("getTapState Parse", JSON.parse(getCookieTapState));
    }
    const afterCookie: any = getCookie("TapState");
    const parseJsonArr = JSON.parse(afterCookie);
    // console.log("TapState Parse", JSON.parse(getTapState));
    // console.log("boardTapHandler", index);
    const newArr: any = [...BoardTap];
    // console.log("newArr1", newArr);

    // console.log("parseJsonArr", parseJsonArr);

    parseJsonArr.map((index: any) => {
      const search = newArr.some((item: any) => item.no === Number(index));
      console.log(search);
      if (!search) {
        const filter = data.filter((item: any) => item.no === Number(index));
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
    const refreshCookie: any = getCookie("TapState");

    if (refreshCookie !== undefined) {
      const parseJsonArr = JSON.parse(refreshCookie);
      parseJsonArr.map((index: any) => {
        const search = newArr.some((item: any) => item.no === Number(index));
        // console.log(data);
        // console.log("?", isLoading);
        if (!search) {
          const filter = data?.filter((item: any) => item.no === Number(index));

          // console.log("useEffect filter", filter);
          filter !== undefined ? newArr.push(filter[0]) : {};
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
      (item: any) => item.no === Number(index.substring(6))
    );
    //console.log(search);
    // console.log(index);
    router.push(
      {
        pathname: `/post/${index.substring(6)}`,
        query: { post_url: search[0].post_url },
      },
      `/post/${index.substring(6)}`
    );
  };

  const deletePost: Function = (index: number) => {
    // console.log("받아온 tap.no", index);
    const newArr = [...BoardTap];
    const getCookieTapState: any = getCookie("TapState");

    const filtering: any = newArr.filter((item: any) => item.no !== index);
    // console.log("필터링", filtering);
    //console.log("delete filtering", filtering);
    setBoardTap(filtering);
    const parseJsonArr = JSON.parse(getCookieTapState);
    //  console.log("delete cookie parse", parseJsonArr);
    const filteringCookie = parseJsonArr.filter((item: any) => item !== index);
    // console.log(filteringCookie);
    setCookie("TapState", JSON.stringify(filteringCookie));
    router.push(filtering.length === 0 ? "/" : `/post/${filtering[0].no}`);
  };
  return isLoading ? (
    <SpinnerWrap>
      <SmallSpinner />
    </SpinnerWrap>
  ) : (
    <div className="Layout">
      <Header />
      {/* <Nav /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#1e1e1f",
        }}
      >
        <SideTagNav data={data} boardTap={boardTapHandler} />
        {
          <ContentWrap>
            {router.pathname !== "/AdminEditor" ? (
              <TapWrap>
                {BoardTap &&
                  BoardTap.map((tap: any, i: any) => {
                    // console.log("tap", tap);
                    // console.log("substring", router.asPath.substring(6));

                    return (
                      <TapTitle
                        key={i}
                        style={{
                          cursor: "pointer",
                          color:
                            router.asPath.substring(6) === String(tap.no)
                              ? "#deb77f"
                              : "#909090",
                          backgroundColor:
                            router.asPath.substring(6) === String(tap.no)
                              ? "#1e1e1f"
                              : "",
                        }}
                        onClick={() => selectPost(`/post/${tap.no}`)}
                      >
                        <p>{tap.post_title}</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          style={{
                            width: "18px",
                            height: "18px",
                            margin: "0 10px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            [e.stopPropagation(), deletePost(tap.no)];
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
            {children}
          </ContentWrap>
        }
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
