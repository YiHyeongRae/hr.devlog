/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { modalCounter } from "../redux/slice/easterEggSlice";

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
  const dispatch = useDispatch();
  const router = useRouter();
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

  const string = ["q", "w", "e", "r", "a", "s", "d", "f"];
  const [test, setTest] = useState<Array<string>>();

  useEffect(() => {
    const copyArr = [];
    while (string.length >= 1) {
      var mnf = string.splice(Math.floor(Math.random() * string.length), 1)[0];
      copyArr.push(mnf);
    }
    setTest(copyArr);
  }, []);
  // console.log("문제", test?.length);
  const gimmickInput = useRef<any>(null);

  useEffect(() => {
    modal === 3
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "initial");

    gimmickInput.current.focus();
  }, [modal]);
  const inputArr: string[] = [];

  const keyRef = useRef<any>([]);
  const playGimmick: Function = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(e.key);

    // if (
    //   e.keyCode === 81 ||
    //   e.keyCode === 87 ||
    //   e.keyCode === 69 ||
    //   e.keyCode === 82 ||
    //   e.keyCode === 65 ||
    //   e.keyCode === 83 ||
    //   e.keyCode === 68 ||
    //   e.keyCode === 70
    // ) {
    //   alert("qwerasdf");
    // } else {
    //   alert("나머지");
    // }
    switch (e.key) {
      case "ㅂ":
        e.key = "q";
        break;
      case "ㅈ":
        e.key = "w";
        break;
      case "ㄷ":
        e.key = "e";
        break;
      case "ㄱ":
        e.key = "r";
        break;
      case "ㅁ":
        e.key = "a";
        break;
      case "ㄴ":
        e.key = "s";
        break;
      case "ㅇ":
        e.key = "d";
        break;
      case "ㄹ":
        e.key = "f";
        break;
    }
    inputArr.push(e.key);
    const idx = inputArr.length - 1;

    if (test && test[idx] === inputArr[idx]) {
      // console.log("비교해봅시다", test[idx], inputArr[idx]);
      // console.log(
      //   "thats right",
      //   inputArr[idx],
      //   keyRef?.current[idx]?.getAttribute("key-words")
      // );
      keyRef.current[idx].style.backgroundColor = "#ff0";
      keyRef.current[idx].style.color = "#000";

      if (test.length === inputArr.length) {
        const checkArr = JSON.stringify(test) === JSON.stringify(inputArr);

        checkArr
          ? [router.push("/login"), dispatch(modalCounter(0))]
          : [router.reload(), dispatch(modalCounter(0))];
      }
    } else if (test && test[idx] !== inputArr[idx]) {
      for (let i = 0; i < keyRef.current.length; i++) {
        keyRef.current[i].style.backgroundColor = "#000";
        keyRef.current[i].style.color = "#fff";
      }
      inputArr.splice(0);
      const copyArr = [];
      while (string.length >= 1) {
        var mnf = string.splice(
          Math.floor(Math.random() * string.length),
          1
        )[0];
        copyArr.push(mnf);
      }
      setTest(copyArr);
    }
    // console.log("테스트", test);
    // console.log("inputArr, idx", inputArr, idx);
  };

  // useEffect(() => {
  //   const idx = inputArr.length - 1;

  //   console.log(
  //     "thats right",
  //     inputArr[idx],
  //     keyRef?.current[idx]?.getAttribute("key-words")
  //   );
  // }, [playGimmick]);
  return (
    <ModalWrapper
      style={modal === 3 ? { display: "block" } : { display: "none" }}
      onClick={() => gimmickInput.current.focus()}
    >
      <ModalContent>
        <h2 style={{ textAlign: "center", fontSize: 40, marginBottom: 60 }}>
          TEST
        </h2>
        <div
          className="key-wrap"
          style={{ display: "flex", flexDirection: "row" }}
        >
          {test?.map((alphabet, i) => {
            return (
              <p
                key={i}
                key-words={alphabet}
                ref={(el) => (keyRef.current[i] = el)}
              >
                {alphabet.toUpperCase()}
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
            className="gimmick-input"
            ref={gimmickInput}
            onKeyDown={(e) => playGimmick(e)}
            readOnly
            style={{ backgroundColor: "#000", border: 0, outline: "none" }}
          />
        </div>
      </ModalContent>
      <style jsx>
        {`
          .key-wrap p {
            border: 1px solid #fff;
            padding: 10px;
            margin-right: 10px;
          }
        `}
      </style>
    </ModalWrapper>
  );
}

export default Modal;
