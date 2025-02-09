import { dialect, testWc } from "../test_utils";

describe("index", () => {
  describe("CREATE INDEX", () => {
    dialect(["mysql", "mariadb", "sqlite"], () => {
      it("simple CREATE INDEX statement", () => {
        testWc("CREATE INDEX my_idx ON tbl ( col1 , col2 )");
        testWc("CREATE INDEX schm.my_idx ON schm.tbl (col)");
      });

      it("supports UNIQUE index", () => {
        testWc("CREATE UNIQUE INDEX my_idx ON tbl (col)");
      });
    });

    dialect("bigquery", () => {
      it("supports SEARCH INDEX", () => {
        testWc("CREATE SEARCH INDEX my_idx ON tbl (col)");
      });

      it("supports IF NOT EXISTS", () => {
        testWc("CREATE SEARCH INDEX IF NOT EXISTS idx ON tbl (col)");
      });

      it("supports ALL COLUMNS", () => {
        testWc("CREATE SEARCH INDEX idx ON tbl ( ALL COLUMNS )");
      });

      it("supports OPTIONS(..)", () => {
        testWc("CREATE SEARCH INDEX idx ON tbl (col) OPTIONS(analyzer='LOG_ANALYZER')");
      });
    });

    dialect(["mysql", "mariadb"], () => {
      it("supports FULLTEXT & SPATIAL index", () => {
        testWc("CREATE FULLTEXT INDEX my_idx ON tbl (col)");
        testWc("CREATE SPATIAL INDEX my_idx ON tbl (col)");
      });
    });

    dialect("sqlite", () => {
      it("supports IF NOT EXISTS", () => {
        testWc("CREATE INDEX IF NOT EXISTS idx ON tbl (col)");
      });

      it("supports WHERE clause", () => {
        testWc("CREATE INDEX idx ON tbl (col) WHERE x > 10");
      });
    });

    dialect("sqlite", () => {
      it("supports ASC/DESC in columns list", () => {
        testWc("CREATE INDEX my_idx ON tbl (id ASC, name DESC)");
      });
      it("supports COLLATE in columns list", () => {
        testWc("CREATE INDEX my_idx ON tbl (name COLLATE utf8)");
      });
    });
  });

  describe("DROP INDEX", () => {
    dialect("sqlite", () => {
      it("supports DROP INDEX name", () => {
        testWc("DROP INDEX my_idx");
        testWc("DROP INDEX schm.my_idx");
      });

      it("supports IF EXISTS", () => {
        testWc("DROP INDEX IF EXISTS my_idx");
      });
    });

    dialect(["mysql", "mariadb"], () => {
      it("supports DROP INDEX name ON table", () => {
        testWc("DROP INDEX my_idx ON tbl");
        testWc("DROP INDEX idx ON schm.tbl");
      });
    });

    dialect("bigquery", () => {
      it("supports DROP SEARCH INDEX name ON table", () => {
        testWc("DROP SEARCH INDEX my_idx ON tbl");
        testWc("DROP SEARCH INDEX idx ON proj.schm.tbl");
      });

      it("supports IF EXISTS", () => {
        testWc("DROP SEARCH INDEX IF EXISTS my_idx ON tbl");
      });
    });
  });

  dialect("postgresql", () => {
    it.skip("TODO:postgres", () => {
      expect(true).toBe(true);
    });
  });
});
