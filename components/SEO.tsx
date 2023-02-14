import Head from "next/head";
import { FunctionComponent } from "react";

interface SEOTYPES {
  title: string;
}

const SEO = ({ title }: SEOTYPES) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 maximum-scale=1.0, user-scalable=0"
        />
        <title>{`${title} - hr.devlog`}</title>
        <meta name="description" content="hr-devlog" />
      </Head>
    </>
  );
};

export default SEO;
