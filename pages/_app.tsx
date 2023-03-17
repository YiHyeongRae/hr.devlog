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
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import * as gtag from "../lib/gtag";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // ssr 환경 redux를 위한 wrapper 작업
  const { store } = wrapper.useWrappedStore(pageProps);

  // 페이지 이동간 카운팅 해줄 state
  const [timer, setTimer] = useState(3);

  // Auth 체크를 위한 func
  function Auth({ children }: any) {
    // useSeesion으로 login 상태 체크
    const { data: session, status } = useSession();
    const isUser = !!session?.user;

    useEffect(() => {
      // status 로 상태 체크
      if (status === "loading") return; // Do nothing while loading

      // 로그인 되있지 않다면 setInterval 과 함께 안내페이지 및 카운팅
      if (!isUser) {
        const dec = setInterval(() => {
          setTimer(timer - 1);
        }, 1000);

        // 카운팅 끝날 시 강제 페이지이동
        if (timer === 0) {
          clearInterval(dec);
          signIn();
        }
      }
      // setTimeout(() => signIn(), 5000); // If not authenticated, force log in
    }, [isUser, status]);

    // 로그인 되있다면 정상적으로 page 호출
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

  // router 및 routing 간 로딩스피너로 사용할 state
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // GA 이벤트 등록
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };

    // router.events 로 라우팅 이벤트 캡쳐링 및 상태에 맞게 함수 실행
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false)),
      handleRouteChange;
    router.events.on("routeChangeError", () => setLoading(false));
    return () => {
      router.events.off("routeChangeStart", () => setLoading(true));
      router.events.off("routeChangeComplete", () => setLoading(false)),
        handleRouteChange;
      router.events.off("routeChangeError", () => setLoading(false));
    };

    // 디펜던시로 router.events 등록
  }, [router.events]);
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-PMSB1F57B3"
            async
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PMSB1F57B3', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />

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
          <Analytics />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
export default App;
