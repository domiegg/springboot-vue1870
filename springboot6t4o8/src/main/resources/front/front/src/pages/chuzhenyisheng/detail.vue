<template>
<div>
	<div :style='{"width":"100%","padding":"0px 7%","boxShadow":"0 1px 0 #ccc","margin":"0px auto 0px","borderRadius":"0","background":"#fff"}' class="breadcrumb-preview">
		<el-breadcrumb :separator="'Ξ'" :style='{"fontSize":"14px","lineHeight":"60px"}'>
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in breadcrumbItem" :key="index">{{item.name}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	
	<div class="detail-preview" :style='{"padding":"30px 0 40px","margin":"0px auto 0","alignItems":"flex-start","flexWrap":"wrap","background":"none","display":"flex","width":"100%","position":"relative","justifyContent":"space-between"}'>
		<div class="attr" :style='{"padding":"0","flexWrap":"wrap","background":"none","display":"flex","width":"100%","position":"relative","justifyContent":"space-between"}'>
			<el-carousel :style='{"width":"100%","padding":"0","margin":"0px 7%","background":"none","height":"400px","order":"1"}' trigger="click" indicator-position="inside" arrow="always" type="card" direction="horizontal" height="400px" autoplay="true" interval="6000" loop="true">
				<el-carousel-item :style='{"borderRadius":"0","width":"50%","height":"100%"}' v-for="item in detailBanner" :key="item.id">
					<el-image :style='{"objectFit":"cover","width":"100%","height":"100%"}' v-if="item.substr(0,4)=='http'" :src="item" fit="cover" class="image"></el-image>
					<el-image :style='{"objectFit":"cover","width":"100%","height":"100%"}' v-else :src="baseUrl + item" fit="cover" class="image"></el-image>
				</el-carousel-item>
			</el-carousel>
	
			
			<div class="info" :style='{"minHeight":"500px","padding":"20px 0 20px 0","margin":"0px 7% 0px 7%","background":"none","flex":"1","width":"calc(86% - 320px)","order":"1"}'>
				<div class="item" :style='{"padding":"10px 20px 10px 50px","margin":"0 0 10px 0","alignItems":"center","background":"none","justifyContent":"space-between","display":"flex"}'>
					<div :style='{"color":"#333","fontSize":"20px","fontWeight":"600"}'>
                    {{detail.yishengxingming}}
                    </div>
					<div @click="storeup(1)" v-show="!isStoreup" :style='{"borderRadius":"20px","padding":"8px 10px","background":"#fff"}'><i v-if="true" :style='{"color":"#fb7e04","fontSize":"14px"}' class="el-icon-star-off"></i><span :style='{"color":"#fb7e04","fontSize":"14px"}'>点我收藏</span></div>
					<div @click="storeup(-1)" v-show="isStoreup" :style='{"borderRadius":"20px","padding":"8px 10px","background":"#fff"}'><i v-if="true" :style='{"color":"#fb7e04","fontSize":"14px"}' class="el-icon-star-on"></i><span :style='{"color":"#fb7e04","fontSize":"14px"}'>取消收藏</span></div>
				</div>

				<div class="item" :style='{"padding":"0px","boxShadow":"0 1px 0 #ccc","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#333","textAlign":"right","width":"112px","fontSize":"14px","lineHeight":"40px","height":"40px"}'>医生账号</div>
					<div  :style='{"width":"100%","padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#999"}'>{{detail.yishengzhanghao}}</div>
				</div>
				<div class="item" :style='{"padding":"0px","boxShadow":"0 1px 0 #ccc","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#333","textAlign":"right","width":"112px","fontSize":"14px","lineHeight":"40px","height":"40px"}'>性别</div>
					<div  :style='{"width":"100%","padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#999"}'>{{detail.xingbie}}</div>
				</div>
				<div class="item" :style='{"padding":"0px","boxShadow":"0 1px 0 #ccc","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#333","textAlign":"right","width":"112px","fontSize":"14px","lineHeight":"40px","height":"40px"}'>医生姓名</div>
					<div  :style='{"width":"100%","padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#999"}'>{{detail.yishengxingming}}</div>
				</div>
				<div class="item" :style='{"padding":"0px","boxShadow":"0 1px 0 #ccc","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#333","textAlign":"right","width":"112px","fontSize":"14px","lineHeight":"40px","height":"40px"}'>职称</div>
					<div  :style='{"width":"100%","padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#999"}'>{{detail.zhicheng}}</div>
				</div>
				<div class="item" :style='{"padding":"0px","boxShadow":"0 1px 0 #ccc","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#333","textAlign":"right","width":"112px","fontSize":"14px","lineHeight":"40px","height":"40px"}'>科室</div>
					<div  :style='{"width":"100%","padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#999"}'>{{detail.keshi}}</div>
				</div>
				<div class="item" :style='{"padding":"0px","boxShadow":"0 1px 0 #ccc","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#333","textAlign":"right","width":"112px","fontSize":"14px","lineHeight":"40px","height":"40px"}'>挂号类型</div>
					<div  :style='{"width":"100%","padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#999"}'>{{detail.guahaoleixing}}</div>
				</div>
				<div class="item" :style='{"padding":"0px","boxShadow":"0 1px 0 #ccc","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#333","textAlign":"right","width":"112px","fontSize":"14px","lineHeight":"40px","height":"40px"}'>挂号数</div>
					<div  :style='{"width":"100%","padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#999"}'>{{detail.guahaoshu}}</div>
				</div>
				<div class="item" :style='{"padding":"0px","boxShadow":"0 1px 0 #ccc","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#333","textAlign":"right","width":"112px","fontSize":"14px","lineHeight":"40px","height":"40px"}'>挂号费</div>
					<div  :style='{"width":"100%","padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#999"}'>{{detail.guahaofei}}</div>
				</div>
				<div class="item" :style='{"padding":"0px","boxShadow":"0 1px 0 #ccc","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#333","textAlign":"right","width":"112px","fontSize":"14px","lineHeight":"40px","height":"40px"}'>上班时间</div>
					<div  :style='{"width":"100%","padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#999"}'>{{detail.shangbanshijian}}</div>
				</div>
				<div class="item" :style='{"padding":"0px","boxShadow":"0 1px 0 #ccc","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#333","textAlign":"right","width":"112px","fontSize":"14px","lineHeight":"40px","height":"40px"}'>出诊日期</div>
					<div  :style='{"width":"100%","padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#999"}'>{{detail.chuzhenriqi}}</div>
				</div>
				<div class="btn" :style='{"padding":"10px 0","flexWrap":"wrap","display":"flex"}'>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"0 5px 0 0","outline":"none","color":"#fff","borderRadius":"4px","background":"rgba(64, 158, 255, 1)","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' v-if="isAuth('chuzhenyisheng','预约挂号')" @click="onAcross('yuyueguahao','','','')" type="warning">预约挂号</el-button>
				</div>
			</div>
			
		</div>
		
		
		<el-tabs class="detail" :style='{"border":"0","margin":"60px 7% 0 7%","background":"#fff","flex":"1","width":"50%","float":"right","order":"10"}' v-model="activeName" type="border-card">
		</el-tabs>
	</div>
