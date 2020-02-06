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
          control={<Radio color="secondary" />}
          label="1週間以内"
          disabled={dateGroup === DATE_SELECT_DATA.CALENDAR}
        />
        <FormControlLabel
          value={DATE_SELECT_DATA.WITH_IN_3_WEEKS}
          control={<Radio color="secondary" />}
          label="3週間以内"
          disabled={dateGroup === DATE_SELECT_DATA.CALENDAR}
        />
      </RadioGroup>
    </FormControl>
  )
}

export default withStyles(styles)(DatePeriodRadioForm)
