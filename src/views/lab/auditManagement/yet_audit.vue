<template>
  <div @click.stop.prevent>
    <el-row v-if="detailIO">
      <el-col :span="24">
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="">
            <el-date-picker type="datetime" v-model="search.createTime" placeholder="委托日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="search.batchNumber" placeholder="委托批次"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="searchDate" icon="search">搜索</el-button>
            <!-- <el-button type="success" @click="addProduct" icon="plus">新增</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-table :data="receiveList" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border style="width: 100%">
          <el-table-column type="index" label="序号" min-width="80">
          </el-table-column>
          <el-table-column prop="createTime" label="委托日期" min-width="200">
          </el-table-column>
          <el-table-column prop="spec" label="规格" min-width="120">
          </el-table-column>
          <el-table-column prop="labSubmitProjects" label="检查项目" :formatter="stateFormat" min-width="900">
          </el-table-column>
          <el-table-column prop="product" label="样品种类" min-width="300">
          </el-table-column>
          <el-table-column prop="batchNumber" label="委托批号" min-width="300">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template scope="scope">
              <el-button type="text" @click.native.prevent="lookDetil(receiveList[scope.$index].id , scope.$index)" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <div v-else>
      <!-- sid是本条数据的id  sdetail是主表信息   几个页面共用一个模板所以传入state 1 为待审核 2 为未审核-->
      <report-card :sid="sid" :sdata="detaildata" @goBack="goBack" :state="2" :sname="sname"></report-card>
    </div>
  </div>
</template>

<script>


import { readLabReceiveList, readLabReceiveDetail , readCheckoutDetail } from "@/api/lab"
// 几个页面共用一个模板
import { reportCard } from "./compont.js"

export default {
  components: {
    reportCard
  },
  data() {
    return {
      receiveList: [],
      search: {
        pageNum: 1,
        pageSize: 10,
        submitState: 2,
        batchNumber: '',
        createTime: '',
        verifyState: "1" ,
        // submitState:2
      },
      total: 0,
      date: null,//日期查询
      detailIO: true,
      detaildata: {},
      sid:'1',
      fullscreenLoading:true,
      sname:null,
    }
  },
  methods: {
    goBack() {
      this.detailIO = true;
      this.readData()
    },
    stateFormat(row, column) {
      let str = '';
      row.labSubmitProjects.forEach((v) => {
        str += v.value + " ";
      });
      return str
    },
    lookDetil(sid , index) {
      this.sid=sid;
      // this.detailIO = false;
      this.sname = this.receiveList[index].product;
      readCheckoutDetail({ reportId: sid }).then(res => {
        if(res.httpCode == 200){
          this.detaildata=res.data;
          // console.log(res.data)
          this.detailIO = false;
        }else{
          this.$message.error('数据加载出错！！');
        }
      }).catch(err => {
        this.$message.error(err.msg);

        // this.detailIO = true;
      })
      
    },
    searchDate() {
      this.readData();
    },

    handleSizeChange(val) {
      this.search.pageSize = val
      this.readData()
    },

    handleCurrentChange(val) {
      this.search.pageNum = val
      this.readData()
    },

    readData() {
      this.fullscreenLoading = true;
      readLabReceiveList(this.search).then(response => {
        this.receiveList = response.data
        console.log(response.data)
        this.total = response.total // 总条数
        this.fullscreenLoading = false;
      }).catch(error => {
        
        this.fullscreenLoading = false;
      })
    },
  },
  mounted() {
    this.readData()
  }
}
</script>

<style lang="scss" scoped>

</style>
