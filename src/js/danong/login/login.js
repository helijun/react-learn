import React from 'react';
import { Link } from 'react-router';

import ShopAction from './loginAction';
import ShopStore from './loginStore';
import './login.scss';
import {
    Container,
    Notification,
    List,
    Card,
    Grid,
    Col,
    Group,
    Button,
    Slider,
    Icon,
    Field
} from '../../common.config';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {}
        };
    }

    render() {
        let fields = [
            {
                label: '手机号',
                type: 'text',
            },
            {
                label: '验证码',
                type: 'password',
            },
            {
                value: "提交",
                type: "submit",
                amStyle: ""
            }
        ];

        return (
            <Container
                scrollable={true}
                className="component-login"
            >

                <form className="register-main" name="registerForm">
                    <div className="li-row li-cell li-items-center li-cell-xl li-bottom">
                        <div className="li-col-20 li-pl-l">    
                            <i className="li-icon-tel"></i>
                        </div>
                        <div className="li-col-80">
                            <input className="li-input" type="tel" name="telInput" id="telInput" placeholder="请输入您的手机号"/>
                        </div>
                    </div>
                
                    <div className="li-row li-cell li-items-center li-cell-xl li-bottom">
                        <div className="li-col-20 li-pl-l">
                            <i className="li-icon-yanzhengma"></i>
                        </div>
                        <div className="li-col-50">
                            <input className="li-input" type="tel" name="validateNumber" id="validateNumber" placeholder="请输入验证码"/>
                        </div>
                        <div className="li-col-30 li-pl-s">
                            <a className="li-btn-wraning get-code not-active" id="getCodeBtn">获取验证码</a>
                        </div>
                    </div>

                    <div className="li-row li-cell li-items-center li-cell-xl" id="otherInfoDiv">
                        <div className="li-col-20 li-pl-l">
                            <i className="li-icon-password"></i>
                        </div>
                        <div className="li-col-50">
                            <input className="li-input" type="password" name="registerPwd" id="registerPwd" placeholder="6-16的数字和字母的组合密码"/>
                        </div>
                        <div className="li-col-30 li-align-center">
                            <i className="li-icon-yanjing"></i>
                        </div>
                    </div>
                </form>

                <div class="li-align-center li-mt-m">
                    <p class="li-color-muted">注意：验证成功后手机号无法修改，请如实填写</p>
                </div>

                <div class="li-align-center register-btn">
                    <a href="#" class="li-btn-wraning" id="registerBtn">立即注册</a>
                </div>

                
                {/* {fields.map((field, i) => {
                    return (
                        <List.Item
                            key={i}
                            nested="input"
                        >
                            <Field
                                {...field}
                                placeholder={'请输入' + field.label}
                            />
                        </List.Item>
                    );
                })} */}
            </Container>
        )
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
}

export default Header