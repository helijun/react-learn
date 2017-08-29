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
import Shop from './src/js/view/danong/Shop';
import Shop2 from './src/js/danong/shop';

import './src/plugin/amazeui-touch/scss/amazeui.touch.scss';
import './src/plugin/li/li-1.2.0.scss';

//可做页面权限拦截
const handleOnEnter = function(){
    console.log('user see index')
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Index}/>
        <Route path="/shop" component={Shop}/>
        <Route path="/shop2" component={Shop2}/>
        <Route path="/index" component={Index2} onEnter={handleOnEnter}/>
    </Router>
    , document.getElementById('root'));