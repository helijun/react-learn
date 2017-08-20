import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    Link,
    hashHistory,
    IndexRoute,
} from 'react-router';
import Index from './src/js/view/Index';
import Index2 from './src/js/view/Index2';

import './src/plugin/amazeui-touch/scss/amazeui.touch.scss';

//可做页面权限拦截
const handleOnEnter = function(){
    console.log('user see index')
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Index}/>
        <Route path="/index" component={Index2} onEnter={handleOnEnter}/>
    </Router>
    , document.getElementById('root'));