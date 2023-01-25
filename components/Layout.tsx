import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import useSWRImmutable from "swr/immutable";
import Footer from "./Footer";
import Header from "./Header";
import SideTagNav from "./SideTagNav";
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

function Layout({ children }: any) {
  // const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const router = useRouter();

  const { data, error } = useSWRImmutable("/api/selectDb", fetcher);

  const [BoardTap, setBoardTap] = useState<Array<object>>([]);
  // console.log("boardTap?", BoardTap);
  const boardTapHandler: Function = (index: number) => {
    // console.log("boardTapHandler", index);
    const newArr: any = [...BoardTap];
    // console.log("newArr1", newArr);
    const search = data.filter((item: any) => item.no === Number(index));
    // console.log(search);

    if (!newArr.some((item: any) => item.no === search[0].no)) {
      newArr.push(search[0]);
      setBoardTap(newArr);
    }
  };

  const selectPost: Function = (index: string) => {
    // console.log("????", index);
    // console.log(data);
    // console.log("?", index.substring(6));
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
  return (
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
        <SideTagNav data={data} selectedPost={boardTapHandler} />
        {
          <ContentWrap>
            <TapWrap>
              {BoardTap &&
                BoardTap.map((tap: any, i: any) => {
                  console.log("tap", tap);
                  console.log("substring", router.asPath.substring(6));
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
                          e.stopPropagation(), console.log(i);
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
            {children}
          </ContentWrap>
        }
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
