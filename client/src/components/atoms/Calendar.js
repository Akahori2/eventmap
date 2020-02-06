import RcCalendar from "rc-calendar"
import React from "react"

function Calendar(props) {
  return <RcCalendar showDateInput={false} showToday={false} {...props} />
}

export default Calendar
