import { GetStaticProps, GetStaticPaths } from "next";
import { parse, Page as PageType } from "@progfay/scrapbox-parser";
import Page from "../components/Page";
import Head from "next/head";
import Skeleton from "react-loading-skeleton";
import data from "../data/export.json";

type Props = {
  date?: number;
  content?: PageType;
  page?: string;
  status?: string;
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  if (ctx.params === undefined) {
    return { props: {} };
  }

  const page = data.pages.find((page) => page.title === ctx.params!.page);

  if (!page) {
    return { props: {} };
  }

  const content = page.lines.join("\n");

  return {
    props: {
      date: Date.now(),
      content: parse(content),
      page: ctx.params?.page as string,
    },
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

const View = (props: Props) => {
  if (!props.page || !props.content) {
    return (
      <div>
        <div style={{ fontSize: "2rem", marginBottom: "20px", width: "50%" }}>
          <Skeleton />
        </div>
        <Skeleton count={5} />
      </div>
    );
  }

  if (props.status === "Not Found") {
    return <>Not Found.</>;
  }

  return (
    <>
      <Head>
        <title>{props.page}</title>
        <meta property="og:title" content={props.page} />
      </Head>
      <Page blocks={props.content || []} />
    </>
  );
};

export default View;
