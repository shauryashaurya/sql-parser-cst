export interface BaseNode {
  leading?: Whitespace[];
  trailing?: Whitespace[];
  range?: [number, number];
}

export interface Whitespace {
  type: "block_comment" | "line_comment" | "newline" | "space";
  text: string;
}

export type Node =
  | Program
  | Statement
  | Clause
  | Expr
  | Keyword
  | JoinExpr
  | JoinOnSpecification
  | JoinUsingSpecification
  | SortSpecification
  | ColumnDefinition
  | CreateTableAs
  | Constraint<ColumnConstraint | TableConstraint>
  | ColumnConstraint
  | TableConstraint
  | ConstraintName
  | ConstraintDeferrable
  | ReferencesSpecification
  | ReferentialAction
  | ReferentialMatch
  | OnConflictClause
  | TableOption
  | AlterAction
  | TriggerEvent
  | TriggerCondition
  | TriggerBody
  | AllColumns
  | RollbackToSavepoint
  | DistinctArg
  | CastArg
  | CommonTableExpression
  | DataType
  | NamedWindow
  | WindowDefinition
  | FilterArg
  | OverArg
  | FrameNode
  | CaseWhen
  | CaseElse
  | RowConstructor
  | DefaultValues
  | Default
  | UpsertOption
  | OrAlternateAction
  | ColumnAssignment
  | UpsertActionNothing
  | UpsertActionUpdate
  | Alias
  | IndexedTableRef
  | NotIndexedTableRef
  | PragmaAssignment
  | PragmaFuncCall;

export interface Program extends BaseNode {
  type: "program";
  statements: Statement[];
}

export type Statement =
  | EmptyStmt
  | CompoundSelectStmt
  | SelectStmt
  | CreateTableStmt
  | AlterTableStmt
  | DropTableStmt
  | InsertStmt
  | DeleteStmt
  | UpdateStmt
  | CreateViewStmt
  | DropViewStmt
  | CreateIndexStmt
  | DropIndexStmt
  | CreateTriggerStmt
  | DropTriggerStmt
  | AnalyzeStmt
  | ExplainStmt
  | TransactionStmt
  | SqliteStmt;

export type Expr =
  | ExprList
  | ParenExpr
  | BinaryExpr
  | PrefixOpExpr
  | PostfixOpExpr
  | FuncCall
  | TableFuncCall
  | CastExpr
  | RaiseExpr
  | BetweenExpr
  | CaseExpr
  | IntervalExpr
  | StringWithCharset
  | Literal
  | ColumnRef
  | TableRef
  | Identifier
  | Parameter;

export type Literal =
  | StringLiteral
  | NumberLiteral
  | BooleanLiteral
  | NullLiteral
  | DateTimeLiteral;

export interface EmptyStmt extends BaseNode {
  type: "empty_stmt";
  foo: number;
}

// SELECT
export interface CompoundSelectStmt extends BaseNode {
  type: "compound_select_stmt";
  left: SubSelect;
  operator: Keyword | Keyword[]; // { UNION | EXCEPT | INTERSECT } [ALL | DISTINCT]
  right: SubSelect;
}

export type SubSelect = SelectStmt | CompoundSelectStmt | ParenExpr<SubSelect>;

export interface SelectStmt extends BaseNode {
  type: "select_stmt";
  clauses: (
    | WithClause
    | SelectClause
    | FromClause
    | WhereClause
    | GroupByClause
    | HavingClause
    | WindowClause
    | OrderByClause
    | LimitClause
  )[];
}

export type Clause =
  | WithClause
  | SelectClause
  | FromClause
  | WhereClause
  | GroupByClause
  | HavingClause
  | WindowClause
  | OrderByClause
  | PartitionByClause // in window definitions
  | LimitClause
  | InsertClause
  | ValuesClause
  | UpdateClause // in UPDATE statement
  | SetClause // in UPDATE statement
  | UpsertClause // in INSERT statement
  | ReturningClause; // in UPDATE,INSERT,DELETE

export interface WithClause extends BaseNode {
  type: "with_clause";
  withKw: Keyword;
  recursiveKw?: Keyword;
  tables: ExprList<CommonTableExpression>;
}

