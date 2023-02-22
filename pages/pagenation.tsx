import React, { useRef } from "react";
import styled from "styled-components";

const Paging = styled.div`
  width: 100%;
  height: 200vh;
`;
function Pagenation() {
  const divRef = useRef<any>(null);
  function test(e: any) {
    console.log(e);
    const fs = e.target.files || [];
    const url = URL.createObjectURL(fs[0]);

    // const asdf = generateSeatingPlan(url);
    // generateSeatMap(url, , 60);
  }

  // function generateSeatMap(imageSrc: any, seatWidth: any, seatHeight: any) {
  //   const image = new Image();
  //   image.src = imageSrc;
  //   image.onload = function () {
  //     const canvas = document.createElement("canvas");
  //     canvas.width = image.width;
  //     canvas.height = image.height;
  //     const context: any = canvas.getContext("2d");
  //     context.drawImage(image, 0, 0);
  //     divRef.current.appendChild(image);
  //     console.log(image, image.width, image.height);
  //     console.log("context darwImage", context.drawImage(image, 0, 0));
  //     console.log("context", context);
  //     const pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
  //     console.log(pixelData);
  //     const seatMap = document.createElement("div");
  //     seatMap.classList.add("seat-map");

  //     const seatRows = [];
  //     const colors: any = [];

  //     for (let y = 0; y < image.height; y += seatHeight) {
  //       const seatRow = document.createElement("div");
  //       seatRow.classList.add("seat-row");

  //       for (let x = 0; x < image.width; x += seatWidth) {
  //         const pixelData = context.getImageData(
  //           x,
  //           y,
  //           seatWidth,
  //           seatHeight
  //         ).data;

  //         const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;

  //         if (!colors.includes(color)) {
  //           colors.push(color);
  //         }

  //         const seat = document.createElement("div");
  //         seat.classList.add("seat");
  //         seat.classList.add(`seat-${colors.indexOf(color)}`);
  //         seatRow.appendChild(seat);
  //       }

  //       seatRows.push(seatRow);
  //       seatMap.appendChild(seatRow);
  //     }
  //     // const pDiv: any = document.getElementById("testDiv");
  //     // document.body.appendChild(seatMap);
  //     // console.log(seatMap);

  //     divRef.current.appendChild(seatMap);
  //   };
  // }
  return (
    <div>
      <input type="file" onChange={(e: any) => test(e.currentTarget.value)} />
      <div id="testDiv" ref={divRef}></div>
    </div>
  );
}

export default Pagenation;
