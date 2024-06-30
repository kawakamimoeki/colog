import React from "react";
import {
  Block as BlockType,
  Title as TitleType,
  CodeBlock as CodeBlockType,
  Table as TableType,
  Line as LineType,
} from "@progfay/scrapbox-parser";
import { useRouter } from "next/router";
import Node from "./Node";
import data from "../data/export.json";

const Block = (props: BlockType) => {
  switch (props.type) {
    case "title":
      return <Title {...props} />;
    case "codeBlock":
      return <CodeBlock {...props} />;
    case "table":
      return <Table {...props} />;
    case "line":
      return <Line {...props} />;
  }
};

const BlockBase = (props: {
  indent: number;
  children: React.ReactNode;
  nodes?: any[];
}) => {
  if (props.nodes && props.nodes.length === 0) {
    return <></>;
  }

  return (
    <div
      style={{
        marginLeft: props.indent > 0 ? 1.5 * props.indent + "em" : "0",
        listStyle: props.indent > 0 ? "outside" : "none",
        display: props.indent > 0 ? "list-item" : "block",
        padding: props.indent > 0 ? "none" : "10px 0",
      }}
      className="line"
    >
      {props.children}
    </div>
  );
};

const Title = (props: TitleType) => (
  <div className="line line-title">
    <span>{props.text}</span>
  </div>
);

const CodeBlock = (props: CodeBlockType) => {
  const { page } = useRouter().query;
  const path = `https://scrapbox.io/api/code/${data.name}/${page}/${props.fileName}`;

  return (
    <BlockBase indent={props.indent}>
      <code className="code-block">
        <span className="code-block-start" title={props.fileName}>
          {props.fileName.includes(".") ? (
            <a href={path}>{props.fileName}</a>
          ) : (
            <>{props.fileName}</>
          )}
        </span>
        <div style={{ marginLeft: "1.5em" }}>{props.content}</div>
      </code>
    </BlockBase>
  );
};

const Table = (props: TableType) => {
  const { page } = useRouter().query;
  const path = `https://scrapbox.io/api/table/${data.name}/${page}/${props.fileName}.csv`;

  return (
    <BlockBase indent={props.indent}>
      <div className="table-block">
        <span className="table-block-start">
          <a href={path}>{props.fileName}</a>
        </span>
        <table>
          {props.cells.map((rows, i) => (
            <tr key={i}>
              {rows.map((columns, j) => (
                <td className="cell" key={j}>
                  {columns.map((node, k) => (
                    <Node {...node} key={j} />
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    </BlockBase>
  );
};

const Line = (props: LineType) => (
  <BlockBase indent={props.indent} nodes={props.nodes}>
    {!props.nodes.length ? (
      <></>
    ) : (
      props.nodes.map((node, i) => <Node key={i} {...node} />)
    )}
  </BlockBase>
);

export default Block;