export interface CommonTableExpression extends BaseNode {
  type: "common_table_expression";
  table: Identifier;
  columns?: ParenExpr<ExprList<ColumnRef>>;
  asKw: Keyword;
  optionKw?: Keyword[];
  expr: Expr;
}

export interface SelectClause extends BaseNode {
  type: "select_clause";
  selectKw: Keyword;
  options: Keyword[];
  columns: ExprList<Expr | Alias<Expr>>;
}

export interface FromClause extends BaseNode {
  type: "from_clause";
  fromKw: Keyword;
  expr: TableOrSubquery | JoinExpr;
}

export interface WhereClause extends BaseNode {
  type: "where_clause";
  whereKw: Keyword;
  expr: Expr;
}

export interface GroupByClause extends BaseNode {
  type: "group_by_clause";
  groupByKw: Keyword[];
  columns: ExprList<Expr>;
}

export interface HavingClause extends BaseNode {
  type: "having_clause";
  havingKw: Keyword;
  expr: Expr;
}

export interface WindowClause extends BaseNode {
  type: "window_clause";
  windowKw: Keyword;
  namedWindows: NamedWindow[];
}

export interface NamedWindow extends BaseNode {
  type: "named_window";
  name: Identifier;
  asKw: Keyword;
  window: ParenExpr<WindowDefinition>;
}

export interface WindowDefinition extends BaseNode {
  type: "window_definition";
  baseWindowName?: Identifier;
  partitionBy?: PartitionByClause;
  orderBy?: OrderByClause;
  frame?: FrameClause;
}

export interface OrderByClause extends BaseNode {
  type: "order_by_clause";
  orderByKw: Keyword[];
  specifications: ExprList<SortSpecification | ColumnRef>;
  withRollupKw?: Keyword[]; // WITH ROLLUP
}

export interface PartitionByClause extends BaseNode {
  type: "partition_by_clause";
  partitionByKw: Keyword[];
  specifications: ExprList<Expr>;
}

export interface LimitClause extends BaseNode {
  type: "limit_clause";
  limitKw: Keyword;
  count: Expr;
  offsetKw?: Keyword;
  offset?: Expr;
}

export interface JoinExpr extends BaseNode {
  type: "join_expr";
  left: JoinExpr | TableOrSubquery;
  operator: Keyword[] | ",";
  right: TableOrSubquery;
  specification?: JoinOnSpecification | JoinUsingSpecification;
}

export type TableOrSubquery =
  | TableRef
  | TableFuncCall
  | IndexedTableRef
  | NotIndexedTableRef
  | ParenExpr<SubSelect | TableOrSubquery | JoinExpr>
  | Alias<TableOrSubquery>;

// SQLite only
export interface IndexedTableRef extends BaseNode {
  type: "indexed_table_ref";
  table: TableRef | Alias<TableRef>;
  indexedByKw: Keyword[]; // INDEXED BY
  index: Identifier;
}
export interface NotIndexedTableRef extends BaseNode {
  type: "not_indexed_table_ref";
  table: TableRef | Alias<TableRef>;
  notIndexedKw: Keyword[]; // NOT INDEXED
}

export interface JoinOnSpecification extends BaseNode {
  type: "join_on_specification";
  onKw: Keyword;
  expr: Expr;
}

export interface JoinUsingSpecification extends BaseNode {
  type: "join_using_specification";
  usingKw: Keyword;
  expr: ParenExpr<ExprList<ColumnRef>>;
}

export interface SortSpecification extends BaseNode {
  type: "sort_specification";
  expr: Expr;
  orderKw?: Keyword; // ASC | DESC
  nullHandlingKw?: Keyword[]; // NULLS FIRST | NULLS LAST
}

export interface ReturningClause extends BaseNode {
  type: "returning_clause";
  returningKw: Keyword; // RETURNING
  columns: ExprList<Expr | Alias<Expr>>;
}

