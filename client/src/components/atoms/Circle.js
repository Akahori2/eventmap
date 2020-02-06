import React from "react"
// import { withStyles } from '@material-ui/core/styles';
import withStylesProps from "../../utils/withStylesProps"

import { Circle as SpinCircle } from "better-react-spinkit"

const styles = props => ({
  box: {
    textAlign: "center",
    height: props.height,
    lineHeight: props.height
  },
  innerBox: {
    display: "inline-block",
    verticalAlign: "middle"
  },
  circle: {
    margin: "0 auto"
  }
})

function Circle({ height, classes, ...props }) {
  return (
    <>
      <div className={classes.box}>
        <span className={classes.innerBox}>
          <SpinCircle size={200} color={"#3f51b5"} className={classes.circle} />
        </span>
      </div>
    </>
  )
}

export default withStylesProps(styles)(Circle)
