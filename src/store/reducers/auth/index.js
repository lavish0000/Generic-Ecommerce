import { createReducer } from "../../storeHandlers";
import functionMapper from "./authFunctionsMapper";

export const initialState = {
    access_token: null,
    loader: false,
    error: null,
    language: "en",
    auth_check_state: false,
}
export default createReducer(initialState, functionMapper);