// CREATE TABLE
export interface CreateTableStmt extends BaseNode {
  type: "create_table_stmt";
  createKw: Keyword;
  tableKw: Keyword;
  temporaryKw?: Keyword;
  ifNotExistsKw?: Keyword[];
  table: TableRef;
  columns?: ParenExpr<
    ExprList<ColumnDefinition | TableConstraint | Constraint<TableConstraint>>
  >;
  options?: ExprList<TableOption>;
  as?: CreateTableAs;
}

export interface CreateTableAs extends BaseNode {
  type: "create_table_as";
  asKw: Keyword; // AS
  expr: SubSelect;
}

export interface ColumnDefinition extends BaseNode {
  type: "column_definition";
  name: ColumnRef;
  dataType?: DataType;
  constraints: (ColumnConstraint | Constraint<ColumnConstraint>)[];
}

export interface DataType extends BaseNode {
  type: "data_type";
  nameKw: Keyword | Keyword[];
  params?: ParenExpr<ExprList<Literal>>;
}

export interface Constraint<T> extends BaseNode {
  type: "constraint";
  name?: ConstraintName;
  constraint: T;
  deferrable?: ConstraintDeferrable;
}

export interface ConstraintName extends BaseNode {
  type: "constraint_name";
  constraintKw: Keyword;
  name?: Identifier;
}

export interface ConstraintDeferrable extends BaseNode {
  type: "constraint_deferrable";
  deferrableKw: Keyword | Keyword[]; // DEFERRABLE | NOT DEFERRABLE
  initiallyKw?: Keyword[]; // INITIALLY IMMEDIATE | INITIALLY DEFERRED
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
  primaryKeyKw: Keyword[];
  columns?: ParenExpr<ExprList<SortSpecification | ColumnRef>>;
  onConflict?: OnConflictClause;
}

export interface ConstraintForeignKey extends BaseNode {
  type: "constraint_foreign_key";
  foreignKeyKw: Keyword[];
  columns: ParenExpr<ExprList<ColumnRef>>;
  references: ReferencesSpecification;
}

export interface ReferencesSpecification extends BaseNode {
  type: "references_specification";
  referencesKw: Keyword;
  table: TableRef;
  columns?: ParenExpr<ExprList<ColumnRef>>;
  options: (ReferentialAction | ReferentialMatch)[];
}

export interface ReferentialAction extends BaseNode {
  type: "referential_action";
  onKw: Keyword; // ON
  eventKw: Keyword; // DELETE | UPDATE
  actionKw: Keyword | Keyword[]; // RESTRICT | CASCADE | SET NULL | NO ACTION | SET DEFAULT
}

export interface ReferentialMatch extends BaseNode {
  type: "referential_match";
  matchKw: Keyword;
  typeKw: Keyword; // FULL | PARTIAL | SIMPLE
}

export interface ConstraintUnique extends BaseNode {
  type: "constraint_unique";
  uniqueKw: Keyword | Keyword[];
  columns?: ParenExpr<ExprList<ColumnRef>>;
  onConflict?: OnConflictClause;
}

export interface ConstraintCheck extends BaseNode {
  type: "constraint_check";
  checkKw: Keyword;
  expr: ParenExpr<Expr>;
  onConflict?: OnConflictClause;
}

export interface ConstraintIndex extends BaseNode {
  type: "constraint_index";
  indexTypeKw?: Keyword; // FULLTEXT | SPATIAL
  indexKw: Keyword; // INDEX | KEY
  columns?: ParenExpr<ExprList<ColumnRef>>;
}

export interface ConstraintNull extends BaseNode {
  type: "constraint_null";
  nullKw: Keyword;
}

export interface ConstraintNotNull extends BaseNode {
  type: "constraint_not_null";
  notNullKw: Keyword[];
  onConflict?: OnConflictClause;
}

export interface ConstraintDefault extends BaseNode {
  type: "constraint_default";
  defaultKw: Keyword;
  expr: Expr;
}

export interface ConstraintAutoIncrement extends BaseNode {
  type: "constraint_auto_increment";
  autoIncrementKw: Keyword;
}

export interface ConstraintComment extends BaseNode {
  type: "constraint_comment";
  commentKw: Keyword;
  value: StringLiteral;
}

