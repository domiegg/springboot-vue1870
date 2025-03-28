<template>
	<div>

	<div class="container" :style='{"minHeight":"100vh","alignItems":"center","background":"url(http://codegen.caihongy.cn/20230111/af6e32bf0cd344b79a044e00ea687ea3.jpg) no-repeat center top / 100% 100%","display":"flex","width":"100%","backgroundSize":"cover","backgroundPosition":"center center","backgroundRepeat":"no-repeat","justifyContent":"center"}'>
		<el-form class='rgs-form' v-if="pageFlag=='register'" :style='{"border":"1px solid #666","padding":"20px 2%","boxShadow":"inset 0px 0px 56px 0px #666","margin":"20px 0","borderRadius":"4px","background":"none","width":"750px","height":"auto"}' ref="registerForm" :model="registerForm" :rules="rules">
			<div v-if="false" :style='{"margin":"0 0 10px 0","color":"rgba(64, 158, 255, 1)","textAlign":"center","width":"100%","lineHeight":"44px","fontSize":"20px","textShadow":"4px 4px 2px rgba(64, 158, 255, .5)"}'>USER / REGISTER</div>
			<div v-if="true" :style='{"width":"100%","margin":"0 auto 20px","lineHeight":"44px","fontSize":"20px","color":"#fff","textAlign":"center"}'>基于协同过滤算法的私人诊所管理系统注册</p></div>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='huanzhe'" prop="huanzhezhanghao">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>患者账号：</div>
				<el-input v-model="registerForm.huanzhezhanghao"  placeholder="请输入患者账号" />
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='huanzhe'" prop="mima">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>密码：</div>
				<el-input v-model="registerForm.mima" type="password" placeholder="请输入密码" />
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='huanzhe'" prop="mima">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>确认密码：</div>
				<el-input v-model="registerForm.mima2" type="password" placeholder="请再次输入密码" />
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='huanzhe'" prop="huanzhexingming">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>患者姓名：</div>
				<el-input v-model="registerForm.huanzhexingming"  placeholder="请输入患者姓名" />
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='huanzhe'" prop="touxiang">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>头像：</div>
                <file-upload
					tip="点击上传头像"
					action="file/upload"
					:limit="1"
					:multiple="true"
					:fileUrls="registerForm.touxiang?registerForm.touxiang:''"
					@change="huanzhetouxiangUploadChange"
				></file-upload>
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='huanzhe'" prop="xingbie">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>性别：</div>
                <el-select v-model="registerForm.xingbie" placeholder="请选择性别" >
                  <el-option
                      v-for="(item,index) in huanzhexingbieOptions"
                      :key="index"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='huanzhe'" prop="shoujihaoma">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>手机号码：</div>
				<el-input v-model="registerForm.shoujihaoma"  placeholder="请输入手机号码" />
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='huanzhe'" prop="shenfenzhenghao">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>身份证号：</div>
				<el-input v-model="registerForm.shenfenzhenghao"  placeholder="请输入身份证号" />
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='huanzhe'" prop="huanzhezhuzhi">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>患者住址：</div>
				<el-input v-model="registerForm.huanzhezhuzhi"  placeholder="请输入患者住址" />
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='yisheng'" prop="yishengzhanghao">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>医生账号：</div>
				<el-input v-model="registerForm.yishengzhanghao"  placeholder="请输入医生账号" />
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='yisheng'" prop="mima">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>密码：</div>
				<el-input v-model="registerForm.mima" type="password" placeholder="请输入密码" />
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='yisheng'" prop="mima">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>确认密码：</div>
				<el-input v-model="registerForm.mima2" type="password" placeholder="请再次输入密码" />
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='yisheng'" prop="touxiang">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>头像：</div>
                <file-upload
					tip="点击上传头像"
					action="file/upload"
					:limit="1"
					:multiple="true"
					:fileUrls="registerForm.touxiang?registerForm.touxiang:''"
					@change="yishengtouxiangUploadChange"
				></file-upload>
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='yisheng'" prop="yishengxingming">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>医生姓名：</div>
				<el-input v-model="registerForm.yishengxingming"  placeholder="请输入医生姓名" />
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='yisheng'" prop="xingbie">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>性别：</div>
                <el-select v-model="registerForm.xingbie" placeholder="请选择性别" >
                  <el-option
                      v-for="(item,index) in yishengxingbieOptions"
                      :key="index"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='yisheng'" prop="shoujihaoma">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>手机号码：</div>
				<el-input v-model="registerForm.shoujihaoma"  placeholder="请输入手机号码" />
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='yisheng'" prop="keshi">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>科室：</div>
                <el-select v-model="registerForm.keshi" placeholder="请选择科室" disabled>
                  <el-option
                      v-for="(item,index) in yishengkeshiOptions"
                      :key="index"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
			</el-form-item>
			<el-form-item :style='{"width":"100%","padding":"0 8%","margin":"0 auto 30px","height":"auto"}' v-if="tableName=='yisheng'" prop="zhicheng">
				<div v-if="false" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>职称：</div>
				<el-input v-model="registerForm.zhicheng" readonly placeholder="请输入职称" />
			</el-form-item>
			<el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"20px 55px 15px","outline":"none","color":"#333","borderRadius":"8px","background":"linear-gradient(25deg, rgba(129,129,130,1) 0%, rgba(255,255,255,1) 60%, rgba(129,129,130,1) 100%)","display":"inline-block","width":"20%","fontSize":"16px","height":"44px"}' type="primary" @click="submitForm('registerForm')">注册</el-button>
			<el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"20px auto 5px","outline":"none","color":"#333","borderRadius":"8px","background":"linear-gradient(25deg, rgba(129,129,130,1) 0%, rgba(255,255,255,1) 60%, rgba(129,129,130,1) 100%)","display":"inline-block","width":"20%","fontSize":"16px","height":"44px"}' @click="resetForm('registerForm')">重置</el-button>
			<router-link :style='{"cursor":"pointer","padding":"0 10%","color":"rgba(159, 159, 159, 1)","textAlign":"right","display":"block","lineHeight":"1","fontSize":"12px","textDecoration":"none"}' to="/login">已有账户登录</router-link>
		</el-form>
    </div>
  </div>
