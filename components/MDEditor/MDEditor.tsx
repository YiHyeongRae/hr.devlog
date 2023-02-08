import type { NextPage } from "next";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  ICommand,
  title,
  title1,
  title2,
  title3,
  title4,
  title5,
  title6,
  bold,
  codeBlock,
  italic,
  strikethrough,
  hr,
  group,
  divider,
  link,
  quote,
  code,
  image,
  unorderedListCommand,
  orderedListCommand,
  checkedListCommand,
} from "@uiw/react-md-editor/lib/commands";
import { useS3Upload } from "next-s3-upload";
import aws from "aws-sdk";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface EditorTypes {
  setS3File: Function;
  setImportImgList: Function;
}
const Editor: Function = ({ setS3File, setImportImgList }: EditorTypes) => {
  const { uploadToS3 } = useS3Upload();
  const [imgList, setImgList] = useState<Array<string>>([]);
  const [imgKey, setImgKey] = useState<Array<string>>([]);
  const [currentText, setCurrentText] = useState();
  const addImage: ICommand = {
    name: "addImage",
    keyCommand: "addImage",
    buttonProps: { "aria-label": "Insert title3" },
    icon: (
      <svg width="12" height="12" viewBox="0 0 520 520">
        <path
          fill="currentColor"
          d="M716.8 921.6a51.2 51.2 0 1 1 0 102.4H307.2a51.2 51.2 0 1 1 0-102.4h409.6zM475.8016 382.1568a51.2 51.2 0 0 1 72.3968 0l144.8448 144.8448a51.2 51.2 0 0 1-72.448 72.3968L563.2 541.952V768a51.2 51.2 0 0 1-45.2096 50.8416L512 819.2a51.2 51.2 0 0 1-51.2-51.2v-226.048l-57.3952 57.4464a51.2 51.2 0 0 1-67.584 4.2496l-4.864-4.2496a51.2 51.2 0 0 1 0-72.3968zM512 0c138.6496 0 253.4912 102.144 277.1456 236.288l10.752 0.3072C924.928 242.688 1024 348.0576 1024 476.5696 1024 608.9728 918.8352 716.8 788.48 716.8a51.2 51.2 0 1 1 0-102.4l8.3968-0.256C866.2016 609.6384 921.6 550.0416 921.6 476.5696c0-76.4416-59.904-137.8816-133.12-137.8816h-97.28v-51.2C691.2 184.9856 610.6624 102.4 512 102.4S332.8 184.9856 332.8 287.488v51.2H235.52c-73.216 0-133.12 61.44-133.12 137.8816C102.4 552.96 162.304 614.4 235.52 614.4l5.9904 0.3584A51.2 51.2 0 0 1 235.52 716.8C105.1648 716.8 0 608.9728 0 476.5696c0-132.1984 104.8064-239.872 234.8544-240.2816C258.5088 102.144 373.3504 0 512 0z"
        />
      </svg>
    ),
    execute: (state: any) => {
      fileInput.current.click();
      setCurrentText(state.text);
      // const handleFileChange = async () => {
      //   try {
      //     const res = await uploadToS3(fileInput?.current.files[0], {
      //       endpoint: {
      //         request: {
      //           headers: {},
      //           body: {
      //             type: "image",
      //             fileName: fileInput?.current.files[0].name,
      //           },
      //         },
      //       },
      //     });
      //     setMd(`${state.text}\n![](${res.url})`);
      //     alert("if문 안으로 들어왔습니다.");
      //   } catch (error: any) {
      //     console.log(error);
      //     alert("사진 업로드에 실패했습니다.");
      //   }
      // };
    },
  };

  const handleFileChange = async (e: React.ChangeEvent<any>) => {
    try {
      const res = await uploadToS3(fileInput?.current.files[0], {
        endpoint: {
          request: {
            headers: {},
            body: {
              type: "image",
              fileName: fileInput?.current.files[0].name,
            },
          },
        },
      });
      console.log("img-key?", res);
      setMd(`${currentText}\n![](${res.url})`);
      const copyImgArr = imgList;
      const copyKeyArr = imgKey;
      copyImgArr.push(res.url);
      copyKeyArr.push(res.key);
      setImportImgList(copyImgArr);
      setImgKey(copyKeyArr);
    } catch (error: any) {
      console.log(error);
      alert("사진 업로드에 실패했습니다.");
    }
  };

  const fileInput = useRef<any>(null);
  const [md, setMd] = useState<string | undefined>("");
  // console.log(setS3File);
  useEffect(() => {
    setS3File(md);
    // console.log(md);
  }, [md, setS3File]);

  const deleteFile: Function = (e: React.MouseEvent) => {
    const answer = confirm(
      "정말로 삭제하시겠습니까?\n데이터베이스에서 삭제됩니다."
    );

    if (answer) {
      const idx: any = e.currentTarget.getAttribute("data-idx");
      const s3 = new aws.S3({
        accessKeyId: process.env.VERCEL_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.VERCEL_AWS_SECRET_ACCESS_KEY,
        region: process.env.VERCEL_AWS_REGION,
      });

      s3.deleteObject(
        { Bucket: "hr.devlog", Key: imgKey[idx] },
        (err, data) => {
          console.error("???", err);
          console.log("!!!", data);
        }
      );

      const copyMd = md;
      const replaceMd = copyMd?.replace(`![](${imgList[idx]})`, "");
      const copyImgList = imgList;

      copyImgList.splice(idx, 1);

      setImportImgList(copyImgList);
      setMd(replaceMd);
    } else {
      alert("삭제가 취소되었습니다.");
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <input
        className="file-input"
        ref={fileInput}
        type="file"
        onChange={(e) => handleFileChange(e)}
      />

      {/* <table
        summary="uploaded-img-list"
        style={{ width: "100%", margin: "20px 0" }}
      >
        <thead>
          <tr>
            <th
              colSpan={3}
              style={{ color: "#fedcba", padding: "20px 0", fontSize: 20 }}
            >
              업로드된 이미지 리스트
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>NO</th>
            <th>파일 URL</th>
            <th>삭제</th>
          </tr>
          {imgList?.map((img, i) => {
            return (
              <tr
                key={i}
                style={{ textAlign: "center", fontFamily: "MapleLight" }}
              >
                <td>{i}</td>
                <td style={{ width: "90%", fontSize: "11px" }}>{img}</td>
                <td
                  data-idx={i}
                  style={{ cursor: "pointer", textAlign: "center" }}
                  onClick={(e) => deleteFile(e)}
                >
                  X
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
      {/* <ul>
        <li style={{ color: "#fedcba", border: 0 }}>업로드된 사진 리스트</li>
        {imgList.map((img, i) => {
          return (
            <li key={i}>
              <p style={{ width: "90%", fontSize: "11px" }}>{img}</p>
              <p
                data-idx={i}
                style={{ cursor: "pointer", textAlign: "center" }}
                onClick={(e) => deleteFile(e)}
              >
                X
              </p>
            </li>
          );
        })}
      </ul> */}
      <MDEditor
        value={md}
        onChange={setMd}
        commands={[
          group([title, title1, title2, title3, title4, title5, title6], {
            name: "title",
            groupName: "title",
            buttonProps: { "aria-label": "Insert title" },
          }),
          bold,
          codeBlock,
          italic,
          strikethrough,
          hr,
          addImage,
          divider,
          link,
          quote,
          code,
          image,
          unorderedListCommand,
          orderedListCommand,
          checkedListCommand,
        ]}
      />
      <style jsx>
        {`
          ul {
            width:50%;
            padding-top: 10px;
            margin-left:10px;
          }
          li {
      
            display:flex;
            flex-direction:row
            padding: 10px;
            font-family: MapleLIght;
            margin-bottom:10px;

          
          }
          .file-input{
            display:none;
          }
          tbody tr th{
            padding-bottom:20px;
          }
        `}
      </style>
    </div>
  );
};

export default Editor;