export interface ConstraintGenerated extends BaseNode {
  type: "constraint_generated";
  generatedKw?: Keyword[]; // GENERATED ALWAYS
  asKw: Keyword[]; // AS
  expr: ParenExpr<Expr>;
  storageKw?: Keyword; // STORED | VIRTUAL
}

export interface ConstraintCollate extends BaseNode {
  type: "constraint_collate";
  collateKw: Keyword; // COLLATE
  collation: Identifier;
}

export interface ConstraintVisible extends BaseNode {
  type: "constraint_visible";
  visibleKw: Keyword; // VISIBLE | INVISIBLE
}

export interface ConstraintColumnFormat extends BaseNode {
  type: "constraint_column_format";
  columnFormatKw: Keyword; // COLUMN_FORMAT
  formatKw: Keyword; // FIXED | DYNAMIC | DEFAULT
}

export interface ConstraintStorage extends BaseNode {
  type: "constraint_storage";
  storageKw: Keyword; // STORAGE
  typeKw: Keyword; // DISK | MEMORY
}

export interface ConstraintEngineAttribute extends BaseNode {
  type: "constraint_engine_attribute";
  engineAttributeKw: Keyword; // ENGINE_ATTRIBUTE | SECONDARY_ENGINE_ATTRIBUTE
  hasEq: boolean; // True when "=" sign is used
  value: StringLiteral;
}

export interface OnConflictClause extends BaseNode {
  type: "on_conflict_clause";
  onConflictKw: Keyword[]; // ON CONFLICT
  resolutionKw: Keyword; // ROLLBACK | ABORT | FAIL | IGNORE | REPLACE
}

export interface TableOption extends BaseNode {
  type: "table_option";
  name: Keyword | Keyword[];
  hasEq?: boolean; // True when "=" sign is used
  value?: NumberLiteral | StringLiteral | Identifier | Keyword;
}

// ALTER TABLE
export interface AlterTableStmt extends BaseNode {
  type: "alter_table_stmt";
  alterTableKw: Keyword[];
  table: TableRef;
  actions: ExprList<AlterAction>;
}

export type AlterAction =
  | AlterRenameTable
  | AlterRenameColumn
  | AlterAddColumn
  | AlterDropColumn;

export interface AlterRenameTable extends BaseNode {
  type: "alter_rename_table";
  renameKw: Keyword | Keyword[]; // RENAME | RENAME TO | RENAME AS
  newName: TableRef;
}

export interface AlterRenameColumn extends BaseNode {
  type: "alter_rename_column";
  renameKw: Keyword | Keyword[]; // RENAME | RENAME COLUMN
  oldName: ColumnRef;
  toKw: Keyword; // TO | AS
  newName: ColumnRef;
}

export interface AlterAddColumn extends BaseNode {
  type: "alter_add_column";
  addKw: Keyword | Keyword[]; // ADD | ADD COLUMN
  column: ColumnDefinition;
}

export interface AlterDropColumn extends BaseNode {
  type: "alter_drop_column";
  dropKw: Keyword | Keyword[]; // DROP | DROP COLUMN
  column: ColumnRef;
}

// DROP TABLE
export interface DropTableStmt extends BaseNode {
  type: "drop_table_stmt";
  dropKw: Keyword;
  temporaryKw?: Keyword;
  tableKw: Keyword;
  ifExistsKw?: Keyword[];
  tables: ExprList<TableRef>;
  behaviorKw?: Keyword; // CASCADE | RESTRICT
}

// INSERT INTO
export interface InsertStmt extends BaseNode {
  type: "insert_stmt";
  clauses: (
    | WithClause
    | InsertClause
    | (ValuesClause | SubSelect | DefaultValues)
    | UpsertClause
    | ReturningClause
  )[];
}

export interface InsertClause extends BaseNode {
  type: "insert_clause";
  insertKw: Keyword; // INSERT | REPLACE
  options: UpsertOption[];
  orAction?: OrAlternateAction;
  intoKw?: Keyword; // INTO
  table: TableRef | Alias<TableRef>;
  columns?: ParenExpr<ExprList<ColumnRef>>;
}

