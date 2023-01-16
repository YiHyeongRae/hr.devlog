import { NextPage } from "next";
import { useSession } from "next-auth/react";
import MainCircleList from "../components/MainCircleList";
import SEO from "../components/SEO";
import { useSelector } from "react-redux";
import { ReducerStates } from "../redux/store";
import Modal from "../components/Modal";
import axios from "axios";
import SideTagNav from "../components/SideTagNav";

const Home: NextPage = ({ list }: any) => {
  // console.log("홈 서버사이드 리스트", list);

  const modal = useSelector(
    (state: ReducerStates) => state.modalStore.modalState
  );
  // console.log("모다알", modal);
  return (
    <div className="content-wrap">
      <SEO title="HOME" />
      <SideTagNav />
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

  const data = res.data;

  return {
    props: { list: data }, // will be passed to the page component as props
  };
}

export default Home;
