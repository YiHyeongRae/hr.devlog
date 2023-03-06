import Head from "next/head";
import { FunctionComponent } from "react";

interface SEOTYPES {
  title: string;
}

const SEO = ({ title }: SEOTYPES) => {
  return (
    <>
      <Head>
        <title>{`${title} - hr.devlog`}</title>
        <meta name="theme-color" content="#000000" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1, user-scalable=0"
        />
        <meta name="title" content="hr-devlog" />
        <meta name="description" content="개발 기록을 남기는 개인 블로그" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="hr-devlog" />
        <meta
          property="og:description"
          content="개발 기록을 남기는 개인 블로그"
        />{" "}
        <meta property="og:url" content="https://hr-devlog.vercel.app/" />
      </Head>
    </>
  );
};

export default SEO;