// Only in MySQL INSERT & UPDATE clauses
export interface UpsertOption extends BaseNode {
  type: "upsert_option";
  kw: Keyword; // LOW_PRIORITY | DELAYED | HIGH_PRIORITY | IGNORE
}

// Only in SQLite
export interface OrAlternateAction extends BaseNode {
  type: "or_alternate_action";
  orKw: Keyword; // OR
  actionKw: Keyword; // ABORT | FAIL | IGNORE | REPLACE | ROLLBACK
}

export interface ValuesClause extends BaseNode {
  type: "values_clause";
  valuesKw: Keyword; // VALUES | VALUE
  values: ExprList<ParenExpr<ExprList<Expr | Default>> | RowConstructor>;
}

// only in MySQL
export interface RowConstructor extends BaseNode {
  type: "row_constructor";
  rowKw: Keyword; // ROW
  row: ParenExpr<ExprList<Expr | Default>>;
}

export interface DefaultValues extends BaseNode {
  type: "default_values";
  kw: Keyword[]; // DEFAULT VALUES
}

export interface Default extends BaseNode {
  type: "default";
  kw: Keyword[]; // DEFAULT
}

// only in SQLite
export interface UpsertClause extends BaseNode {
  type: "upsert_clause";
  onConflictKw: Keyword[]; // ON CONFLICT
  columns?: ParenExpr<ExprList<SortSpecification | ColumnRef>>;
  where?: WhereClause;
  doKw: Keyword; // DO
  action: UpsertActionNothing | UpsertActionUpdate;
}

export interface UpsertActionNothing extends BaseNode {
  type: "upsert_action_nothing";
  nothingKw: Keyword; // NOTHING
}

export interface UpsertActionUpdate extends BaseNode {
  type: "upsert_action_update";
  updateKw: Keyword; // UPDATE
  set: SetClause;
  where?: WhereClause;
}

// DELETE FROM
export interface DeleteStmt extends BaseNode {
  type: "delete_stmt";
  with?: WithClause;
  deleteKw: Keyword;
  fromKw: Keyword;
  table: TableRef | Alias<TableRef>;
  where?: WhereClause;
  returning?: ReturningClause;
}

// UPDATE
export interface UpdateStmt extends BaseNode {
  type: "update_stmt";
  clauses: (
    | WithClause
    | UpdateClause
    | SetClause
    | WhereClause
    | FromClause
    | OrderByClause
    | LimitClause
    | ReturningClause
  )[];
}

export interface UpdateClause extends BaseNode {
  type: "update_clause";
  updateKw: Keyword;
  options: UpsertOption[];
  orAction?: OrAlternateAction;
  tables: ExprList<TableRef | Alias<TableRef>>;
}

export interface SetClause extends BaseNode {
  type: "set_clause";
  setKw: Keyword;
  assignments: ExprList<ColumnAssignment>;
}

export interface ColumnAssignment extends BaseNode {
  type: "column_assignment";
  column: ColumnRef | ParenExpr<ExprList<ColumnRef>>;
  expr: Expr | Default;
}

// CREATE VIEW
export interface CreateViewStmt extends BaseNode {
  type: "create_view_stmt";
  createKw: Keyword;
  temporaryKw?: Keyword;
  viewKw: Keyword;
  ifNotExistsKw?: Keyword[];
  name: TableRef;
  columns?: ParenExpr<ExprList<ColumnRef>>;
  asKw: Keyword;
  expr: SubSelect;
}

// DROP VIEW
export interface DropViewStmt extends BaseNode {
  type: "drop_view_stmt";
  dropViewKw: Keyword[];
  ifExistsKw?: Keyword[];
  views: ExprList<TableRef>;
  behaviorKw?: Keyword; // CASCADE | RESTRICT
}

