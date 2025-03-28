<template>
	<div class="main-containers">
		<div class="top-container" :style='{"padding":"0px 7%","overflow":"hidden","top":"0","alignItems":"center","left":"0","background":"#434343","display":"flex","width":"100%","position":"relative","justifyContent":"space-between","height":"44px","zIndex":"1002"}'>
			<img v-if='true' :style='{"width":"44px","objectFit":"cover","borderRadius":"100%","display":"none","height":"44px"}' src='http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg'>
			<div v-if="true" :style='{"width":"calc(100% - 770px)","margin":"0 0 0 410px","fontSize":"18px","color":"#fff","textAlign":"center","background":"none"}'>基于协同过滤算法的私人诊所管理系统</div>
			<div>
				<div v-if="false" :style='{"color":"#fff","fontSize":"16px","display":"inline-block"}'>0753-1234567</div>
				<div v-if="Token" :style='{"color":"#fff","fontSize":"16px","display":"inline-block"}'>{{username}}</div>
				<el-button v-if="!Token" @click="toLogin()" :style='{"padding":"0 12px","margin":"0 0 0 10px","color":"#fff","borderRadius":"2px","background":"#999999","display":"inline-block","fontSize":"14px","lineHeight":"32px","height":"32px"}'>登录/注册</el-button>
                <el-button v-if="Token" @click="logout" :style='{"padding":"0 12px","margin":"0 0 0 10px","color":"#666","borderRadius":"2px","background":"#f4f4f5","display":"inline-block","fontSize":"14px","lineHeight":"32px","height":"32px"}'>退出</el-button>
			</div>
		</div>
		
		
		<div class="body-containers" :style='"horizontal" == "vertical" ? {"minHeight":"100vh","padding":"64px 0 0","margin":"0 0 0 210px","position":"relative","background":"rgba(64, 158, 255, .3)","display":"block"} : {"padding":"0","margin":"0","position":"relative","background":"url() fixed repeat-y,#fff"}'>
			<div class="menu-preview" :style='{"width":"100%","background":"none","height":"80px"}'>
				<el-menu class="el-menu-horizontal-demo" :style='{"border":0,"padding":"0","listStyle":"none","margin":"0","background":"#FFF","display":"flex","position":"relative","justifyContent":"center"}' :default-active="activeIndex" :unique-opened="true" mode="horizontal" :router="true" @select="handleSelect">
					<el-image v-if="false" :style='{"width":"44px","margin":"8px 10px 8px 0","objectFit":"cover","borderRadius":"100%","float":"left","height":"44px"}' src="http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg" fit="cover"></el-image>
					<el-menu-item v-for="(menu, index) in menuList" :index="index + ''" :key="index" :route="menu.url">
						<i v-if="false" :style='{"padding":"0 10px","margin":"0","color":"inherit","width":"14px","lineHeight":"60px","fontSize":"14px","height":"60px"}' :class="iconArr[index]"></i>
						<span :style='{"padding":"0 10px","lineHeight":"60px","fontSize":"14px","color":"inherit","height":"60px"}'>{{menu.name}}</span>
					</el-menu-item>
					<el-menu-item @click="goBackend">
						<i v-if="false" :style='{"padding":"0 10px","margin":"0","color":"inherit","width":"14px","lineHeight":"60px","fontSize":"14px","height":"60px"}' class="el-icon-box"></i>
						<span :style='{"padding":"0 10px","lineHeight":"60px","fontSize":"14px","color":"inherit","height":"60px"}'>后台管理</span>
					</el-menu-item>
					<el-menu-item :index="menuList.length + 2 + ''" v-if="Token && notAdmin" @click="goMenu('/index/center')">
						<i v-if="false" :style='{"padding":"0 10px","margin":"0","color":"inherit","width":"14px","lineHeight":"60px","fontSize":"14px","height":"60px"}' class="el-icon-user"></i>
						<span :style='{"padding":"0 10px","lineHeight":"60px","fontSize":"14px","color":"inherit","height":"60px"}'>个人中心</span>
					</el-menu-item>
				</el-menu>
			</div>
			
			<div class="banner-preview" :style='{"width":"100%","height":"auto"}'>
				<el-carousel :style='{"width":"80%","margin":"0 auto"}' trigger="click" indicator-position="inside" arrow="always" type="default" direction="horizontal" height="400px" :autoplay="true" :interval="5000" :loop="true">
					<el-carousel-item :style='{"borderRadius":"10px","width":"100%","height":"100%"}' v-for="item in carouselList" :key="item.id">
						<el-image :style='{"objectFit":"cover","width":"100%","height":"100%"}' :src="baseUrl + item.value" fit="cover"></el-image>
					</el-carousel-item>
				</el-carousel>
			</div>
			
			<router-view></router-view>
			
			<div class="bottom-preview" :style='{"padding":"20px 0","alignItems":"center","background":"#333","flexDirection":"column","display":"flex","width":"100%","justifyContent":"center","height":"150px"}'>
			    <img :style='{"width":"44px","objectFit":"cover","borderRadius":"100%","display":"none","height":"44px"}' src="http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg" >
			    <div :style='{"margin":"10px 0 0","fontSize":"14px","lineHeight":"28px","color":"#333"}'></div>
			    <div :style='{"margin":"10px 0 0","fontSize":"14px","lineHeight":"28px","color":"#333"}'></div>
			    <div :style='{"margin":"10px 0 0","fontSize":"14px","lineHeight":"28px","color":"#333"}'></div>
			</div>
		</div>
		
	</div>
