import React from 'react';
import { Link } from 'react-router';
import { createForm } from 'rc-form';
import {
    URL
}  from '../../common.config';

import './carInsurance.scss';



class CarInsurance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            focused: false
        };
    }

    render() {
        return (
            <div className="component-carInsurance btn-container">
                <div className="banner">
                    <img src={URL.H5 + '/static/img/newCopyright/01biaoti_ok.png'}/>
                </div>
                <div className="introduce">
                    <p className="title">车险报价</p>
                    <p className="sub-title">车主大福利，车险保费省20%，多家保险公司合作，给您最优惠的折扣，最靠谱的服务。</p>
                </div>
                <div className="content">
                    <p className="title">完善信息、立即投保</p>
                </div>
            </div>
        )
    }
}

module.exports = CarInsurance;


