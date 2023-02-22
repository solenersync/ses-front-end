import "../styles/globals.css";
import { NextPageWithLayout } from "types";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session}>
        <main className="h-full ">
          <div className="h-full ">{getLayout(<Component {...pageProps} />)}</div>
        </main>
    </SessionProvider>
  );
}
