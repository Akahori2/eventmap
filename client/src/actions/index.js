export const CHANGE_DRAWER_OPEN = "CHANGE_DRAWER_OPEN"
export const CHANGE_PREFECTURE = "CHANGE_PREFECTURE"
export const CHANGE_DATE = "CHANGE_DATE"
export const CHANGE_DATEGROUP = "CHANGE_DATEGROUP"
export const CHANGE_DATEPERIOD = "CHANGE_DATEPERIOD"
export const CHANGE_KEYWORDS = "CHANGE_KEYWORDS"
export const INITIALIZE_FORM = "INITIALIZE_FORM"
export const REQUEST_DATA = "REQUEST_DATA"
export const RECEIVE_DATA_SUCCESS = "RECEIVE_DATA_SUCCESS"
export const RECEIVE_DATA_FAILED = "RECEIVE_DATA_FAILED"
export const CHANGE_MAP_PARTS_INSTALLED = "CHANGE_MAP_PARTS_INSTALLED"

export const CHANGE_HOW_TO_USE_DIALOG_OPEN = "CHANGE_HOW_TO_USE_DIALOG_OPEN"
export const CHANGE_TERMS_OF_SERVICE_DIALOG_OPEN = "CHANGE_TERMS_OF_SERVICE_DIALOG_OPEN"
export const CHANGE_SETTINGS_DIALOG_OPEN = "CHANGE_SETTINGS_DIALOG_OPEN"

export const SET_MAP = "SET_MAP"
export const SET_MARKER_CLUSTER = "SET_MARKER_CLUSTER"
export const CLEAR_MARKER_CLUSTER = "CLEAR_MARKER_CLUSTER"
export const ADD_MARKERS_ON_MARKER_CLUSTER = "ADD_MARKERS_ON_MARKER_CLUSTER"
export const SET_INFO_WINDOW = "SET_INFO_WINDOW"
export const CLOSE_INFO_WINDOW = "CLOSE_INFO_WINDOW"

// action creaters
export const changePrefecture = prefecture => ({
  type: CHANGE_PREFECTURE,
  prefecture
})
export const changeDrawerOpen = drawerOpen => ({
  type: CHANGE_DRAWER_OPEN,
  drawerOpen
})
export const changeDate = date => ({
  type: CHANGE_DATE,
  date
})
export const changeDateGroup = dateGroup => ({
  type: CHANGE_DATEGROUP,
  dateGroup
})
export const changeDatePeriod = datePeriod => ({
  type: CHANGE_DATEPERIOD,
  datePeriod
})
export const changeKeywords = keywords => ({
  type: CHANGE_KEYWORDS,
  keywords
})
export const initializeForm = () => ({
  type: INITIALIZE_FORM
})

export const requestData = () => ({
  type: REQUEST_DATA
})
export const receiveDataSuccess = eventArray => ({
  type: RECEIVE_DATA_SUCCESS,
  eventArray
})
export const receiveDataFailed = () => ({
  type: RECEIVE_DATA_FAILED
})
export const changeTermsOfServiceDialogOpen = termsOfServiceDialogOpen => ({
  type: CHANGE_TERMS_OF_SERVICE_DIALOG_OPEN,
  termsOfServiceDialogOpen
})
export const changeHowToUseDialogOpen = howToUseDialogOpen => ({
  type: CHANGE_HOW_TO_USE_DIALOG_OPEN,
  howToUseDialogOpen
})
export const changeSettingsDialogOpen = settingsDialogOpen => ({
  type: CHANGE_SETTINGS_DIALOG_OPEN,
  settingsDialogOpen
})
export const setMap = map => ({
  type: SET_MAP,
  map
})
export const setMarkerCluster = markerCluster => ({
  type: SET_MARKER_CLUSTER,
  markerCluster
})
export const clearMarkerCluster = () => ({
  type: CLEAR_MARKER_CLUSTER
})
export const addMarkersOnMarkerCluster = markers => ({
  type: ADD_MARKERS_ON_MARKER_CLUSTER,
  markers
})
export const setInfoWindow = infoWindow => ({
  type: SET_INFO_WINDOW,
  infoWindow
})
export const closeInfoWindow = () => ({
  type: CLOSE_INFO_WINDOW
})
