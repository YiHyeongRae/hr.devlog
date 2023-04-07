import Head from "next/head";
import { FunctionComponent } from "react";

interface SEOTYPES {
  title: string;
  desc?: string;
}

const SEO = ({ title, desc }: SEOTYPES) => {
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
        <meta name="title" content={`${title} - hr.devlog`} />
        <meta
          name="description"
          content={desc || "개발 기록을 남기는 블로그"}
        />
        <link rel="canonical" href="https://hr-devlog.vercel.app" />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content="https://hr-devlog.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${title} - hr.devlog`} />
        <meta
          property="og:description"
          content={desc || "개발 기록을 남기는 블로그"}
        />
        <meta property="og:image" content="" />
        {/* <meta name="twitter:card" content="summary_large_image"/> */}
        <meta property="twitter:domain" content="hr-devlog.vercel.app" />
        <meta property="twitter:url" content="https://hr-devlog.vercel.app" />
        <meta name="twitter:title" content={`${title} - hr.devlog`} />
        <meta
          name="twitter:description"
          content={desc || "개발 기록을 남기는 블로그"}
        />
        <meta name="twitter:image" content="" />
      </Head>
    </>
  );
};

export default SEO;
