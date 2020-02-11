import React from "react"

// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from "@material-ui/core/FormControl"

import Select from "@material-ui/core/Select"
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from "@material-ui/core/MenuItem"
import Input from "@material-ui/core/Input"
import Divider from "@material-ui/core/Divider"
// import Checkbox from '@material-ui/core/Checkbox'

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { compose } from "redux"
import { withStyles } from "@material-ui/core/styles"

import TextField from "@material-ui/core/TextField"

import * as actions from "../../actions/"

import SearchTypeRadioForm from "../../components/molecules/SearchTypeRadioForm"

import Dialog from "../../components/molecules/Dialog"

import * as MAP_BASIC_DATA from "../../utils/mapBasicData"
import * as DATE_SELECT_DATA from "../../utils/dateSelectData"

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit
  },

  button: {
    // marginTop:"8px",
    maxWidth: "78px",
    minWidth: "78px"
  },
  divider: {
    marginTop: "4px",
    marginBottom: "4px"
  },
  dialogWrapper: {
    color: theme.palette.text.primary,

    //タブレット以下ぐらいなら全画面になるからセンター寄せする
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    }
  },
  //以下曜日選択用
  formControlLeft: {
    marginLeft: theme.spacing.unit * 2
  },
  formControlRight: {
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
  },
  radioLabel: {
    color: theme.palette.text.primary
  },
  radioBottom: {
    [theme.breakpoints.down("sm")]: {
      margin: "4px 10px 6px 12px"
    },
    [theme.breakpoints.up("sm")]: {
      margin: "10px 10px 13px 12px"
    },
    padding: "0px"
  },
  textfield: {
    width: "250px"
  }
})

class SettingsDialog extends React.Component {
  constructor() {
    super()

    this.handleChangeDateGroup = this.handleChangeDateGroup.bind(this)
    this.handleChangeDatePeriod = this.handleChangeDatePeriod.bind(this)
  }

  state = {
    prefecture: "",
    clusterGridSize: "",
    saveDateGroup: "",
    saveDatePeriod: "",
    saveSearchWords: ""
  }

  componentDidMount() {
    const localSavedPrefecture = localStorage.getItem(MAP_BASIC_DATA.PREFECTURE)
    const localSavedClusterGridSize = localStorage.getItem(
      MAP_BASIC_DATA.CLUSTER_GRID_SIZE
    )
    const localSavedDateGroup = localStorage.getItem(
      MAP_BASIC_DATA.SAVE_DATE_GROUP
    )
    const localSavedDatePeriod = localStorage.getItem(
      MAP_BASIC_DATA.SAVE_DATE_PERIOD
    )
    const localSavedSearchWords = localStorage.getItem(
      MAP_BASIC_DATA.SAVE_SEARCH_WORDS
    )

    if (localSavedPrefecture) {
      this.setState({ prefecture: localSavedPrefecture })
    } else {
      this.setState({ prefecture: MAP_BASIC_DATA.TOKYO })
    }

    if (localSavedClusterGridSize) {
      this.setState({ clusterGridSize: localSavedClusterGridSize })
    } else {
      this.setState({
        clusterGridSize: MAP_BASIC_DATA.DEFAULT_CLUSTER_SIZE
      })
    }

    if (localSavedDateGroup) {
      this.setState({ saveDateGroup: localSavedDateGroup })

      //dateGroupが設定されてなければPeriodもない
      if (localSavedDatePeriod) {
        this.setState({ saveDatePeriod: localSavedDatePeriod })
      } else {
        this.setState({ saveDatePeriod: "" })
      }
    } else {
      this.setState({ saveDateGroup: DATE_SELECT_DATA.CALENDAR })
    }

    if (localSavedSearchWords) {
      this.setState({ saveSearchWords: localSavedSearchWords })
    } else {
      this.setState({ saveSearchWords: "" })
    }
  }

  handleChangeDateGroup = event => {
    this.setState({ saveDateGroup: event.target.value })
    if (event.target.value !== DATE_SELECT_DATA.CALENDAR) {
      if (this.state.saveDatePeriod === "") {
        this.setState({
          saveDatePeriod: DATE_SELECT_DATA.WITH_IN_A_WEEK
        })
      }
    }
  }

  handleChangeDatePeriod = event => {
    this.setState({ saveDatePeriod: event.target.value })
  }

  selectChanged = event => {
    if (event.target.checked === true || event.target.checked === false) {
      this.setState({ [event.target.name]: event.target.checked })
    } else {
      this.setState({ [event.target.name]: event.target.value })
    }
  }

  onKeywordsChanged = event => {
    this.setState({ saveSearchWords: event.target.value })
  }

