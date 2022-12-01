import { BaseNode, Keyword } from "./Base";
import { StringLiteral } from "./Literal";
import { Expr, Identifier, ListExpr, ParenExpr, Table } from "./Expr";
import { SortSpecification } from "./Select";

export type AllConstraintNodes =
  | Constraint<ColumnConstraint | TableConstraint>
  | ColumnConstraint
  | TableConstraint
  | ConstraintName
  | ConstraintDeferrable
  | ReferencesSpecification
  | ReferentialAction
  | ReferentialMatch
  | OnConflictClause;

export interface Constraint<T> extends BaseNode {
  type: "constraint";
  name?: ConstraintName;
  constraint: T;
  deferrable?: ConstraintDeferrable;
}

export interface ConstraintName extends BaseNode {
  type: "constraint_name";
  constraintKw: Keyword<"CONSTRAINT">;
  name?: Identifier;
}

export interface ConstraintDeferrable extends BaseNode {
  type: "constraint_deferrable";
  deferrableKw: Keyword<"DEFERRABLE"> | [Keyword<"NOT">, Keyword<"DEFERRABLE">];
  initiallyKw?: [Keyword<"INITIALLY">, Keyword<"IMMEDIATE" | "DEFERRED">];
}

export type TableConstraint =
  | ConstraintPrimaryKey
  | ConstraintForeignKey
  | ConstraintUnique
  | ConstraintCheck
  | ConstraintIndex;

export type ColumnConstraint =
  | ConstraintNull
  | ConstraintNotNull
  | ConstraintDefault
  | ConstraintAutoIncrement
  | ConstraintUnique
  | ConstraintPrimaryKey
  | ReferencesSpecification
  | ConstraintComment
  | ConstraintCheck
  | ConstraintIndex
  | ConstraintGenerated
  | ConstraintCollate
  | ConstraintVisible
  | ConstraintColumnFormat
  | ConstraintStorage
  | ConstraintEngineAttribute;

export interface ConstraintPrimaryKey extends BaseNode {
  type: "constraint_primary_key";
  primaryKeyKw: [Keyword<"PRIMARY">, Keyword<"KEY">];
  columns?: ParenExpr<ListExpr<SortSpecification | Identifier>>;
  onConflict?: OnConflictClause;
}

export interface ConstraintForeignKey extends BaseNode {
  type: "constraint_foreign_key";
  foreignKeyKw: [Keyword<"FOREIGN">, Keyword<"KEY">];
  columns: ParenExpr<ListExpr<Identifier>>;
  references: ReferencesSpecification;
}

export interface ReferencesSpecification extends BaseNode {
  type: "references_specification";
  referencesKw: Keyword<"REFERENCES">;
  table: Table;
  columns?: ParenExpr<ListExpr<Identifier>>;
  options: (ReferentialAction | ReferentialMatch)[];
}

export interface ReferentialAction extends BaseNode {
  type: "referential_action";
  onKw: Keyword<"ON">;
  eventKw: Keyword<"DELETE" | "UPDATE">; // DELETE | UPDATE
  actionKw:
    | Keyword<"RESTRICT" | "CASCADE">
    | [Keyword<"SET">, Keyword<"NULL" | "DEFAULT">]
    | [Keyword<"NO">, Keyword<"ACTION">];
}

export interface ReferentialMatch extends BaseNode {
  type: "referential_match";
  matchKw: Keyword<"MATCH">;
  typeKw: Keyword<"FULL" | "PARTIAL" | "SIMPLE">;
}

export interface ConstraintUnique extends BaseNode {
  type: "constraint_unique";
  uniqueKw: Keyword<"UNIQUE"> | [Keyword<"UNIQUE">, Keyword<"KEY" | "INDEX">];
  columns?: ParenExpr<ListExpr<Identifier>>;
  onConflict?: OnConflictClause;
}

export interface ConstraintCheck extends BaseNode {
  type: "constraint_check";
  checkKw: Keyword<"CHECK">;
  expr: ParenExpr<Expr>;
  onConflict?: OnConflictClause;
}

export interface ConstraintIndex extends BaseNode {
  type: "constraint_index";
  indexTypeKw?: Keyword<"FULLTEXT" | "SPATIAL">;
  indexKw: Keyword<"INDEX" | "KEY">;
  columns?: ParenExpr<ListExpr<Identifier>>;
}

export interface ConstraintNull extends BaseNode {
  type: "constraint_null";
  nullKw: Keyword<"NULL">;
}

export interface ConstraintNotNull extends BaseNode {
  type: "constraint_not_null";
  notNullKw: [Keyword<"NOT">, Keyword<"NULL">];
  onConflict?: OnConflictClause;
}

export interface ConstraintDefault extends BaseNode {
  type: "constraint_default";
  defaultKw: Keyword<"DEFAULT">;
  expr: Expr;
}

export interface ConstraintAutoIncrement extends BaseNode {
  type: "constraint_auto_increment";
  autoIncrementKw: Keyword<"AUTO_INCREMENT">;
}

export interface ConstraintComment extends BaseNode {
  type: "constraint_comment";
  commentKw: Keyword<"COMMENT">;
  value: StringLiteral;
}

export interface ConstraintGenerated extends BaseNode {
  type: "constraint_generated";
  generatedKw?: [Keyword<"GENERATED">, Keyword<"ALWAYS">];
  asKw: Keyword<"AS">;
  expr: ParenExpr<Expr>;
  storageKw?: Keyword<"STORED" | "VIRTUAL">;
}

export interface ConstraintCollate extends BaseNode {
  type: "constraint_collate";
  collateKw: Keyword<"COLLATE">;
  collation: Identifier | StringLiteral;
}

export interface ConstraintVisible extends BaseNode {
  type: "constraint_visible";
  visibleKw: Keyword<"VISIBLE" | "INVISIBLE">;
}

export interface ConstraintColumnFormat extends BaseNode {
  type: "constraint_column_format";
  columnFormatKw: Keyword<"COLUMN_FORMAT">;
  formatKw: Keyword<"FIXED" | "DYNAMIC" | "DEFAULT">;
}

export interface ConstraintStorage extends BaseNode {
  type: "constraint_storage";
  storageKw: Keyword<"STORAGE">;
  typeKw: Keyword<"DISK" | "MEMORY">;
}

export interface ConstraintEngineAttribute extends BaseNode {
  type: "constraint_engine_attribute";
  engineAttributeKw: Keyword<"ENGINE_ATTRIBUTE" | "SECONDARY_ENGINE_ATTRIBUTE">;
  hasEq: boolean; // True when "=" sign is used
  value: StringLiteral;
}

export interface OnConflictClause extends BaseNode {
  type: "on_conflict_clause";
  onConflictKw: [Keyword<"ON">, Keyword<"CONFLICT">];
  resolutionKw: Keyword<"ROLLBACK" | "ABORT" | "FAIL" | "IGNORE" | "REPLACE">;
}
