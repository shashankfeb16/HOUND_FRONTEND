
import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware,
  } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import {thunk} from "redux-thunk" 
import { authReducer } from "./Auth/auth.reducer.js";
import { blogReducer } from "./blogs/blog.reducer.js";


  const rootReducer = combineReducers({
    auth:authReducer,
    blog:blogReducer
  })


  export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));