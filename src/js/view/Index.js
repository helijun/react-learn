import React from 'react';
import IndexAction from '../action/Index.js';
import IndexStore from '../store/Index.js';
import '../../scss/view/Index.scss';

import Container from '../../plugin/amazeui-touch/lib/Container';
import Notification from '../../plugin/amazeui-touch/lib/Notification';
import Card from '../../plugin/amazeui-touch/lib/Card';
import Group from '../../plugin/amazeui-touch/lib/Group';
import Button from '../../plugin/amazeui-touch/lib/Button';

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
        IndexAction.updatePhone();
    }

    componentDidMount(){
        IndexStore.bind("change",function(){
            console.log('触发change')
            this.setState({
                data: IndexStore.getAll()
            })
        }.bind(this));
    }

    render() {
        return(
            <Container>
                <Group
                    header={this.state.data.phone}
                >
                <Card
                    header="Card header"
                    footer="Card footer"
                >
                    Card 内容
                </Card>
                </Group>
                <Group
                    header="形状镂空3"
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
}

export default App