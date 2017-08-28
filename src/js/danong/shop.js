import React from 'react';
import ShopAction from './shopAction';
import ShopStore from './shopStore';
import './shop.scss';

import Container from '../../plugin/amazeui-touch/lib/Container';
import Notification from '../../plugin/amazeui-touch/lib/Notification';
import Card from '../../plugin/amazeui-touch/lib/Card';
import Group from '../../plugin/amazeui-touch/lib/Group';
import Button from '../../plugin/amazeui-touch/lib/Button';
import Slider from '../../plugin/amazeui-touch/lib/Slider';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            data: {
                phone: '18778917540'
            }
        };
    }

    updatePhone(){
        ShopAction.bannerList();
    }

    onAction(index, direction) {
        console.log('激活的幻灯片编号：', index, '，滚动方向：', direction);
    }

    render() {
        console.log('render this.state', this.state)
        let { 
            bannerList,
            shopTitle
        } = this.state.data;
        return(
            <Container>
                <Slider className='m-slider'
                    onAction={this.onAction}
                >
                    {
                        bannerList && bannerList.map((v, i) => {
                            return (
                                <Slider.Item key= {i} >
                                    <img
                                        id={'slider' + i}
                                        src={ '//static.sztoda.com/' + v.imgLarge} />
                                </Slider.Item>
                            )
                        })
                    }
                     
                </Slider>
                <Group
                    header={shopTitle || '产品列表'}
                >
                    <Button block hollow onClick={this.updatePhone}>Default</Button>
                    <Button hollow amStyle="primary">Primary</Button>
                    <Button hollow amStyle="secondary">Secondary</Button>
                    <Button hollow amStyle="success">Success</Button>
                    <Button hollow amStyle="warning">Warning</Button>
                    <Button hollow amStyle="alert">Alert</Button>
                    <Button hollow amStyle="dark">Dark</Button>
                </Group>

                <Group
                    header="静态通知栏样式展示"
                    >
                    <Notification visible static>这是一个通知 :)</Notification>
                    <Notification visible static amStyle="primary">这是一个通知 :)</Notification>
                    <Notification visible static amStyle="secondary">这是一个通知 :)</Notification>
                    <Notification visible static amStyle="success">这是一个通知 :)</Notification>
                    <Notification visible static amStyle="warning">这是一个通知 :)</Notification>
                    <Notification visible static amStyle="alert">这是一个通知 :)</Notification>
                    </Group>
            </Container>
            
        )
    }

    componentDidMount() {
        ShopAction.bannerList();

        ShopStore.bind("change",function(){
            
            this.setState({
                data: ShopStore.getAll()
            })
            console.log('触发change',this.state)
        }.bind(this));
    }
}

export default App