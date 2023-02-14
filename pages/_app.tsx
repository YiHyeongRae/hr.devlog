import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../public/static/font/font.css";
import wrapper from "../redux/store";
import { Provider } from "react-redux";

import { SessionProvider, signIn, useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useRouter } from "next/router";
import styled from "styled-components";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  const [timer, setTimer] = useState(3);
  function Auth({ children }: any) {
    const { data: session, status } = useSession();
    const isUser = !!session?.user;
    useEffect(() => {
      if (status === "loading") return; // Do nothing while loading
      if (!isUser) {
        const dec = setInterval(() => {
          setTimer(timer - 1);
        }, 1000);

        if (timer === 0) {
          clearInterval(dec);
          signIn();
        }
      }
      // setTimeout(() => signIn(), 5000); // If not authenticated, force log in
    }, [isUser, status]);

    if (isUser) {
      return children;
    }

    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    return (
      <div
        style={{
          height: "calc(100vh - 54px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          This Page Require Authorized, But You Are Unauthorized ! Please
          SignIn.
        </div>
        <div
          style={{
            textAlign: "center",
          }}
        >
          Routing SignIn Page in{" "}
          <span style={{ fontSize: "25px" }}>{timer}</span> seconds.
        </div>
      </div>
    );
  }

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
    router.events.on("routeChangeError", () => setLoading(false));
    return () => {
      router.events.off("routeChangeStart", () => setLoading(true));
      router.events.off("routeChangeComplete", () => setLoading(false));
      router.events.off("routeChangeError", () => setLoading(false));
    };
  }, [router.events]);
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          {/* {Component.defaultProps?.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )} */}
          {loading ? (
            <Loading />
          ) : Component.defaultProps?.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
export default App;
