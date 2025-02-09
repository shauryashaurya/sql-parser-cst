import { show } from "../show";
import { AllProcedureNodes } from "../cst/Node";
import { FullTransformMap } from "../cstTransformer";

export const procedureMap: FullTransformMap<string, AllProcedureNodes> = {
  create_procedure_stmt: (node) =>
    show([
      node.createKw,
      node.orReplaceKw,
      node.procedureKw,
      node.ifNotExistsKw,
      node.name,
      node.params,
      node.clauses,
    ]),
  procedure_param: (node) => show([node.mode, node.name, node.dataType]),
  drop_procedure_stmt: (node) =>
    show([node.dropKw, node.procedureKw, node.ifExistsKw, node.name]),
};
