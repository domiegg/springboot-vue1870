<template>
	<div class="main-content" :style='{"minHeight":"100vh","padding":"30px","background":"url(http://codegen.caihongy.cn/20230401/18da3753d22a4199b5abc44dee037d48.png) fixed"}'>
		<!-- 列表页 -->
		<template v-if="showFlag">
			<el-form class="center-form-pv" :style='{"padding":"20px 0px 0","margin":"0 0 0px","borderColor":"#ececde","borderStyle":"solid","background":"#fff","borderWidth":"1px 1px 0 "}' :inline="true" :model="searchForm">
				<el-row :style='{"padding":"0 0 20px","margin":"0 auto","borderColor":"#ececde","borderRadius":"0px","textAlign":"center","background":"none","borderWidth":"0 0 1px","display":"block","borderStyle":"solid"}' >
					<div :style='{"margin":"0 10px 0 0","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#666","display":"inline-block","lineHeight":"50px","fontSize":"16px","fontWeight":"500","height":"50px"}' class="item-label">医生姓名</label>
						<el-input v-model="searchForm.yishengxingming" placeholder="医生姓名" clearable></el-input>
					</div>
					<div :style='{"margin":"0 10px 0 0","display":"inline-block"}' class="select" label="挂号类型" prop="guahaoleixing">
						<label :style='{"margin":"0 10px 0 0","color":"#666","display":"inline-block","lineHeight":"50px","fontSize":"16px","fontWeight":"500","height":"50px"}' class="item-label">挂号类型</label>
						<el-select  @change="guahaoleixingChange" clearable v-model="searchForm.guahaoleixing" placeholder="请选择挂号类型">
							<el-option v-for="(item,index) in guahaoleixingOptions" v-bind:key="index" :label="item" :value="item"></el-option>
						</el-select>
					</div>
					<div :style='{"margin":"0 10px 0 0","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#666","display":"inline-block","lineHeight":"50px","fontSize":"16px","fontWeight":"500","height":"50px"}' class="item-label">出诊日期</label>
						<el-date-picker v-model="searchForm.chuzhenriqistart" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="出诊日期起始"></el-date-picker>
						至
						<el-date-picker v-model="searchForm.chuzhenriqiend" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="出诊日期结束"></el-date-picker>
					</div>
					<el-button :style='{"border":"1px solid #badcdc","cursor":"pointer","padding":"0 34px","boxShadow":"inset 0px -3px 2px #badcdc","margin":"0 0px 0 10px","color":"#333","minWidth":"100px","outline":"none","borderRadius":"20px","background":"#deeeee","width":"auto","fontSize":"16px","height":"44px"}' type="success" @click="search()">查询</el-button>
				</el-row>

				<el-row :style='{"padding":"16px 12px 10px","margin":"0 0 0px","borderColor":"#e2f0e2","flexWrap":"wrap","background":"#fff","borderWidth":"0px","display":"flex","width":"auto","borderStyle":"solid","justifyContent":"center","zIndex":"999"}'>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 20px","boxShadow":"inset 0px -3px 2px #ececde","margin":"0 10px 6px 0","borderColor":"#ececde","color":"#333","minWidth":"90px","outline":"none","borderRadius":"20px","background":"#fff","borderWidth":"1px","width":"auto","fontSize":"16px","borderStyle":"solid","height":"44px"}' v-if="isAuth('chuzhenyisheng','新增')" type="success" @click="addOrUpdateHandler()">新增</el-button>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 16px","boxShadow":"inset 0px -3px 2px #ececde","margin":"0 10px 6px 0","borderColor":"#ececde","color":"#333","minWidth":"90px","outline":"none","borderRadius":"20px","background":"#fff","borderWidth":"1px","width":"auto","fontSize":"16px","borderStyle":"solid","height":"44px"}' v-if="isAuth('chuzhenyisheng','删除')" :disabled="dataListSelections.length <= 0" type="danger" @click="deleteHandler()">删除</el-button>




				</el-row>
			</el-form>
			
			<!-- <div> -->
				<el-table class="tables"
					:stripe='true'
					:style='{"padding":"0","borderColor":"#e2f0e2","margin":"0 0 20px","borderRadius":"5px","borderWidth":"1px 0 0 1px","background":"#fff","width":"calc(100% - 0px)","borderStyle":"solid"}' 
					v-if="isAuth('chuzhenyisheng','查看')"
					:data="dataList"
					v-loading="dataListLoading"
				@selection-change="selectionChangeHandler">
					<el-table-column :resizable='true' type="selection" align="center" width="50"></el-table-column>
					<el-table-column :resizable='true' :sortable='true' label="索引" type="index" width="50" />
					<el-table-column :resizable='true' :sortable='true'  
						prop="yishengzhanghao"
					label="医生账号">
						<template slot-scope="scope">
							{{scope.row.yishengzhanghao}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true' prop="touxiang" width="200" label="头像">
						<template slot-scope="scope">
							<div v-if="scope.row.touxiang">
								<img v-if="scope.row.touxiang.substring(0,4)=='http'" :src="scope.row.touxiang.split(',')[0]" width="100" height="100">
								<img v-else :src="$base.url+scope.row.touxiang.split(',')[0]" width="100" height="100">
							</div>
							<div v-else>无图片</div>
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="xingbie"
					label="性别">
						<template slot-scope="scope">
							{{scope.row.xingbie}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="yishengxingming"
					label="医生姓名">
						<template slot-scope="scope">
							{{scope.row.yishengxingming}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="zhicheng"
					label="职称">
						<template slot-scope="scope">
							{{scope.row.zhicheng}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="keshi"
					label="科室">
						<template slot-scope="scope">
							{{scope.row.keshi}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="guahaoleixing"
					label="挂号类型">
						<template slot-scope="scope">
							{{scope.row.guahaoleixing}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="guahaoshu"
					label="挂号数">
						<template slot-scope="scope">
							{{scope.row.guahaoshu}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="guahaofei"
					label="挂号费">
						<template slot-scope="scope">
							{{scope.row.guahaofei}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="shangbanshijian"
					label="上班时间">
						<template slot-scope="scope">
							{{scope.row.shangbanshijian}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="chuzhenriqi"
					label="出诊日期">
						<template slot-scope="scope">
							{{scope.row.chuzhenriqi}}
						</template>
					</el-table-column>
					<el-table-column width="300" label="操作">
						<template slot-scope="scope">
							<el-button :style='{"border":"1px solid #85bfeb","cursor":"pointer","padding":"0 10px 0 26px","margin":"0 5px 6px","outline":"none","color":"#1e98f5","borderRadius":"20px","background":"url(http://codegen.caihongy.cn/20230329/38553f099fa74a2d86e2206c373a9539.png) no-repeat 5px center / 20px","width":"auto","fontSize":"15px","height":"32px"}' v-if=" isAuth('chuzhenyisheng','查看')" type="success" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
							<el-button :style='{"border":"1px solid #85bfeb","cursor":"pointer","padding":"0 10px 0 26px","margin":"0 5px 6px","outline":"none","color":"#1e98f5","borderRadius":"20px","background":"url(http://codegen.caihongy.cn/20230329/38553f099fa74a2d86e2206c373a9539.png) no-repeat 5px center / 20px","width":"auto","fontSize":"15px","height":"32px"}' v-if="isAuth('chuzhenyisheng','预约挂号')" type="success" size="mini" @click="yuyueguahaoCrossAddOrUpdateHandler(scope.row,'cross','','','')">预约挂号</el-button>
							<el-button :style='{"border":"1px solid #a4dbdd","cursor":"pointer","padding":"0 10px 0 26px","margin":"0 5px 6px","outline":"none","color":"#15a4aa","borderRadius":"20px","background":"url(http://codegen.caihongy.cn/20230329/99f867042acb4c4aae637c8bfcf6714a.png) no-repeat 3px center","width":"auto","fontSize":"15px","height":"32px"}' v-if=" isAuth('chuzhenyisheng','修改')" type="primary" size="mini" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>





							<el-button :style='{"border":"1px solid #e68080","cursor":"pointer","padding":"0 10px 0 26px","margin":"0 5px 6px","outline":"none","color":"#c00","borderRadius":"20px","background":"url(http://codegen.caihongy.cn/20230329/c5ea125f385740a3a3b9aed07f5dfe2c.png) no-repeat 5px center / 20px","width":"auto","fontSize":"14px","height":"32px"}' v-if="isAuth('chuzhenyisheng','删除') " type="danger" size="mini" @click="deleteHandler(scope.row.id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					@size-change="sizeChangeHandle"
					@current-change="currentChangeHandle"
					:current-page="pageIndex"
					background
					:page-sizes="[10, 20, 30, 50]"
					:page-size="pageSize"
					:layout="layouts.join()"
					:total="totalPage"
					prev-text="<"
					next-text=">"
					:hide-on-single-page="true"
					:style='{"width":"calc(100% - 370px)","padding":"0","margin":"0 170px 0px 200px","whiteSpace":"nowrap","color":"#333","fontWeight":"500"}'
				></el-pagination>
			<!-- </div> -->
		</template>
		
		<!-- 添加/修改页面  将父组件的search方法传递给子组件-->
		<add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>

		<yuyueguahao-cross-add-or-update v-if="yuyueguahaoCrossAddOrUpdateFlag" :parent="this" ref="yuyueguahaoCrossaddOrUpdate"></yuyueguahao-cross-add-or-update>




	</div>
</template>

<script>
import axios from 'axios'
import AddOrUpdate from "./add-or-update";
import yuyueguahaoCrossAddOrUpdate from "../yuyueguahao/add-or-update";
export default {
  data() {
    return {
      searchForm: {
        key: ""
      },
      form:{},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: true,
      sfshVisiable: false,
      shForm: {},
      chartVisiable: false,
      chartVisiable1: false,
      chartVisiable2: false,
      chartVisiable3: false,
      chartVisiable4: false,
      chartVisiable5: false,
      addOrUpdateFlag:false,
      yuyueguahaoCrossAddOrUpdateFlag: false,
      layouts: ["total","prev","pager","next","sizes","jumper"],

    };
  },
  created() {
    this.init();
    this.getDataList();
    this.contentStyleChange()
  },
  mounted() {
  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
    }
  },
  components: {
    AddOrUpdate,
    yuyueguahaoCrossAddOrUpdate,
  },
  methods: {

    contentStyleChange() {
      this.contentPageStyleChange()
    },
    // 分页
    contentPageStyleChange(){
      let arr = []

      // if(this.contents.pageTotal) arr.push('total')
      // if(this.contents.pageSizes) arr.push('sizes')
      // if(this.contents.pagePrevNext){
      //   arr.push('prev')
      //   if(this.contents.pagePager) arr.push('pager')
      //   arr.push('next')
      // }
      // if(this.contents.pageJumper) arr.push('jumper')
      // this.layouts = arr.join()
      // this.contents.pageEachNum = 10
    },

    yuyueguahaoCrossAddOrUpdateHandler(row,type,crossOptAudit,statusColumnName,tips,statusColumnValue){
      this.showFlag = false;
      this.addOrUpdateFlag = false;
      this.yuyueguahaoCrossAddOrUpdateFlag = true;
      this.$storage.set('crossObj',row);
      this.$storage.set('crossTable','chuzhenyisheng');
      this.$storage.set('statusColumnName',statusColumnName);
      this.$storage.set('statusColumnValue',statusColumnValue);
      this.$storage.set('tips',tips);
	if(statusColumnName!=''&&!statusColumnName.startsWith("[")) {
		var obj = this.$storage.getObj('crossObj');
		for (var o in obj){
		  if(o==statusColumnName && obj[o]==statusColumnValue){
		    this.$message({
		      message: tips,
		      type: "success",
		      duration: 1500,
		      onClose: () => {
			this.getDataList();
		      }
		    });
		      this.showFlag = true;
		      this.yuyueguahaoCrossAddOrUpdateFlag = false;
			return;
		  }
		}
	}
      this.$nextTick(() => {
      this.$refs.yuyueguahaoCrossaddOrUpdate.init(row.id,type);
      });
    },







    init () {
          this.guahaoleixingOptions = "普通号,专家号".split(',')
    },
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: 'id',
        order: 'desc',
      }
           if(this.searchForm.yishengxingming!='' && this.searchForm.yishengxingming!=undefined){
            params['yishengxingming'] = '%' + this.searchForm.yishengxingming + '%'
          }
           if(this.searchForm.guahaoleixing!='' && this.searchForm.guahaoleixing!=undefined){
            params['guahaoleixing'] = this.searchForm.guahaoleixing
          }
           if(this.searchForm.chuzhenriqistart!='' && this.searchForm.chuzhenriqistart!=undefined ){
            params['chuzhenriqistart'] = this.searchForm.chuzhenriqistart
          }
          if(this.searchForm.chuzhenriqiend!='' && this.searchForm.chuzhenriqiend!=undefined){
            params['chuzhenriqiend'] = this.searchForm.chuzhenriqiend
          }
      this.$http({
        url: "chuzhenyisheng/page",
        method: "get",
        params: params
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list;
          this.totalPage = data.data.total;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id,type) {
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
      if(type!='info'){
        type = 'else';
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,type);
      });
    },
    // 下载
    download(file){
      window.open(`${file}`)
    },
    // 删除
    deleteHandler(id) {
      var ids = id
        ? [Number(id)]
        : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "chuzhenyisheng/delete",
          method: "post",
          data: ids
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },


  }

};
</script>
<style lang="scss" scoped>
	
	.center-form-pv {
	  .el-date-editor.el-input {
	    width: auto;
	  }
	}
	
	.el-input {
	  width: auto;
	}
	
	// form
	.center-form-pv .el-input /deep/ .el-input__inner {
				border: 1px solid #ececde;
				border-radius: 20px;
				padding: 0 12px;
				box-shadow: inset 0px -3px 3px #ececde;
				outline: none;
				color: #666;
				width: 170px;
				font-size: 16px;
				height: 44px;
			}
	
	.center-form-pv .el-select /deep/ .el-input__inner {
				border: 1px solid #eee;
				border-radius: 20px;
				padding: 0 10px;
				box-shadow: inset 0px -3px 3px #ececde;
				outline: none;
				color: #666;
				width: 170px;
				font-size: 16px;
				line-height: 30px;
				height: 44px;
			}
	
	.center-form-pv .el-date-editor /deep/ .el-input__inner {
				border: 1px solid #eee;
				border-radius: 20px;
				padding: 0 10px 0 30px;
				box-shadow: inset 0px -3px 3px #ececde;
				outline: none;
				color: #666;
				width: 170px;
				font-size: 16px;
				height: 44px;
			}
	
	// table
	.el-table /deep/ .el-table__header-wrapper thead {
				color: #999;
				font-weight: 500;
				width: 100%;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr {
				background: #fff;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr th {
				padding: 10px;
				color: #656530;
				background: #f2f2e9;
				border-color: #e6e6cd;
				border-width: 0 1px 0px 0;
				border-style: solid;
				text-align: center;
			}

	.el-table /deep/ .el-table__header-wrapper thead tr th .cell {
				padding: 0 10px;
				word-wrap: normal;
				word-break: break-all;
				white-space: normal;
				font-weight: bold;
				display: inline-block;
				vertical-align: middle;
				width: 100%;
				line-height: 24px;
				position: relative;
				text-overflow: ellipsis;
			}

	
	.el-table /deep/ .el-table__body-wrapper tbody {
				width: 100%;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr {
				background: none;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 2px 10px;
				color: #666;
				background: none;
				border-color: #f2f2e9;
				border-width: 0 1px 0px 0;
				border-style: solid;
				text-align: left;
			}
	
		.el-table /deep/ .el-table__body-wrapper tbody tr.el-table__row--striped td {
		background: rgba(242,242,233,.3);
	}
		
	.el-table /deep/ .el-table__body-wrapper tbody tr:hover td {
				padding: 2px 10px;
				color: #333;
				background: rgba(242,242,233,.6);
				border-color: #f2f2e9;
				border-width: 0 1px 0px 0;
				border-style: solid;
				text-align: left;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 2px 10px;
				color: #666;
				background: none;
				border-color: #f2f2e9;
				border-width: 0 1px 0px 0;
				border-style: solid;
				text-align: left;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr td .cell {
				padding: 0 10px;
				overflow: hidden;
				word-break: break-all;
				white-space: normal;
				line-height: 24px;
				text-overflow: ellipsis;
			}
	
	// pagination
	.main-content .el-pagination /deep/ .el-pagination__total {
				margin: 0 10px 0 0;
				color: #666;
				font-weight: 400;
				display: inline-block;
				vertical-align: top;
				font-size: 16px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev {
				border: none;
				border-radius: 30px;
				padding: 0;
				margin: 0 5px;
				color: #666;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 16px;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next {
				border: none;
				border-radius: 30px;
				padding: 0;
				margin: 0 5px;
				color: #666;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 16px;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 30px;
				padding: 0;
				margin: 0 5px;
				color: #C0C4CC;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 16px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 30px;
				padding: 0;
				margin: 0 5px;
				color: #C0C4CC;
				background: #f4f4f5;
				display: inline-block;
				vertical-align: top;
				font-size: 16px;
				line-height: 28px;
				height: 28px;
			}

	.main-content .el-pagination /deep/ .el-pager {
				padding: 0;
				margin: 0;
				display: inline-block;
				vertical-align: top;
			}

	.main-content .el-pagination /deep/ .el-pager .number {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #666;
				display: inline-block;
				vertical-align: top;
				font-size: 16px;
				line-height: 28px;
				border-radius: 30px;
				background: #f4f4f5;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number:hover {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #333;
				display: inline-block;
				vertical-align: top;
				font-size: 16px;
				line-height: 28px;
				border-radius: 30px;
				background: #e8e6d4;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number.active {
				cursor: default;
				padding: 0 4px;
				margin: 0 5px;
				color: #333;
				display: inline-block;
				vertical-align: top;
				font-size: 16px;
				line-height: 28px;
				border-radius: 30px;
				background: #e8e6d4;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes {
				display: inline-block;
				vertical-align: top;
				font-size: 16px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input {
				margin: 0 5px;
				width: 100px;
				position: relative;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
				border: 1px solid #DCDFE6;
				cursor: pointer;
				padding: 0 25px 0 8px;
				color: #606266;
				display: inline-block;
				font-size: 16px;
				line-height: 28px;
				border-radius: 30px;
				outline: 0;
				background: #FFF;
				width: 100%;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
				top: 0;
				position: absolute;
				right: 0;
				height: 100%;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
				cursor: pointer;
				color: #C0C4CC;
				width: 25px;
				font-size: 14px;
				line-height: 28px;
				text-align: center;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump {
				margin: 0 0 0 24px;
				color: #606266;
				display: inline-block;
				vertical-align: top;
				font-size: 16px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input {
				border-radius: 3px;
				padding: 0 2px;
				margin: 0 2px;
				display: inline-block;
				width: 50px;
				font-size: 16px;
				line-height: 18px;
				position: relative;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
				border: 1px solid #DCDFE6;
				cursor: pointer;
				padding: 0 3px;
				color: #606266;
				display: inline-block;
				font-size: 16px;
				line-height: 28px;
				border-radius: 30px;
				outline: 0;
				background: #FFF;
				width: 100%;
				text-align: center;
				height: 28px;
			}
</style>
