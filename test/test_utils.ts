import {
  Expr,
  Keyword,
  ParenExpr,
  Program,
  SelectClause,
  Statement,
  SubSelect,
  Whitespace,
} from "../src/cst/Node";
import {
  DialectName,
  parse as parseSql,
  ParserOptions,
  show,
} from "../src/main";
import { isString } from "../src/utils/generic";

declare const __SQL_DIALECT__: DialectName;

export const includeAll: Partial<ParserOptions> = {
  includeComments: true,
  includeNewlines: true,
  includeSpaces: true,
};

export function parse(
  sql: string,
  options: Partial<ParserOptions> = {}
): Program {
  return parseSql(sql, {
    dialect: __SQL_DIALECT__,
    ...options,
  });
}

export function parseStmt(
  sql: string,
  options: Partial<ParserOptions> = {}
): Statement {
  const { statements } = parse(sql, options);
  if (statements.length !== 1) {
    throw new Error(`Expected one statement, instead got ${statements.length}`);
  }
  return statements[0];
}

/** Runs the tests when active dialect is in specified dialects list */
export function dialect(lang: DialectName | DialectName[], block: () => void) {
  lang = isString(lang) ? [lang] : lang;
  if (lang.includes(__SQL_DIALECT__)) {
    describe(__SQL_DIALECT__, block);
  }
}

/** Runs the tests when active dialect is NOT in specified dialects list */
export function notDialect(
  lang: DialectName | DialectName[],
  block: () => void
) {
  lang = isString(lang) ? [lang] : lang;
  if (!lang.includes(__SQL_DIALECT__)) {
    describe(__SQL_DIALECT__, block);
  }
}

export function test(sql: string, options?: Partial<ParserOptions>) {
  expect(show(parse(sql, options || includeAll))).toBe(sql);
}

export function testWc(sql: string, options?: Partial<ParserOptions>) {
  test(sql, options);
  test(withComments(sql), options);
}

export function withComments(sql: string): string {
  let count = 0;
  return sql.replace(/ +/g, () => {
    count++;
    return ` /*${count}*/ `;
  });
}

export function testExpr(expr: string) {
  expect(show(parse(`SELECT ${expr}`, includeAll))).toBe(`SELECT ${expr}`);
}

export function testExprWc(expr: string) {
  testExpr(expr);
  testExpr(withComments(expr));
}

export function parseExpr(
  expr: string,
  options?: Partial<ParserOptions>
): Expr {
  const stmt = parseStmt(`SELECT ${expr}`, options);
  if (stmt.type !== "select_stmt") {
    throw new Error(`Expected select_stmt, instead got ${stmt.type}`);
  }
  const clause = stmt.clauses[0];
  if (clause.type !== "select_clause") {
    throw new Error(`Expected select_clause, instead got ${clause.type}`);
  }
  if (clause.columns?.items.length !== 1) {
    throw new Error(
      `Expected 1 column, instead got ${clause.columns?.items.length ?? 0}`
    );
  }
  const result = clause.columns.items[0];
  if (
    result.type === "alias" ||
    result.type === "empty" ||
    result.type === "all_columns" ||
    result.type === "except_columns" ||
    result.type === "replace_columns"
  ) {
    throw new Error(`Expected expression, instead got ${result.type}`);
  }
  return result;
}

export function testClause(clause: string) {
  test(`SELECT c FROM t ${clause}`);
}

export function testClauseWc(clause: string) {
  testClause(withComments(clause));
}

/**
 * Converts SQL expression to parenthesized version.
 * For example:
 *
 *     showPrecedence("1 + 2 / 3") --> "(1 + (2 / 3))"
 */
export function showPrecedence(sql: string): string {
  return show(addPrecedenceParens(parseExpr(sql)));
}

/**
 * Converts compound select to parenthesized version.
 * For example:
 *
 *     showCompoundPrecedence("SELECT 1 UNION SELECT 2") --> "(SELECT 1 UNION SELECT 2)"
 */
export function showCompoundPrecedence(sql: string): string {
  const stmt = parseStmt(sql);
  if (stmt.type !== "compound_select_stmt") {
    throw new Error(`Expected compound_select_stmt, instead got ${stmt.type}`);
  }
  return show(addPrecedenceParens(stmt));
}

function addPrecedenceParens<T extends Expr | SubSelect>(
  expr: T
): ParenExpr<T> | T {
  const space: Whitespace[] = [{ type: "space", text: " " }];

  if (expr.type === "binary_expr" || expr.type === "compound_select_stmt") {
    return {
      type: "paren_expr",
      expr: {
        ...expr,
        operator: spacedKeywords(expr.operator),
        left: { ...addPrecedenceParens(expr.left), trailing: space },
        right: { ...addPrecedenceParens(expr.right), leading: space },
      },
    };
  } else if (expr.type === "prefix_op_expr") {
    return {
      type: "paren_expr",
      expr: {
        ...expr,
        expr: { ...addPrecedenceParens(expr.expr), leading: space },
      },
    };
  } else if (expr.type === "postfix_op_expr") {
    return {
      type: "paren_expr",
      expr: {
        ...expr,
        expr: { ...addPrecedenceParens(expr.expr), trailing: space },
      },
    };
  } else if (expr.type === "between_expr") {
    return {
      type: "paren_expr",
      expr: {
        ...expr,
        left: { ...addPrecedenceParens(expr.left), trailing: space },
        begin: {
          ...addPrecedenceParens(expr.begin),
          leading: space,
          trailing: space,
        },
        end: { ...addPrecedenceParens(expr.end), leading: space },
      },
    };
  } else if (expr.type === "select_stmt") {
    // Add space inside select clause: SELECT <space_here> x
    const selectClause = expr.clauses[0] as SelectClause;
    return {
      ...expr,
      clauses: [
        {
          ...selectClause,
          selectKw: { ...selectClause.selectKw, trailing: space },
        },
      ],
    };
  } else {
    return expr;
  }
}

function spacedKeywords<T>(op: T): T {
  if (Array.isArray(op)) {
    const space: Whitespace[] = [{ type: "space", text: " " }];
    return op.map((kw: Keyword, i) =>
      i < op.length - 1 ? { ...kw, trailing: space } : kw
    ) as T;
  } else {
    return op;
  }
}

export function parseClause(
  clause: string,
  options: Partial<ParserOptions> = {}
) {
  const stmt = parseStmt(`SELECT c ${clause}`, options);
  if (stmt.type !== "select_stmt") {
    throw new Error(`Expected select_stmt, instead got ${stmt.type}`);
  }
  return stmt.clauses[1];
}

export function parseFrom(
  fromExpr: string,
  options: Partial<ParserOptions> = {}
) {
  const fromClause = parseClause(`FROM ${fromExpr}`, options);
  if (fromClause.type !== "from_clause") {
    throw new Error(`Expected from_clause, instead got ${fromClause.type}`);
  }
  return fromClause.expr;
}

export { show };
