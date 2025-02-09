import { show } from "../show";
import { DropTableStmt } from "../cst/Node";
import { FullTransformMap } from "../cstTransformer";

export const dropTableMap: FullTransformMap<string, DropTableStmt> = {
  drop_table_stmt: (node) =>
    show([
      node.dropKw,
      node.temporaryKw,
      node.snapshotKw,
      node.externalKw,
      node.tableKw,
      node.ifExistsKw,
      node.tables,
      node.behaviorKw,
    ]),
};
