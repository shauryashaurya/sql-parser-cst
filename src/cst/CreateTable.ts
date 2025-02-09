import { BaseNode, Keyword } from "./Base";
import { BigqueryOptionDefaultCollate, BigqueryOptions } from "./Bigquery";
import { ColumnConstraint, Constraint, TableConstraint } from "./Constraint";
import { DataType } from "./DataType";
import {
  Expr,
  Identifier,
  ListExpr,
  ParenExpr,
  EntityName,
  FuncCall,
} from "./Expr";
import { AsClause, WithConnectionClause } from "./ProcClause";
import {
  ClusterByClause,
  ForSystemTimeAsOfExpr,
  PartitionByClause,
  SubSelect,
} from "./Select";

export type AllCreateTableNodes =
  | CreateTableStmt
  | ColumnDefinition
  | TableOption
  | CreateTableLikeClause
  | CreateTableCopyClause
  | CreateTableCloneClause
  | WithPartitionColumnsClause
  | CreateTableUsingClause;

// CREATE TABLE
export interface CreateTableStmt extends BaseNode {
  type: "create_table_stmt";
  createKw: Keyword<"CREATE">;
  orReplaceKw?: [Keyword<"OR">, Keyword<"REPLACE">];
  temporaryKw?: Keyword<"TEMP" | "TEMPORARY">;
  externalKw?: Keyword<"EXTERNAL">;
  snapshotKw?: Keyword<"SNAPSHOT">;
  virtualKw?: Keyword<"VIRTUAL">;
  tableKw: Keyword<"TABLE">;
  ifNotExistsKw?: [Keyword<"IF">, Keyword<"NOT">, Keyword<"EXISTS">];
  name: EntityName;
  columns?: ParenExpr<
    ListExpr<ColumnDefinition | TableConstraint | Constraint<TableConstraint>>
  >;
  options?: ListExpr<TableOption>;
  clauses: CreateTableClause[];
}

export interface ColumnDefinition extends BaseNode {
  type: "column_definition";
  name: Identifier;
  dataType?: DataType;
  constraints: (ColumnConstraint | Constraint<ColumnConstraint>)[];
}

export interface TableOption extends BaseNode {
  type: "table_option";
  name: TableOptionNameSqlite | TableOptionNameMysql;
  hasEq?: boolean; // True when "=" sign is used
  value?: TableOptionValueMysql | Expr;
}

type TableOptionNameSqlite =
  | Keyword<"STRICT">
  | [Keyword<"WITHOUT">, Keyword<"ROWID">];

type TableOptionNameMysql =
  | [Keyword<"START">, Keyword<"TRANSACTION">]
  | Keyword<"AUTOEXTEND_SIZE">
  | Keyword<"AUTO_INCREMENT">
  | Keyword<"AVG_ROW_LENGTH">
  | [Keyword<"DEFAULT">, Keyword<"CHARACTER">, Keyword<"SET">]
  | [Keyword<"CHARACTER">, Keyword<"SET">]
  | Keyword<"CHECKSUM">
  | [Keyword<"DEFAULT">, Keyword<"COLLATE">]
  | Keyword<"COLLATE">
  | Keyword<"COMMENT">
  | Keyword<"COMPRESSION">
  | Keyword<"CONNECTION">
  | [Keyword<"DATA">, Keyword<"DIRECTORY">]
  | [Keyword<"INDEX">, Keyword<"DIRECTORY">]
  | Keyword<"DELAY_KEY_WRITE">
  | Keyword<"ENCRYPTION">
  | Keyword<"ENGINE">
  | Keyword<"ENGINE_ATTRIBUTE">
  | Keyword<"INSERT_METHOD">
  | Keyword<"KEY_BLOCK_SIZE">
  | Keyword<"MAX_ROWS">
  | Keyword<"MIN_ROWS">
  | Keyword<"PACK_KEYS">
  | Keyword<"PASSWORD">
  | Keyword<"ROW_FORMAT">
  | Keyword<"SECONDARY_ENGINE_ATTRIBUTE">
  | Keyword<"STATS_AUTO_RECALC">
  | Keyword<"STATS_PERSISTENT">
  | Keyword<"STATS_SAMPLE_PAGES">;

type TableOptionValueMysql = Keyword<
  | "DEFAULT"
  | "DYNAMIC"
  | "FIXED"
  | "COMPRESSED"
  | "REDUNDANT"
  | "COMPACT"
  | "NO"
  | "FIRST"
  | "LAST"
>;

type CreateTableClause =
  | AsClause<SubSelect>
  | CreateTableLikeClause
  | BigqueryCreateTableClause
  | SqliteCreateTableClause;

export interface CreateTableLikeClause extends BaseNode {
  type: "create_table_like_clause";
  likeKw: Keyword<"LIKE">;
  name: EntityName;
}

type BigqueryCreateTableClause =
  | BigqueryOptions
  | BigqueryOptionDefaultCollate
  | PartitionByClause
  | ClusterByClause
  | CreateTableCopyClause
  | CreateTableCloneClause
  | WithConnectionClause
  | WithPartitionColumnsClause;

export interface CreateTableCopyClause extends BaseNode {
  type: "create_table_copy_clause";
  copyKw: Keyword<"COPY">;
  name: EntityName;
}

export interface CreateTableCloneClause extends BaseNode {
  type: "create_table_clone_clause";
  cloneKw: Keyword<"CLONE">;
  table: EntityName | ForSystemTimeAsOfExpr;
}

export interface WithPartitionColumnsClause extends BaseNode {
  type: "with_partition_columns_clause";
  withPartitionColumnsKw: [
    Keyword<"WITH">,
    Keyword<"PARTITION">,
    Keyword<"COLUMNS">
  ];
  columns?: ParenExpr<ListExpr<ColumnDefinition>>;
}

type SqliteCreateTableClause = CreateTableUsingClause;

export interface CreateTableUsingClause extends BaseNode {
  type: "create_table_using_clause";
  usingKw: Keyword<"USING">;
  module: FuncCall;
}
