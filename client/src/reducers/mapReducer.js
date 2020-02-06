import {
  SET_MAP,
  SET_MARKER_CLUSTER,
  CLEAR_MARKER_CLUSTER,
  ADD_MARKERS_ON_MARKER_CLUSTER,
  SET_INFO_WINDOW,
  CLOSE_INFO_WINDOW
} from "../actions/"

const initialState = {
  map: {
    map: null,
    markerCluster: null,
    infoWindow: null
  }
}

const mapReducer = (state = initialState.map, action) => {
  switch (action.type) {
    case SET_MAP:
      return {
        ...state,
        map: action.map
      }
    case SET_MARKER_CLUSTER:
      return {
        ...state,
        markerCluster: action.markerCluster
      }
    case CLEAR_MARKER_CLUSTER:
      state.markerCluster.clearMarkers()
      return {
        ...state
      }
    case ADD_MARKERS_ON_MARKER_CLUSTER:
      state.markerCluster.addMarkers(action.markers)
      return {
        ...state
      }
    case SET_INFO_WINDOW:
      return {
        ...state,
        infoWindow: action.infoWindow
      }
    case CLOSE_INFO_WINDOW:
      state.infoWindow && state.infoWindow.close()
      return {
        ...state
      }
    default:
      return state
  }
}

export default mapReducer