</template>

<script>
import Vue from 'vue'
export default {
    data() {
		return {
            activeIndex: '0',
			roleMenus: [{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-present","buttons":["新增","查看","修改","删除"],"menu":"患者","menuJump":"列表","tableName":"huanzhe"}],"menu":"患者管理"},{"child":[{"appFrontIcon":"cuIcon-camera","buttons":["新增","查看","修改","删除"],"menu":"医生","menuJump":"列表","tableName":"yisheng"}],"menu":"医生管理"},{"child":[{"appFrontIcon":"cuIcon-cardboard","buttons":["新增","查看","修改","删除"],"menu":"科室","menuJump":"列表","tableName":"keshi"}],"menu":"科室管理"},{"child":[{"appFrontIcon":"cuIcon-shop","buttons":["新增","查看","修改","删除"],"menu":"出诊医生","menuJump":"列表","tableName":"chuzhenyisheng"}],"menu":"出诊医生管理"},{"child":[{"appFrontIcon":"cuIcon-news","buttons":["查看","修改","删除"],"menu":"预约挂号","menuJump":"列表","tableName":"yuyueguahao"}],"menu":"预约挂号管理"},{"child":[{"appFrontIcon":"cuIcon-list","buttons":["查看","修改","删除"],"menu":"预约取消","menuJump":"列表","tableName":"yuyuequxiao"}],"menu":"预约取消管理"},{"child":[{"appFrontIcon":"cuIcon-paint","buttons":["查看","修改","删除"],"menu":"病历信息","menuJump":"列表","tableName":"binglixinxi"}],"menu":"病历信息管理"},{"child":[{"appFrontIcon":"cuIcon-vipcard","buttons":["新增","查看","修改","删除"],"menu":"药品信息","menuJump":"列表","tableName":"yaopinxinxi"}],"menu":"药品信息管理"},{"child":[{"appFrontIcon":"cuIcon-attentionfavor","buttons":["查看","修改","删除"],"menu":"处方开具","menuJump":"列表","tableName":"chufangkaiju"}],"menu":"处方开具管理"},{"child":[{"appFrontIcon":"cuIcon-qrcode","buttons":["查看","修改","回复","删除"],"menu":"留言板管理","tableName":"messages"}],"menu":"留言板管理"},{"child":[{"appFrontIcon":"cuIcon-clothes","buttons":["新增","查看","修改","删除"],"menu":"轮播图管理","tableName":"config"},{"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"公告信息","tableName":"news"}],"menu":"系统管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-keyboard","buttons":["查看","预约挂号"],"menu":"出诊医生列表","menuJump":"列表","tableName":"chuzhenyisheng"}],"menu":"出诊医生模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"管理员","tableName":"users"},{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-news","buttons":["查看","支付","预约取消"],"menu":"预约挂号","menuJump":"列表","tableName":"yuyueguahao"}],"menu":"预约挂号管理"},{"child":[{"appFrontIcon":"cuIcon-list","buttons":["查看"],"menu":"预约取消","menuJump":"列表","tableName":"yuyuequxiao"}],"menu":"预约取消管理"},{"child":[{"appFrontIcon":"cuIcon-paint","buttons":["查看"],"menu":"病历信息","menuJump":"列表","tableName":"binglixinxi"}],"menu":"病历信息管理"},{"child":[{"appFrontIcon":"cuIcon-attentionfavor","buttons":["查看","支付"],"menu":"处方开具","menuJump":"列表","tableName":"chufangkaiju"}],"menu":"处方开具管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-keyboard","buttons":["查看","预约挂号"],"menu":"出诊医生列表","menuJump":"列表","tableName":"chuzhenyisheng"}],"menu":"出诊医生模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"是","hasFrontRegister":"是","roleName":"患者","tableName":"huanzhe"},{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-shop","buttons":["查看"],"menu":"出诊医生","menuJump":"列表","tableName":"chuzhenyisheng"}],"menu":"出诊医生管理"},{"child":[{"appFrontIcon":"cuIcon-news","buttons":["查看","审核","病历信息"],"menu":"预约挂号","menuJump":"列表","tableName":"yuyueguahao"}],"menu":"预约挂号管理"},{"child":[{"appFrontIcon":"cuIcon-list","buttons":["查看","审核"],"menu":"预约取消","menuJump":"列表","tableName":"yuyuequxiao"}],"menu":"预约取消管理"},{"child":[{"appFrontIcon":"cuIcon-paint","buttons":["查看","修改","删除"],"menu":"病历信息","menuJump":"列表","tableName":"binglixinxi"}],"menu":"病历信息管理"},{"child":[{"appFrontIcon":"cuIcon-vipcard","buttons":["查看","处方开具"],"menu":"药品信息","menuJump":"列表","tableName":"yaopinxinxi"}],"menu":"药品信息管理"},{"child":[{"appFrontIcon":"cuIcon-attentionfavor","buttons":["查看","修改","删除"],"menu":"处方开具","menuJump":"列表","tableName":"chufangkaiju"}],"menu":"处方开具管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-keyboard","buttons":["查看","预约挂号"],"menu":"出诊医生列表","menuJump":"列表","tableName":"chuzhenyisheng"}],"menu":"出诊医生模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"医生","tableName":"yisheng"}],
			baseUrl: '',
			carouselList: [],
			menuList: [],
			form: {
				ask: '',
				userid: localStorage.getItem('userid')
			},
			Token: localStorage.getItem('Token'),
            username: localStorage.getItem('username'),
            notAdmin: localStorage.getItem('sessionTable')!='"users"',
			timer: '',
			iconArr: [
				'el-icon-star-off',
				'el-icon-goods',
				'el-icon-warning',
				'el-icon-question',
				'el-icon-info',
				'el-icon-help',
				'el-icon-picture-outline-round',
				'el-icon-camera-solid',
				'el-icon-video-camera-solid',
				'el-icon-video-camera',
				'el-icon-bell',
				'el-icon-s-cooperation',
				'el-icon-s-order',
				'el-icon-s-platform',
				'el-icon-s-operation',
				'el-icon-s-promotion',
				'el-icon-s-release',
				'el-icon-s-ticket',
				'el-icon-s-management',
				'el-icon-s-open',
				'el-icon-s-shop',
				'el-icon-s-marketing',
				'el-icon-s-flag',
				'el-icon-s-comment',
				'el-icon-s-finance',
				'el-icon-s-claim',
				'el-icon-s-opportunity',
				'el-icon-s-data',
				'el-icon-s-check'
			],	
		}
    },
    created() {
		this.baseUrl = this.$config.baseUrl;
		this.menuList = this.$config.indexNav;
		this.getCarousel();
    },
    mounted() {
        this.activeIndex = localStorage.getItem('keyPath') || '0';
    },
    watch: {
        $route(newValue) {
            let that = this
            let url = window.location.href
            let arr = url.split('#')
            for (let x in this.menuList) {
                if (newValue.path == this.menuList[x].url) {
                    this.activeIndex = x
                }
            }
            this.Token = localStorage.getItem('Token')
        },
    },
    methods: {
        handleSelect(keyPath) {
            if (keyPath) {
                localStorage.setItem('keyPath', keyPath)
            }
        },
		toLogin() {
		  this.$router.push('/login');
		},
        logout() {
            localStorage.clear();
            Vue.http.headers.common['Token'] = "";
            this.$router.push('/index/home');
            this.activeIndex = '0'
            localStorage.setItem('keyPath', this.activeIndex)
            this.Token = ''
            this.$forceUpdate()
            this.$message({
                message: '登出成功',
                type: 'success',
                duration: 1000,
            });
        },
		getCarousel() {
			this.$http.get('config/list', {params: { page: 1, limit: 3 }}).then(res => {
				if (res.data.code == 0) {
					this.carouselList = res.data.data.list;
				}
			});
		},
		goBackend() {
			window.open(`${this.$config.baseUrl}admin/dist/index.html`, "_blank");
		},
		goMenu(path) {
            if (!localStorage.getItem('Token')) {
                this.toLogin();
            } else {
                this.$router.push(path);
            }
		},
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.menu-preview {
	  .el-scrollbar {
	    height: 100%;
	
	    & /deep/ .scrollbar-wrapper {
	      overflow-x: hidden;
	    }
	  }
	}
	
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item {
		cursor: pointer;
		border: 0;
		padding: 0 20px;
		color: #333;
		white-space: nowrap;
		display: flex;
		font-size: 14px;
		line-height: 80px;
		background: none;
		align-items: center;
		position: relative;
		list-style: none;
		height: 80px;
	}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item:hover {
		cursor: pointer;
		border: 0;
		padding: 0 20px;
		color: #333;
		white-space: nowrap;
		background: url(http://codegen.caihongy.cn/20230111/2184b24053404f55a468cfd5a24ba3f1.png) no-repeat center 60px;
		font-size: 14px;
		line-height: 80px;
		position: relative;
		list-style: none;
		height: 80px;
	}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.is-active {
		cursor: pointer;
		border: 0;
		padding: 0 20px;
		color: #333;
		white-space: nowrap;
		background: url(http://codegen.caihongy.cn/20230111/2184b24053404f55a468cfd5a24ba3f1.png) no-repeat center 60px;
		font-size: 14px;
		line-height: 80px;
		position: relative;
		list-style: none;
		height: 80px;
	}
	
	.banner-preview {
	  .el-carousel /deep/ .el-carousel__indicator button {
	    width: 0;
	    height: 0;
	    display: none;
	  }
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left:hover {
		background: red;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right:hover {
		background: red;
	}

	.banner-preview .el-carousel /deep/ .el-carousel__indicators {
		padding: 0;
		margin: 0 0 10px;
		z-index: 2;
		position: absolute;
		list-style: none;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li {
		border-radius: 10px;
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 12px;
		opacity: 0.4;
		transition: 0.3s;
		height: 12px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li:hover {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 24px;
		opacity: 0.7;
		height: 12px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li.is-active {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 24px;
		opacity: 1;
		height: 12px;
	}

    .chat-content {
      .left-content {
          width: 100%;
          text-align: left;
      }
      .right-content {
          width: 100%;
          text-align: right;
      }
    }
</style>
