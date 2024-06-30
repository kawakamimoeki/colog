import { GetStaticProps } from "next";
import { orderBy } from "lodash";
import { parse, Page as PageType } from "@progfay/scrapbox-parser";
import Page from "../components/Page";
import data from "../data/export.json";
import Head from "next/head";
import Link from "next/link";

type Props = {
  date?: number;
  content?: PageType;
  page?: string;
  blogs?: {
    title: string;
    created: number;
    updated: number;
    id: string;
    lines: string[];
  }[];
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const pages = data.pages;
  const page = pages.find((page) => page.title === data.displayName);

  if (!page) {
    return { props: {} };
  }

  const content = page.lines.join("\n");
  let blogs = pages.filter((page) =>
    page.lines.join("").match(/(#blog|#ブログ|#Blog|#BLOG)/)
  );
  blogs = orderBy(blogs, "updated", "desc");

  return {
    props: {
      date: Date.now(),
      content: parse(content).filter((c) => c.type !== "title"),
      page: data.displayName,
      blogs,
    },
  };
};

const View = (props: Props) => {
  if (!props.page || !props.content) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>{props.page}</title>
        <meta property="og:title" content={props.page} />
      </Head>
      <Page blocks={props.content} />
      {props.blogs && props.blogs.length > 0 && (
        <div className="blog-section">
          <div className="blog-section-title">Blogs</div>
          <div>
            {props.blogs.map((blog) => (
              <Link
                href={`/${blog.title}`}
                key={blog.title}
                className="blog-item"
              >
                <div className="blog-title">{blog.title}</div>
                <time>
                  Updated {new Date(blog.updated * 1000).toDateString()}
                </time>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default View;
