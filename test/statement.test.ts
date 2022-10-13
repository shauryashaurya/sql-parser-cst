import { parse, show } from "../src/parser";

describe("statement", () => {
  function test(sql: string) {
    expect(show(parse(sql))).toBe(sql);
  }

  it("parses multiple statements", () => {
    test("SELECT 1; SELECT 2; SELECT 3");
  });

  it("parses statement with trailing semicolon", () => {
    test("SELECT 1;");
  });

  it("parses empty statements", () => {
    test("; ; ;");
    expect(parse(";/*com*/;")).toMatchInlineSnapshot(`
      [
        {
          "type": "empty_statement",
        },
        {
          "leadingComments": [
            {
              "text": "/*com*/",
              "type": "block_comment",
            },
          ],
          "type": "empty_statement",
        },
        {
          "type": "empty_statement",
        },
      ]
    `);
  });
});
