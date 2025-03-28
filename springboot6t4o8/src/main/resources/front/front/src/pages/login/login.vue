<template>
<div>
	<div class="container" :style='{"minHeight":"100vh","alignItems":"center","background":"url(http://codegen.caihongy.cn/20230111/af6e32bf0cd344b79a044e00ea687ea3.jpg) no-repeat center top / 100% 100%","display":"flex","width":"100%","backgroundSize":"cover","backgroundPosition":"center center","backgroundRepeat":"no-repeat","justifyContent":"center"}'>
		<el-form ref="loginForm" :model="loginForm" :style='{"border":"1px solid #666","padding":"50px 40px","boxShadow":"inset 0px 0px 56px 0px #666","margin":"0","borderRadius":"4px","flexWrap":"wrap","background":"none","display":"flex","width":"800px","position":"relative","justifyContent":"flex-end","height":"auto"}' :rules="rules">
			<div v-if="false" :style='{"margin":"0 0 10px 0","color":"rgba(64, 158, 255, 1)","textAlign":"center","width":"100%","lineHeight":"44px","fontSize":"20px","textShadow":"4px 4px 2px rgba(64, 158, 255, .5)"}'>USER / LOGIN</div>
			<div v-if="true" :style='{"margin":"0 0 10px","color":"#fff","textAlign":"center","width":"66%","lineHeight":"44px","fontSize":"20px","textShadow":"0px 0px 0px rgba(64, 158, 255, .5)"}'>基于协同过滤算法的私人诊所管理系统登录</div>
			<el-form-item v-if="loginType==1" class="list-item" :style='{"width":"66%","margin":"0 0 10px"}' prop="username">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>账号：</div>
				<input :style='{"border":"0px solid #efefef","padding":"0 10px","color":"#333","outlineOffset":"8px","background":"linear-gradient(25deg, rgba(129,129,130,0) 0%, rgba(255,255,255,1) 60%, rgba(129,129,130,1) 100%),#fff","width":"100%","fontSize":"14px","height":"44px"}' v-model="loginForm.username" placeholder="请输入账户">
			</el-form-item>
			<el-form-item v-if="loginType==1" class="list-item" :style='{"width":"66%","margin":"0 0 10px"}' prop="password">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>密码：</div>
				<input :style='{"border":"0px solid #efefef","padding":"0 10px","color":"#333","outlineOffset":"8px","background":"linear-gradient(25deg, rgba(129,129,130,0) 0%, rgba(255,255,255,1) 60%, rgba(129,129,130,1) 100%),#fff","width":"100%","fontSize":"14px","height":"44px"}' v-model="loginForm.password" placeholder="请输入密码" type="password">
			</el-form-item>
			<el-form-item v-if="roles.length>1" class="list-type" :style='{"width":"66%","padding":"0 10px","margin":"0px 0 10px","background":"linear-gradient(25deg, rgba(129,129,130,.6) 0%, rgba(255,255,255,1) 80%, rgba(129,129,130,1) 100%),#fff"}' prop="role">
				<el-radio v-model="loginForm.tableName" :label="item.tableName" v-for="(item, index) in roles" :key="index" @change.native="getCurrentRow(item)">{{item.roleName}}</el-radio>
			</el-form-item>
			<el-form-item :style='{"width":"100%","margin":"20px auto","minWidth":"720px"}'>
				<el-button v-if="loginType==1" :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 0 0 34%","color":"#333","minWidth":"475px","outline":"none","borderRadius":"4px","background":"linear-gradient(90deg, rgba(129,129,130,1) 0%, rgba(255,255,255,1) 50%, rgba(129,129,130,1) 100%)","width":"66%","fontSize":"14px","position":"relative","height":"44px","zIndex":"999"}' @click="submitForm('loginForm')">登录</el-button>
				<el-button v-if="loginType==1" :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 5px","outline":"none","color":"#fff","borderRadius":"4px","background":"rgba(64, 158, 255, 1)","display":"none","width":"auto","fontSize":"14px","height":"44px"}' @click="resetForm('loginForm')">重置</el-button>
			</el-form-item>
			<div :style='{"margin":"0 40px 0 0","top":"104px","flexWrap":"wrap","left":"0","display":"flex","width":"30%","position":"absolute","justifyContent":"center","height":"70%"}'>
			<router-link :style='{"cursor":"pointer","padding":"0 10px","margin":"0 0 10px 0","color":"#000","borderRadius":"8px","textAlign":"center","background":"#818182","width":"55%","fontSize":"16px","textDecoration":"none","lineHeight":"2","height":"32px"}' :to="{path: '/register', query: {role: item.tableName,pageFlag:'register'}}" v-if="item.hasFrontRegister=='是'" v-for="(item, index) in roles" :key="index">注册{{item.roleName.replace('注册','')}}</router-link>
			</div>
		</el-form>
    </div>
</div>
</template>

<script>

