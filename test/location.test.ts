import { dialect, parse, parseExpr } from "./test_utils";

describe("location", () => {
  it("includeRange:true adds location data to nodes", () => {
    expect(parse("SELECT (1 + col) FROM tbl t", { includeRange: true })).toMatchInlineSnapshot(`
      {
        "range": [
          0,
          27,
        ],
        "statements": [
          {
            "clauses": [
              {
                "asStructOrValueKw": undefined,
                "columns": {
                  "items": [
                    {
                      "expr": {
                        "left": {
                          "range": [
                            8,
                            9,
                          ],
                          "text": "1",
                          "type": "number_literal",
                          "value": 1,
                        },
                        "operator": "+",
                        "range": [
                          8,
                          15,
                        ],
                        "right": {
                          "name": "col",
                          "range": [
                            12,
                            15,
                          ],
                          "text": "col",
                          "type": "identifier",
                        },
                        "type": "binary_expr",
                      },
                      "range": [
                        7,
                        16,
                      ],
                      "type": "paren_expr",
                    },
                  ],
                  "range": [
                    7,
                    16,
                  ],
                  "type": "list_expr",
                },
                "distinctKw": undefined,
                "hints": [],
                "range": [
                  0,
                  16,
                ],
                "selectKw": {
                  "name": "SELECT",
                  "range": [
                    0,
                    6,
                  ],
                  "text": "SELECT",
                  "type": "keyword",
                },
                "type": "select_clause",
              },
              {
                "expr": {
                  "alias": {
                    "name": "t",
                    "range": [
                      26,
                      27,
                    ],
                    "text": "t",
                    "type": "identifier",
                  },
                  "expr": {
                    "name": "tbl",
                    "range": [
                      22,
                      25,
                    ],
                    "text": "tbl",
                    "type": "identifier",
                  },
                  "range": [
                    22,
                    27,
                  ],
                  "type": "alias",
                },
                "fromKw": {
                  "name": "FROM",
                  "range": [
                    17,
                    21,
                  ],
                  "text": "FROM",
                  "type": "keyword",
                },
                "range": [
                  17,
                  27,
                ],
                "type": "from_clause",
              },
            ],
            "range": [
              0,
              27,
            ],
            "type": "select_stmt",
          },
        ],
        "type": "program",
      }
    `);
  });

  it("includeRange:true adds location data to comment nodes", () => {
    expect(parse("SELECT /*com1*/ 2 --com2", { includeComments: true, includeRange: true }))
      .toMatchInlineSnapshot(`
      {
        "range": [
          0,
          17,
        ],
        "statements": [
          {
            "clauses": [
              {
                "asStructOrValueKw": undefined,
                "columns": {
                  "items": [
                    {
                      "range": [
                        16,
                        17,
                      ],
                      "text": "2",
                      "type": "number_literal",
                      "value": 2,
                    },
                  ],
                  "leading": [
                    {
                      "range": [
                        7,
                        15,
                      ],
                      "text": "/*com1*/",
                      "type": "block_comment",
                    },
                  ],
                  "range": [
                    16,
                    17,
                  ],
                  "type": "list_expr",
                },
                "distinctKw": undefined,
                "hints": [],
                "range": [
                  0,
                  17,
                ],
                "selectKw": {
                  "name": "SELECT",
                  "range": [
                    0,
                    6,
                  ],
                  "text": "SELECT",
                  "type": "keyword",
                },
                "type": "select_clause",
              },
            ],
            "range": [
              0,
              17,
            ],
            "type": "select_stmt",
          },
        ],
        "trailing": [
          {
            "range": [
              18,
              24,
            ],
            "text": "--com2",
            "type": "line_comment",
          },
        ],
        "type": "program",
      }
    `);
  });

  dialect("bigquery", () => {
    it("includeRange:true adds location data to member_expr nodes", () => {
      expect(parseExpr("my_arr[1][2]", { includeRange: true })).toMatchInlineSnapshot(`
        {
          "object": {
            "object": {
              "name": "my_arr",
              "range": [
                7,
                13,
              ],
              "text": "my_arr",
              "type": "identifier",
            },
            "property": {
              "expr": {
                "range": [
                  14,
                  15,
                ],
                "text": "1",
                "type": "number_literal",
                "value": 1,
              },
              "range": [
                13,
                16,
              ],
              "type": "array_subscript",
            },
            "range": [
              7,
              16,
            ],
            "type": "member_expr",
          },
          "property": {
            "expr": {
              "range": [
                17,
                18,
              ],
              "text": "2",
              "type": "number_literal",
              "value": 2,
            },
            "range": [
              16,
              19,
            ],
            "type": "array_subscript",
          },
          "range": [
            7,
            19,
          ],
          "type": "member_expr",
        }
      `);
    });
  });
});
