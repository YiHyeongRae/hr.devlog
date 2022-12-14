import { NextPage } from "next";
import { useSession } from "next-auth/react";
import MainCircleList from "../components/MainCircleList";
import SEO from "../components/SEO";
import crypto from "crypto";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ModalType } from "../redux/slice/easterEggSlice";

const Home: NextPage = ({ list }: any) => {
  // console.log("홈 서버사이드 리스트", list);

  const { data, status } = useSession();

  const modal = useSelector((state: ModalType) => state.modal);
  console.log("모다알", modal);

  return (
    <div className="content-wrap">
      <SEO title="HOME" />
      <MainCircleList data={list} />
    </div>
  );
};

export async function getServerSideProps(ctx: any) {
  // console.log(ctx);
  // const res = await fetch("https://hr-devlog.vercel.app/api/selectDb");
  const res = await fetch("http://localhost:3000/api/selectDb");

  const data = await res.json();
  // console.log(":::::", res);

  // console.log(":::::",context);
  return {
    props: { list: data }, // will be passed to the page component as props
  };
}

export default Home;
