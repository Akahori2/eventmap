import { withStyles } from "@material-ui/core/styles"
import * as React from "react"

const withStylesProps = styles => Component => props => {
  const Comp = withStyles(styles(props))(Component)
  return <Comp {...props} />
}

export default withStylesProps
