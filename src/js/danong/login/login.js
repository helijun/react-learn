import React from 'react';
import { Link } from 'react-router';

import loginAction from './loginAction';
import loginStore from './loginStore';
import './login.scss';
import {
    LI_Input,
    LI_Button,
    LI_Tips,
    Container
} from '../../common.config';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            data: loginStore.getAll()
        };
    }
    
    changePhone(event) {
        loginAction.changePhoneInput(event.target.value.length);
    }

    getCode(event) {
        console.log('this',loginStore.getAll().active)
        if(!loginStore.getAll().active) return;
        loginAction.toggleCodeClass()
    }

    clickEyes() {
        console.log('eysClick')
    }

    doRegist() {
        loginAction.doRegist();
    }

    tipsHide() {
        console.log('tipsHide')
    }

    render() {
        let { 
            codeClass,
            codeText,
            tipsText,
            tipsShow
        } = this.state.data;

        console.log('渲染',this.state)
        return (
            <Container
                scrollable={true}
                className="component-login"
            >   
                <br/>
                <LI_Input 
                    iconAlign='li-align-center' 
                    iconClass='li-icon-tel' 
                    placeholder='请输入您的手机号'
                    type='text'
                    id='mobilePhone'
                    onChange={this.changePhone}
                />
                <LI_Input 
                    iconAlign='li-align-center' 
                    iconClass='li-icon-yanzhengma' 
                    placeholder='请输入验证码'
                    type='password'
                    colEnd='btn'
                    colEndClick={this.getCode}
                    endBtnClass={codeClass}
                    endBtnText={codeText}
                    endBtnId='getCode'
                />
                <LI_Input 
                    iconAlign='li-align-center' 
                    iconClass='li-icon-password' 
                    placeholder='6-16的数字和字母的组合密码'
                    type='text'
                    colEnd='icon'
                    colEndClick={this.clickEyes}
                    endIconClass='li-icon-yanjing'
                />
                <br/>
                <p className='li-align-center'>注意：验证成功后手机号无法修改，请如实填写</p>
                <LI_Button 
                    className='li-btn-submit' 
                    text='立即注册' 
                    click={this.doRegist}
                />

                <LI_Tips
                    text={tipsText}
                    isShow={tipsShow}
                    callback={this.tipsHide}
                    time={3000}
                    top={60}
                />
            </Container>
        )
    }

    componentDidMount() {
        loginStore.bind("change",function(){
            this.setState({
                data: loginStore.getAll()
            })
            console.log('触发change',this.state)
        }.bind(this));
    }

}

export default Login