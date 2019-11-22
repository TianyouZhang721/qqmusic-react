import React, { Component } from 'react'
import { Carousel } from 'antd';
import { push } from '../../../common/API'
export default class Recommend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slider: []
        }
    }
    
    componentDidMount() {
        this.$http.get(push).then(res => {
            console.log(res)
            let slider = this.state.slider;
            slider = res.data.data.slider;
            this.setState({
                slider
            })
        })
    }
    render() {
        const banner = this.state.slider.map((item, index) => {
            return (
                <div key={index}>
                    <img src={item} alt=""/>
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
            </div>
        )
    }
}