// CREATE INDEX
export interface CreateIndexStmt extends BaseNode {
  type: "create_index_stmt";
  createKw: Keyword; // CREATE
  indexTypeKw?: Keyword; // UNIQUE | FULLTEXT | SPATIAL
  indexKw: Keyword; // INDEX
  ifNotExistsKw?: Keyword[]; // IF NOT EXISTS
  name: TableRef;
  onKw: Keyword; // ON
  table: TableRef;
  columns: ParenExpr<ExprList<SortSpecification | ColumnRef>>;
  where?: WhereClause;
}

// DROP INDEX
export interface DropIndexStmt extends BaseNode {
  type: "drop_index_stmt";
  dropIndexKw: Keyword[]; // DROP INDEX
  ifExistsKw?: Keyword[]; // IF EXISTS
  indexes: ExprList<TableRef>;
  onKw?: Keyword; // ON
  table?: TableRef;
}

// CREATE TRIGGER
export interface CreateTriggerStmt extends BaseNode {
  type: "create_trigger_stmt";
  createKw: Keyword; // CREATE
  temporaryKw?: Keyword; // TEMPORARY | TEMP
  triggerKw: Keyword; // TRIGGER
  ifNotExistsKw?: Keyword[]; // IF NOT EXISTS
  name: TableRef;
  event: TriggerEvent;
  onKw: Keyword; // ON
  table: TableRef;
  forEachRowKw?: Keyword[]; // FOR EACH ROW
  condition?: TriggerCondition;
  body: TriggerBody;
}

export interface TriggerEvent extends BaseNode {
  type: "trigger_event";
  timeKw?: Keyword | Keyword[]; // BEFORE | AFTER | INSTEAD OF
  eventKw: Keyword; // INSERT | DELETE | UPDATE
  ofKw?: Keyword; // OF
  columns?: ExprList<ColumnRef>;
}

export interface TriggerCondition extends BaseNode {
  type: "trigger_condition";
  whenKw?: Keyword; // WHEN
  expr: Expr;
}

export interface TriggerBody extends BaseNode {
  type: "trigger_body";
  beginKw: Keyword; // BEGIN
  statements: Statement[];
  endKw: Keyword; // END
}

// DROP TRIGGER
export interface DropTriggerStmt extends BaseNode {
  type: "drop_trigger_stmt";
  dropTriggerKw: Keyword[]; // DROP TRIGGER
  ifExistsKw?: Keyword[]; // IF EXISTS
  trigger: TableRef;
}

// ANALYZE
export interface AnalyzeStmt extends BaseNode {
  type: "analyze_stmt";
  analyzeKw: Keyword; // ANALYZE
  tableKw?: Keyword; // TABLE
  tables: ExprList<TableRef>;
}

// EXPLAIN
export interface ExplainStmt extends BaseNode {
  type: "explain_stmt";
  explainKw: Keyword; // EXPLAIN | DESCRIBE | DESC
  analyzeKw?: Keyword; // ANALYZE
  queryPlanKw?: Keyword[]; // QUERY PLAN
  statement: Statement;
}

// Transactions
export type TransactionStmt =
  | StartTransactionStmt
  | CommitTransactionStmt
  | RollbackTransactionStmt
  | SavepointStmt
  | ReleaseSavepointStmt;

export interface StartTransactionStmt extends BaseNode {
  type: "start_transaction_stmt";
  startKw: Keyword; // START | BEGIN
  behaviorKw?: Keyword; // DEFERRED | IMMEDIATE | EXCLUSIVE
  transactionKw?: Keyword; // TRANSACTION | WORK
}

export interface CommitTransactionStmt extends BaseNode {
  type: "commit_transaction_stmt";
  commitKw: Keyword; // COMMIT | END
  transactionKw?: Keyword; // TRANSACTION | WORK
}

export interface RollbackTransactionStmt extends BaseNode {
  type: "rollback_transaction_stmt";
  rollbackKw: Keyword; // ROLLBACK
  transactionKw?: Keyword; // TRANSACTION | WORK
  savepoint?: RollbackToSavepoint;
}

export interface RollbackToSavepoint extends BaseNode {
  type: "rollback_to_savepoint";
  toKw: Keyword; // TO
  savepointKw?: Keyword; // SAVEPOINT
  savepoint: Identifier;
}

