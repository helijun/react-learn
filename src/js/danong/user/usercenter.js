import React from 'react';
import { Link, Lifecycle } from 'react-router';

import UserCenterAction from './usercenterAction';
import UserCenterStore from './usercenterStore';
import './usercenter.scss';
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

class App extends React.Component {
    constructor(){
        super();

        this.state = {
            mixins: [ Lifecycle ],        
            data: UserCenterStore.getAll()
        };
    }

    onAction(index, direction) {
        //console.log('激活的幻灯片编号：', index, '，滚动方向：', direction);
    }

    routerWillLeave(nextLocation) {
        if (!this.state.isSaved)
            return 'Your work is not saved! Are you sure you want to leave?'
    }
    

    render() {
        let data = this.state.data;
        let avaterHeight = 393*data.width/850;
        console.log('avaterHeight',avaterHeight)
        return(
            <Container 
                scrollable={true} 
                className='component-usercenter'
            >
                <div className='m-avatar' style={{height: avaterHeight +'px'}}>
                    <img src="/api/static/img/logo.png" className="el-headimg" style={{height: avaterHeight*0.6 + 'px', width: avaterHeight*0.6 + 'px'}} />
                    <p>{this.state.data.nickName}</p>
                </div>
                <List>
                    <List.Item href="shop" after="查看全部" title="我的保单" />
                </List>
                <Grid className='li-align-center'>
                    <Col>
                        <img src="/api/static/img/wait.png" className="el-bdimg"/>
                        <p>待支付</p>
                    </Col>
                    <Col>
                        <img src="/api/static/img/work.png" className="el-bdimg"/>
                        <p>已生效</p>
                    </Col>
                    <Col>
                        <img src="/api/static/img/finish.png" className="el-bdimg"/>
                        <p>已终止</p>
                    </Col>
                </Grid>
            </Container>
        )
    }

    componentDidMount() {

        UserCenterStore.bind("change",function(){
            this.setState({
                data: ShopStore.getAll()
            })
            console.log('触发change',this.state)
        }.bind(this));
    }
}

export default App