</div>
</template>

<script>
  import CountDown from '@/components/CountDown';
  export default {
    //数据集合
    data() {
      return {
        tablename: 'chuzhenyisheng',
        baseUrl: '',
        breadcrumbItem: [
          {
            name: '详情信息'
          }
        ],
        title: '',
        detailBanner: [],
        endTime: 0,
        detail: {},
        activeName: 'first',
        total: 1,
        pageSize: 5,
		pageSizes: [10,20,30,50],
        totalPage: 1,
        rules: {
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ]
        },
        storeupParams: {
          name: '',
          picture: '',
          refid: 0,
          tablename: 'chuzhenyisheng',
          userid: localStorage.getItem('userid')
        },
        isStoreup: false,
        storeupInfo: {},
        buynumber: 1,
      }
    },
    created() {
        this.init();
    },
    //方法集合
    methods: {
        init() {
          this.baseUrl = this.$config.baseUrl;
          if(this.$route.query.detailObj) {
            this.detail = JSON.parse(this.$route.query.detailObj);
          }
          if(this.$route.query.storeupObj) {
            this.detail.id = JSON.parse(this.$route.query.storeupObj).refid;
          }
          this.$http.get(this.tablename + '/detail/'  + this.detail.id, {}).then(res => {
            if (res.data.code == 0) {
              this.detail = res.data.data;
              this.detailBanner = this.detail.touxiang ? this.detail.touxiang.split(",") : [];
              this.title = this.detail.yishengxingming;
              this.$forceUpdate();
            }
          });

          this.getStoreupStatus();

        },
      onAcross(acrossTable,crossOptAudit,statusColumnName,tips,statusColumnValue){
        localStorage.setItem('crossTable',`chuzhenyisheng`);
        localStorage.setItem('crossObj', JSON.stringify(this.detail));
        localStorage.setItem('statusColumnName',statusColumnName);
        localStorage.setItem('statusColumnValue',statusColumnValue);
        localStorage.setItem('tips',tips);
        if(statusColumnName!=''&&!statusColumnName.startsWith("[")) {
            var obj = JSON.parse(localStorage.getItem('crossObj'));
            for (var o in obj){
                if(o==statusColumnName && obj[o]==statusColumnValue){
                    this.$message({
                        type: 'success',
                        message: tips,
                        duration: 1500
                    });
                    return
                }
            }
        }
        this.$router.push({path: '/index/' + acrossTable + 'Add', query: {type: 'cross'}});
      },
      storeup(type) {
        if (type == 1 && !this.isStoreup) {
          this.storeupParams.name = this.title;
          this.storeupParams.picture = this.detailBanner[0];
          this.storeupParams.inteltype = this.detail.keshi;
          this.storeupParams.refid = this.detail.id;
          this.storeupParams.type = type;
          this.$http.post('storeup/add', this.storeupParams).then(res => {
            if (res.data.code == 0) {
              this.isStoreup = true;
              this.$message({
                type: 'success',
                message: '收藏成功!',
                duration: 1500,
              });
            }
          });
        }
        if (type == -1 && this.isStoreup) {
          this.$http.get('storeup/list', {params: {page: 1, limit: 1, type: 1, refid: this.detail.id, tablename: 'chuzhenyisheng', userid: localStorage.getItem('userid')}}).then(res => {
            if (res.data.code == 0 && res.data.data.list.length > 0) {
              this.isStoreup = true;
              this.storeupInfo = res.data.data.list[0];
              let delIds = new Array();
              delIds.push(this.storeupInfo.id);
              this.$http.post('storeup/delete', delIds).then(res => {
                if (res.data.code == 0) {
                  this.isStoreup = false;
                  this.$message({
                    type: 'success',
                    message: '取消成功!',
                    duration: 1500,
                  });
                }
              });
            }
          });
        }
      },
      getStoreupStatus(){
        if(localStorage.getItem("Token")) {
            this.$http.get('storeup/list', {params: {page: 1, limit: 1, type: 1, refid: this.detail.id, tablename: 'chuzhenyisheng', userid: localStorage.getItem('userid')}}).then(res => {
              if (res.data.code == 0 && res.data.data.list.length > 0) {
                this.isStoreup = true;
                this.storeupInfo = res.data.data.list[0];
              }
            });
        }
      },
      curChange(page) {
        this.getDiscussList(page);
      },
      prevClick(page) {
        this.getDiscussList(page);
      },
      nextClick(page) {
        this.getDiscussList(page);
      },
      // 下载
      download(file){
        if(!file) {
            this.$message({
              type: 'error',
              message: '文件不存在',
              duration: 1500,
            });
            return;
        }
        window.open(this.baseUrl+file)
      },


    },
    components: {
      CountDown
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.detail-preview {
	
	  .attr {
	    .el-carousel /deep/ .el-carousel__indicator button {
	      width: 0;
	      height: 0;
	      display: none;
	    }
	
	    .el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled), .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled) {
	      border-color: none;
	    }
	  }
	
	  .detail {
	    & /deep/ .el-tabs__header .el-tabs__nav-wrap {
	      margin-bottom: 0;
	    }
	
	    & .add .el-textarea {
	      width: auto;
	    }
	  }
	}
	
	.attr .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.attr .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left:hover {
		background: red;
	}
	
	.attr .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.attr .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right:hover {
		background: red;
	}

	.attr .el-carousel /deep/ .el-carousel__indicators {
		padding: 0;
		margin: 0 auto;
		z-index: 2;
		position: absolute;
		list-style: none;
	}
	
	.attr .el-carousel /deep/ .el-carousel__indicators li {
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
	
	.attr .el-carousel /deep/ .el-carousel__indicators li:hover {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 24px;
		opacity: 0.7;
		height: 12px;
	}
	
	.attr .el-carousel /deep/ .el-carousel__indicators li.is-active {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 24px;
		opacity: 1;
		height: 12px;
	}
	
	.attr .el-input-number /deep/ .el-input-number__decrease {
		cursor: pointer;
		z-index: 1;
		display: flex;
		border-color: #DCDFE6;
		border-radius: 4px 0 0 4px;
		top: 1px;
		left: 1px;
		background: #f5f5f5;
		width: 40px;
		justify-content: center;
		border-width: 0 1px 0 0;
		align-items: center;
		position: absolute;
		border-style: solid;
		text-align: center;
		height: 38px;
	}
	
	.attr .el-input-number /deep/ .el-input-number__decrease i {
		color: #666;
		font-size: 14px;
	}

	.attr .el-input-number /deep/ .el-input-number__increase {
		cursor: pointer;
		z-index: 1;
		display: flex;
		border-color: #DCDFE6;
		right: 1px;
		border-radius: 0 4px 4px 0;
		top: 1px;
		background: #f5f5f5;
		width: 40px;
		justify-content: center;
		border-width: 0 0 0 1px;
		align-items: center;
		position: absolute;
		border-style: solid;
		text-align: center;
		height: 38px;
	}
	
	.attr .el-input-number /deep/ .el-input-number__increase i {
		color: #666;
		font-size: 14px;
	}
	
	.attr .el-input-number /deep/ .el-input .el-input__inner {
		border: 1px solid #DCDFE6;
		border-radius: 4px;
		padding: 0 40px;
		outline: none;
		color: #666;
		background: #FFF;
		display: inline-block;
		width: 100%;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		height: 40px;
	}
	
	.detail-preview .detail.el-tabs /deep/ .el-tabs__header {
		margin: 0;
		background: #fff;
		border-color: #E4E7ED;
		border-width: 0;
		border-style: solid;
		height: 50px;
	}
	
	.detail-preview .detail.el-tabs /deep/ .el-tabs__header .el-tabs__item {
		border: 0;
		padding: 0 20px;
		margin: 0px 10px 0 0;
		color: #fff;
		font-weight: 500;
		display: inline-block;
		font-size: 14px;
		line-height: 40px;
		background: #000;
		width: auto;
		position: relative;
		list-style: none;
		text-align: center;
		height: 40px;
	}
	
	.detail-preview .detail.el-tabs /deep/ .el-tabs__header .el-tabs__item:hover {
		border: 0;
		padding: 0 20px;
		margin: 0px 10px 0 0;
		color: #fff;
		background: #aaa;
		width: auto;
		height: 40px;
	}
	
	.detail-preview .detail.el-tabs /deep/ .el-tabs__header .el-tabs__item.is-active {
		border: 0;
		color: #fff;
		background: #aaa;
	}
	
	.detail-preview .detail.el-tabs /deep/ .el-tabs__content {
		padding: 15px;
	}
	
	.detail-preview .detail.el-tabs .add /deep/ .el-form-item__label {
		padding: 0 10px 0 0;
		color: #666;
		width: 80px;
		font-size: 14px;
		line-height: 40px;
		text-align: right;
	}
	
	.detail-preview .detail.el-tabs .add /deep/ .el-textarea__inner {
		border: 1px solid #ddd;
		border-radius: 0px;
		padding: 15px;
		box-shadow: inset 0px 0px 0px 0px #c5f1c0;
		outline: none;
		color: #333;
		width: 1058px;
		font-size: 14px;
		min-height: 150px;
		line-height: 32px;
	}
	
	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__separator {
		margin: 0 9px;
		color: #333;
		font-weight: 500;
	}
	
	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__inner a {
		color: #333;
		display: inline-block;
	}

	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__inner {
		color: #333;
		display: inline-block;
	}
	
	.el-pagination /deep/ .el-pagination__total {
		margin: 0 10px 0 0;
		color: #666;
		font-weight: 400;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-prev {
		border: none;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #666;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		min-width: 35px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-next {
		border: none;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #666;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		min-width: 35px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-prev:disabled {
		border: none;
		cursor: not-allowed;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #C0C4CC;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-next:disabled {
		border: none;
		cursor: not-allowed;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #C0C4CC;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pager {
		padding: 0;
		margin: 0;
		display: inline-block;
		vertical-align: top;
	}
	
	.el-pagination /deep/ .el-pager .number {
		cursor: pointer;
		padding: 0 4px;
		margin: 0 5px;
		color: #666;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: #f4f4f5;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pager .number:hover {
		cursor: pointer;
		padding: 0 4px;
		margin: 0 5px;
		color: #363636;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: #f4f4f5;
		text-align: center;
		min-width: 30px;
		height: 28px;
}

.el-pagination /deep/ .el-pager .number.active {
		cursor: default;
		padding: 0 4px;
		margin: 0 5px;
		color: #FFF;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: #363636;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes {
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input {
		margin: 0 5px;
		width: 100px;
		position: relative;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
		border: 1px solid #DCDFE6;
		cursor: pointer;
		padding: 0 25px 0 8px;
		color: #606266;
		display: inline-block;
		font-size: 13px;
		line-height: 28px;
		border-radius: 3px;
		outline: 0;
		background: #FFF;
		width: 100%;
		text-align: center;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
		top: 0;
		position: absolute;
		right: 0;
		height: 100%;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
		cursor: pointer;
		color: #C0C4CC;
		width: 25px;
		font-size: 14px;
		line-height: 28px;
		text-align: center;
	}

	.el-pagination /deep/ .el-pagination__jump {
		margin: 0 0 0 24px;
		color: #606266;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__jump .el-input {
		border-radius: 3px;
		padding: 0 2px;
		margin: 0 2px;
		display: inline-block;
		width: 50px;
		font-size: 14px;
		line-height: 18px;
		position: relative;
		text-align: center;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
		border: 1px solid #DCDFE6;
		cursor: pointer;
		padding: 0 3px;
		color: #606266;
		display: inline-block;
		font-size: 14px;
		line-height: 28px;
		border-radius: 3px;
		outline: 0;
		background: #FFF;
		width: 100%;
		text-align: center;
		height: 28px;
	}
</style>