export interface SavepointStmt extends BaseNode {
  type: "savepoint_stmt";
  savepointKw: Keyword; // SAVEPOINT
  savepoint: Identifier;
}

export interface ReleaseSavepointStmt extends BaseNode {
  type: "release_savepoint_stmt";
  releaseKw: Keyword; // RELEASE
  savepointKw?: Keyword; // SAVEPOINT
  savepoint: Identifier;
}

// SQLite-specific statements
export type SqliteStmt =
  | AttachDatabaseStmt
  | DetachDatabaseStmt
  | VacuumStmt
  | ReindexStmt
  | PragmaStmt
  | CreateVirtualTableStmt;

export interface AttachDatabaseStmt extends BaseNode {
  type: "attach_database_stmt";
  attachKw: Keyword; // ATTACH
  databaseKw?: Keyword; // DATABASE
  file: Expr;
  asKw: Keyword; // AS
  schema: Identifier;
}

export interface DetachDatabaseStmt extends BaseNode {
  type: "detach_database_stmt";
  detachKw: Keyword; // DETACH
  databaseKw?: Keyword; // DATABASE
  schema: Identifier;
}

export interface VacuumStmt extends BaseNode {
  type: "vacuum_stmt";
  vacuumKw: Keyword; // VACUUM
  schema?: Identifier;
  intoKw?: Keyword; // INTO
  file?: StringLiteral;
}

export interface ReindexStmt extends BaseNode {
  type: "reindex_stmt";
  reindexKw: Keyword; // REINDEX
  table?: TableRef;
}

export interface PragmaStmt extends BaseNode {
  type: "pragma_stmt";
  pragmaKw: Keyword; // PRAGMA
  pragma: TableRef | PragmaAssignment | PragmaFuncCall;
}

export interface PragmaAssignment extends BaseNode {
  type: "pragma_assignment";
  name: TableRef;
  value: Literal | Keyword;
}

export interface PragmaFuncCall extends BaseNode {
  type: "pragma_func_call";
  name: TableRef;
  args: ParenExpr<Literal | Keyword>;
}

export interface CreateVirtualTableStmt extends BaseNode {
  type: "create_virtual_table_stmt";
  createVirtualTableKw: Keyword[]; // CREATE VIRTUAL TABLE
  ifNotExistsKw?: Keyword[]; // IF NOT EXISTS
  table: TableRef;
  usingKw: Keyword; // USING
  module: FuncCall;
}

// Window frame
export type FrameNode =
  | FrameClause
  | FrameBetween
  | FrameBound
  | FrameUnbounded
  | FrameExclusion;

export interface FrameClause extends BaseNode {
  type: "frame_clause";
  unitKw: Keyword; // ROWS | RANGE | GROUPS
  extent: FrameBetween | FrameBound;
  exclusion?: FrameExclusion;
}

export interface FrameBetween extends BaseNode {
  type: "frame_between";
  betweenKw: Keyword;
  begin: FrameBound;
  andKw: Keyword;
  end: FrameBound;
}

export type FrameBound =
  | FrameBoundCurrentRow
  | FrameBoundPreceding
  | FrameBoundFollowing;

export interface FrameBoundCurrentRow extends BaseNode {
  type: "frame_bound_current_row";
  currentRowKw: Keyword[];
}
export interface FrameBoundPreceding extends BaseNode {
  type: "frame_bound_preceding";
  expr: Literal | FrameUnbounded;
  precedingKw: Keyword;
}
export interface FrameBoundFollowing extends BaseNode {
  type: "frame_bound_following";
  expr: Literal | FrameUnbounded;
  followingKw: Keyword;
}
export interface FrameUnbounded extends BaseNode {
  type: "frame_unbounded";
  unboundedKw: Keyword;
}
export interface FrameExclusion extends BaseNode {
  type: "frame_exclusion";
  excludeKw: Keyword;
  kindKw: Keyword | Keyword[]; // CURRENT ROW | GROUPS | TIES | NO OTHERS
}

// other...

export interface Alias<T = Node> extends BaseNode {
  type: "alias";
  expr: T;
  asKw?: Keyword;
  alias: Identifier;
}

