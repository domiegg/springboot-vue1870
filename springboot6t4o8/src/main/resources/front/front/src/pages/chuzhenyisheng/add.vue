<template>
<div :style='{"width":"100%","padding":"20px 7% 40px","margin":"0px auto","position":"relative","background":"none"}'>
    <el-form
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="110px"
    >
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="医生账号" prop="yishengzhanghao">
            <el-select  @change="yishengzhanghaoChange" v-model="ruleForm.yishengzhanghao" placeholder="请选择医生账号">
              <el-option
                  v-for="(item,index) in yishengzhanghaoOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="头像" v-if="type!='cross' || (type=='cross' && !ro.touxiang)" prop="touxiang">
            <file-upload
            tip="点击上传头像"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
            @change="touxiangUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' class="upload" v-else label="头像" prop="touxiang">
                <img v-if="ruleForm.touxiang.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.touxiang.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.touxiang.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="性别" prop="xingbie">
            <el-input v-model="ruleForm.xingbie" 
                placeholder="性别" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="医生姓名" prop="yishengxingming">
            <el-input v-model="ruleForm.yishengxingming" 
                placeholder="医生姓名" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="职称" prop="zhicheng">
            <el-input v-model="ruleForm.zhicheng" 
                placeholder="职称" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}'  label="科室" prop="keshi">
            <el-select v-model="ruleForm.keshi" placeholder="请选择科室"  >
              <el-option
                  v-for="(item,index) in keshiOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}'  label="挂号类型" prop="guahaoleixing">
            <el-select v-model="ruleForm.guahaoleixing" placeholder="请选择挂号类型"  >
              <el-option
                  v-for="(item,index) in guahaoleixingOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="挂号数" prop="guahaoshu">
            <el-input v-model="ruleForm.guahaoshu" 
                placeholder="挂号数" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="挂号费" prop="guahaofei">
            <el-input v-model="ruleForm.guahaofei" 
                placeholder="挂号费" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="上班时间" prop="shangbanshijian">
            <el-input v-model="ruleForm.shangbanshijian" 
                placeholder="上班时间" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="出诊日期" prop="chuzhenriqi" >
              <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="ruleForm.chuzhenriqi" 
                  type="date"
                  placeholder="出诊日期">
              </el-date-picker> 
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
            yishengzhanghao : false,
            touxiang : false,
            xingbie : false,
            yishengxingming : false,
            zhicheng : false,
            keshi : false,
            guahaoleixing : false,
            guahaoshu : false,
            guahaofei : false,
            shangbanshijian : false,
            chuzhenriqi : false,
            clicktime : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          yishengzhanghao: '',
          touxiang: '',
          xingbie: '',
          yishengxingming: '',
          zhicheng: '',
          keshi: '',
          guahaoleixing: '',
          guahaoshu: '',
          guahaofei: '',
          shangbanshijian: '',
          chuzhenriqi: '',
          clicktime: '',
        },
        yishengzhanghaoOptions: [],
        keshiOptions: [],
        guahaoleixingOptions: [],
        rules: {
          yishengzhanghao: [
            { required: true, message: '医生账号不能为空', trigger: 'blur' },
          ],
          touxiang: [
          ],
          xingbie: [
          ],
          yishengxingming: [
            { required: true, message: '医生姓名不能为空', trigger: 'blur' },
          ],
          zhicheng: [
          ],
          keshi: [
            { required: true, message: '科室不能为空', trigger: 'blur' },
          ],
          guahaoleixing: [
            { required: true, message: '挂号类型不能为空', trigger: 'blur' },
          ],
          guahaoshu: [
            { required: true, message: '挂号数不能为空', trigger: 'blur' },
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          guahaofei: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          shangbanshijian: [
          ],
          chuzhenriqi: [
          ],
          clicktime: [
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
            if(o=='yishengzhanghao'){
              this.ruleForm.yishengzhanghao = obj[o];
              this.ro.yishengzhanghao = true;
              continue;
            }
            if(o=='touxiang'){
              this.ruleForm.touxiang = obj[o].split(",")[0];
              this.ro.touxiang = true;
              continue;
            }
            if(o=='xingbie'){
              this.ruleForm.xingbie = obj[o];
              this.ro.xingbie = true;
              continue;
            }
            if(o=='yishengxingming'){
              this.ruleForm.yishengxingming = obj[o];
              this.ro.yishengxingming = true;
              continue;
            }
            if(o=='zhicheng'){
              this.ruleForm.zhicheng = obj[o];
              this.ro.zhicheng = true;
              continue;
            }
            if(o=='keshi'){
              this.ruleForm.keshi = obj[o];
              this.ro.keshi = true;
              continue;
            }
            if(o=='guahaoleixing'){
              this.ruleForm.guahaoleixing = obj[o];
              this.ro.guahaoleixing = true;
              continue;
            }
            if(o=='guahaoshu'){
              this.ruleForm.guahaoshu = obj[o];
              this.ro.guahaoshu = true;
              continue;
            }
            if(o=='guahaofei'){
              this.ruleForm.guahaofei = obj[o];
              this.ro.guahaofei = true;
              continue;
            }
            if(o=='shangbanshijian'){
              this.ruleForm.shangbanshijian = obj[o];
              this.ro.shangbanshijian = true;
              continue;
            }
            if(o=='chuzhenriqi'){
              this.ruleForm.chuzhenriqi = obj[o];
              this.ro.chuzhenriqi = true;
              continue;
            }
            if(o=='clicktime'){
              this.ruleForm.clicktime = obj[o];
              this.ro.clicktime = true;
              continue;
            }
          }
        }
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
          }
        });
        this.$http.get('option/yisheng/yishengzhanghao', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.yishengzhanghaoOptions = res.data.data;
          }
        });
        this.$http.get('option/keshi/keshi', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.keshiOptions = res.data.data;
          }
        });
        this.guahaoleixingOptions = "普通号,专家号".split(',')
      },
      // 下二随
      yishengzhanghaoChange () {
        this.$http.get('follow/yisheng/yishengzhanghao?columnValue=' + this.ruleForm.yishengzhanghao, {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            if(res.data.data.xingbie){
              this.ruleForm.xingbie = res.data.data.xingbie
            }
            if(res.data.data.yishengxingming){
              this.ruleForm.yishengxingming = res.data.data.yishengxingming
            }
            if(res.data.data.zhicheng){
              this.ruleForm.zhicheng = res.data.data.zhicheng
            }
          }
        });
      },

    // 多级联动参数
      // 多级联动参数
      info(id) {
        this.$http.get('chuzhenyisheng/detail/${id}', {emulateJSON: true}).then(res => {
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
                 this.$http.get('chuzhenyisheng/list', {
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


                          this.$http.post('chuzhenyisheng/add', this.ruleForm).then(res => {
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


                  this.$http.post('chuzhenyisheng/add', this.ruleForm).then(res => {
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
      touxiangUploadChange(fileUrls) {
          this.ruleForm.touxiang = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
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
