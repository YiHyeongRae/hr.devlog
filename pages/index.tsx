import { NextPage } from "next";
import { useSession } from "next-auth/react";
import MainCircleList from "../components/MainCircleList";
import SEO from "../components/SEO";
import { useSelector } from "react-redux";
import { ReducerStates } from "../redux/store";
import Modal from "../components/Modal";
import axios from "axios";

const Home: NextPage = ({ list }: any) => {
  // console.log("홈 서버사이드 리스트", list);

  const modal = useSelector(
    (state: ReducerStates) => state.modalStore.modalState
  );
  // console.log("모다알", modal);
  const apiPostTest: Function = async () => {
    console.log(1);
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/regist/postReg",
        {
          data: {
            postTitle: "2번글 테스트 제목입니다",
            postTag: "태그 테스트, 태그테스트2, 태그태그태그, 태그",
            urlKey: "test.url.com",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="content-wrap">
      <div onClick={() => apiPostTest()}>api test 입니다.</div>
      <SEO title="HOME" />
      <MainCircleList data={list} />
      <Modal modal={modal} />
    </div>
  );
};

export async function getServerSideProps(ctx: any) {
  // const res = await fetch(
  //   process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/selectDb"
  // );

  // const res = await fetch("http://localhost:3000/api/selectDb");
  // const res = await fetch("https://hr-devlog.vercel.app/api/selectDb");
  // const res = await axios.get("http://localhost:3000/api/selectDb");
  const res = await axios.get(
    process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/selectDb"
  );
  // console.log("getServerSideProps RES.data", res.data);
  const data = res.data;

  // console.log(
  //   "이거 어떻게 되는지 한번 보자",
  //   process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/selectDb"
  // );
  // console.log("res", res);
  // console.log("데이타", data);
  return {
    props: { list: data }, // will be passed to the page component as props
  };
}

export default Home;
