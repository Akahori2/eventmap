import React from "react"
import DialogContentText from "@material-ui/core/DialogContentText"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as actions from "../../actions/"

import withWidth from "@material-ui/core/withWidth"
import { compose } from "redux"

import Dialog from "../../components/molecules/Dialog"

import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  twitterLink: {
    margin: theme.spacing.unit
  },
})

class HowToUseDialog extends React.Component {
  render() {
    const { classes, actions, header } = this.props

    return (
      <>
        <Dialog
          open={header.howToUseDialogOpen}
          onCloseAction={() => actions.changeHowToUseDialogOpen(false)}
          dialogContent={
            <DialogContentText>
              エンジニア・IT関係者向けイベントの検索サービスで、イベント検索にかかる労力低減を目的として作成しています。<br />
              ・近くのイベントがまとまって表示される仕様になっています。ズームイン・アウトを行うとまとまり度合いが変わります。<br />
              ・X週間以内の検索は、時間も考慮されます。土曜の正午に土日で1週間検索した場合、次週土曜の午前のイベントまで表示されます。<br />
              ・情報提供元様への負荷低減のため、情報取得の間隔を大きめに開けています。新しく登録されたイベントや内容の更新等の反映には、数時間から数日以上かかる場合がございます。<br />
              ・情報提供元様のAPIにて座標が取得できないイベントは、ギニア湾の通称ヌル島(経度0緯度0)にマッピングされています。<br />
              ・本アプリはスマホのアプリのように扱えるPWAに対応しています。Safari(ios)やChrome(Android)の「ホーム画面に追加」等の操作で登録できます。<br />
              ・お問い合わせ、機能追加のご要望等ございましたら、右上お問い合わせフォーム、もしくは
              <a
                href="https://twitter.com/akahori_s"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.twitterLink}
              >
                Twitter @akahori_s
              </a>
              にて対応させていただきます。
            </DialogContentText>
          }
          dialogTitle={"使い方"}
          button1Label={"利用規約・プライバシーポリシー"}
          button2Label={"閉じる"}
          button1Clicked={() => {
            actions.changeTermsOfServiceDialogOpen(true)
          }}
          button2Clicked={() => {
            actions.changeHowToUseDialogOpen(false)
          }}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  header: state.header
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default compose(
  withStyles(styles),
  withWidth(),
  connect(mapStateToProps, mapDispatchToProps)
)(HowToUseDialog)
