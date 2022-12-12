import { NextPage } from "next";
import { useSession } from "next-auth/react";
import MainCircleList from "./components/MainCircleList";
import SEO from "./components/SEO";

const Home: NextPage = ({ list }: any) => {
  // console.log("홈 서버사이드 리스트", list);

  const { data, status } = useSession();

  console.log("로그인 정보", data, status);
  return (
    <div className="content-wrap">
      <SEO title="HOME" />
      <MainCircleList data={list} />
    </div>
  );
};

export async function getServerSideProps(ctx: any) {
  // console.log(ctx);
  const res = await fetch("https://hr-devlog.vercel.app/api/selectDb");
  const data = await res.json();
  // console.log(":::::", res);

  // console.log(":::::",context);
  return {
    props: { list: data }, // will be passed to the page component as props
  };
}

export default Home;
