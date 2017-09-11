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

import { 
    NavBar, 
    Container,
    OffCanvas,
    OffCanvasTrigger,
    Button,
    List
} from './src/js/common.config';
import ViewInfoConfig from './src/js/view.info.config';
import SideBar from './src/js/danong/sidebar/sidebar';
import './src/plugin/amazeui-touch/scss/amazeui.touch.scss';
import './src/plugin/li/li-1.2.0.scss';
import './src/scss/common.scss';

let {
    NotFound,
    Index,
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
            defaultOffCanvasActive: false
        };
    }

    changeCanvasActive() {
        this.setState({
            defaultOffCanvasActive: true
        })
    }
    
    clickHandler(data, event) {
        if(data.icon === 'left-nav'){
            event.preventDefault();
            window.history.back();
        }else{
            this.props['data-changeCanvasActive']()
        }
    }

    render() {
        let componentName = this.props.params.componentName;
        let viewInfo = ViewInfoConfig[componentName];
        console.log('ViewInfoConfig', viewInfo)
       
        let headerData = {
            title: viewInfo.header.title || '',
            leftNav: viewInfo.header.leftShow? [
                { 
                    title: viewInfo.header.leftTxt || '返回', 
                    icon: viewInfo.header.leftIcon || 'left-nav' 
                }
            ] : [],
            rightNav: viewInfo.header.rightShow? [
                { 
                    icon: viewInfo.header.rightIcon || 'bars' 
                }
            ] : [],
            onAction: this.clickHandler
        };

        if(componentName){
            componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
        }
        let Component = Components[componentName] || NotFound;

        return (
            <Container >
                {viewInfo.header.isShow && <NavBar {...headerData} data-changeCanvasActive={this.changeCanvasActive.bind(this)}/>}
                <OffCanvasTrigger
                    placement="right"
                    offCanvas={<OffCanvas><SideBar/></OffCanvas>}
                    defaultOffCanvasActive={this.state.defaultOffCanvasActive}
                >
                    <div></div>
                </OffCanvasTrigger>    
                <Component scrollable history={this.props.history} location={this.props.location}/>
            </Container >
            
        )
    }
}

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            data: {}
        };
    }

    render() {
        let {
            location,
            params,
            children,
            ...props
            } = this.props;

        return (
            <Container direction="column">
                <Container fill={true}>
                    {React.cloneElement(children, {key: location.key, params: params, location: location})}
                </Container>
            </Container>
        )
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Index}/>
                <Route path=":componentName" component={Page} onEnter={handleOnEnter}/>
            </Route>
        </Router>
        , document.getElementById('root'));
})
