import {
  BetweenExpr,
  BinaryExpr,
  BoolLiteral,
  Comment,
  DateTimeLiteral,
  Keyword,
  Node,
  NullLiteral,
  NumberLiteral,
  Select,
  StringLiteral,
  StringWithCharset,
} from "pegjs/mysql";
import { isDefined } from "./util";

export function show(node: Node): string {
  return [
    showComments(node.leadingComments),
    showNode(node),
    showComments(node.trailingComments),
  ]
    .filter(isDefined)
    .join(" ");
}

function showNode(node: Node): string {
  switch (node.type) {
    case "select":
      return showSelect(node);
    case "binary_expr":
      return showBinaryExpr(node);
    case "between_expr":
      return showBetweenExpr(node);
    case "string":
      return showLiteral(node);
    case "number":
      return showLiteral(node);
    case "bool":
      return showLiteral(node);
    case "null":
      return showLiteral(node);
    case "datetime":
      return showDateTimeLiteral(node);
    case "keyword":
      return showKeyword(node);
    case "string_with_charset":
      return showStringWithCharset(node);
  }
}

const showComments = (c?: Comment[]): string | undefined => {
  if (!c) {
    return undefined;
  }
  return c.map(showComment).join(" ");
};

const showComment = (c: Comment): string =>
  c.type === "line_comment" ? c.text + "\n" : c.text;

const showSelect = (node: Select) => "SELECT " + show(node.columns[0]);

const showLiteral = (
  node: StringLiteral | NumberLiteral | BoolLiteral | NullLiteral
) => node.text;

const showDateTimeLiteral = (node: DateTimeLiteral) =>
  show(node.kw) + " " + show(node.string);

const showBinaryExpr = (node: BinaryExpr) => {
  return (
    show(node.left) + " " + showOperator(node.operator) + " " + show(node.right)
  );
};

const showOperator = (op: string | Keyword[]): string => {
  if (typeof op === "string") {
    return op;
  }
  return op.map(show).join(" ");
};

const showBetweenExpr = (node: BetweenExpr) => {
  return [
    show(node.left),
    ...node.betweenKw.map(show),
    show(node.begin),
    show(node.andKw),
    show(node.end),
  ].join(" ");
};

const showKeyword = (kw: Keyword) => kw.text;

const showStringWithCharset = (node: StringWithCharset) =>
  node.charset + " " + show(node.string);
