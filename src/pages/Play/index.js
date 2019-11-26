import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import { play, lyric } from '../../common/API'
export default class Plays extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "",
            lyric: "",
            el: "",
            lyricArr: [],
            i: "",
            time: 0,
            duration: "",
            currentTime: "",
            left: ""
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
    // 将秒转成00:00
    format(second) {
        // 225
        second = parseInt(second)
        var mintute = Math.floor(second / 60) >= 10 ? Math.floor(second / 60) : "0" + Math.floor(second / 60)
        var sec = second % 60 >= 10 ? second % 60 : '0' + second % 60
        return mintute + ":" + sec
    }
    getUrl() {
        const mid = this.props.location.state.mid;
        this.$http.get(play, {
            params: {
                mid
            }
        }).then(res => {
            this.setState({
                url: res.data,
            })
            const audio = this.refs.audio;
            // audio.duration 返回总时长，数值，单位为秒
            // audio.oncanplaythrough = () => {} 代表当前音乐缓存完成，才能获取时长
            audio.oncanplaythrough = () => {
                const duration = audio.duration;
                this.setState({
                    duration: this.format(duration)
                })
            }
            // audio.currentTime  返回当前播放时间，数值，单位为秒
            // audio.ontimeupdate = () => {}    当前音乐时间发生变化，也就是播放状态
            audio.ontimeupdate = () => {
                const currentTime = audio.currentTime
                this.setState({
                    currentTime: this.format(currentTime)
                })
                // currentTime / duration = w / box的宽度
                const boxWidth = this.refs.progressBox.clientWidth;
                const scale = currentTime / audio.duration
                const width = boxWidth * scale
                this.refs.truth.style.width = width + 'px'
                this.refs.circle.style.left = width - 3 + 'px'
            }
        })
    }
    getLyric() {
        const songid = this.props.location.state.songid
        this.$http.get(lyric, {
            params: {
                songid
            }
        }).then(res => {
            this.setState({
                lyric: res.data.data.lyric
            })
            let lyric = res.data.data.lyric;
            let lyricArr = lyric.split("[换行]").slice(5);
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
                    return arr[0] * 60 + parseInt(arr[1])
                }
                let obj = {
                    lstr,
                    ltime: ltimeFormat(ltime)
                }
                arr.push(obj)
            })
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
        console.log(1)
        var t = this.state.time // 单位为秒  0
        this.timer = setInterval(() => {

            this.state.lyricArr.forEach((item, index) => {
                if (t == item.ltime) {
                    this.setState({
                        i: index
                    }, () => {
                        this.renderLyric()
                        const box = this.refs.box;
                        box.style.top = - index * 35 + 150 + 'px'
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
    move(e) {
        console.log(e.touches[0])
        this.refs.audio.pause()
        let left = e.touches[0].pageX - 50;
        if (left < 0) {
            left = 0
        }
        if (left > this.refs.progressBox.clientWidth) {
            left = this.refs.progressBox.clientWidth
        }
        this.refs.circle.style.left = left - 3 + 'px';
        this.refs.truth.style.width = left + 'px';
        this.setState({
            left
        })
        // 让小球的left跟着手的位置进行移动
    }
    touchend() {
        this.refs.audio.play()
        let scale = this.state.left / this.refs.progressBox.clientWidth;
        let currentTime = this.refs.audio.duration * scale;
        console.log(currentTime)
        this.refs.audio.currentTime = currentTime
        this.setState({
            currentTime: this.format(currentTime)
        })
        // 拿到新的i
        console.log(this.state.lyricArr)
        let i = this.state.lyricArr.findIndex(item => {
            return item.ltime > currentTime
        })
        this.setState({
            i,
            time: this.state.lyricArr[i].ltime
        }, () => {
            this.renderLyric()
            const box = this.refs.box;
            box.style.top = - i * 35 + 150 + 'px'
            clearInterval(this.timer)
            this.timer = null;
            this.interval()
        })
    }
    render() {
        return (
            <div className="container play">
                <div className="lyric-box">
                    <div className="box" ref="box">
                        {this.state.el}
                    </div>
                </div>
                <div className="progress-bar">
                    <span>{this.state.currentTime}</span>
                    <div className="progress-box" ref="progressBox">
                        <div className="progress-truth" ref="truth"></div>
                        {/* mousedown mousemove mouseup */}
                        {/* touchstart touchmove touchend */}
                        <div className="circle" ref="circle" onTouchMove={this.move.bind(this)} onTouchEnd={this.touchend.bind(this)}></div>
                    </div>
                    <span>{this.state.duration}</span>
                </div>
                <div className="btns">
                    <audio src={this.state.url} ref="audio"></audio>
                    <span>MV</span>
                    <span>
                        <Icon type="caret-right" onClick={this.play.bind(this)} />
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
