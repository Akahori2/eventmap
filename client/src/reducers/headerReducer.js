import {
  CHANGE_HOW_TO_USE_DIALOG_OPEN,
  CHANGE_TERMS_OF_SERVICE_DIALOG_OPEN,
  CHANGE_SETTINGS_DIALOG_OPEN
} from "../actions/"

const initialState = {
  header: {
    howToUseDialogOpen: false,
    termsOfServiceDialogOpen: false,
    settingsDialogOpen: false
  }
}

const headerReducer = (state = initialState.header, action) => {
  switch (action.type) {
    case CHANGE_HOW_TO_USE_DIALOG_OPEN:
      return {
        ...state,
        howToUseDialogOpen: action.howToUseDialogOpen
      }
    case CHANGE_TERMS_OF_SERVICE_DIALOG_OPEN:
      return {
        ...state,
        termsOfServiceDialogOpen: action.termsOfServiceDialogOpen
      }
    case CHANGE_SETTINGS_DIALOG_OPEN:
      return {
        ...state,
        settingsDialogOpen: action.settingsDialogOpen
      }
    default:
      return state
  }
}

export default headerReducer
