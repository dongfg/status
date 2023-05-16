import { Noto_Sans } from "next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/globals.css";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: "600" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${notoSans.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>Status Page</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
