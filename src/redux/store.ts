import {combineReducers, createStore} from "redux";
import counterReducer from "./counterReducer";


export const store = createStore(combineReducers({
    counter: counterReducer
}))

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
