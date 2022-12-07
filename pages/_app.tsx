import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "./components/Header";
import Layout from "./components/Layout";
import "../public/static/font/font.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
