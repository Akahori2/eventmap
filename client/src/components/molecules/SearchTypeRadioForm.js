import React from "react"

import { withStyles } from "@material-ui/core/styles"

import DateGroupRadioForm from "./DateGroupRadioForm"
import DatePeriodRadioForm from "./DatePeriodRadioForm"

const styles = theme => ({
  root: {
    // display: 'flex',
  }
})

function SelectDayOfTheWeek({
  classes,
  dateGroup,
  datePeriod,
  handleChangeDateGroup,
  handleChangeDatePeriod
}) {
  return (
    <div className={classes.root}>
      <DateGroupRadioForm
        handleChange={handleChangeDateGroup}
        dateGroup={dateGroup}
      />
      <DatePeriodRadioForm
        handleChange={handleChangeDatePeriod}
        dateGroup={dateGroup}
        datePeriod={datePeriod}
      />
    </div>
  )
}

export default withStyles(styles)(SelectDayOfTheWeek)
