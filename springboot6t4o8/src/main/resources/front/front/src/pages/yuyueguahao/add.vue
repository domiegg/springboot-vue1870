<template>
<div :style='{"width":"100%","padding":"20px 7% 40px","margin":"0px auto","position":"relative","background":"none"}'>
    <el-form
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="110px"
    >
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="预约编号" prop="yuyuebianhao">
              <el-input v-model="ruleForm.yuyuebianhao" placeholder="预约编号" readonly></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="医生账号" prop="yishengzhanghao">
            <el-input v-model="ruleForm.yishengzhanghao" 
                placeholder="医生账号" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="医生姓名" prop="yishengxingming">
            <el-input v-model="ruleForm.yishengxingming" 
                placeholder="医生姓名" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="职称" prop="zhicheng">
            <el-input v-model="ruleForm.zhicheng" 
                placeholder="职称" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="科室" prop="keshi">
            <el-input v-model="ruleForm.keshi" 
                placeholder="科室" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="挂号类型" prop="guahaoleixing">
            <el-input v-model="ruleForm.guahaoleixing" 
                placeholder="挂号类型" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="挂号费" prop="guahaofei">
            <el-input v-model="ruleForm.guahaofei" 
                placeholder="挂号费" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}'  label="挂号数" prop="guahaoshu">
            <el-select v-model="ruleForm.guahaoshu" placeholder="请选择挂号数"  >
              <el-option
                  v-for="(item,index) in guahaoshuOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="出诊日期" prop="chuzhenriqi">
            <el-input v-model="ruleForm.chuzhenriqi" 
                placeholder="出诊日期" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="预约时间" prop="yuyueshijian" >
              <el-date-picker
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="ruleForm.yuyueshijian" 
                  type="datetime"
                  placeholder="预约时间">
              </el-date-picker>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="患者账号" prop="huanzhezhanghao">
            <el-input v-model="ruleForm.huanzhezhanghao" 
                placeholder="患者账号" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="患者姓名" prop="huanzhexingming">
            <el-input v-model="ruleForm.huanzhexingming" 
                placeholder="患者姓名" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px 0"}' label="手机号码" prop="shoujihaoma">
            <el-input v-model="ruleForm.shoujihaoma" 
                placeholder="手机号码" clearable ></el-input>
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
            yuyuebianhao : false,
            yishengzhanghao : false,
            yishengxingming : false,
            zhicheng : false,
            keshi : false,
            guahaoleixing : false,
            guahaofei : false,
            guahaoshu : false,
            chuzhenriqi : false,
            yuyueshijian : false,
            huanzhezhanghao : false,
            huanzhexingming : false,
            shoujihaoma : false,
            sfsh : false,
            shhf : false,
            ispay : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          yuyuebianhao: this.getUUID(),
          yishengzhanghao: '',
          yishengxingming: '',
          zhicheng: '',
          keshi: '',
          guahaoleixing: '',
          guahaofei: '',
          guahaoshu: '1',
          chuzhenriqi: '',
          yuyueshijian: '',
          huanzhezhanghao: '',
          huanzhexingming: '',
          shoujihaoma: '',
          ispay: '',
        },
        guahaoshuOptions: [],
        rules: {
          yuyuebianhao: [
          ],
          yishengzhanghao: [
          ],
          yishengxingming: [
          ],
          zhicheng: [
          ],
          keshi: [
          ],
          guahaoleixing: [
          ],
          guahaofei: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          guahaoshu: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          chuzhenriqi: [
          ],
          yuyueshijian: [
            { required: true, message: '预约时间不能为空', trigger: 'blur' },
          ],
          huanzhezhanghao: [
          ],
          huanzhexingming: [
          ],
          shoujihaoma: [
          ],
          sfsh: [
          ],
          shhf: [
          ],
          ispay: [
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
            if(o=='yuyuebianhao'){
              this.ruleForm.yuyuebianhao = obj[o];
              this.ro.yuyuebianhao = true;
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
            if(o=='guahaofei'){
              this.ruleForm.guahaofei = obj[o];
              this.ro.guahaofei = true;
              continue;
            }
            if(o=='guahaoshu'){
              this.ruleForm.guahaoshu = obj[o];
              this.ro.guahaoshu = true;
              continue;
            }
            if(o=='chuzhenriqi'){
              this.ruleForm.chuzhenriqi = obj[o];
              this.ro.chuzhenriqi = true;
              continue;
            }
            if(o=='yuyueshijian'){
              this.ruleForm.yuyueshijian = obj[o];
              this.ro.yuyueshijian = true;
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
            if(o=='shoujihaoma'){
              this.ruleForm.shoujihaoma = obj[o];
              this.ro.shoujihaoma = true;
              continue;
            }
          }
          this.ruleForm.guahaoshu = 0
        }
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
            if((json.huanzhezhanghao!=''&&json.huanzhezhanghao) || json.huanzhezhanghao==0){
                this.ruleForm.huanzhezhanghao = json.huanzhezhanghao
            }
            if((json.huanzhexingming!=''&&json.huanzhexingming) || json.huanzhexingming==0){
                this.ruleForm.huanzhexingming = json.huanzhexingming
            }
            if((json.shoujihaoma!=''&&json.shoujihaoma) || json.shoujihaoma==0){
                this.ruleForm.shoujihaoma = json.shoujihaoma
            }
          }
        });
        this.guahaoshuOptions = "1".split(',')
      },

    // 多级联动参数
      // 多级联动参数
      info(id) {
        this.$http.get('yuyueguahao/detail/${id}', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {

        var obj = JSON.parse(localStorage.getItem('crossObj'));
        var table = localStorage.getItem('crossTable');
        obj.guahaoshu = obj.guahaoshu - this.ruleForm.guahaoshu
        if(obj.guahaoshu<0){
          this.$message.error("挂号数不足");
          return
        }
      
        //this.$http.post(table+`/update`, obj).then(res => {});
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
                 this.$http.get('yuyueguahao/list', {
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
                          var obj = JSON.parse(localStorage.getItem('crossObj'));
                          var table = localStorage.getItem('crossTable');

                          obj.guahaoshu = parseFloat(obj.guahaoshu) - parseFloat(this.ruleForm.guahaoshu)

                          this.$http.post(table+`/update`,obj).then(res => {});
                          this.$http.post('yuyueguahao/add', this.ruleForm).then(res => {
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
                  var obj = JSON.parse(localStorage.getItem('crossObj'));
                  var table = localStorage.getItem('crossTable');

                  obj.guahaoshu = parseFloat(obj.guahaoshu) - parseFloat(this.ruleForm.guahaoshu)

                  this.$http.post(table+`/update`,obj).then(res => {});
                  this.$http.post('yuyueguahao/add', this.ruleForm).then(res => {
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
