import {
  REQUEST_DATA,
  RECEIVE_DATA_SUCCESS,
  RECEIVE_DATA_FAILED
} from "../actions/"

const initialState = {
  events: {
    isFetching: false,
    eventArray: [],
    searched: false
  }
}

const eventsReducer = (state = initialState.events, action) => {
  switch (action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        isFetching: true,
        isMarkerShown: false
      }
    case RECEIVE_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        eventArray: adjustCordinates(action.eventArray),
        searched: true,
        isMarkerShown: true
      }
    case RECEIVE_DATA_FAILED:
      return {
        ...state,
        isFetching: false,
        isMarkerShown: false
      }
    default:
      return state
  }
}

//開始日時でソート
function adjustCordinates(eventArray) {
  return eventArray.sort(function(a, b) {
    //上が-1が正解
    if (a.started_at < b.started_at) return -1
    if (a.started_at > b.started_at) return 1
    return 0
  })
}

export default eventsReducer
