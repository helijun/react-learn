import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    Link,
    hashHistory,
    IndexRoute,
} from 'react-router';
import Header from './src/js/danong/header/header';
import * as Pages from './src/js/router.config';

import { 
    ViewNavConfig, 
    NavBar, 
    Container 
} from './src/js/common.config';

import './src/plugin/amazeui-touch/scss/amazeui.touch.scss';
import './src/plugin/li/li-1.2.0.scss';
import './src/scss/common.scss';

let {
    NotFound,
    ...Components
} = Pages;

//可做页面权限拦截
const handleOnEnter = function(){
    console.log('all of the views',Components)
}

class Page extends React.Component {
    constructor(){
        super();
        this.state = {
            data: {}
        };
    }

    clickHandler(data, event) {
        console.log('clickHandler data', data)
        console.log('clickHandler event', event)
        
        if(data.icon === 'left-nav'){
            event.preventDefault();
            window.history.back();
        }else{
            console.log('菜单')
        }
    }

    render() {
        let componentName = this.props.params.componentName;
        console.log('ViewNavConfig', ViewNavConfig)
        if(componentName){
            componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
        }
        let Component = Components[componentName] || NotFound;
        
        const navData = {
            title: componentName,
            leftNav: [{ title: '返回', icon: 'left-nav' }],
            rightNav: [{icon: 'bars'}],
            onAction: this.clickHandler,
        };

        return (
            <Container >
                <NavBar {...navData} />
                <Component scrollable history={this.props.history} location={this.props.location}/>
            </Container >
        )
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path=":componentName" component={Page} onEnter={handleOnEnter}/>
        </Router>
        , document.getElementById('root'));
})
