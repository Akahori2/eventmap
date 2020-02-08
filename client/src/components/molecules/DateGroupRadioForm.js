import React from "react"
import { withStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import RadioGroup from "@material-ui/core/RadioGroup"

import Radio from "../atoms/Radio"
import FormControlLabel from "../atoms/FormControlLabel"

import * as DATE_SELECT_DATA from "../../utils/dateSelectData"

const styles = theme => ({
  formControl: {
    marginLeft: theme.spacing.unit * 2
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

function DateGroupRadioForm({ classes, handleChange, dateGroup, ...props }) {
  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <RadioGroup
        aria-label="DateGroup"
        name="DateGroup"
        value={dateGroup}
        onChange={handleChange}
      >
        <FormControlLabel
          value={DATE_SELECT_DATA.CALENDAR}
          control={<Radio color="primary" className={classes.radio}/>}
          label="日付指定"
        />
        <FormControlLabel
          value={DATE_SELECT_DATA.WEEKEND}
          control={<Radio color="primary" className={classes.radio}/>}
          label="土日"
        />
        <FormControlLabel
          value={DATE_SELECT_DATA.WEEKDAY}
          control={<Radio color="primary" className={classes.radio}/>}
          label="月〜金"
        />
      </RadioGroup>
    </FormControl>
  )
}

export default withStyles(styles)(DateGroupRadioForm)
