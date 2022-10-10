import { parse } from "../src/parser";

describe("expr", () => {
  function parseExpr(expr: string) {
    return parse(`SELECT ${expr}`).columns[0];
  }

  describe("operators", () => {
    // punctuation-based operators
    [
      "+",
      "-",
      "~",
      "*",
      "/",
      "%",
      "&",
      ">>",
      "<<",
      "^",
      "|",
      "~",
      ">=",
      ">",
      "<=",
      "<>",
      "<",
      "=",
      "!=",
    ].forEach((op) => {
      it(`parses ${op} operator`, () => {
        expect(parseExpr(`5 ${op} 7`)).toMatchSnapshot();
      });
    });

    it("parses chain of addition and subtraction", () => {
      expect(parseExpr(`5 + 6 - 8`)).toMatchSnapshot();
    });

    it("parses chain of multiplication and division", () => {
      expect(parseExpr(`2 * 7 / 3`)).toMatchSnapshot();
    });

    it("treats multiplication with higher precedence than addition", () => {
      expect(parseExpr(`6 + 7 * 3`)).toMatchSnapshot();
    });

    it("parses DIV operator", () => {
      expect(parseExpr(`8 DIV 4`)).toMatchSnapshot();
    });

    it("recognizes lowercase DIV operator", () => {
      expect(parseExpr(`8 div 4`)).toMatchSnapshot();
    });

    it("parses addition with comments", () => {
      expect(parseExpr(`6 /* com1 */ + /* com2 */ 7`)).toMatchSnapshot();
    });

    it("parses multiplication with comments", () => {
      expect(parseExpr(`6 /* com1 */ * /* com2 */ 7`)).toMatchSnapshot();
    });

    it("parses comparison with comments", () => {
      expect(parseExpr(`6 /* com1 */ < /* com2 */ 7`)).toMatchSnapshot();
    });

    it("parses IS operator", () => {
      expect(parseExpr(`7 IS 5`)).toMatchSnapshot();
    });
    it("parses IS operator with comments", () => {
      expect(parseExpr(`7 /*c1*/ IS /*c2*/ 5`)).toMatchSnapshot();
    });

    it("parses IS NOT operator", () => {
      expect(parseExpr(`7 IS NOT 5`)).toMatchSnapshot();
    });
    it("parses IS NOT operator with comments", () => {
      expect(parseExpr(`7 /*c1*/ IS /*c2*/ NOT /*c3*/ 5`)).toMatchSnapshot();
    });

    it("parses LIKE & NOT LIKE operators", () => {
      expect(parseExpr(`'foobar' LIKE 'foo%'`)).toMatchSnapshot();
      expect(parseExpr(`'foobar' NOT LIKE 'foo%'`)).toMatchSnapshot();
    });
    it("parses LIKE & NOT LIKE operators with comments", () => {
      expect(parseExpr(`'foobar' /*c1*/ LIKE /*c2*/ 'foo%'`)).toMatchSnapshot();
      expect(
        parseExpr(`'foobar' /*c1*/ NOT /*c2*/ LIKE /*c3*/ 'foo%'`)
      ).toMatchSnapshot();
    });
  });
});
