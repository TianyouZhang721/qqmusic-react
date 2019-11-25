import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import { list } from '../../common/API'
import BScroll from 'better-scroll'
export default class TopList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topInfo: "",
            list: [],
            number: "",
            time: "",
            el: "",
            pullup:"上拉加载",
            end: 20
        }
        this.renderList = this.renderList.bind(this)
    }

    componentDidMount() {
        const id = this.props.location.state.id
        console.log(id)
        this.$http.get(list, { params: { id: id } }).then(res => {
            console.log(res)
            this.setState({
                topInfo: res.data.data.topInfo,
                list: res.data.data.songList,
                number: res.data.data.totalSongNum,
                time: res.data.data.updateTime
            }, () => {
                // 当所有的state更新完成后
                this.renderList(0, this.state.end);
                // better-scroll的前提条件
                // 1. 实例化的时候，第一个参数传的是需要做回弹滚动的元素(el)
                // 2. el有且仅有一个子元素(son)
                // 3. el高度固定，overflow:hidden
                // 4. son的高度必须大于el的高度
                let bs = new BScroll('.topList', {
                    probeType: 2
                })
                bs.on('scroll', () => {
                    // console.log(bs.y) // 当前滚动的距离
                    console.log(bs.maxScrollY) // 当前可以滚动的最大距离
                    if (bs.y < bs.maxScrollY) {
                        console.log('123')
                        this.setState({
                            pullup: "释放加载"
                        })
                    }
                })
                bs.on('scrollEnd', () => {
                    console.log('end')
                    if (this.state.pullup == "释放加载") {
                        let end = this.state.end;
                        this.renderList(0, end+20)
                    }
                    // 松手了，加载后20条数据
                })
            })
            // this.setState({},() => {})
        })
    }
    renderList(start, end) {
        const el = this.state.list.slice(start,end).map((item, index) => {
            return (
                <li key={index}>
                    <span>{index + 1}</span>
                    <div>
                        <p>{item.songName}</p>
                        <p className="singer">
                            {
                                item.singer.map((v, i) => {
                                    return <span key={i}>{v.singerName}</span>
                                })
                            }
                        </p>
                    </div>
                    <Icon type="caret-right" />
                </li>
            )
        })
        this.setState({
            el,
            end,
            pullup: "上拉加载"
        })
        if (end == 100) {
            this.setState({
                pullup: "加载完成"
            })
        }
    }
    render() {
        return (
            <div className="container topList">
                <div className="box">
                    <div className="top-info">
                        <p>{this.state.topInfo.listName}</p>
                        <p>{this.state.topInfo.listName}</p>
                        <p className="time">{this.state.time}</p>
                        <Button type="primary" shape="round">
                            <Icon type="caret-right" />
                        </Button>
                    </div>
                    <div className="song">
                        <p>排行榜，共{this.state.number}首歌曲</p>
                        <ul>
                            {this.state.el}
                        </ul>
                        <p className="pullup">{this.state.pullup}</p>
                    </div>
                </div>
            </div>
        )
    }
}
