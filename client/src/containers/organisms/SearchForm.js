import React, { Component } from "react"

import { compose } from "redux"
import { bindActionCreators } from "redux"
import { withStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import * as actions from "../../actions/"

import Button from "@material-ui/core/Button"

import TextField from "@material-ui/core/TextField"
// import AutoCompTextField from './AutoComplete'

import Divider from "@material-ui/core/Divider"
import SearchIcon from "@material-ui/icons/Search"

// import Calendar from 'rc-calendar'
import Calendar from "../../components/atoms/Calendar"

// import SelectDayOfTheWeek from '../../components/molecules/SearchTypeRadioForm'
import "rc-calendar/assets/index.css"

import axios from "axios"
import moment from "moment"
import "moment/locale/ja"

import withWidth, { isWidthUp } from "@material-ui/core/withWidth"

import SearchTypeRadioForm from "../../components/molecules/SearchTypeRadioForm"

import * as MAP_BASIC_DATA from "../../utils/mapBasicData"
import * as DATE_SELECT_DATA from "../../utils/dateSelectData"

const styles = theme => ({
  formWrapper: {
    //iphone5s等で縦スクロールを出すため
    [theme.breakpoints.down("sm")]: {
      overflow: "auto"
    }
  },
  formMain: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    marginTop: "8px",
    width: "150px"
  },
  divider: {
    //やらないと高さ0でIE等で消える
    alignSelf: "stretch",
    marginTop: 0,
    marginBottom: 0
  },
  textfield: {
    width: "220px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "6px",
      marginBottom: "1px"
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "6px",
      marginBottom: "2px"
    }
  },
  formFooter: {
    [theme.breakpoints.down("sm")]: {
      lineHeight: "0.4em"
    }
  },
  copyright: {
    bottom: 0,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      position: "relative"
    },
    [theme.breakpoints.up("sm")]: {
      width: "254px",
      position: "absolute"
    }
  },
  socialButton: {
    textAlign: "center",
    // lineHeight:"11px"
    [theme.breakpoints.down("sm")]: {
      marginTop: "30px",
      marginBottom: 0,
      paddingBottom: 0,
      width: "100%",
      position: "relative",
      bottom: 0
    },
    [theme.breakpoints.up("sm")]: {
      width: "254px",
      position: "absolute",
      bottom: 40
    }
  }
})

//カレンダーの前の日付を非アクティブにする
function disabledDate(current) {
  if (!current) {
    return false
  }
  const date = moment()
  date.hour(0)
  date.minute(0)
  date.second(0)
  return current.valueOf() < date.valueOf()
}

