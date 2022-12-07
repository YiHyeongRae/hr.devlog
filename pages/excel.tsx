import React from "react";
import { utils, writeFileXLSX } from "xlsx";

function excel() {
  const data = [
    { no: 1, Name: "Bill Clinton", Index: 42 },
    { no: 2, Name: "GeorgeW Bush", Index: 43 },
    { no: 3, Name: "Barack Obama", Index: 44 },
    { no: 4, Name: "Donald Trump", Index: 45 },
    { no: 5, Name: "Joseph Biden", Index: 46 },
  ];
  const submitExcel: Function = () => {
    const webSheet = utils.json_to_sheet(data);
    const webBook = utils.book_new();
    utils.book_append_sheet(webBook, webSheet, "Data");
    writeFileXLSX(webBook, "test.xlsx");
  };

  return (
    <div style={{ height: "100vh", textAlign: "center" }}>
      <button type="button" onClick={() => submitExcel()}>
        execl로 추출하기
      </button>
      <style jsx>
        {`
          button {
            display: inline-block;
            padding: 20px;
          }
        `}
      </style>
    </div>
  );
}

export default excel;
