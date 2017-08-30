import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    Link,
    hashHistory,
    IndexRoute,
} from 'react-router';
import * as Pages from './src/js/router.config';

import './src/plugin/amazeui-touch/scss/amazeui.touch.scss';
import './src/plugin/li/li-1.2.0.scss';


let {
    NotFound,
    ...Components
} = Pages;

//可做页面权限拦截
const handleOnEnter = function(){
    console.log('all of the views',Components)
}

const Page = React.createClass({
    render() {
        let componentName = this.props.params.componentName;
        if(componentName){
            componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
        }
        let Component = Components[componentName] || NotFound;
        console.log('this.props',this.props)
        return (
            <Component scrollable history={this.props.history} location={this.props.location}/>
        )
    }
})


document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path=":componentName" component={Page} onEnter={handleOnEnter}/>
        </Router>
        , document.getElementById('root'));
})
