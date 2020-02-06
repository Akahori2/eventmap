import {
  CHANGE_PREFECTURE,
  CHANGE_DATE,
  CHANGE_DATEGROUP,
  CHANGE_DATEPERIOD,
  CHANGE_KEYWORDS,
  INITIALIZE_FORM,
  CHANGE_DRAWER_OPEN
} from "../actions/"

import * as DATE_SELECT_DATA from "../utils/dateSelectData"

const initialState = {
  form: {
    drawerOpen: true,
    prefectures: "",
    date: "",
    dateGroup: DATE_SELECT_DATA.CALENDAR,
    datePeriod: "",
    keywords: ""
  }
}

const formReducer = (state = initialState.form, action) => {
  switch (action.type) {
    case CHANGE_DRAWER_OPEN:
      return {
        ...state,
        drawerOpen: action.drawerOpen
      }
    case CHANGE_PREFECTURE:
      return {
        ...state,
        prefecture: action.prefecture
      }
    case CHANGE_DATE:
      return {
        ...state,
        date: action.date
      }
    case CHANGE_DATEGROUP:
      return {
        ...state,
        dateGroup: action.dateGroup
      }
    case CHANGE_DATEPERIOD:
      return {
        ...state,
        datePeriod: action.datePeriod
      }
    case CHANGE_KEYWORDS:
      return {
        ...state,
        keywords: action.keywords
      }
    case INITIALIZE_FORM:
      return initialState.form
    default:
      return state
  }
}

export default formReducer
