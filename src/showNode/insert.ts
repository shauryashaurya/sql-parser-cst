import { show } from "../show";
import { AllInsertNodes } from "../cst/Node";
import { FullTransformMap } from "../cstTransformer";

export const insertMap: FullTransformMap<string, AllInsertNodes> = {
  insert_stmt: (node) => show(node.clauses),
  insert_clause: (node) =>
    show([
      node.insertKw,
      node.hints,
      node.orAction,
      node.intoKw,
      node.table,
      node.columns,
    ]),
  or_alternate_action: (node) => show([node.orKw, node.actionKw]),
  // VALUES
  values_clause: (node) => show([node.valuesKw, node.values]),
  default_values: (node) => show(node.defaultValuesKw),
  default: (node) => show(node.defaultKw),

  upsert_clause: (node) =>
    show([node.onConflictKw, node.columns, node.where, node.doKw, node.action]),
  upsert_action_nothing: (node) => show(node.nothingKw),
  upsert_action_update: (node) => show([node.updateKw, node.set, node.where]),

  row_alias_clause: (node) =>
    show([node.asKw, node.rowAlias, node.columnAliases]),
  on_duplicate_key_update_clause: (node) =>
    show([node.onDuplicateKeyUpdateKw, node.assignments]),
};
