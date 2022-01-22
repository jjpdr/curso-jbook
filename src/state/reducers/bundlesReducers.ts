import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface BundlesState {
    [key: string]:
        | {
              loading: boolean;
              code: string;
              err: string;
          }
        | undefined;
}

const initialState: BundlesState = {};

const reducer = produce(
    (state: BundlesState = initialState, action: Action): BundlesState => {
        switch (action.type) {
            case ActionType.BUNDLE_START:
                state[action.payload.id] = {
                    loading: true,
                    code: "",
                    err: "",
                };
                return state; //Necessary because of typescript

            case ActionType.BUNDLE_COMPLETE:
                state[action.payload.id] = {
                    loading: false,
                    code: action.payload.bundle.code,
                    err: action.payload.bundle.err,
                };
                return state; //Necessary because of typescript

            default:
                return state; //Necessary because of typescript
        }
    }
);

export default reducer;
