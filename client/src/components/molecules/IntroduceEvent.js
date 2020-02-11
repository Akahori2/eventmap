import React from "react"
import { withStyles } from "@material-ui/core/styles"
import moment from "moment"
import Divider from "../atoms/Divider"
import ConnpassIcon from "../atoms/ConnpassIcon"

const styles = theme => ({
  catch: {
    color: theme.palette.text.primary
  },
  title: {
    textDecoration: "none"
  },
  lastDivider: {
    margin: "3px 0"
  }
})

function IntroduceEvent({ classes, currentEvent, isLastEvent, ...props }) {
  return (
    <>
      {/* <img src="./connpass_logo_4.png" alt="" className="iconImage" /> */}
      <ConnpassIcon />{" "}
      <a
        href={currentEvent.event_url}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.title}
      >
        {currentEvent.title}
      </a>
      <br />
      {currentEvent.catch ? (
        <div className={classes.catch}>
          {currentEvent.catch}
          <br />
        </div>
      ) : (
        ""
      )}
      <EventPeriod currentEvent={currentEvent} />
      <EventParticipants currentEvent={currentEvent} />
      {`管理:${currentEvent.owner_display_name}様 `}
      {isLastEvent ? "" : <Divider className={classes.lastDivider} />}
    </>
  )
}

function EventPeriod({ currentEvent }) {
  return (
    <>
      {moment(currentEvent.started_at).format("M月D日(ddd) HH:mm-") +
        moment(currentEvent.ended_at).format("HH:mm  ")}
    </>
  )
}

function EventParticipants({ currentEvent }) {
  return (
    <>
      {currentEvent.limit
        ? "(" +
          (Number(currentEvent.accepted) + Number(currentEvent.waiting)) +
          "人/" +
          currentEvent.limit +
          "人)  "
        : "(" + currentEvent.accepted + "人)  "}
    </>
  )
}

export default withStyles(styles)(IntroduceEvent)
