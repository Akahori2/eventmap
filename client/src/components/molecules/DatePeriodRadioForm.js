import React from "react"
import { withStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import RadioGroup from "@material-ui/core/RadioGroup"

import FormControlLabel from "../atoms/FormControlLabel"
import Radio from "../atoms/Radio"

import * as DATE_SELECT_DATA from "../../utils/dateSelectData"

const styles = theme => ({
  formControl: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: "33px"
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: "41px"
    }
  },
  radio: {
    [theme.breakpoints.down("sm")]: {
      margin: "4px 10px 4px 12px"
    },
    [theme.breakpoints.up("sm")]: {
      margin: "10px 10px 6px 12px"
    },
    padding: "0px"
  }
})

function DatePeriodRadioForm({
  classes,
  handleChange,
  datePeriod,
  dateGroup,
  ...props
}) {
  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <RadioGroup
        aria-label="DatePeriod"
        name="DatePeriod"
        value={datePeriod}
        onChange={handleChange}
      >
        <FormControlLabel
          value={DATE_SELECT_DATA.WITH_IN_A_WEEK}
          control={<Radio color="secondary" className={classes.radio}/>}
          label="1週間以内"
          disabled={dateGroup === DATE_SELECT_DATA.CALENDAR}
        />
        <FormControlLabel
          value={DATE_SELECT_DATA.WITH_IN_3_WEEKS}
          control={<Radio color="secondary" className={classes.radio}/>}
          label="3週間以内"
          disabled={dateGroup === DATE_SELECT_DATA.CALENDAR}
        />
      </RadioGroup>
    </FormControl>
  )
}

export default withStyles(styles)(DatePeriodRadioForm)
