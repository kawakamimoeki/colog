import { AppProps } from "next/app";
import Head from "next/head";
import data from "../data/export.json";

import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="robots" content="noindex, nofollow" />
      <meta
        name="description"
        content={
          data.pages.find((page) => page.title === data.displayName)?.lines[1]
        }
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={data.displayName} />
      <meta
        property="og:description"
        content={
          data.pages.find((page) => page.title === data.displayName)?.lines[1]
        }
      />
      <meta
        property="og:image"
        content={`https://scrapbox.io/api/pages/${data.name}/colog_settings/icon#jpeg`}
      />
      <link
        id="favicon"
        rel="icon"
        href={
          data.pages
            .find((page) => page.title === "colog_settings")
            ?.lines.find((line) => line.match(/favicon.ico/))
            ?.match(/https:\/\/.+\.ico/)
            ?.at(0) || ""
        }
      ></link>
    </Head>
    <div className="header">
      <Link href={`/${data.name}`}>{data.displayName}</Link>
    </div>
    <div className="main">
      <h1 className="site-title">
        <Link href="/">{data.displayName}</Link>
      </h1>
      <Component {...pageProps} />
    </div>
    <div className="footer">
      <div>
        Powered by{" "}
        <Link href="https://github.com/kawakamimoeki/colog">Colog</Link>
      </div>
      <div>
        &copy; {new Date().getFullYear()} {data.displayName} All rights
        reserved.
      </div>
    </div>
  </>
);

export default App;
