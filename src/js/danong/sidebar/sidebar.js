import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import './sidebar.scss';
import {
    URL,
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

class SiderBar extends React.Component {

    constructor(){
        super();
        this.state = {
            data: {}
        };
    }

    render() {
        return (
            <div className='component-sidebar'>
                <List className='m-sidebar-list'>
                    <List.Item
                        linkComponent={Link}
                        linkProps={{
                            to: `/usercenter`
                        }}
                        title="个人中心"
                    />
                    <List.Item
                        linkComponent={Link}
                        linkProps={{
                            to: '/'
                        }}
                        title="首页"
                    />
                </List>
                
                <Group className='m-sidebar-group'>
                    <img src={URL.H5 + '/static/img/app/download_app_0922.png'}/>
                    <p>下载达农帮APP</p>
                </Group>
            </div>
        )
    }
}

export default SiderBar