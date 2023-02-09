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
  function Auth({ children }: any) {
    const { data: session, status } = useSession();
    const isUser = !!session?.user;
    useEffect(() => {
      if (status === "loading") return; // Do nothing while loading
      if (!isUser) setTimeout(() => signIn(), 5000); // If not authenticated, force log in
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
          Routing SignIn Page in 3 seconds.
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
