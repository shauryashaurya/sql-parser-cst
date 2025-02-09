import { dialect, test, testWc } from "../test_utils";

describe("procedure", () => {
  dialect("bigquery", () => {
    describe("CREATE PROCEDURE", () => {
      it("supports basic CREATE PROCEDURE", () => {
        testWc(`
          CREATE PROCEDURE foo.bar.baz ( )
          BEGIN
            SELECT 1;
          END
        `);
      });

      it("supports multiple statements in procedure body", () => {
        test(`
          CREATE PROCEDURE tmp_table_query()
          BEGIN
            CREATE TEMP TABLE entries (id INT, name STRING);
            INSERT INTO entries VALUES (1, 'John');
            INSERT INTO entries VALUES (2, 'Mary');
            SELECT * FROM entries;
            DROP TABLE entries;
          END
        `);
      });

      it("supports procedureal language statements in procedure body", () => {
        test(`
          CREATE PROCEDURE blah()
          BEGIN
            DECLARE x INT;
            SET x = 0;
          END
        `);
      });

      it("supports parameters", () => {
        testWc("CREATE PROCEDURE multiplicate ( x INT , y INT ) BEGIN SELECT 1; END");
      });

      it("supports IN/OUT/INOUT parameters", () => {
        testWc(`
          CREATE PROCEDURE multiplicate(
            IN x INT,
            INOUT y INT,
            OUT result INT
          )
          BEGIN
            SELECT x*y;
          END
        `);
      });

      it("supports OR REPLACE", () => {
        testWc("CREATE OR REPLACE PROCEDURE foo() BEGIN SELECT 1; END");
      });

      it("supports IF NOT EXISTS", () => {
        testWc("CREATE PROCEDURE IF NOT EXISTS foo() BEGIN SELECT 1; END");
      });

      it("supports OPTIONS(..)", () => {
        testWc("CREATE PROCEDURE foo() OPTIONS (description='hello') BEGIN SELECT 1; END");
      });

      describe("Apache Spark procedure", () => {
        it("supports loading procedure from PySpark file", () => {
          testWc(`
            CREATE PROCEDURE my_bq_project.my_dataset.spark_proc()
            WITH CONNECTION \`my-project-id.us.my-connection\`
            OPTIONS(engine="SPARK", main_file_uri="gs://my-bucket/my-pyspark-main.py")
            LANGUAGE PYTHON
          `);
        });

        it("supports inline Python procedure", () => {
          test(`
            CREATE PROCEDURE my_proc()
            WITH CONNECTION \`my-project-id.us.my-connection\`
            OPTIONS(engine="SPARK")
            LANGUAGE PYTHON AS R"""
              from pyspark.sql import SparkSession

              # Load data from BigQuery.
              words = spark.read.format("bigquery") \
                .option("table", "bigquery-public-data:samples.shakespeare") \
                .load()
            """
          `);
        });
      });
    });

    describe("DROP PROCEDURE", () => {
      it("supports basic DROP PROCEDURE", () => {
        testWc("DROP PROCEDURE foo");
        testWc("DROP PROCEDURE foo.bar.baz");
      });

      it("supports IF EXISTS", () => {
        testWc("DROP PROCEDURE IF EXISTS foo");
      });
    });
  });

  dialect(["mysql", "mariadb", "sqlite"], () => {
    it("does not support CREATE PROCEDURE", () => {
      expect(() => test("CREATE PROCEDURE foo() BEGIN SELECT 1; END")).toThrowError();
    });
  });

  dialect("postgresql", () => {
    it.skip("TODO:postgres", () => {
      expect(true).toBe(true);
    });
  });
});
