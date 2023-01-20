import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const SideWrap = styled.div`
  display: flex;
  width: 200px;
  height: 100%;
  flex-grow: 0;
`;

const SideTagWrap = styled.ul`
  width: 50px;
  display: flex;

  flex-direction: column;
  background-color: #323233;
`;

const SideTagItem = styled.li`
  width: 100%;
  list-style-type: none;
  border-left: 2px solid #fff;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  cursor: pointer;
`;

const SideListWrap = styled.ul`
  height: calc(100vh - 54px);
  flex-basis: 150px;
  line-height: 24px;
  font-size: 12px;
  display: flex;
  padding-left: 5px;
  flex-direction: column;
  background-color: #252527;
`;

const SideListTitle = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 13px;
  padding-right: 6px;
  /* padding-top: 5px;
  padding-bottom: 5px; */
  font-family: "MapleLight";
  line-height: 37.5px;
`;

const SideListItem = styled.li`
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
  text-indent: 16px;
`;
interface SideTagNavTypes {
  data: Array<object>;
  selectedPost: Function;
}
function SideTagNav({ data, selectedPost }: SideTagNavTypes) {
  // console.log("sideTageNav", data);
  const router = useRouter();

  const selectPost: Function = (
    e: React.MouseEvent<HTMLLIElement>,
    content: any,
    index: number
  ) => {
    e.stopPropagation(), selectedPost(index);
    router.push(
      {
        pathname: `/post/${index}`,
        query: { post_url: content.post_url },
      },
      `/post/${index}`
    );
  };
  return (
    <SideWrap>
      <SideTagWrap>
        <SideTagItem>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "24px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
            />
          </svg>
        </SideTagItem>
        <SideTagItem>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "24px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </SideTagItem>
        <SideTagItem>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "24px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
        </SideTagItem>
      </SideTagWrap>
      <SideListWrap>
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

        {/* <SideListItem>
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
          <p>열려 있는 편집기</p>
        </SideListItem> */}
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
                return (
                  <PostTitle
                    key={i}
                    onClick={(e) => selectPost(e, data, i)}
                    style={
                      router.asPath.substring(6) === String(i)
                        ? { color: "#deb77f", backgroundColor: "#1e1e1f" }
                        : { color: "#909090" }
                    }
                  >
                    {data.post_title}
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
