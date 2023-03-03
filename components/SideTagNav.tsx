import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const SideWrap = styled.div`
  display: flex;
  /* width: 200px; */
  /* height: calc(100vh - 32px); */
  /* flex-basis: 250px; */
`;

const SideTagWrap = styled.ul`
  display: flex;

  flex-direction: column;
  background-color: #323233;
`;

const SideTagItem = styled.li`
  width: 100%;
  list-style-type: none;
  border-left: 2px solid #fff;

  padding: 5px;
  cursor: pointer;
`;

const SideListWrap = styled.div`
  /* height: calc(100vh - 54px); */
  /* flex-basis: 150px; */
  line-height: 24px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  background-color: #252527;
  z-index: 100;
  flex-basis: 200px;
  position: relative;
`;

const SideListTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 13px;
  padding-right: 6px;
  /* padding-top: 5px;
  padding-bottom: 5px; */
  font-family: "MapleLight";
  line-height: 37.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SideListItem = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  cursor: pointer;
  list-style-type: none;
`;

const PostListWrap = styled.ul`
  width: 100%;
`;
const PostTitle = styled.li`
  list-style-type: none;
  font-family: "MapleLight";
  color: #909090;
`;

const TooltipBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 10px;
  background-color: #323233;
  border-radius: 5px;
  border-top-left-radius: 0;

  &::before {
    content: "";
    display: block;
    border: 8px solid #323233;
    border-left-color: transparent;
    border-top-color: transparent;
    border-right-color: #323233;
    border-bottom-color: transparent;
    position: absolute;
    left: -16px;
    top: 0;
  }
`;
interface SideTagNavTypes {
  data: Array<object>;
  boardTap: Function;
}
function SideTagNav({ data, boardTap }: SideTagNavTypes) {
  // console.log("sideTageNav", data);
  const router = useRouter();

  const selectPost: Function = (
    e: React.MouseEvent<HTMLLIElement>,
    index: number
  ) => {
    e.stopPropagation(), boardTap(index);
    // router.push(
    //   {
    //     pathname: `/post/${index}`,
    //     query: { post_url: content.post_url },
    //   },
    //   `/post/${index}`
    // );
    // router.push(
    //   {
    //     pathname: `/post/${index}`,
    //   },
    //   `/post/${index}`
    // );
  };

  const [isMobile, setIsMobile] = useState<boolean>();
  const [menuState, setMenuState] = useState(0);

  const forMobile: Function = () => {
    const user = navigator.userAgent;
    // noneExpireSetCookie("splash", "none-expire");
    // const asdf = noneExpireGetCookie("splash");
    // console.log("none-cookie", asdf);

    if (user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1) {
      setIsMobile(true), setMenuState(5);
    }
  };
  useEffect(() => {
    forMobile();
  }, []);

  const MenuSelect: Function = (currentMenuState: number) => {
    if (currentMenuState === menuState) {
      setMenuState(10);
    } else {
      setMenuState(currentMenuState);
    }
  };

  const [hoverState, setHoverState] = useState<boolean>(false);
  const [hoverTitle, setHoverTitle] = useState<string>("");
  const [{ cordiX, cordiY }, setCordi] = useState({ cordiX: 0, cordiY: 0 });
  const titleHover: Function = (e: React.MouseEvent<HTMLLinkElement>) => {
    console.log(e.currentTarget.offsetWidth);
    setHoverState(true),
      setCordi({
        cordiX: e.currentTarget.offsetLeft,
        cordiY: e.currentTarget.offsetTop,
      }),
      setHoverTitle(e.currentTarget.innerText);
  };

  return (
    <SideWrap>
      {hoverState && (
        <TooltipBox
          className="tool-tip"
          style={{ left: cordiX + 159, top: cordiY + 40 }}
        >
          {hoverTitle}
        </TooltipBox>
      )}

      <SideTagWrap>
        <SideTagItem
          style={{ borderLeft: menuState === 0 ? "2px solid #fff" : "0" }}
          onClick={() => MenuSelect(0)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{
              width: "24px",
              color: menuState === 0 ? "#fff" : "#909090",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
            />
          </svg>
        </SideTagItem>
        <SideTagItem style={{ borderLeft: 0 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "24px", color: "#909090" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </SideTagItem>
        <SideTagItem style={{ borderLeft: 0 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "24px", color: "#909090" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
        </SideTagItem>
      </SideTagWrap>
      <SideListWrap
        id="side-list-wrap"
        style={menuState === 0 ? { display: "flex" } : { display: "none" }}
      >
        <SideListTitle>
          <p>탐색기</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "20px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </SideListTitle>
        <SideListItem>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "14px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
          <p>HR.DEVLOG</p>
          <PostListWrap>
            {data &&
              data?.map((data: any, i) => {
                // console.log("data", data);
                return (
                  <PostTitle
                    key={i}
                    style={
                      router.asPath.substring(6) === String(data.no)
                        ? { backgroundColor: "#1e1e1f" }
                        : {}
                    }
                  >
                    <Link
                      href={{ pathname: `/post/${data.no}` }}
                      as={`/post/${data.no}`}
                      style={{
                        color:
                          router.asPath.substring(6) === String(data.no)
                            ? "#deb77f"
                            : "#fff",
                        padding: "0 16px",
                        display: "block",
                      }}
                      onClick={(e) => selectPost(e, data.no)}
                      onMouseEnter={(e) => titleHover(e)}
                      onMouseLeave={() => setHoverState(false)}
                      className="Link"
                    >
                      {data.post_title}
                    </Link>
                  </PostTitle>
                );
              })}
          </PostListWrap>
        </SideListItem>
      </SideListWrap>
    </SideWrap>
  );
}

export default SideTagNav;
