import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import {play, lyric} from '../../common/API'
export default class Plays extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "",
            lyric: "",
            el: "",
            lyricArr: [],
            i: "",
            time: 0
        }
        this.getLyric = this.getLyric.bind(this)
        this.getUrl = this.getUrl.bind(this)
        this.renderLyric = this.renderLyric.bind(this)
        this.interval = this.interval.bind(this)
    }
    componentDidMount() {
        this.getUrl();
        this.getLyric()
    }
    getUrl() {
        const mid = this.props.location.state.mid;
        console.log(mid)
        this.$http.get(play, {params: {
            mid
        }}).then(res => {
            console.log(res)
            this.setState({
                url: res.data,
            })
        })
    }
    getLyric() {
        const songid = this.props.location.state.songid
        this.$http.get(lyric, {
            params: {
                songid
            }
        }).then(res => {
            console.log(res)
            this.setState({
                lyric: res.data.data.lyric
            })
            let lyric = res.data.data.lyric;
            let lyricArr = lyric.split("[换行]").slice(5);
            console.log(lyricArr)
            let arr = []
            lyricArr.forEach((item, index) => {
                let lstr = item.split(']')[1];
                let ltime = item.split(']')[0].slice(1, 6)
                function ltimeFormat(ltime) {
                    // "01:51" => 111
                    // "00:51"
                    let arr = ltime.split(":")
                    var m = 0
                    // if (arr[0] !== "00") {
                    //     m = arr[0] * 60
                    // }
                    return arr[0]*60 + parseInt(arr[1])
                }
                let obj = {
                    lstr,
                    ltime: ltimeFormat(ltime)
                }
                arr.push(obj)
            })
            console.log(arr)
            this.setState({
                lyricArr: arr
            }, () => {
                this.renderLyric()
            })
        })
    }
    renderLyric() {
        const el = this.state.lyricArr.map((item, index) => {
            return <p key={index} className={["lyric-item", this.state.i == index ? "active" : ""].join(" ")}>{item.lstr}</p>
        })
        this.setState({
            el
        })
    }
    interval() {
        console.log(111)
        var t = this.state.time // 单位为秒
        this.timer = setInterval(() => {
            
            this.state.lyricArr.forEach((item, index) => {
                if (t == item.ltime) {
                    console.log(index)
                    this.setState({
                        i: index
                    },() => {
                        this.renderLyric()
                        const box = this.refs.box;
                        box.style.top = - index * 35 + 150 +  'px'
                    })
                }
            })
            t++;
            this.setState({
                time: t
            })
        }, 1000)
    }
    play() {
        const audio = this.refs.audio;
        if (audio.paused) {
            audio.play()
            this.interval()
        } else {
            audio.pause()
            clearInterval(this.timer)
            this.timer = null;
        }
        // 如果当前audio为暂停状态则播放
        // 反之暂停
    }
    componentWillUnmount() {
        clearInterval(this.timer)
            this.timer = null;
    }
    render() {
        return (
            <div className="container play">
                <div className="lyric-box">
                    <div className="box" ref="box">
                        {this.state.el}
                    </div>
                </div>
                <div className="btns">
                    <audio src={this.state.url} ref="audio"></audio>
                    <span>MV</span>
                    <span>
                        <Icon type="caret-right" onClick={this.play.bind(this)}/>
                    </span>
                    <span>
                        <Icon type="heart" />
                    </span>
                </div>
                <Button type="primary" shape="round">
                    <Icon type="caret-right" />
                </Button>
            </div>
        )
    }
}