class SearchForm extends Component {
  constructor(props) {
    super(props)
    const today = new Date()
    this.state = {
      selectedDate:
        today.getFullYear() +
        "-" +
        ("0" + (today.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + today.getDate()).slice(-2)
    }

    //カレンダーの表示を日本語にする
    moment.locale("ja")

    const { actions } = this.props

    const localSavedDateGroup = localStorage.getItem(
      MAP_BASIC_DATA.SAVE_DATE_GROUP
    )
    const localSavedDatePeriod = localStorage.getItem(
      MAP_BASIC_DATA.SAVE_DATE_PERIOD
    )
    const localSavedSearchWords = localStorage.getItem(
      MAP_BASIC_DATA.SAVE_SEARCH_WORDS
    )

    //キーワードが保存されてる
    if (localSavedSearchWords) {
      actions.changeKeywords(localSavedSearchWords)
    }

    //dategroupが保存されてる
    if (localSavedDateGroup) {
      actions.changeDateGroup(localSavedDateGroup)
      actions.changeDatePeriod(localSavedDatePeriod)
    }

    this.handleChangeDateGroup = this.handleChangeDateGroup.bind(this)
    this.handleChangeDatePeriod = this.handleChangeDatePeriod.bind(this)
  }

  handleChangeDateGroup = event => {
    const { actions } = this.props

    actions.changeDateGroup(event.target.value)
    if (event.target.value !== DATE_SELECT_DATA.CALENDAR) {
      if (this.props.form.datePeriod === "") {
        actions.changeDatePeriod(DATE_SELECT_DATA.WITH_IN_A_WEEK)
      }
    }
  }

  handleChangeDatePeriod = event => {
    const { actions } = this.props

    if (this.props.form.dateGroup !== DATE_SELECT_DATA.CALENDAR) {
      actions.changeDatePeriod(event.target.value)
    }
  }

  render() {
    const { actions, form, events, classes, width } = this.props

    const handleFetchData = () => {
      actions.requestData()
      axios
        .get("/api/events", {
          //クエリストリングの内容を指定
          params: {
            keywords: form.keywords,
            searchType: form.dateGroup,
            termType: form.datePeriod,
            selectedDate: this.state.selectedDate
          }
        })
        .then(function(response) {
          const _eventArray = response.data
          actions.receiveDataSuccess(_eventArray)
        })
        .catch(function(err) {
          console.error(new Error(err))
          actions.receiveDataFailed()
        })
    }

    const searchButtonClicked = () => {
      //スマホ以下の画面サイズの場合だけ非表示にする
      actions.changeDrawerOpen(false)
      handleFetchData()
    }

    const onCalendarChange = newDate => {
      //カレンダー変わったら入れ替える
      this.setState({ selectedDate: newDate.format("YYYY-MM-DD") })
    }

    const onKeywordsChange = e => {
      actions.changeKeywords(e.target.value)
    }

    return (
      <div className={classes.formWrapper}>
        <div className={classes.formMain}>
          <Calendar
            disabledDate={disabledDate}
            onChange={onCalendarChange}
            onSelect={() => actions.changeDateGroup(DATE_SELECT_DATA.CALENDAR)}
          />
          <div className={classes.dayoftheweek}>
            <SearchTypeRadioForm
              dateGroup={form.dateGroup}
              datePeriod={form.datePeriod}
              handleChangeDateGroup={this.handleChangeDateGroup}
              handleChangeDatePeriod={this.handleChangeDatePeriod}
            />
          </div>

          <Divider variant="middle" className={classes.divider} />

          <TextField
            id="outlined-with-placeholder"
            label="キーワード(OR指定)"
            placeholder="3ワードまで対応"
            margin="dense"
            variant="outlined"
            className={classes.textfield}
            onChange={onKeywordsChange}
            value={form.keywords}
          />

          {isWidthUp("sm", width) ? (
            <Divider
              variant="middle"
              className={classes.divider}
              style={{ marginTop: "4px" }}
            />
          ) : (
            ""
          )}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={events.isFetching}
            onClick={() => searchButtonClicked()}
          >
            <SearchIcon />
          </Button>
        </div>
        <div className={classes.formFooter}>
          <div className={classes.socialButton}>
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              className="twitter-share-button"
              data-show-count="false"
              data-size="large"
              data-related="akahori_s"
            >
              ツイート
            </a>
            <span style={{ marginRight: "2px" }}></span>
            <div
              className="fb-share-button"
              data-href="https://event-map.info"
              data-layout="button"
              data-size="large"
              data-mobile-iframe="false"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fevent-map.info%2F&amp;src=sdkpreparse"
                className="fb-xfbml-parse-ignore"
              >
                シェア
              </a>
            </div>
            <span style={{ marginRight: "2px" }}></span>
            <a
              href="http://b.hatena.ne.jp/entry/"
              className="hatena-bookmark-button"
              data-hatena-bookmark-layout="basic"
              data-hatena-bookmark-width="20"
              data-hatena-bookmark-height="28"
              title="このエントリーをはてなブックマークに追加"
            >
              <img
                src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
                alt="このエントリーをはてなブックマークに追加"
                width="20"
                height="20"
                style={{ border: "none" }}
              />
            </a>
          </div>
          <p className={classes.copyright}>
            © 2019-2020{" "}
            <a
              href="https://twitter.com/akahori_s"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              @akahori_s
            </a>{" "}
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events,
  form: state.form,
  map: state.map
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default compose(
  withStyles(styles),
  withWidth(),
  connect(mapStateToProps, mapDispatchToProps)
)(SearchForm)
