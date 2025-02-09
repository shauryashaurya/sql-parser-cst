import { dialect, test, withComments } from "../test_utils";

describe("constraints", () => {
  describe("column constraints", () => {
    it("parses multiple constraints after column data type", () => {
      test(`CREATE TABLE foo (
        id INT  NOT NULL  DEFAULT 5
      )`);
    });

    function testColConstWc(constraint: string) {
      test(`CREATE TABLE t (id INT ${withComments(constraint)})`);
    }

    dialect(["mysql", "mariadb", "sqlite"], () => {
      it("NULL", () => {
        testColConstWc("NULL");
      });
    });

    it("NOT NULL", () => {
      testColConstWc("NOT NULL");
    });

    it("DEFAULT", () => {
      testColConstWc("DEFAULT 10");
      testColConstWc("DEFAULT (5 + 6 > 0 AND true)");
    });

    dialect(["mysql", "mariadb", "sqlite"], () => {
      it("PRIMARY KEY", () => {
        testColConstWc("PRIMARY KEY");
      });

      dialect("sqlite", () => {
        it("AUTOINCREMENT on PRIMARY KEY column", () => {
          testColConstWc("PRIMARY KEY AUTOINCREMENT");
        });

        it("ASC / DESC on PRIMARY KEY column", () => {
          testColConstWc("PRIMARY KEY ASC");
        });
      });

      it("UNIQUE", () => {
        testColConstWc("UNIQUE");
        testColConstWc("UNIQUE KEY");
      });

      it("CHECK", () => {
        testColConstWc("CHECK (col > 10)");
      });

      it("REFERENCES", () => {
        // full syntax is tested under table constraints tests
        testColConstWc("REFERENCES tbl2 (col1)");
      });
    });

    dialect("sqlite", () => {
      it("supports deferrability in references clause", () => {
        testColConstWc("REFERENCES tbl2 (id) DEFERRABLE");
      });
    });

    dialect(["mysql", "mariadb", "sqlite"], () => {
      it("COLLATE", () => {
        testColConstWc("COLLATE utf8mb4_bin");
      });
    });
    dialect("bigquery", () => {
      it("COLLATE", () => {
        testColConstWc("COLLATE 'und:ci'");
      });
    });

    dialect(["mysql", "mariadb", "sqlite"], () => {
      it("GENERATED ALWAYS", () => {
        testColConstWc("GENERATED ALWAYS AS (col1 + col2)");
        testColConstWc("AS (col1 + col2)");
        testColConstWc("GENERATED ALWAYS AS (true) STORED");
        testColConstWc("GENERATED ALWAYS AS ( true ) VIRTUAL");
      });
    });

    dialect(["mysql", "mariadb"], () => {
      it("AUTO_INCREMENT", () => {
        testColConstWc("AUTO_INCREMENT");
        testColConstWc("AUTO_increment");
      });

      it("COMMENT", () => {
        testColConstWc("COMMENT 'Hello, world!'");
      });

      it("KEY", () => {
        testColConstWc("KEY");
      });

      it("VISIBLE / INVISIBLE", () => {
        testColConstWc("VISIBLE");
        testColConstWc("INVISIBLE");
      });

      it("COLUMN_FORMAT", () => {
        testColConstWc("COLUMN_FORMAT FIXED");
        testColConstWc("COLUMN_FORMAT DYNAMIC");
        testColConstWc("COLUMN_FORMAT DEFAULT");
      });

      it("STORAGE", () => {
        testColConstWc("STORAGE DISK");
        testColConstWc("STORAGE MEMORY");
      });

      it("engine attributes", () => {
        testColConstWc("ENGINE_ATTRIBUTE = 'blah'");
        testColConstWc("ENGINE_ATTRIBUTE 'blah'");
        testColConstWc("SECONDARY_ENGINE_ATTRIBUTE = 'blah'");
        testColConstWc("SECONDARY_ENGINE_ATTRIBUTE 'blah'");
      });
    });

    dialect("sqlite", () => {
      it("supports ON CONFLICT clause", () => {
        testColConstWc("UNIQUE ON CONFLICT ROLLBACK");
        testColConstWc("UNIQUE ON CONFLICT ABORT");
        testColConstWc("UNIQUE ON CONFLICT FAIL");
        testColConstWc("UNIQUE ON CONFLICT IGNORE");
        testColConstWc("UNIQUE ON CONFLICT REPLACE");

        testColConstWc("PRIMARY KEY ON CONFLICT ABORT");
        testColConstWc("NOT NULL ON CONFLICT ABORT");
        testColConstWc("CHECK (x > 0) ON CONFLICT ABORT");
      });
    });

    dialect("bigquery", () => {
      it("supports OPTIONS(..)", () => {
        testColConstWc("OPTIONS(description='this is a great column')");
      });
    });

    dialect(["mysql", "mariadb", "sqlite"], () => {
      it("supports CONSTRAINT keyword for keys and check()", () => {
        testColConstWc("CONSTRAINT PRIMARY KEY");
        testColConstWc("CONSTRAINT UNIQUE");
        testColConstWc("CONSTRAINT CHECK (true)");
      });

      it("supports named column constraints for keys and check()", () => {
        testColConstWc("CONSTRAINT cname PRIMARY KEY");
        testColConstWc("CONSTRAINT cname UNIQUE");
        testColConstWc("CONSTRAINT cname CHECK (true)");
      });
    });

    dialect(["sqlite"], () => {
      it("supports CONSTRAINT keyword for column constraints", () => {
        testColConstWc("CONSTRAINT NULL");
        testColConstWc("CONSTRAINT NOT NULL");
        testColConstWc("CONSTRAINT DEFAULT 10");
        testColConstWc("CONSTRAINT COLLATE utf8");
        testColConstWc("CONSTRAINT GENERATED ALWAYS AS (x + y)");
        testColConstWc("CONSTRAINT REFERENCES tbl2 (col)");
      });

      it("supports named column constraints", () => {
        testColConstWc("CONSTRAINT cname NULL");
        testColConstWc("CONSTRAINT cname NOT NULL");
        testColConstWc("CONSTRAINT cname DEFAULT 10");
        testColConstWc("CONSTRAINT cname COLLATE utf8");
        testColConstWc("CONSTRAINT cname GENERATED ALWAYS AS (x + y)");
        testColConstWc("CONSTRAINT cname REFERENCES tbl2 (col)");
      });
    });
  });

  dialect(["mysql", "mariadb", "sqlite"], () => {
    describe("table constraints", () => {
      it("supports multiple table constraints inside CREATE TABLE", () => {
        test(`CREATE TABLE tbl (
          id INT,
          PRIMARY KEY (id),
          UNIQUE (id)
        )`);
      });

      function testTblConstWc(constraint: string) {
        test(`CREATE TABLE t (${withComments(constraint)})`);
      }

      it("PRIMARY KEY", () => {
        testTblConstWc("PRIMARY KEY (id)");
        testTblConstWc("PRIMARY KEY ( id, name )");
      });

      dialect("sqlite", () => {
        it("supports ASC/DESC in primary key columns", () => {
          testTblConstWc("PRIMARY KEY (id ASC, name DESC)");
        });
        it("supports COLLATE in primary key columns", () => {
          testTblConstWc("PRIMARY KEY (name COLLATE utf8)");
        });
      });

      it("UNIQUE", () => {
        testTblConstWc("UNIQUE (id)");
        testTblConstWc("UNIQUE KEY (id, name)");
        testTblConstWc("UNIQUE INDEX (id)");
      });

      it("CHECK", () => {
        testTblConstWc("CHECK (col > 10)");
      });

      describe("FOREIGN KEY", () => {
        it("basic FOREIGN KEY", () => {
          testTblConstWc("FOREIGN KEY (id) REFERENCES tbl2 (id)");
          testTblConstWc("FOREIGN KEY (id, name) REFERENCES tbl2 (id, name)");
        });

        dialect("sqlite", () => {
          it("column names are optional in REFERENCES-clause", () => {
            testTblConstWc("FOREIGN KEY (id) REFERENCES tbl2");
          });
        });

        it("supports ON DELETE/UPDATE actions", () => {
          testTblConstWc("FOREIGN KEY (id) REFERENCES tbl2 (id) ON UPDATE RESTRICT");
          testTblConstWc("FOREIGN KEY (id) REFERENCES tbl2 (id) ON DELETE CASCADE");
          testTblConstWc("FOREIGN KEY (id) REFERENCES tbl2 (id) ON UPDATE SET NULL");
          testTblConstWc(
            "FOREIGN KEY (id) REFERENCES tbl2 (id) ON DELETE SET DEFAULT ON UPDATE NO ACTION"
          );
        });

        it("supports MATCH types", () => {
          testTblConstWc("FOREIGN KEY (id) REFERENCES tbl2 (id) MATCH FULL");
          testTblConstWc("FOREIGN KEY (id) REFERENCES tbl2 (id) MATCH PARTIAL");
          testTblConstWc("FOREIGN KEY (id) REFERENCES tbl2 (id) MATCH SIMPLE");
        });

        it("supports combining MATCH type and ON UPDATE/DELETE", () => {
          testTblConstWc("FOREIGN KEY (id) REFERENCES tbl2 (id) MATCH FULL ON UPDATE CASCADE");
          testTblConstWc("FOREIGN KEY (id) REFERENCES tbl2 (id) ON DELETE SET NULL MATCH SIMPLE");
        });
      });

      dialect("sqlite", () => {
        it("supports deferrability of foreign keys", () => {
          testTblConstWc("FOREIGN KEY (id) REFERENCES tbl2 (id) DEFERRABLE");
          testTblConstWc("FOREIGN KEY (id) REFERENCES tbl2 (id) NOT DEFERRABLE");
          testTblConstWc("FOREIGN KEY (id) REFERENCES tbl2 (id) DEFERRABLE INITIALLY DEFERRED");
          testTblConstWc("FOREIGN KEY (id) REFERENCES tbl2 (id) DEFERRABLE INITIALLY IMMEDIATE");
        });
      });

      dialect(["mysql", "mariadb"], () => {
        it("INDEX / KEY", () => {
          testTblConstWc("KEY (id)");
          testTblConstWc("INDEX (id)");
          testTblConstWc("KEY (id, name)");
        });

        it("FULLTEXT INDEX", () => {
          testTblConstWc("FULLTEXT (name)");
          testTblConstWc("SPATIAL (name)");
          testTblConstWc("FULLTEXT INDEX (name)");
          testTblConstWc("SPATIAL INDEX (name, name2)");
          testTblConstWc("FULLTEXT KEY (name, name2)");
          testTblConstWc("SPATIAL KEY (name)");
        });
      });

      dialect("sqlite", () => {
        it("supports ON CONFLICT clause", () => {
          testTblConstWc("PRIMARY KEY (id) ON CONFLICT ROLLBACK");
          testTblConstWc("PRIMARY KEY (id) ON CONFLICT ABORT");
          testTblConstWc("PRIMARY KEY (id) ON CONFLICT FAIL");
          testTblConstWc("PRIMARY KEY (id) ON CONFLICT IGNORE");
          testTblConstWc("PRIMARY KEY (id) ON CONFLICT REPLACE");

          testTblConstWc("UNIQUE (id) ON CONFLICT FAIL");
          testTblConstWc("CHECK (id > 0) ON CONFLICT ROLLBACK");
        });
      });

      dialect(["mysql", "mariadb", "sqlite"], () => {
        it("supports CONSTRAINT keyword for table constraints", () => {
          testTblConstWc("CONSTRAINT PRIMARY KEY (id)");
          testTblConstWc("CONSTRAINT UNIQUE KEY (id)");
          testTblConstWc("CONSTRAINT CHECK (false)");
          testTblConstWc("CONSTRAINT FOREIGN KEY (id) REFERENCES tbl2 (id)");
        });

        it("supports named table constraints", () => {
          testTblConstWc("CONSTRAINT cname PRIMARY KEY (id)");
          testTblConstWc("CONSTRAINT cname UNIQUE KEY (id)");
          testTblConstWc("CONSTRAINT cname CHECK (false)");
          testTblConstWc("CONSTRAINT cname FOREIGN KEY (id) REFERENCES tbl2 (id)");
        });
      });
    });
  });
});
