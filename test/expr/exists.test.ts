import { parseExpr, testExprWc } from "../test_utils";

describe("EXISTS expression", () => {
  it("supports EXISTS expression", () => {
    testExprWc(`EXISTS (SELECT 1)`);
  });

  it("supports NOT EXISTS expression", () => {
    testExprWc(`NOT EXISTS (SELECT 1)`);
  });

  // Check that we're using unary operators: NOT & EXISTS
  it("parses NOT EXISTS to syntax tree", () => {
    expect(parseExpr("NOT EXISTS (SELECT 1)")).toMatchInlineSnapshot(`
      {
        "expr": {
          "expr": {
            "expr": {
              "clauses": [
                {
                  "asStructOrValueKw": undefined,
                  "columns": {
                    "items": [
                      {
                        "text": "1",
                        "type": "number_literal",
                        "value": 1,
                      },
                    ],
                    "type": "list_expr",
                  },
                  "distinctKw": undefined,
                  "hints": [],
                  "selectKw": {
                    "name": "SELECT",
                    "text": "SELECT",
                    "type": "keyword",
                  },
                  "type": "select_clause",
                },
              ],
              "type": "select_stmt",
            },
            "type": "paren_expr",
          },
          "operator": {
            "name": "EXISTS",
            "text": "EXISTS",
            "type": "keyword",
          },
          "type": "prefix_op_expr",
        },
        "operator": {
          "name": "NOT",
          "text": "NOT",
          "type": "keyword",
        },
        "type": "prefix_op_expr",
      }
    `);
  });
});
