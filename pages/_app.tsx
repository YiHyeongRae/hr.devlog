import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../public/static/font/font.css";
import wrapper from "../redux/store";
import { Provider } from "react-redux";

import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

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
          height: "calc(100vh - 91.5px)",
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

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          {Component.defaultProps?.auth ? (
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
