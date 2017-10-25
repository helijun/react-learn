/** 所有的view信息 */
let ViewInfoConfig = {
    login: {
        header: {
            isShow: true,
            title: '欢迎登录',
            rightShow: true
        }
    },
    shop: {
        header: {
            isShow: true,
            title: '保险集市',
            leftShow: true,
            rightShow: true
        },
        footer: {

        }
    },
    carInsurance: {
        header: {
            isShow: true,
            title: '车险购买',
            leftShow: true,
            rightShow: true
        },
        footer: {

        }
    },
    usercenter: {
        header: {
            isShow: false,
            title: '个人中心'
        }
    },
    notFound: {
        header: {
            isShow: false,
            title: '找不到页面'
        }
    }
}
export default ViewInfoConfig;