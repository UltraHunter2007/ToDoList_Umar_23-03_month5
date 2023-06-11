import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import taskReducer from "./taskReducer/taskReducer";

const rootReducer = combineReducers({
    tasks: taskReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store