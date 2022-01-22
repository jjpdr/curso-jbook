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

export interface InsertCellAfterAction {
    type: ActionType.INSERT_CELL_AFTER;
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

export interface BundleStartAction {
    type: ActionType.BUNDLE_START;
    payload: {
        id: string; //ID of the cell
    };
}

export interface BundleCompleteAction {
    type: ActionType.BUNDLE_COMPLETE;
    payload: {
        id: string; //ID of the cell
        bundle: {
            code: string;
            err: string;
        };
    };
}

export type Action =
    | MoveCellAction
    | DeleteCellAction
    | InsertCellAfterAction
    | UpdateCellAction
    | BundleStartAction
    | BundleCompleteAction;
