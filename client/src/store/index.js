import rootReducer from "../reducers/"

import { createStore } from "redux"

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "development" && window.devToolsExtension
    ? window.devToolsExtension()
    : f => f
)

export default store
