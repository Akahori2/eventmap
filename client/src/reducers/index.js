import { combineReducers } from "redux"
import formReducer from "./formReducer"
import eventsReducer from "./eventsReducer"
import headerReducer from "./headerReducer"
import mapReducer from "./mapReducer"

const rootReducer = combineReducers({
  form: formReducer,
  events: eventsReducer,
  header: headerReducer,
  map: mapReducer
})

export default rootReducer
