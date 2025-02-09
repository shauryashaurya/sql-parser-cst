import { dialect, test, testWc } from "../test_utils";

describe("function", () => {
  dialect("bigquery", () => {
    describe("CREATE FUNCTION", () => {
      it("supports basic CREATE FUNCTION", () => {
        testWc("CREATE FUNCTION foo ( ) AS (1 * 2)");
        testWc("CREATE FUNCTION foo.bar.baz ( ) AS (1)");
      });

      it("supports parameters", () => {
        testWc("CREATE FUNCTION multiplicate ( x INT , y INT ) AS (x * y)");
      });

      it("supports OR REPLACE", () => {
        testWc("CREATE OR REPLACE FUNCTION foo() AS (1)");
      });

      it("supports TEMPORARY FUNCTION", () => {
        testWc("CREATE TEMP FUNCTION foo() AS (1)");
        testWc("CREATE TEMPORARY FUNCTION foo() AS (1)");
      });

      it("supports IF NOT EXISTS", () => {
        testWc("CREATE FUNCTION IF NOT EXISTS foo() AS (1)");
      });

      it("supports RETURNS", () => {
        testWc("CREATE FUNCTION foo() RETURNS INT AS (1)");
      });

      it("supports OPTIONS(..)", () => {
        testWc("CREATE FUNCTION foo() OPTIONS (description='hello') AS (1)");
        testWc("CREATE FUNCTION foo() AS (1) OPTIONS (description='my func')");
      });

      describe("JS functions", () => {
        it("supports LANGUAGE js", () => {
          testWc("CREATE FUNCTION foo() RETURNS INT LANGUAGE js AS 'return(x*y);'");
        });

        it("supports DETERMINISTIC / NOT DETERMINISTIC", () => {
          testWc(`CREATE FUNCTION foo() RETURNS STRING DETERMINISTIC LANGUAGE js AS 'return("");'`);
          testWc(`CREATE FUNCTION foo() RETURNS INT NOT DETERMINISTIC LANGUAGE js AS 'return(0);'`);
        });

        it("supports OPTIONS(..)", () => {
          testWc(
            "CREATE FUNCTION foo() RETURNS INT LANGUAGE js OPTIONS (foo=15) AS 'return(x*y);'"
          );
          testWc("CREATE FUNCTION foo() RETURNS INT LANGUAGE js AS 'return(x*y);' OPTIONS(foo=2)");
        });
      });

      describe("remote functions", () => {
        it("supports REMOTE WITH CONNECTION", () => {
          testWc("CREATE FUNCTION foo() RETURNS INT REMOTE WITH CONNECTION myconnection_id");
        });

        it("supports OPTIONS(..)", () => {
          testWc(`
            CREATE FUNCTION multiply()
            RETURNS INT REMOTE WITH CONNECTION myproj.us.myconnection
            OPTIONS(endpoint="https://example.com/multiply")
          `);
        });
      });

      describe("table functions", () => {
        it("supports CREATE TABLE FUNCTION", () => {
          testWc("CREATE TABLE FUNCTION foo() AS SELECT * FROM tbl");
          testWc("CREATE OR REPLACE TABLE FUNCTION foo() AS SELECT 1");
          testWc("CREATE TABLE FUNCTION IF NOT EXISTS foo() AS SELECT 1");
        });

        it("supports RETURNS TABLE <..>", () => {
          testWc("CREATE TABLE FUNCTION foo() RETURNS TABLE < col1 INT64 > AS SELECT 1");
          testWc(`
            CREATE TABLE FUNCTION foo()
            RETURNS TABLE< name STRING , age INT >
            AS SELECT 'John', 64
          `);
        });

        it("supports parameters with ANY TYPE", () => {
          testWc(`
            CREATE TABLE FUNCTION foo( p ANY TYPE )
            AS SELECT * FROM tbl WHERE col = p
          `);
        });

        it("supports OPTIONS(..)", () => {
          testWc(`
            CREATE TABLE FUNCTION doubleit(x INT)
            RETURNS TABLE<x INT64>
            OPTIONS(description='haha')
            AS SELECT x*2
          `);
        });
      });
    });

    describe("DROP FUNCTION", () => {
      it("supports basic DROP FUNCTION", () => {
        testWc("DROP FUNCTION foo");
        testWc("DROP FUNCTION foo.bar.baz");
      });

      it("supports IF EXISTS", () => {
        testWc("DROP FUNCTION IF EXISTS foo");
      });

      it("supports DROP TABlE FUNCTION", () => {
        testWc("DROP TABLE FUNCTION foo");
        testWc("DROP TABLE FUNCTION IF EXISTS foo.bar.baz");
      });
    });
  });

  dialect(["mysql", "mariadb", "sqlite"], () => {
    it("does not support CREATE FUNCTION", () => {
      expect(() => test("CREATE FUNCTION foo() AS (1 + 2)")).toThrowError();
    });
  });

  dialect("postgresql", () => {
    it.skip("TODO:postgres", () => {
      expect(true).toBe(true);
    });
  });
});
