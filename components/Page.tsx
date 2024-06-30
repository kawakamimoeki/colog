import { Page as PageType } from "@progfay/scrapbox-parser";
import Block from "./Block";

const Page = (props: { blocks: PageType }) => (
  <div className="page">
    {props.blocks.map((block, i) => (
      <Block key={i} {...block} />
    ))}
  </div>
);

export default Page;