export default {
	//数据集合
	data() {
		return {
            baseUrl: this.$config.baseUrl,
            loginType: 1,
			roleMenus: [{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-present","buttons":["新增","查看","修改","删除"],"menu":"患者","menuJump":"列表","tableName":"huanzhe"}],"menu":"患者管理"},{"child":[{"appFrontIcon":"cuIcon-camera","buttons":["新增","查看","修改","删除"],"menu":"医生","menuJump":"列表","tableName":"yisheng"}],"menu":"医生管理"},{"child":[{"appFrontIcon":"cuIcon-cardboard","buttons":["新增","查看","修改","删除"],"menu":"科室","menuJump":"列表","tableName":"keshi"}],"menu":"科室管理"},{"child":[{"appFrontIcon":"cuIcon-shop","buttons":["新增","查看","修改","删除"],"menu":"出诊医生","menuJump":"列表","tableName":"chuzhenyisheng"}],"menu":"出诊医生管理"},{"child":[{"appFrontIcon":"cuIcon-news","buttons":["查看","修改","删除"],"menu":"预约挂号","menuJump":"列表","tableName":"yuyueguahao"}],"menu":"预约挂号管理"},{"child":[{"appFrontIcon":"cuIcon-list","buttons":["查看","修改","删除"],"menu":"预约取消","menuJump":"列表","tableName":"yuyuequxiao"}],"menu":"预约取消管理"},{"child":[{"appFrontIcon":"cuIcon-paint","buttons":["查看","修改","删除"],"menu":"病历信息","menuJump":"列表","tableName":"binglixinxi"}],"menu":"病历信息管理"},{"child":[{"appFrontIcon":"cuIcon-vipcard","buttons":["新增","查看","修改","删除"],"menu":"药品信息","menuJump":"列表","tableName":"yaopinxinxi"}],"menu":"药品信息管理"},{"child":[{"appFrontIcon":"cuIcon-attentionfavor","buttons":["查看","修改","删除"],"menu":"处方开具","menuJump":"列表","tableName":"chufangkaiju"}],"menu":"处方开具管理"},{"child":[{"appFrontIcon":"cuIcon-qrcode","buttons":["查看","修改","回复","删除"],"menu":"留言板管理","tableName":"messages"}],"menu":"留言板管理"},{"child":[{"appFrontIcon":"cuIcon-clothes","buttons":["新增","查看","修改","删除"],"menu":"轮播图管理","tableName":"config"},{"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"公告信息","tableName":"news"}],"menu":"系统管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-keyboard","buttons":["查看","预约挂号"],"menu":"出诊医生列表","menuJump":"列表","tableName":"chuzhenyisheng"}],"menu":"出诊医生模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"管理员","tableName":"users"},{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-news","buttons":["查看","支付","预约取消"],"menu":"预约挂号","menuJump":"列表","tableName":"yuyueguahao"}],"menu":"预约挂号管理"},{"child":[{"appFrontIcon":"cuIcon-list","buttons":["查看"],"menu":"预约取消","menuJump":"列表","tableName":"yuyuequxiao"}],"menu":"预约取消管理"},{"child":[{"appFrontIcon":"cuIcon-paint","buttons":["查看"],"menu":"病历信息","menuJump":"列表","tableName":"binglixinxi"}],"menu":"病历信息管理"},{"child":[{"appFrontIcon":"cuIcon-attentionfavor","buttons":["查看","支付"],"menu":"处方开具","menuJump":"列表","tableName":"chufangkaiju"}],"menu":"处方开具管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-keyboard","buttons":["查看","预约挂号"],"menu":"出诊医生列表","menuJump":"列表","tableName":"chuzhenyisheng"}],"menu":"出诊医生模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"是","hasFrontRegister":"是","roleName":"患者","tableName":"huanzhe"},{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-shop","buttons":["查看"],"menu":"出诊医生","menuJump":"列表","tableName":"chuzhenyisheng"}],"menu":"出诊医生管理"},{"child":[{"appFrontIcon":"cuIcon-news","buttons":["查看","审核","病历信息"],"menu":"预约挂号","menuJump":"列表","tableName":"yuyueguahao"}],"menu":"预约挂号管理"},{"child":[{"appFrontIcon":"cuIcon-list","buttons":["查看","审核"],"menu":"预约取消","menuJump":"列表","tableName":"yuyuequxiao"}],"menu":"预约取消管理"},{"child":[{"appFrontIcon":"cuIcon-paint","buttons":["查看","修改","删除"],"menu":"病历信息","menuJump":"列表","tableName":"binglixinxi"}],"menu":"病历信息管理"},{"child":[{"appFrontIcon":"cuIcon-vipcard","buttons":["查看","处方开具"],"menu":"药品信息","menuJump":"列表","tableName":"yaopinxinxi"}],"menu":"药品信息管理"},{"child":[{"appFrontIcon":"cuIcon-attentionfavor","buttons":["查看","修改","删除"],"menu":"处方开具","menuJump":"列表","tableName":"chufangkaiju"}],"menu":"处方开具管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-keyboard","buttons":["查看","预约挂号"],"menu":"出诊医生列表","menuJump":"列表","tableName":"chuzhenyisheng"}],"menu":"出诊医生模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"医生","tableName":"yisheng"}],
			loginForm: {
				username: '',
				password: '',
				tableName: '',
				code: '',
			},
			role: '',
            roles: [],
			rules: {
				username: [
					{ required: true, message: '请输入账户', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			},
			codes: [{
				num: 1,
				color: '#000',
				rotate: '10deg',
				size: '16px'
			}, {
				num: 2,
				color: '#000',
				rotate: '10deg',
				size: '16px'
			}, {
				num: 3,
				color: '#000',
				rotate: '10deg',
				size: '16px'
			}, {
				num: 4,
				color: '#000',
				rotate: '10deg',
				size: '16px'
			}]
		}
	},
  components: {
  },
	created() {
        for(let item in this.roleMenus) {
            if(this.roleMenus[item].hasFrontLogin=='是') {
                this.roles.push(this.roleMenus[item]);
            }
        }
	},
	mounted() {
	},
    //方法集合
    methods: {
		randomString() {
			var len = 4;
			var chars = [
			  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
			  'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
			  'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
			  'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
			  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2',
			  '3', '4', '5', '6', '7', '8', '9'
			]
			var colors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
			var sizes = ['14', '15', '16', '17', '18']
			
			var output = []
			for (var i = 0; i < len; i++) {
			  // 随机验证码
			  var key = Math.floor(Math.random() * chars.length)
			  this.codes[i].num = chars[key]
			  // 随机验证码颜色
			  var code = '#'
			  for (var j = 0; j < 6; j++) {
			    var key = Math.floor(Math.random() * colors.length)
			    code += colors[key]
			  }
			  this.codes[i].color = code
			  // 随机验证码方向
			  var rotate = Math.floor(Math.random() * 45)
			  var plus = Math.floor(Math.random() * 2)
			  if (plus == 1) rotate = '-' + rotate
			  this.codes[i].rotate = 'rotate(' + rotate + 'deg)'
			  // 随机验证码字体大小
			  var size = Math.floor(Math.random() * sizes.length)
			  this.codes[i].size = sizes[size] + 'px'
			}
		},
      getCurrentRow(row) {
        this.role = row.roleName;
      },
      submitForm(formName) {
        if (this.roles.length!=1) {
            if (!this.role) {
                this.$message.error("请选择登录用户类型");
                return false;
            }
        } else {
            this.role = this.roles[0].roleName;
            this.loginForm.tableName = this.roles[0].tableName;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.get(`${this.loginForm.tableName}/login`, {params: this.loginForm}).then(res => {
              if (res.data.code === 0) {
                localStorage.setItem('Token', res.data.token);
                localStorage.setItem('UserTableName', this.loginForm.tableName);
                localStorage.setItem('username', this.loginForm.username);
                localStorage.setItem('adminName', this.loginForm.username);
                localStorage.setItem('sessionTable', this.loginForm.tableName);
                localStorage.setItem('role', this.role);
                localStorage.setItem('keyPath', this.$config.indexNav.length+2);
                this.$router.push('/index/center');
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  duration: 1500,
                });
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.container {
		position: relative;
		background: url(http://codegen.caihongy.cn/20230111/af6e32bf0cd344b79a044e00ea687ea3.jpg) no-repeat center top / 100% 100%;
		
		.el-form-item {
		  & /deep/ .el-form-item__content {
		    width: 100%;
		  }
		}
		
		.list-item /deep/ .el-input .el-input__inner {
			border: 0px solid #efefef;
			padding: 0 10px;
			color: #333;
			background: linear-gradient(25deg, rgba(129,129,130,0) 0%, rgba(255,255,255,1) 60%, rgba(129,129,130,1) 100%),#fff;
			width: 100%;
			font-size: 14px;
			outline-offset: 8px;
			height: 44px;
		}
		
		.list-code /deep/ .el-input .el-input__inner {
			border: 0px solid rgba(64, 158, 255, 1);
			padding: 0 10px;
			outline: none;
			color: #333;
			background: linear-gradient(25deg, rgba(129,129,130,0) 0%, rgba(255,255,255,1) 90%, rgba(129,129,130,1) 100%),#fff;
			display: inline-block;
			vertical-align: middle;
			width: calc(100% - 124px);
			font-size: 14px;
			height: 44px;
		}
		
		.list-type /deep/ .el-radio__input .el-radio__inner {
			background: rgba(53, 53, 53, 0);
			border-color: #666666;
		}
		.list-type /deep/ .el-radio__input.is-checked .el-radio__inner {
			background: #333;
			border-color: #333;
		}
		.list-type /deep/ .el-radio__label {
			color: #666666;
			font-size: 14px;
		}
		.list-type /deep/ .el-radio__input.is-checked+.el-radio__label {
			color: #333;
			font-size: 14px;
		}
	}
</style>
