import React from 'react';
import { Link } from 'react-router';

import ShopAction from './headerAction';
import ShopStore from './headerStore';
import './header.scss';
import {
    Container,
    Notification,
    List,
    Card,
    Grid,
    Col,
    Group,
    Button,
    Slider
}  from '../../common.config';

class Header extends React.Component {
    constructor(){
        super();
        this.state = {
            data: {}
        };
    }

    render() {
        return(
            <div className='li-row li-cell-xl'>
                <div className='li-col-20 li-pl-m'>
                    <p>{'<'}</p>
                </div>
                <div className='li-col-50 li-align-center'>
                    标题
                </div>
                <div className='li-col-30 li-align-right'>
                    菜单
                </div>
            </div> 
        )
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }
}

export default Header