export interface AllColumns extends BaseNode {
  type: "all_columns";
}

export interface ExprList<T = Node> extends BaseNode {
  type: "expr_list";
  items: T[];
}

export interface ParenExpr<T = Node> extends BaseNode {
  type: "paren_expr";
  expr: T;
}

export interface BinaryExpr extends BaseNode {
  type: "binary_expr";
  left: Expr;
  operator: string | Keyword | Keyword[];
  right: Expr;
}

export interface PrefixOpExpr extends BaseNode {
  type: "prefix_op_expr";
  operator: string | Keyword[];
  expr: Expr;
}

export interface PostfixOpExpr extends BaseNode {
  type: "postfix_op_expr";
  operator: string | Keyword[];
  expr: Expr;
}

export interface FuncCall extends BaseNode {
  type: "func_call";
  name: Identifier;
  args?: ParenExpr<ExprList<Expr | AllColumns | DistinctArg>>;
  filter?: FilterArg;
  over?: OverArg;
}

export interface TableFuncCall extends BaseNode {
  type: "table_func_call";
  name: TableRef;
  args: ParenExpr<ExprList<Expr>>;
}

export interface FilterArg extends BaseNode {
  type: "filter_arg";
  filterKw: Keyword; // FILTER
  where: ParenExpr<WhereClause>;
}

export interface OverArg extends BaseNode {
  type: "over_arg";
  overKw: Keyword;
  window: ParenExpr<WindowDefinition> | Identifier;
}

export interface DistinctArg extends BaseNode {
  type: "distinct_arg";
  distinctKw: Keyword;
  value: Expr;
}

export interface CastExpr extends BaseNode {
  type: "cast_expr";
  castKw: Keyword;
  args: ParenExpr<CastArg>;
}

export interface CastArg extends BaseNode {
  type: "cast_arg";
  expr: Expr;
  asKw: Keyword;
  dataType: DataType;
}

export interface RaiseExpr extends BaseNode {
  type: "raise_expr";
  raiseKw: Keyword; // RAISE
  args: ParenExpr<ExprList<Keyword | StringLiteral>>;
}

export interface BetweenExpr extends BaseNode {
  type: "between_expr";
  left: Expr;
  betweenKw: Keyword[];
  begin: Expr;
  andKw: Keyword;
  end: Expr;
}

export interface CaseExpr extends BaseNode {
  type: "case_expr";
  expr?: Expr;
  caseKw: Keyword;
  endKw: Keyword;
  clauses: (CaseWhen | CaseElse)[];
}

export interface CaseWhen extends BaseNode {
  type: "case_when";
  whenKw: Keyword;
  condition: Expr;
  thenKw: Keyword;
  result: Expr;
}

export interface CaseElse extends BaseNode {
  type: "case_else";
  elseKw: Keyword;
  result: Expr;
}

export interface IntervalExpr extends BaseNode {
  type: "interval_expr";
  intervalKw: Keyword;
  expr: Expr;
  unitKw: Keyword;
}

export interface StringWithCharset extends BaseNode {
  type: "string_with_charset";
  charset: string;
  string: StringLiteral;
}

export interface StringLiteral extends BaseNode {
  type: "string";
  text: string;
}

export interface NumberLiteral extends BaseNode {
  type: "number";
  text: string;
}

export interface BooleanLiteral extends BaseNode {
  type: "boolean";
  text: string;
}

export interface NullLiteral extends BaseNode {
  type: "null";
  text: string;
}

export interface DateTimeLiteral extends BaseNode {
  type: "datetime";
  kw: Keyword;
  string: StringLiteral;
}

export interface ColumnRef extends BaseNode {
  type: "column_ref";
  table?: Identifier;
  column: Identifier | AllColumns;
}

export interface TableRef extends BaseNode {
  type: "table_ref";
  schema?: Identifier;
  table: Identifier;
}

export interface Identifier extends BaseNode {
  type: "identifier";
  text: string;
}

export interface Keyword extends BaseNode {
  type: "keyword";
  text: string;
}

export interface Parameter extends BaseNode {
  type: "parameter";
  text: string;
}
