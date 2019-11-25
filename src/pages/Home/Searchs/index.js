import React, { Component } from 'react'
import { Input, Icon } from 'antd';
import {search} from '../../../common/API'
import Masks from '../../../components/Searchs/masks'
const { Search } = Input;

export default class Searchs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotList: ["乐队的夏天", "野狼disco", "我和我的祖国", "关", "爱的飞行日记", "芒种", "戏子", "8023号"],
            flag: false,
            itemlist: []
        }
    }
    search(value) {
        console.log(value)
        this.$http.get(search, {params: {
            keyword: value
        }}).then(res =>{
            console.log(res)
            // 打开flag
            this.setState({
                flag: true,
                itemlist: res.data.data.song.itemlist
            })
        })
    }

    render() {
        return (
            <div className="search">
                <div className="search-box">
                    <Search
                        placeholder="input search text"
                        onSearch={value => this.search(value)}
                        style={{ width: 280 }}
                    />
                    <span>取消</span>
                </div>
                <div className="hot">
                    {
                        this.state.hotList.map((item, index) => {
                            return <span key={index}>{item}</span>
                        })
                    }
                </div>
                {
                    this.state.flag ? <Masks list={this.state.itemlist}/> : ""
                }
            </div>
        )
    }
}
