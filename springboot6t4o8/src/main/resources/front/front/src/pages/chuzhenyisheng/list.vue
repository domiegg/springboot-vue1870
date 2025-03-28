<template>
<div>
	<div :style='{"width":"100%","padding":"0px 7%","boxShadow":"0 1px 0 #ccc","margin":"0px auto 0px","borderRadius":"0","background":"#fff"}' class="breadcrumb-preview">
		<el-breadcrumb :separator="'Ξ'" :style='{"fontSize":"14px","lineHeight":"60px"}'>
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in breadcrumbItem" :key="index">{{item.name}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	
	<div class="list-preview" :style='{"width":"100%","padding":"10px 0","margin":"0px auto","position":"relative","background":"none"}'>
		<div class="category-1" :style='{"padding":"0px 7% 0px","margin":"20px 0 0","flexWrap":"wrap","background":"none","display":"flex","width":"100%","height":"auto"}'>
			<div class="item" :class="swiperIndex == '-1' ? 'active' : ''" @click="getList(1, '全部')" :plain="isPlain">全部</div>
			<div class="item" :class="swiperIndex == index ? 'active' : ''" v-for="(item, index) in fenlei" :key="index" @click="getList(1, item, 'btn' + index)" :ref="'btn' + index" plain>{{item}}</div>
		</div>
		
	
    <el-form :inline="true" :model="formSearch" class="list-form-pv" :style='{"padding":"30px 7% 0","alignItems":"center","flexWrap":"wrap","background":"none","display":"flex","width":"100%","height":"auto"}'>
      <el-form-item :style='{"margin":"0 4px 0 0","justifyContent":"center","display":"flex"}'>
	    <div class="lable" v-if="true" :style='{"width":"auto","padding":"0 10px","lineHeight":"42px","display":"inline-block"}'>医生姓名</div>
        <el-input v-model="formSearch.yishengxingming" placeholder="医生姓名" clearable></el-input>
      </el-form-item>
      <el-form-item :style='{"margin":"0 4px 0 0","justifyContent":"center","display":"flex"}'>
		<div class="lable" v-if="true" :style='{"width":"auto","padding":"0 10px","lineHeight":"42px","display":"inline-block"}'>挂号类型</div>
        <el-select v-model="formSearch.guahaoleixing" placeholder="请选择挂号类型" :clearable="true">
          <el-option v-for="(item, index) in guahaoleixingOptions" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :style='{"margin":"0 4px 0 0","justifyContent":"center","display":"flex"}'>
	    <div class="lable" v-if="true" :style='{"width":"auto","padding":"0 10px","lineHeight":"42px","display":"inline-block"}'>出诊日期</div>
        <el-date-picker 
          v-model="timeRange"
          type="daterange"
		  :style='{"border":"1px solid #ccc","padding":"3px 10px","outline":"none","borderRadius":"8px","background":"#fff","width":"auto","justifyContent":"center"}'
          range-separator="至"
          start-placeholder="出诊日期起始"
          end-placeholder="出诊日期结束"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
	  <el-button v-if=" true " :style='{"cursor":"pointer","border":"0","padding":"0px 15px","margin":"0 10px 0 0","outline":"none","color":"#fff","borderRadius":"0","background":"#000","width":"auto","fontSize":"14px","lineHeight":"42px","height":"42px"}' type="primary" @click="getList(1, curFenlei)"><i v-if="true" :style='{"color":"#fff","margin":"0 10px 0 0","fontSize":"14px"}' class="el-icon-search"></i>查询</el-button>
	  <el-button v-if="isAuth('chuzhenyisheng','新增')" :style='{"cursor":"pointer","border":"0","padding":"0px 15px","margin":"0 10px 0 0","outline":"none","color":"#fff","borderRadius":"0","background":"#999999","width":"auto","fontSize":"14px","lineHeight":"42px","height":"42px"}' type="primary" @click="add('/index/chuzhenyishengAdd')"><i v-if="true" :style='{"color":"#fff","margin":"0 10px 0 0","fontSize":"14px"}' class="el-icon-circle-plus-outline"></i>添加</el-button>
    </el-form>

	<div class="list" :style='{"padding":"20px 7% 20px","margin":"20px 0 10px","background":"none"}'>
		<!-- 样式一 -->
		<div class="list1 index-pv1" :style='{"padding":"0px","margin":"30px 0 0","flexWrap":"wrap","background":"none","display":"flex","width":"100%","justifyContent":"space-between","height":"auto"}'>
			<div :style='{"margin":"0 0 20px","borderRadius":"8px","flexWrap":"wrap","background":"none","display":"flex","width":"23.5%","position":"relative","justifyContent":"space-between","height":"auto"}' v-for="(item, index) in dataList" :key="index" @click="toDetail(item)" class="list-item animation-box">
				<img :style='{"width":"100%","boxShadow":"0px 2px 6px #ccc","margin":"0 0 8px","objectFit":"cover","display":"block","height":"260px"}' v-if="item.touxiang && item.touxiang.substr(0,4)=='http'" :src="item.touxiang" class="image" />
				<img :style='{"width":"100%","boxShadow":"0px 2px 6px #ccc","margin":"0 0 8px","objectFit":"cover","display":"block","height":"260px"}' v-else :src="baseUrl + (item.touxiang?item.touxiang.split(',')[0]:'')" class="image" />
				<div v-if="item.price" :style='{"padding":"4px 10px","color":"red","textAlign":"right","width":"100%","lineHeight":"24px","fontSize":"14px","order":"2"}' class="price"><span :style='{"fontSize":"12px"}'>￥</span>{{item.price}}</div>
				<div :style='{"padding":"4px 0px","whiteSpace":"nowrap","overflow":"hidden","color":"#333","width":"100%","lineHeight":"24px","fontSize":"16px","textOverflow":"ellipsis"}' class="name ">{{item.yishengxingming}}</div>
				<div :style='{"padding":"4px 0px","whiteSpace":"nowrap","overflow":"hidden","color":"#333","width":"100%","lineHeight":"24px","fontSize":"16px","textOverflow":"ellipsis"}' class="name ">出诊日期:{{item.chuzhenriqi}}</div>
			</div>
		</div>
		
		<!-- 样式二 -->
	</div>

	
	<el-pagination
	  background
	  class="pagination"
	  :pager-count="7"
	  :page-size="pageSize"
	  :page-sizes="pageSizes"
	  prev-text="<"
	  next-text=">"
	  :hide-on-single-page="true"
	  :layout='["total","prev","pager","next","sizes","jumper"].join()'
	  :total="total"
	  :style='{"padding":"0","margin":"10px auto","whiteSpace":"nowrap","color":"#333","textAlign":"center","width":"100%","fontWeight":"500"}'
	  @current-change="curChange"
      @size-change="sizeChange"
	  @prev-click="prevClick"
	  @next-click="nextClick"
	></el-pagination>

  </div>
