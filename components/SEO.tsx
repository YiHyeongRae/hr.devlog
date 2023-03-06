import Head from "next/head";
import { FunctionComponent } from "react";

interface SEOTYPES {
  title: string;
}

const SEO = ({ title }: SEOTYPES) => {
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="M4BHCocjqAs-zP9KpT60AvVZ4sDqXu9De_tgOwk5Ozg"
        />
        <meta charSet="utf-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1, user-scalable=0"
        />
        <title>{`${title} - hr.devlog`}</title>
        <meta name="description" content="hr-devlog" />
      </Head>
    </>
  );
};

export default SEO;
