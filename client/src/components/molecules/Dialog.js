import React from "react"
import Button from "@material-ui/core/Button"
import MuiDialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"

import withWidth, { isWidthUp } from "@material-ui/core/withWidth"

function Dialog({
  width,
  open,
  onCloseAction,
  dialogContent,
  dialogTitle,
  button1Label,
  button1Clicked,
  button2Label = undefined,
  button2Clicked = undefined
}) {
  let isFullScreen = true
  if (isWidthUp("sm", width)) {
    isFullScreen = false
  }

  return (
    <div>
      <MuiDialog
        open={open}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        fullScreen={isFullScreen}
        //画面外クリックしたときに発動
        onClose={onCloseAction}
      >
        <DialogTitle id="scroll-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={button1Clicked} color="primary">
            {button1Label}
          </Button>
          {button2Label && (
            <Button onClick={button2Clicked} color="primary">
              {button2Label}
            </Button>
          )}
        </DialogActions>
      </MuiDialog>
    </div>
  )
}

export default withWidth()(Dialog)
