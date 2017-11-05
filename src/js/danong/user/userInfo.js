import React from 'react';
import { Link, Lifecycle } from 'react-router';

import {
    URL,
    Container,
    Group,
    List,
    Badge,
    Card,
    Switch
}  from '../../common.config';

class App extends React.Component {
    constructor(){
        super();

        this.state = {
            
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
        
        return(
            <Container 
                scrollable={true} 
                className='component-usercenter'
            >
                
                <List>
                    <List.Item title="头像" />
                    <List.Item href="" title="姓名" after="何立军"/>
                    <List.Item href="#/shop" after="17603001616" title="手机号" />
                </List>
            </Container>
        )
    }

    componentDidMount() {

    }
}

module.exports = App
//export default App