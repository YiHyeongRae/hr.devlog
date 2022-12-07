import { NextPage } from "next";
import MainCircleList from "./components/MainCircleList";
import SEO from "./components/SEO";

const Home: NextPage = ({ list }: any) => {
  console.log("홈 서버사이드 리스트", list);
  return (
    <div className="content-wrap">
      <SEO title="HOME" />
      <MainCircleList data={list} />
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/selectDb");
  const data = await res.json();
  // console.log(":::::", res);

  // console.log(":::::",context);
  return {
    props: { list: data }, // will be passed to the page component as props
  };
}

export default Home;
