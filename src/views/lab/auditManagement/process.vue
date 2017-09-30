<template>
  <div>
    <el-row v-if="detailIO">
      <el-col :span="24">
        <el-form :model="search" :inline="true" class="demo-form-inline">
          <!-- <el-form-item label="搜索">
              <el-input placeholder="关键字"></el-input>
            </el-form-item> -->
          
            
          
          <el-form-item>
            <el-date-picker v-model="search.fromTime" format="yyyy-MM-dd HH:mm:ss" type="datetime" @change="sfomartData" placeholder="选择开始时间">
            </el-date-picker>
            <el-date-picker v-model="search.toTime" type="datetime" placeholder="选择结束时间"  @change="sfomartData1">
            </el-date-picker>
            <!-- <el-checkbox-group v-model="search.verifyState">
              <el-radio :label="0">未审核</el-radio>
              <el-radio :label="1">已审核</el-radio>
              <el-radio :label="2">不合格</el-radio>
            </el-checkbox-group> -->
            <!-- <el-radio-group v-model="search.verifyState">
              <el-radio :label="0">未审核</el-radio>
              <el-radio :label="1">已审核</el-radio>
              <el-radio :label="2">不合格</el-radio>
            </el-radio-group> -->
          </el-form-item>
          
          <el-form-item>
            <el-select placeholder="班次" v-model="search.classesId">
              <el-option v-for="item in classesList" :label="item.classesName" :value="item.id" :key="item.value"></el-option>
              
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="readData"  icon="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
          <el-table :data="processList" :fit="true" :resizable="true" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border style="width: 100%">
              <el-table-column type="index" label="序号" width="120">
              </el-table-column>
              <el-table-column prop="reportNo" label="实验编号" min-width="300">
              </el-table-column>
              <el-table-column prop="createTime" label="取样日期/时间" min-width="200">
              </el-table-column>
              <el-table-column prop="reportDate" label="报告日期/时间" min-width="300">
              </el-table-column>
              
              <el-table-column prop="detectProject" label="检测项目" min-width="300">
              </el-table-column>
              <el-table-column prop="simpleNum" label="检测数量" min-width="120">
              </el-table-column>
              <el-table-column prop="detectUser" label="检测人" min-width="120">
              </el-table-column>
              <el-table-column prop="classes" label="班别" min-width="120">
              </el-table-column>
              <el-table-column prop="verifyState" label="状态" :formatter="stateFormat" width="300">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <template scope="scope">
                  <el-button @click="lookDetil(processList[scope.$index].id)" type="text" size="small">查看</el-button>
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
      <solution :sdata="detaildata" @goBack="goBack" :state="1"></solution>
    </div>
  </div>
</template>

<script>

import { readLabDetectionList , readLabDetectionDetail } from "@/api/lab"
import { readbaseClassesList } from "@/api/base"
import { solution } from "./compont.js"

export default {
  components:{
    solution
  },
  data() {
    return {
      processList:[],
      classesList:[],
      detaildata:{},
      search: {
        pageNum: 1,
        pageSize: 10,
        classesId: null,
        fromTime: null,
        toTime: null,
        state: 1,
        verifyState:"0,2",
      },
      radio2: 3,
      total: 0,
      detailIO: true,
      fullscreenLoading : true,
    }
  },
  methods: {
    goBack() {
      this.detailIO = true;
    },
    sfomartData(va){
      this.search.formTime=va;
    },
    sfomartData1(va ){
      this.search.toTime=va;
    },
    stateFormat(row, column) {
          let state = row[column.property];
          switch(state){
            case 0:
              return "未审核";
            case 1:
              return "已审核";
            default:
              return "不合格";
          }
    },
    lookDetil(sid){
      console.log(sid)
      this.fullscreenLoading = true;
      readLabDetectionDetail({id:sid}).then(res => {
        if(res.httpCode == 200){
          console.log(res)
          this.detaildata = res.data;
          this.fullscreenLoading = false;
          this.detailIO = false;
        }else{
          this.$message.error(res.msg);
        }
      }).catch(err => {
        this.$message.error('网络出错了');
      })
    },
    handleSizeChange(val) {
      this.search.pageSize = val
      this.readData()
    },

    handleCurrentChange(val) {
      this.search.pageNum = val
      this.readData()
    },
    searchData(){
      console.log(this.search)
      this.readData()
    },
    readClasses(){
      readbaseClassesList({}).then(res => {
        if(res.httpCode == 200){
          console.log(res)
          this.classesList=res.data;
        }else{
          this.$message.error(res.msg);
        }
      }).catch(res => {
        this.$message.error(res.msg);
      })
    },
    readData() {
      this.fullscreenLoading = true;
      console.log(this.search)
      readLabDetectionList(this.search).then(response => {
        this.processList = response.data
        console.log(response.data)
        this.total = response.total // 总条数
        this.fullscreenLoading = false;
      }).catch(error => {
        console.log(error)
        this.$message.error(error.msg);
        this.fullscreenLoading = false;
      })
    },
  },
  mounted() {
    this.readData();
    this.readClasses();
  }



}
</script>

<style lang="scss" scoped>
.el-table th>.cell {
  word-wrap: normal;
  text-overflow: ellipsis;
  line-height: 30px;
  width: 100%;
  padding-left: 29px;
  box-sizing: border-box;
}
</style>
