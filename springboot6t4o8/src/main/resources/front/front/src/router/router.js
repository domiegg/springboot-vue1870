import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Messages from '../pages/messages/list'
import Storeup from '../pages/storeup/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import huanzheList from '../pages/huanzhe/list'
import huanzheDetail from '../pages/huanzhe/detail'
import huanzheAdd from '../pages/huanzhe/add'
import yishengList from '../pages/yisheng/list'
import yishengDetail from '../pages/yisheng/detail'
import yishengAdd from '../pages/yisheng/add'
import keshiList from '../pages/keshi/list'
import keshiDetail from '../pages/keshi/detail'
import keshiAdd from '../pages/keshi/add'
import chuzhenyishengList from '../pages/chuzhenyisheng/list'
import chuzhenyishengDetail from '../pages/chuzhenyisheng/detail'
import chuzhenyishengAdd from '../pages/chuzhenyisheng/add'
import yuyueguahaoList from '../pages/yuyueguahao/list'
import yuyueguahaoDetail from '../pages/yuyueguahao/detail'
import yuyueguahaoAdd from '../pages/yuyueguahao/add'
import yuyuequxiaoList from '../pages/yuyuequxiao/list'
import yuyuequxiaoDetail from '../pages/yuyuequxiao/detail'
import yuyuequxiaoAdd from '../pages/yuyuequxiao/add'
import binglixinxiList from '../pages/binglixinxi/list'
import binglixinxiDetail from '../pages/binglixinxi/detail'
import binglixinxiAdd from '../pages/binglixinxi/add'
import yaopinxinxiList from '../pages/yaopinxinxi/list'
import yaopinxinxiDetail from '../pages/yaopinxinxi/detail'
import yaopinxinxiAdd from '../pages/yaopinxinxi/add'
import chufangkaijuList from '../pages/chufangkaiju/list'
import chufangkaijuDetail from '../pages/chufangkaiju/detail'
import chufangkaijuAdd from '../pages/chufangkaiju/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'messages',
					component: Messages
				},
				{
					path: 'storeup',
					component: Storeup
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'huanzhe',
					component: huanzheList
				},
				{
					path: 'huanzheDetail',
					component: huanzheDetail
				},
				{
					path: 'huanzheAdd',
					component: huanzheAdd
				},
				{
					path: 'yisheng',
					component: yishengList
				},
				{
					path: 'yishengDetail',
					component: yishengDetail
				},
				{
					path: 'yishengAdd',
					component: yishengAdd
				},
				{
					path: 'keshi',
					component: keshiList
				},
				{
					path: 'keshiDetail',
					component: keshiDetail
				},
				{
					path: 'keshiAdd',
					component: keshiAdd
				},
				{
					path: 'chuzhenyisheng',
					component: chuzhenyishengList
				},
				{
					path: 'chuzhenyishengDetail',
					component: chuzhenyishengDetail
				},
				{
					path: 'chuzhenyishengAdd',
					component: chuzhenyishengAdd
				},
				{
					path: 'yuyueguahao',
					component: yuyueguahaoList
				},
				{
					path: 'yuyueguahaoDetail',
					component: yuyueguahaoDetail
				},
				{
					path: 'yuyueguahaoAdd',
					component: yuyueguahaoAdd
				},
				{
					path: 'yuyuequxiao',
					component: yuyuequxiaoList
				},
				{
					path: 'yuyuequxiaoDetail',
					component: yuyuequxiaoDetail
				},
				{
					path: 'yuyuequxiaoAdd',
					component: yuyuequxiaoAdd
				},
				{
					path: 'binglixinxi',
					component: binglixinxiList
				},
				{
					path: 'binglixinxiDetail',
					component: binglixinxiDetail
				},
				{
					path: 'binglixinxiAdd',
					component: binglixinxiAdd
				},
				{
					path: 'yaopinxinxi',
					component: yaopinxinxiList
				},
				{
					path: 'yaopinxinxiDetail',
					component: yaopinxinxiDetail
				},
				{
					path: 'yaopinxinxiAdd',
					component: yaopinxinxiAdd
				},
				{
					path: 'chufangkaiju',
					component: chufangkaijuList
				},
				{
					path: 'chufangkaijuDetail',
					component: chufangkaijuDetail
				},
				{
					path: 'chufangkaijuAdd',
					component: chufangkaijuAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
