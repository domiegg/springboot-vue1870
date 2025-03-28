<template>
<div :style='{"width":"100%","padding":"20px 7% 40px","margin":"0px auto","position":"relative","background":"none"}'>
    <el-form
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="110px"
    >
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="病历编号" prop="binglibianhao">
              <el-input v-model="ruleForm.binglibianhao" placeholder="病历编号" readonly></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="患者账号" prop="huanzhezhanghao">
            <el-input v-model="ruleForm.huanzhezhanghao" 
                placeholder="患者账号" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="患者姓名" prop="huanzhexingming">
            <el-input v-model="ruleForm.huanzhexingming" 
                placeholder="患者姓名" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="病例报告" prop="binglibaogao">
            <file-upload
            tip="点击上传病例报告"
            action="file/upload"
            :limit="1"
            :multiple="true"
            :fileUrls="ruleForm.binglibaogao?ruleForm.binglibaogao:''"
            @change="binglibaogaoUploadChange"
            ></file-upload>
          </el-form-item>  
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="就诊时间" prop="jiuzhenshijian" >
              <el-date-picker
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="ruleForm.jiuzhenshijian" 
                  type="datetime"
                  placeholder="就诊时间">
              </el-date-picker>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="医生账号" prop="yishengzhanghao">
            <el-input v-model="ruleForm.yishengzhanghao" 
                placeholder="医生账号" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="医生姓名" prop="yishengxingming">
            <el-input v-model="ruleForm.yishengxingming" 
                placeholder="医生姓名" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="诊断内容" prop="zhenduanneirong">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="诊断内容"
              v-model="ruleForm.zhenduanneirong">
            </el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="诊断结果" prop="zhenduanjieguo">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="诊断结果"
              v-model="ruleForm.zhenduanjieguo">
            </el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="病历描述" prop="binglimiaoshu">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="病历描述"
              v-model="ruleForm.binglimiaoshu">
            </el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="医嘱信息" prop="yizhuxinxi">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="医嘱信息"
              v-model="ruleForm.yizhuxinxi">
            </el-input>
          </el-form-item>

      <el-form-item :style='{"padding":"0","textAlign":"center","margin":"0"}'>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"#000000","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'  type="primary" @click="onSubmit">提交</el-button>
        <el-button :style='{"border":"0px solid rgba(64, 158, 255, 1)","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#fff","borderRadius":"4px","background":"#aaaaaa","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        baseUrl: '',
        ro:{
            binglibianhao : false,
            huanzhezhanghao : false,
            huanzhexingming : false,
            zhenduanneirong : false,
            zhenduanjieguo : false,
            binglimiaoshu : false,
            yizhuxinxi : false,
            binglibaogao : false,
            jiuzhenshijian : false,
            yishengzhanghao : false,
            yishengxingming : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          binglibianhao: this.getUUID(),
          huanzhezhanghao: '',
          huanzhexingming: '',
          zhenduanneirong: '',
          zhenduanjieguo: '',
          binglimiaoshu: '',
          yizhuxinxi: '',
          binglibaogao: '',
          jiuzhenshijian: '',
          yishengzhanghao: '',
          yishengxingming: '',
        },
        rules: {
          binglibianhao: [
          ],
          huanzhezhanghao: [
          ],
          huanzhexingming: [
          ],
          zhenduanneirong: [
            { required: true, message: '诊断内容不能为空', trigger: 'blur' },
          ],
          zhenduanjieguo: [
            { required: true, message: '诊断结果不能为空', trigger: 'blur' },
          ],
          binglimiaoshu: [
            { required: true, message: '病历描述不能为空', trigger: 'blur' },
          ],
          yizhuxinxi: [
            { required: true, message: '医嘱信息不能为空', trigger: 'blur' },
          ],
          binglibaogao: [
            { required: true, message: '病例报告不能为空', trigger: 'blur' },
          ],
          jiuzhenshijian: [
          ],
          yishengzhanghao: [
          ],
          yishengxingming: [
          ],
        },
      };
    },
    computed: {



    },
    created() {
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
      this.ruleForm.jiuzhenshijian = this.getCurDateTime()
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 下载
      download(file){
        window.open(`${file}`)
      },
      // 初始化
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
          for (var o in obj){
            if(o=='binglibianhao'){
              this.ruleForm.binglibianhao = obj[o];
              this.ro.binglibianhao = true;
              continue;
            }
            if(o=='huanzhezhanghao'){
              this.ruleForm.huanzhezhanghao = obj[o];
              this.ro.huanzhezhanghao = true;
              continue;
            }
            if(o=='huanzhexingming'){
              this.ruleForm.huanzhexingming = obj[o];
              this.ro.huanzhexingming = true;
              continue;
            }
            if(o=='zhenduanneirong'){
              this.ruleForm.zhenduanneirong = obj[o];
              this.ro.zhenduanneirong = true;
              continue;
            }
            if(o=='zhenduanjieguo'){
              this.ruleForm.zhenduanjieguo = obj[o];
              this.ro.zhenduanjieguo = true;
              continue;
            }
            if(o=='binglimiaoshu'){
              this.ruleForm.binglimiaoshu = obj[o];
              this.ro.binglimiaoshu = true;
              continue;
            }
            if(o=='yizhuxinxi'){
              this.ruleForm.yizhuxinxi = obj[o];
              this.ro.yizhuxinxi = true;
              continue;
            }
            if(o=='binglibaogao'){
              this.ruleForm.binglibaogao = obj[o];
              this.ro.binglibaogao = true;
              continue;
            }
            if(o=='jiuzhenshijian'){
              this.ruleForm.jiuzhenshijian = obj[o];
              this.ro.jiuzhenshijian = true;
              continue;
            }
            if(o=='yishengzhanghao'){
              this.ruleForm.yishengzhanghao = obj[o];
              this.ro.yishengzhanghao = true;
              continue;
            }
            if(o=='yishengxingming'){
              this.ruleForm.yishengxingming = obj[o];
              this.ro.yishengxingming = true;
              continue;
            }
          }
        }
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
            if((json.yishengzhanghao!=''&&json.yishengzhanghao) || json.yishengzhanghao==0){
                this.ruleForm.yishengzhanghao = json.yishengzhanghao
            }
            if((json.yishengxingming!=''&&json.yishengxingming) || json.yishengxingming==0){
                this.ruleForm.yishengxingming = json.yishengxingming
            }
          }
        });
      },

    // 多级联动参数
      // 多级联动参数
      info(id) {
        this.$http.get('binglixinxi/detail/${id}', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {

        //更新跨表属性
        var crossuserid;
        var crossrefid;
        var crossoptnum;
        this.$refs["ruleForm"].validate(valid => {
          if(valid) {
            if(this.type=='cross'){
                 var statusColumnName = localStorage.getItem('statusColumnName');
                 var statusColumnValue = localStorage.getItem('statusColumnValue');
                 if(statusColumnName && statusColumnName!='') {
                     var obj = JSON.parse(localStorage.getItem('crossObj'));
                     if(!statusColumnName.startsWith("[")) {
                         for (var o in obj){
                             if(o==statusColumnName){
                                 obj[o] = statusColumnValue;
                             }
                         }
                         var table = localStorage.getItem('crossTable');
                         this.$http.post(table+'/update', obj).then(res => {});
                     } else {
                            crossuserid=Number(localStorage.getItem('userid'));
                            crossrefid=obj['id'];
                            crossoptnum=localStorage.getItem('statusColumnName');
                            crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                     }
                 }
            }
            if(crossrefid && crossuserid) {
                 this.ruleForm.crossuserid=crossuserid;
                 this.ruleForm.crossrefid=crossrefid;
                 var params = {
                     page: 1,
                     limit: 10,
                     crossuserid:crossuserid,
                     crossrefid:crossrefid,
                 }
                 this.$http.get('binglixinxi/list', {
                  params: params
                 }).then(res => {
                     if(res.data.data.total>=crossoptnum) {
                         this.$message({
                          message: localStorage.getItem('tips'),
                          type: 'success',
                          duration: 1500,
                         });
                          return false;
                     } else {
                         // 跨表计算


                          this.$http.post('binglixinxi/add', this.ruleForm).then(res => {
                              if (res.data.code == 0) {
                                  this.$message({
                                      message: '操作成功',
                                      type: 'success',
                                      duration: 1500,
                                      onClose: () => {
                                          this.$router.go(-1);
                                      }
                                  });
                              } else {
                                  this.$message({
                                      message: res.data.msg,
                                      type: 'error',
                                      duration: 1500
                                  });
                              }
                          });
                     }
                 });
             } else {


                  this.$http.post('binglixinxi/add', this.ruleForm).then(res => {
                     if (res.data.code == 0) {
                          this.$message({
                              message: '操作成功',
                              type: 'success',
                              duration: 1500,
                              onClose: () => {
                                  this.$router.go(-1);
                              }
                          });
                      } else {
                          this.$message({
                              message: res.data.msg,
                              type: 'error',
                              duration: 1500
                          });
                      }
                  });
             }
          }
        });
      },
      // 获取uuid
      getUUID () {
        return new Date().getTime();
      },
      // 返回
      back() {
        this.$router.go(-1);
      },
      binglibaogaoUploadChange(fileUrls) {
          this.ruleForm.binglibaogao = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #666;
	  font-weight: 500;
	  width: 110px;
	  font-size: 14px;
	  line-height: 40px;
	  text-align: right;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 110px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  padding: 0 12px;
	  outline: none;
	  color: #333;
	  width: 400px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  padding: 0 10px;
	  outline: none;
	  color: #333;
	  width: 200px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  padding: 0 10px 0 30px;
	  outline: none;
	  color: #333;
	  width: 200px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  border: 1px solid #ccc;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #333;
	  width: 100px;
	  font-size: 32px;
	  line-height: 100px;
	  text-align: center;
	  height: 100px;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  border: 1px solid #ccc;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #333;
	  width: 100px;
	  font-size: 32px;
	  line-height: 100px;
	  text-align: center;
	  height: 100px;
	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  border: 1px solid #ccc;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #333;
	  width: 100px;
	  font-size: 32px;
	  line-height: 100px;
	  text-align: center;
	  height: 100px;
	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  padding: 12px;
	  outline: none;
	  color: #333;
	  width: 400px;
	  font-size: 14px;
	  height: 120px;
	}
</style>
