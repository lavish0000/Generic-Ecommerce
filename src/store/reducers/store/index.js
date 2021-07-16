import { createReducer } from "../../storeHandlers";
import functionMapper from "./storeFunctionMapper";

export const initialState = {
    stores: [],
    loader: false,
    error: null,
}
export default createReducer(initialState, functionMapper);