</div>
</template>

<script>
  export default {
    //数据集合
    data() {
      return {
	    layouts: '',
		swiperIndex: -1,
        baseUrl: '',
        breadcrumbItem: [
          {
            name: '出诊医生'
          }
        ],
        formSearch: {
          yishengxingming: '',
          guahaoleixing: '',
          chuzhenriqi: '',
        },
        fenlei: [],
        dataList: [],
        total: 1,
        pageSize: 12,
		pageSizes: [10,20,30,50],
        totalPage: 1,
        curFenlei: '全部',
        isPlain: false,
        indexQueryCondition: '',
	      guahaoleixingOptions: [],
        timeRange: []
      }
    },
    created() {
      this.indexQueryCondition = this.$route.query.indexQueryCondition ? this.$route.query.indexQueryCondition : '';
      this.baseUrl = this.$config.baseUrl;
	    this.guahaoleixingOptions = '普通号,专家号'.split(',');
      this.getFenlei();
      this.getList(1, '全部');
    },
    //方法集合
    methods: {
      add(path) {
        this.$router.push({path: path});
      },
      getFenlei() {
        this.$http.get('option/keshi/keshi').then(res => {
          if (res.data.code == 0) {
            this.fenlei = res.data.data;
          }
        });
      },
      getList(page, fenlei, ref = '') {
		if(fenlei == '全部') this.swiperIndex = -1;
		for(let i=0;i<this.fenlei.length;i++) {
			if(fenlei == this.fenlei[i]) {
				this.swiperIndex = i;
				break;
			}
		}
        this.curFenlei = fenlei;
        if (this.curFenlei == '全部') {
          this.isPlain = false;
        } else {
          this.isPlain = true;
        }
        let params = {page, limit: this.pageSize};
        let searchWhere = {};
        if (this.formSearch.yishengxingming != '') searchWhere.yishengxingming = '%' + this.formSearch.yishengxingming + '%';
        if (this.formSearch.guahaoleixing != '') searchWhere.guahaoleixing = this.formSearch.guahaoleixing;
        if (this.timeRange.length > 0) {
          searchWhere.chuzhenriqistart = this.timeRange[0];
          searchWhere.chuzhenriqiend = this.timeRange[1];
        }
        if (this.curFenlei != '全部') searchWhere.keshi = this.curFenlei;
        this.$http.get('chuzhenyisheng/list', {params: Object.assign(params, searchWhere)}).then(res => {
          if (res.data.code == 0) {
            this.dataList = res.data.data.list;
            this.total = res.data.data.total;
            this.pageSize = res.data.data.pageSize;
            this.totalPage = res.data.data.totalPage;
			
			this.pageSizes = [this.pageSize, this.pageSize*2, this.pageSize*3, this.pageSize*5];
          }
        });
      },
      curChange(page) {
        this.getList(page,this.curFenlei);
      },
      prevClick(page) {
        this.getList(page,this.curFenlei);
      },
      sizeChange(size){
        this.pageSize = size
        this.getList(1,this.curFenlei);
      },
      nextClick(page) {
        this.getList(page,this.curFenlei);
      },
      toDetail(item) {
        this.$router.push({path: '/index/chuzhenyishengDetail', query: {detailObj: JSON.stringify(item)}});
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.list-preview .list-form-pv .el-input {
		width: auto;
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
	
	.category-1 .item {
		cursor: pointer;
		border: 1px solid #000;
		padding: 0 10px;
		margin: 0 8px 10px 0;
		color: #000;
		font-size: 16px;
		line-height: 45px;
		border-radius: 4px;
		background: none;
		width: auto;
		text-align: center;
		min-width: 110px;
		height: 45px;
	}
	
	.category-1 .item:hover {
		cursor: pointer;
		border: 1px solid #000;
		border-radius: 4px;
		margin: 0 8px 10px 0;
		color: #fff;
		background: #000;
		width: auto;
		font-size: 16px;
		line-height: 45px;
		text-align: center;
		min-width: 110px;
	}
	
	.category-1 .item.active {
		cursor: pointer;
		border: 1px solid #000;
		border-radius: 4px;
		margin: 0 8px 10px 0;
		color: #fff;
		background: #000;
		width: auto;
		font-size: 16px;
		line-height: 45px;
		text-align: center;
		min-width: 110px;
	}
	
	.category-2 .item {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 0 10px 0;
		color: #999;
		background: #efefef;
		width: 100%;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.category-2 .item:hover {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 0 10px 0;
		color: #999;
		background: #efefef;
		width: 100%;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.category-2 .item.active {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 0 10px 0;
		color: #999;
		background: #efefef;
		width: 100%;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.list-form-pv .el-input /deep/ .el-input__inner {
		border: 1px solid #ccc;
		border-radius: 0px;
		padding: 0 10px;
		margin: 0;
		outline: none;
		color: #333;
		width: 140px;
		font-size: 14px;
		line-height: 42px;
		height: 42px;
	}
	
	.list-form-pv .el-select /deep/ .el-input__inner {
		border: 1px solid #ccc;
		border-radius: 8px;
		padding: 0 10px;
		margin: 0;
		outline: none;
		color: #333;
		width: 140px;
		font-size: 14px;
		line-height: 42px;
		height: 42px;
	}
	
	.list-form-pv .el-date-editor /deep/ .el-input__inner {
		border: 1px solid #ccc;
		border-radius: 8px;
		padding: 0 30px;
		margin: 0;
		outline: none;
		color: #333;
		width: 140px;
		font-size: 14px;
		line-height: 42px;
		height: 42px;
	}
	
	.list .index-pv1 .animation-box {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
		z-index: initial;
	}
	
	.list .index-pv1 .animation-box:hover {
		transform: translate3d(0px, -10px, 0px);
		-webkit-perspective: 1000px;
		perspective: 1000px;
		transition: 0.3s;
		z-index: 1;
	}
	
	.list .index-pv1 .animation-box img {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
	}
	
	.list .index-pv1 .animation-box img:hover {
		-webkit-perspective: 1000px;
		perspective: 1000px;
		transition: 0.3s;
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
