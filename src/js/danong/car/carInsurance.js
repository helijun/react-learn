import React from 'react';
import { Link } from 'react-router';
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';

class CarInsurance extends React.Component {
    
    showToast() {
        Toast.info('这是一个 toast 提示!!!', 1);
      }
      
    showToastNoMask() {
        Toast.info('无 mask 的 toast !!!', 2, null, false);
      }
      
    successToast() {
        Toast.success('加载成功', 100);
      }
      
    failToast() {
        Toast.fail('加载失败', 1);
      }
      
    offline() {
        Toast.offline('网络连接失败', 1);
      }
      
    loadingToast() {
        Toast.loading('加载中...', 1, () => {
          console.log('加载完成!!!');
        });
      }

    render() {
        
        return(
            <WingBlank>
                <WhiteSpace />
                <Button onClick={this.showToast}>纯文字 toast</Button>
                <WhiteSpace />
                <Button onClick={this.showToastNoMask}>无 mask</Button>
                <WhiteSpace />
                <Button onClick={this.successToast}>成功 toast</Button>
                <WhiteSpace />
                <Button onClick={this.failToast}>失败 toast</Button>
                <WhiteSpace />
                <Button onClick={this.offline}>网络 toast</Button>
                <WhiteSpace />
                <Button onClick={this.loadingToast}>加载中 toast</Button>
                <WhiteSpace />
            </WingBlank>
        )
    }
}

module.exports = CarInsurance