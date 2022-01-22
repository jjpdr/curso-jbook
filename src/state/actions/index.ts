import { CellTypes } from "../cell";
import { ActionType } from "../action-types";

export type Direction = "up" | "down";

export interface MoveCellAction {
    type: ActionType.MOVE_CELL;
    payload: {
        id: string;
        direction: Direction;
    };
}

export interface DeleteCellAction {
    type: ActionType.DELETE_CELL;
    payload: string; //ID of the cell
}

export interface InsertCellBeforeAction {
    type: ActionType.INSERT_CELL_BEFORE;
    payload: {
        id: string | null; //ID of the cell
        type: CellTypes; //code or text editor
    };
}

export interface UpdateCellAction {
    type: ActionType.UPDATE_CELL;
    payload: {
        id: string; //ID of the cell
        content: string; //code or text
    };
}

export type Action =
    | MoveCellAction
    | DeleteCellAction
    | InsertCellBeforeAction
    | UpdateCellAction;