  closeButtonClicked = event => {
    const { map, actions } = this.props

    localStorage.setItem(MAP_BASIC_DATA.PREFECTURE, this.state.prefecture)
    localStorage.setItem(
      MAP_BASIC_DATA.CLUSTER_GRID_SIZE,
      this.state.clusterGridSize
    )
    localStorage.setItem(
      MAP_BASIC_DATA.SAVE_DATE_PERIOD,
      this.state.saveDatePeriod
    )
    localStorage.setItem(
      MAP_BASIC_DATA.SAVE_DATE_GROUP,
      this.state.saveDateGroup
    )
    localStorage.setItem(
      MAP_BASIC_DATA.SAVE_SEARCH_WORDS,
      this.state.saveSearchWords
    )

    //フォームのキーワード更新
    actions.changeKeywords(this.state.saveSearchWords)

    //フォームの曜日選択更新
    actions.changeDateGroup(this.state.saveDateGroup)
    actions.changeDatePeriod(this.state.saveDatePeriod)

    //まとまるサイズ変更
    map.markerCluster &&
      map.markerCluster.setGridSize(
        Number(localStorage.getItem(MAP_BASIC_DATA.CLUSTER_GRID_SIZE))
      )
    map.markerCluster && map.markerCluster.repaint()

    map.map.setCenter(
      MAP_BASIC_DATA.PREFECTURE_CENTER_DATA[
        localStorage.getItem(MAP_BASIC_DATA.PREFECTURE)
      ]
    )

    //ダイアログを閉じる
    actions.changeSettingsDialogOpen(false)
  }

  clearSettings = () => {
    this.setState({ prefecture: MAP_BASIC_DATA.TOKYO })
    this.setState({ clusterGridSize: MAP_BASIC_DATA.DEFAULT_CLUSTER_SIZE })
    this.setState({ saveDateGroup: DATE_SELECT_DATA.CALENDAR })
    this.setState({ saveDatePeriod: "" })
    this.setState({ saveSearchWords: "" })

    localStorage.removeItem(MAP_BASIC_DATA.PREFECTURE)
    localStorage.removeItem(MAP_BASIC_DATA.CLUSTER_GRID_SIZE)
    localStorage.removeItem(MAP_BASIC_DATA.SAVE_DATE_GROUP)
    localStorage.removeItem(MAP_BASIC_DATA.SAVE_DATE_PERIOD)
    localStorage.removeItem(MAP_BASIC_DATA.SAVE_SEARCH_WORDS)
  }

  dialogContent = () => {
    const { classes } = this.props

    return (
      <>
        初期表示場所
        <br />
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.prefecture}
            onChange={this.selectChanged}
            input={<Input name="prefecture" id="prefecture" />}
          >
            <MenuItem value="tokyo">
              <span className={classes.radioLabel}>東京都</span>
            </MenuItem>
            <MenuItem value="osaka">
              <span className={classes.radioLabel}>大阪府</span>
            </MenuItem>
            <MenuItem value="aichi">
              <span className={classes.radioLabel}>愛知県</span>
            </MenuItem>
            <MenuItem value="hukuoka">
              <span className={classes.radioLabel}>福岡県</span>
            </MenuItem>
            <MenuItem value="null">
              <span className={classes.radioLabel}>オンライン/座標未登録</span>
            </MenuItem>
          </Select>
        </FormControl>
        <br />
        <Divider className={classes.divider} />
        イベントの集合範囲
        <br />
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.clusterGridSize}
            onChange={this.selectChanged}
            input={<Input name="clusterGridSize" id="clusterGridSize" />}
          >
            <MenuItem value="30">
              <span className={classes.radioLabel}>30px</span>
            </MenuItem>
            <MenuItem value="35">
              <span className={classes.radioLabel}>推奨(35px)</span>
            </MenuItem>
            <MenuItem value="60">
              <span className={classes.radioLabel}>60px</span>
            </MenuItem>
            <MenuItem value="90">
              <span className={classes.radioLabel}>90px</span>
            </MenuItem>
            <MenuItem value="150">
              <span className={classes.radioLabel}>150px</span>
            </MenuItem>
            <MenuItem value="300">
              <span className={classes.radioLabel}>300px</span>
            </MenuItem>
          </Select>
        </FormControl>
        <br />
        <Divider className={classes.divider} />
        検索曜日・期間
        <br />
        <SearchTypeRadioForm
          datePeriod={this.state.saveDatePeriod}
          dateGroup={this.state.saveDateGroup}
          handleChangeDateGroup={this.handleChangeDateGroup}
          handleChangeDatePeriod={this.handleChangeDatePeriod}
        />
        <br />
        <Divider className={classes.divider} />
        検索キーワード
        <br />
        <TextField
          id="outlined-with-placeholder"
          label="キーワード(OR指定)"
          placeholder="3ワードまで対応"
          margin="dense"
          variant="outlined"
          className={classes.textfield}
          onChange={this.onKeywordsChanged}
          value={this.state.saveSearchWords}
        />
      </>
    )
  }

  render() {
    const { header, actions } = this.props

    return (
      <React.Fragment>
        <Dialog
          open={header.settingsDialogOpen}
          onCloseAction={() => actions.changeSettingsDialogOpen(false)}
          dialogContent={this.dialogContent()}
          dialogTitle={"規定値の設定"}
          button1Label={"初期化"}
          button2Label={"保存して閉じる"}
          button1Clicked={this.clearSettings}
          button2Clicked={this.closeButtonClicked}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  header: state.header,
  map: state.map
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(SettingsDialog)
