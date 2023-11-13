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
  const viewerRef = useRef(null);

  const [userText, setUserText] = useState<string>("");
  const [textToView, setTextToView] = useState<string[]>();
  const textHandler: Function = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(viewerRef.current);
    const texts = e.currentTarget.value.split("\n");

    const tagRegExp = /(`p|`div|`span)/g;

    const mnfText: any = [];
    // console.log(texts);

    texts.map((item) => {
      const endIndex = item.indexOf(")");
      // console.log("index", endIndex);

      // console.log(item.substring(0, endIndex));

      const centenceObj = {
        tag: item.substring(0, endIndex),
        desc: item.substring(endIndex + 2),
      };

      mnfText.push(centenceObj);
    });

    // console.log(mnfText);

    const textArr: any = [];

    mnfText.map((item: any) => {
      let tagTransLate;
      switch (item.tag) {
        case "디브":
          tagTransLate = "div";
          break;
        default:
          tagTransLate = item.tag;
          break;
      }
      const htmlString = `<${tagTransLate}>${item.desc}</${tagTransLate}>`;
      textArr.push(htmlString);
    });

    setTextToView(textArr);
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
  // console.log("?", textToView);
  // console.log("?!!", textToView?.toString().replace(",", ""));

  return (
    <div style={{ width: "100%" }}>
      <h1>editor</h1>
      {/* 
      <EditorWrapper>
        <EditorEdit>
          <EditArea onChange={(e) => textHandler(e)} />
        </EditorEdit>
        <EditorView
          ref={viewerRef}
          dangerouslySetInnerHTML={{
            __html: String(textToView?.toString().replace(",", "")),
          }}
        ></EditorView>
      </EditorWrapper>
      */}
      <p>잠정 중단</p>
    </div>
  );
}

export default Editor;
