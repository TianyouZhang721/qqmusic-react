import React, { Component } from 'react'
import { Carousel } from 'antd';
import { push } from '../../../common/API'
export default class Recommend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slider: [],
            radioList: []
        }
    }

    componentDidMount() {
        this.$http.get(push).then(res => {
            console.log(res)
            let slider = this.state.slider;
            slider = res.data.data.slider;
            let radioList = this.state.radioList
            radioList = res.data.data.radioList
            this.setState({
                slider,
                radioList
            })
        })
    }
    render() {
        const banner = this.state.slider.map((item, index) => {
            return (
                <div key={index}>
                    <img src={item} alt="" />
                </div>
            )
        })
        const radioList = this.state.radioList.map((item, index) => {
            return (
                <div className="radio-one" key={index}>
                    <img src={item.picUrl} alt="" />
                    <p>{item.title}</p>
                </div>
            )
        })
        return (
            <div className="recommend">
                <div className="banner">
                    <Carousel autoplay>
                        {banner}
                    </Carousel>
                </div>
                <div className="radio">
                    <p>电台</p>
                    {/* <div className="radio-one">
                        <img src="" alt=""/>
                        <p>热歌</p>
                    </div> */}
                    <div className="radiolist">
                        {radioList}
                    </div>
                </div>
            </div>
        )
    }
}
