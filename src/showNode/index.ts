import { show } from "../show";
import { AllIndexNodes } from "../cst/Node";
import { FullTransformMap } from "../cstTransformer";

export const indexMap: FullTransformMap<string, AllIndexNodes> = {
  create_index_stmt: (node) =>
    show([
      node.createKw,
      node.indexTypeKw,
      node.indexKw,
      node.ifNotExistsKw,
      node.name,
      node.onKw,
      node.table,
      node.columns,
      node.clauses,
    ]),
  verbose_all_columns: (node) => show(node.allColumnsKw),
  drop_index_stmt: (node) =>
    show([
      node.dropKw,
      node.indexTypeKw,
      node.indexKw,
      node.ifExistsKw,
      node.indexes,
      node.onKw,
      node.table,
    ]),
};
