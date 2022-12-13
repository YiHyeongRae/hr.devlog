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
      </Head>
    </>
  );
};

export default SEO;
