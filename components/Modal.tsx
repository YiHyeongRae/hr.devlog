/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: #000;
`;

const ModalContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

function Modal({ modal }: { modal: number }) {
  // console.log("모달 프롭스", modal);
  // const string = [
  //   "A",
  //   "B",
  //   "C",
  //   "D",
  //   "E",
  //   "F",
  //   "G",
  //   "H",
  //   "I",
  //   "J",
  //   "K",
  //   "L",
  //   "M",
  //   "N",
  //   "O",
  //   "P",
  //   "Q",
  //   "R",
  //   "S",
  //   "T",
  //   "U",
  //   "V",
  //   "W",
  //   "X",
  //   "Y",
  //   "Z",
  // ];

  const string = ["Q", "W", "E", "R", "A", "S", "D", "F"];
  const [test, setTest] = useState<Array<string>>();

  useEffect(() => {
    const copyArr = [];
    while (string.length >= 1) {
      var mnf = string.splice(Math.floor(Math.random() * string.length), 1)[0];
      copyArr.push(mnf);
    }
    setTest(copyArr);
  }, []);

  useEffect(() => {
    modal === 3
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "initial");
  }, [modal]);

  const playGimmick: Function = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(e.key);
    const inputArr: string[] = [];
    const copyInputArr = [...inputArr];
    copyInputArr.push(e.key);

    console.log(copyInputArr);
  };
  return (
    <ModalWrapper
      style={modal === 3 ? { display: "block" } : { display: "none" }}
    >
      <ModalContent>
        <h2 style={{ textAlign: "center", fontSize: 40, marginBottom: 60 }}>
          TEST
        </h2>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {test?.map((alphabet, i) => {
            return (
              <p
                style={{
                  border: "1px solid #fff",
                  padding: 10,
                  marginRight: 10,
                }}
                key={i}
              >
                {alphabet}
              </p>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px 0",
          }}
        >
          <input
            onKeyDown={(e) => playGimmick(e)}
            style={{ width: "100%" }}
            readOnly
          />
        </div>
      </ModalContent>
    </ModalWrapper>
  );
}

export default Modal;
