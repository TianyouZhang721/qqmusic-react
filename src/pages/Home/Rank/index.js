import React, { Component } from 'react'
import { Icon } from 'antd'
import { top } from '../../../common/API'
export default class Rank extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        this.$http.get(top).then(res => {
            console.log(res)
            this.setState({
                list: res.data.data
            })
        })
    }
    render() {
        const list = this.state.list.map((item, index) => {
            return (
                <li key={index}>
                    <img src={item.picUrl} alt="" />
                    <div className="list-item">
                        <div className="song-title">
                            <p>{item.title}</p>
                            <div>
                                {
                                    item.songList.map((song, i) => {
                                        return (
                                            <p key={i} className="song-p">
                                                <span>{song.number}</span>
                                                <span className="title">{song.songName}</span>
                                                <span>-</span>
                                                <span>{song.singerName}</span>
                                            </p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="icon-div">
                            <Icon type="right" />
                        </div>
                    </div>
                </li>
            )
        })
        return (
            <div className="rank">
                <ul>
                    {/* <li>
                        <img src="" alt="" />
                        <div className="list-item">
                            <div className="song-title">
                                <p>巅峰榜</p>
                                <div>
                                    <p>
                                        <span>1</span>
                                        <span className="title">野狼desco</span>
                                        <span>-</span>
                                        <span>刘松华</span>
                                    </p>
                                </div>
                            </div>
                            <div className="icon-div">
                                <Icon type="right" />
                            </div>
                        </div>
                    </li> */}
                    {
                        list
                    }
                </ul>
            </div>
        )
    }
}
