import React, { Component } from "react"
import { connect } from "react-redux"
import Button from "@material-ui/core/Button"

import { bindActionCreators } from "redux"

import moment from "moment"

import ReplyIcon from "@material-ui/icons/Reply"
import { compose } from "redux"
import withWidth, { isWidthUp } from "@material-ui/core/withWidth"

import * as actions from "../../actions/"

import { renderToString } from "react-dom/server"

//markerclusterer plusじゃないと対応してないlistenerがある
import * as MarkerClusterer from "@google/markerclustererplus"

import IntroduceEvent from "../../components/molecules/IntroduceEvent"
import Circle from "../../components/atoms/Circle"

import * as MAP_BASIC_DATA from "../../utils/mapBasicData"

import GOOGLE_MAP_API_KEY from "../../../credentials/googleMapApikey"

const WINDOW_HEIGHT_PC = "calc(100vh - 40px)"
const WINDOW_HEIGHT_SP = window.innerHeight - 40 - 50 + "px"

class Map extends Component {
  constructor(props) {
    super(props)
    this.onScriptLoad = this.onScriptLoad.bind(this)

    moment.updateLocale("ja", {
      weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"]
    })
  }

  controlMarkersOnMap(eventArray) {
    const { map, actions } = this.props

    let markers = []
    for (let event of eventArray) {
      let marker = new window.google.maps.Marker({
        position: { lat: event.lat, lng: event.lon },
        event: event
        // map:map.map
      })

      let infowindow = new window.google.maps.InfoWindow({
        //高さ指定しないとめちゃ高くまで生成される
        content: renderToString(
          <div style={{ maxHeight: "350px" }}>
            <IntroduceEvent currentEvent={event} isLastEvent={true} />
          </div>
        )
      })

      marker.addListener("click", function() {
        //今のインフォウィンドウを閉じ、現在ウィンドウをセットし、オープンする
        actions.closeInfoWindow()
        actions.setInfoWindow(infowindow)
        infowindow.open(map.map, marker)
      })
      markers.push(marker)
    }
    //マーカークラスター作られてなければ作る
    if (map.markerCluster === null) {
      let initialGridSize = 40
      if (Number(localStorage.getItem("clusterGridSize"))) {
        initialGridSize = Number(localStorage.getItem("clusterGridSize"))
      }
      let markerCluster = new MarkerClusterer(map.map, markers, {
        //mから始まるm1 m2.png等を呼び出す
        imagePath: "./m",
        //クリックでズームしない
        zoomOnClick: false,
        gridSize: initialGridSize,
        //中央をセンターにする
        averageCenter: true,
        enableRetinaIcons: true
      })

      //クラスタがクリックされたときの動作、markerclusterplusじゃないと反応しない
      window.google.maps.event.addListener(
        markerCluster,
        "clusterclick",
        function(cluster) {
          actions.closeInfoWindow()

          const clusterInfoArray = []
          //マーカー全て取得
          const clickedMarkers = cluster.getMarkers()
          let currentEvent = ""
          for (let i = 0; i < clickedMarkers.length; i++) {
            currentEvent = clickedMarkers[i].event
            clusterInfoArray.push(
              <IntroduceEvent
                key={currentEvent.event_id}
                currentEvent={currentEvent}
                isLastEvent={i === clickedMarkers.length - 1}
              />
            )
          }

          let infowindow = new window.google.maps.InfoWindow({
            // content: '<div id="infoWindow" style="max-height:250px;"/>',
            content: renderToString(
              <div style={{ maxHeight: "350px" }}>{clusterInfoArray}</div>
            ),
            position: cluster.getCenter(),
            //表示位置を縦横にずらせる
            pixelOffset: new window.google.maps.Size(1, -11)
          })

          actions.setInfoWindow(infowindow)
          infowindow.open(map.map)
        }
      )
      //現在のマーカクラスタを保存しておく
      actions.setMarkerCluster(markerCluster)
    } else {
      //マーカークラスターが作られている場合

      //マーカークラスタに登録されたマーカーをクリアする
      actions.clearMarkerCluster()
      //アーカークラスタにマーカーを登録しなおす
      actions.addMarkersOnMarkerCluster(markers)
    }
  }

  onScriptLoad() {
    const { actions } = this.props

    let initialCenter = ""

    //localstorageにデータがあり配列にマッチしたら
    if (
      localStorage.getItem(MAP_BASIC_DATA.PREFECTURE) &&
      MAP_BASIC_DATA.PREFECTURE_CENTER_DATA[
        localStorage.getItem(MAP_BASIC_DATA.PREFECTURE)
      ]
    ) {
      //中央点を取る
      initialCenter =
        MAP_BASIC_DATA.PREFECTURE_CENTER_DATA[
          localStorage.getItem(MAP_BASIC_DATA.PREFECTURE)
        ]
    } else {
      //デフォルトセンターは東京
      initialCenter =
        MAP_BASIC_DATA.PREFECTURE_CENTER_DATA[MAP_BASIC_DATA.TOKYO]
    }

    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      //オプション
      {
        center: initialCenter,
        zoom: 12,
        gestureHandling: "greedy",
        draggable: true,
        //航空ボタンを表示するか
        mapTypeControl: false,
        //ストリートビューボタンを表示するか
        streetViewControl: false,
        //POI(観光地とかのクリックできるやつ)を設置するか
        styles: [
          {
            featureType: "poi",
            stylers: [{ visibility: "off" }]
          }
        ]
      }
    )

    window.google.maps.event.addListener(map, "zoom_changed", function() {
      actions.closeInfoWindow()
    })
    map.addListener("drag", function() {
      actions.closeInfoWindow()
    })
    map.addListener("click", function() {
      actions.closeInfoWindow()
    })

    console.log("listener registered")

    // マップをセットしておく
    actions.setMap(map)
  }

  componentDidMount() {
    //google mapsが読み込まれているか？
    //読み込まれていない場合
    if (!window.google) {
      var s = document.createElement("script")
      s.type = "text/javascript"
      s.src = `https://maps.google.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`
      var x = document.getElementsByTagName("script")[0]
      x.parentNode.insertBefore(s, x)

      s.addEventListener("load", e => {
        this.onScriptLoad()
      })
    } else {
      //読み込まれている場合
      this.onScriptLoad()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.events.eventArray !== prevProps.events.eventArray) {
      const { actions } = this.props

      console.log("event data updated!")

      actions.closeInfoWindow()
      this.controlMarkersOnMap(this.props.events.eventArray)
    }
  }

  render() {
    const { width, actions, events } = this.props

    return (
      <div style={{ position: "relative" }}>
        {isWidthUp("sm", width) ? (
          <>
            <div
              style={{
                width: "100%",
                height: WINDOW_HEIGHT_PC,
                position: "absolute"
              }}
              id={this.props.id}
            />
            {events.isFetching && <Circle height={WINDOW_HEIGHT_PC} />}
          </>
        ) : (
          <>
            <div
              style={{
                width: "100%",
                height: WINDOW_HEIGHT_SP,
                lineHeight: WINDOW_HEIGHT_SP,
                position: "absolute"
              }}
              id={this.props.id}
            />
            {events.isFetching && <Circle height={WINDOW_HEIGHT_SP} />}
            <Button
              style={{
                height: "50px",
                width: "100vw",
                top: WINDOW_HEIGHT_SP,
                position: "absolute"
              }}
              onClick={() => actions.changeDrawerOpen(true)}
              variant="contained"
              color="primary"
            >
              <ReplyIcon />
            </Button>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events,
  map: state.map
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default compose(
  withWidth(),
  connect(mapStateToProps, mapDispatchToProps)
)(Map)

