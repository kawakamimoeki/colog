import React from "react";
import type { LinkNode as LinkNodeType } from "@progfay/scrapbox-parser";
import Link from "next/link";
import data from "../data/export.json";
import { useRouter } from "next/router";

const LinkNode = (props: LinkNodeType) => {
  switch (props.pathType) {
    case "root":
    case "relative":
      return <InternalLink {...props} />;
    case "absolute":
      return <ExternalLink {...props} />;
  }
};

const InternalLink = (props: LinkNodeType) => {
  const href = props.pathType === "relative" ? `/${props.href}` : props.href;

  if (!data.pages.map((page) => page.title).includes(props.href)) {
    return <span>{props.href}</span>;
  }

  return (
    <Link href="/[page]" as={href} className="page-link">
      {props.href}
    </Link>
  );
};

const ExternalLink = (props: LinkNodeType) => (
  <a href={props.href} rel="noopener noreferrer" target="_blank">
    {props.content || props.href}
  </a>
);

export default LinkNode;
