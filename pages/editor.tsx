import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const EditorWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

const EditorEdit = styled.div`
  width: 50%;
`;

const EditArea = styled.textarea`
  width: 100%;
  min-height: 50vh;
`;

const EditorView = styled.div`
  width: 50%;
`;
function Editor() {
  const router = useRouter();

  console.log("editor", router);
  const viewerRef = useRef(null);

  const [userText, setUserText] = useState<string>("");
  const [textToView, setTextToView] = useState<string[]>();
  const textHandler: Function = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e);

    // console.log(viewerRef.current);
    const texts = e.currentTarget.value.split("\n");

    const tagRegExp = /(`p|`div|`span)/g;

    const mnfText = [{}];
    texts.map((item) => {
      const tagName = item.match(tagRegExp);
      // const tagName2 = tagName && tagName.substring(2);
      console.log(item);
      console.log("map으로 봐보자", item.startsWith("p", 1));
      // console.log("백틱 제거해보자", tagName.substring(2));
    });
  };

  // useEffect(() => {
  //   const testValue = userText.split("`p ");

  //   const filtering = testValue.filter((item) => item !== "");

  //   const mapTest: any = [];

  //   filtering.map((item: any) => {
  //     mapTest.push(item.replace("\n", ""));
  //   });

  //   console.log(mapTest);
  //   setTextToView(mapTest);
  // }, [userText]);

  // console.log(userText.split("\n"));
  // console.log(textToView);
  return (
    <div style={{ width: "100%" }}>
      <h1>editor</h1>

      <EditorWrapper>
        <EditorEdit>
          <EditArea onChange={(e) => textHandler(e)} />
        </EditorEdit>
        <EditorView ref={viewerRef}>{`${textToView?.toString()}`}</EditorView>
      </EditorWrapper>
    </div>
  );
}

export default Editor;