</div>
</template>

<script>

export default {
    //数据集合
    data() {
		return {
            pageFlag : '',
			tableName: '',
			registerForm: {
                xingbie: '',
                xingbie: '',
                keshi: '',
            },
			rules: {},
            huanzhexingbieOptions: [],
            yishengxingbieOptions: [],
            yishengkeshiOptions: [],
		}
    },
	mounted() {
	},
    created() {
      this.pageFlag = this.$route.query.pageFlag;
      this.tableName = this.$route.query.role;
      if ('huanzhe' == this.tableName) {
        this.rules.huanzhezhanghao = [{ required: true, message: '请输入患者账号', trigger: 'blur' }];
      }
      if ('huanzhe' == this.tableName) {
        this.rules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }];
      }
      if ('huanzhe' == this.tableName) {
        this.rules.huanzhexingming = [{ required: true, message: '请输入患者姓名', trigger: 'blur' }];
      }
        this.huanzhexingbieOptions = "男,女".split(',');
      if ('huanzhe' == this.tableName) {
        this.rules.shoujihaoma = [{ required: true, validator: this.$validate.isMobile, trigger: 'blur' }];
      }
      if ('huanzhe' == this.tableName) {
        this.rules.shenfenzhenghao = [{ required: true, validator: this.$validate.isIdCard, trigger: 'blur' }];
      }
      if ('yisheng' == this.tableName) {
        this.rules.yishengzhanghao = [{ required: true, message: '请输入医生账号', trigger: 'blur' }];
      }
      if ('yisheng' == this.tableName) {
        this.rules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }];
      }
      if ('yisheng' == this.tableName) {
        this.rules.yishengxingming = [{ required: true, message: '请输入医生姓名', trigger: 'blur' }];
      }
        this.yishengxingbieOptions = "男,女".split(',');
      if ('yisheng' == this.tableName) {
        this.rules.shoujihaoma = [{ required: true, validator: this.$validate.isMobile, trigger: 'blur' }];
      }
        this.$http({
          url: `option/keshi/keshi`,
          method: "get",
          params: {}
        }).then(({ data }) => {
          if (data && data.code === 0) {
              this.yishengkeshiOptions = data.data;
          }
        });
    },
    //方法集合
    methods: {
      // 获取uuid
      getUUID () {
        return new Date().getTime();
      },
        // 下二随
      huanzhetouxiangUploadChange(fileUrls) {
          this.registerForm.touxiang = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
      },
      yishengtouxiangUploadChange(fileUrls) {
          this.registerForm.touxiang = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
      },

        // 多级联动参数


      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url=this.tableName+"/register";
               if(`huanzhe` == this.tableName && this.registerForm.mima!=this.registerForm.mima2) {
                this.$message.error(`两次密码输入不一致`);
                return
               }
               if(`yisheng` == this.tableName && this.registerForm.mima!=this.registerForm.mima2) {
                this.$message.error(`两次密码输入不一致`);
                return
               }
            this.$http.post(url, this.registerForm).then(res => {
              if (res.data.code === 0) {
                this.$message({
                  message: '注册成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$router.push('/login');
                  }
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

		.el-date-editor.el-input {
			width: 100%;
		}
		
		.rgs-form .el-input /deep/ .el-input__inner {
						border: 0;
						border-radius: 8px;
						padding: 0 10px;
						box-shadow: 0 0 6px rgba(64, 158, 255, .5);
						outline: none;
						color: #333;
						background: linear-gradient(25deg, rgba(129,129,130,0) 0%, rgba(255,255,255,1) 60%, rgba(129,129,130,1) 100%),#fff;
						width: 100%;
						font-size: 14px;
						height: 44px;
					}
		
		.rgs-form .el-select /deep/ .el-input__inner {
						border: 0;
						border-radius: 8px;
						padding: 0 10px;
						box-shadow: 0 0 6px rgba(64, 158, 255, .5);
						outline: none;
						color: #333;
						background: linear-gradient(25deg, rgba(129,129,130,0) 0%, rgba(255,255,255,1) 60%, rgba(129,129,130,1) 100%),#fff;
						width: 288px;
						font-size: 14px;
						height: 44px;
					}
		
		.rgs-form .el-date-editor /deep/ .el-input__inner {
						border: 0;
						border-radius: 8px;
						padding: 0 10px 0 30px;
						box-shadow: 0 0 6px rgba(64, 158, 255, .5);
						outline: none;
						color: #333;
						background: linear-gradient(25deg, rgba(129,129,130,0) 0%, rgba(255,255,255,1) 60%, rgba(129,129,130,1) 100%),#fff;
						width: 288px;
						font-size: 14px;
						height: 44px;
					}
		
		.rgs-form .el-date-editor /deep/ .el-input__inner {
						border: 0;
						border-radius: 8px;
						padding: 0 10px 0 30px;
						box-shadow: 0 0 6px rgba(64, 158, 255, .5);
						outline: none;
						color: #333;
						background: linear-gradient(25deg, rgba(129,129,130,0) 0%, rgba(255,255,255,1) 60%, rgba(129,129,130,1) 100%),#fff;
						width: 288px;
						font-size: 14px;
						height: 44px;
					}
		
		.rgs-form /deep/ .el-upload--picture-card {
			background: transparent;
			border: 0;
			border-radius: 0;
			width: auto;
			height: auto;
			line-height: initial;
			vertical-align: middle;
		}
		
		.rgs-form /deep/ .upload .upload-img {
		  		  border: 0px dashed rgba(64, 158, 255, 1);
		  		  cursor: pointer;
		  		  border-radius: 8px;
		  		  color: #333;
		  		  background: linear-gradient(25deg, rgba(129,129,130,1) 0%, rgba(255,255,255,1) 60%, rgba(129,129,130,1) 100%),#fff;
		  		  width: 80px;
		  		  font-size: 32px;
		  		  line-height: 80px;
		  		  text-align: center;
		  		  height: 80px;
		  		}
		
		.rgs-form /deep/ .el-upload-list .el-upload-list__item {
		  		  border: 0px dashed rgba(64, 158, 255, 1);
		  		  cursor: pointer;
		  		  border-radius: 8px;
		  		  color: #333;
		  		  background: linear-gradient(25deg, rgba(129,129,130,1) 0%, rgba(255,255,255,1) 60%, rgba(129,129,130,1) 100%),#fff;
		  		  width: 80px;
		  		  font-size: 32px;
		  		  line-height: 80px;
		  		  text-align: center;
		  		  height: 80px;
		  		}
		
		.rgs-form /deep/ .el-upload .el-icon-plus {
		  		  border: 0px dashed rgba(64, 158, 255, 1);
		  		  cursor: pointer;
		  		  border-radius: 8px;
		  		  color: #333;
		  		  background: linear-gradient(25deg, rgba(129,129,130,1) 0%, rgba(255,255,255,1) 60%, rgba(129,129,130,1) 100%),#fff;
		  		  width: 80px;
		  		  font-size: 32px;
		  		  line-height: 80px;
		  		  text-align: center;
		  		  height: 80px;
		  		}
	}
</style>
