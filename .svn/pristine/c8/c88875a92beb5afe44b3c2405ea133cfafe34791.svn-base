<template>
  <div v-if="detailIO">
    <el-row :gutter="20">
      <el-col :span="24">
        委托日期 :
        <el-date-picker v-model="search.createTime" @change="sfomartData" type="date" placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary" @click="readData" icon="search">搜索</el-button>
      </el-col>
      <el-col :span="24">
        <template>
          <table class="table table-bordered" style="margin-top:10px" v-loading="fullscreenLoading" element-loading-text="拼命加载中">
            <thead>
              <tr>
                <th>编号</th>
                <th>委托日期</th>
                <th>检查项目</th>
                <th>结构代码</th>
                <th>样品种类</th>
                <th>送样数量</th>
                <th>委托批号</th>
                <th>委托部门</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in receiveList" v-if="receiveList.length>0">
                <td>{{ index+1 }}</td>
                <td>{{item.createTime}}</td>
                <td>
                  <span v-for="(childitem,childindex) in item.labSubmitProjects">{{childitem.value}} </span>
                </td>
                <td>{{ item.stru }}</td>
                <td>{{ item.product }}</td>
                <td>{{item.sampleSize}}</td>
                <td>{{ item.batchNumber }}</td>
                <td>{{ item.submitUnit }}</td>
                <td>
                  <button class="btn btn-sm btn-primary" @click="lookDetil(item.id)" type="button">查看</button>
                </td>
              </tr>
              <tr v-else>
                <td colspan="10">暂无数据</td>
              </tr>
            </tbody>
          </table>
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </template>
      </el-col>
    </el-row>
  </div>
  <div v-else>
    <div class="container border">
      <div class="clearfix">
        <ul class="clearfix slist">
          <li>委托日期 : {{detaildata.createTime}}</li>
          <li>委托单位 : {{detaildata.submitUnit}}</li>
          <li>委托人 : {{detaildata.submitUser}}</li>
          <li>样品种类 : {{detaildata.product}}</li>
        </ul>
        <div class="panel panel-primary">
          <div class="panel-heading">
            委托项目
          </div>
          <div class="panel-footer">
            
            <el-tag style="margin-left:10px;" v-for="tag in detaildata.labSubmitProjects" :key="tag.value" :type="tag.type">
              {{tag.value}}
            </el-tag>
          </div>
        </div>
        <ul class="clearfix slist30">
          <li v-if="detaildata.product=='胎圈'">规格 : {{detaildata.spec}}</li>
          <li v-if="detaildata.product=='胎圈'">结构代码 : {{detaildata.stru}}</li>
          <li>委托批号 : {{detaildata.batchNumber}}</li>
          <li>接收者 : {{detaildata.receiveUser}}</li>
          <li>接收时间 : {{detaildata.receiveTime}}</li>
          <li>完成时间 : {{detaildata.finishTime}}</li>
          <li>客户要求 : {{detaildata.customerRequest}}</li>
        </ul>
      </div>
      <div class="clearfix">
        <table  class="table table-striped table-bordered" v-if="detaildata.samples[0]">
          <thead>
            <tr>
              <th v-for="item in detaildata.samples[0].details">{{item.type}}</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="item in detaildata.samples">
              <td>{{item.sampleNumber ? item.sampleNumber : ""}}</td>
              <td>{{item.spool}}</td>
              <td>{{item.flatness}}</td>
            </tr> -->
            <tr v-for="item in detaildata.samples">
              <td v-for="a in item.details">{{a.value}}</td>
            </tr>
          </tbody>
        </table>

        
        <div style="text-align:center;margin-bottom:20px">
          <button class="btn btn-primary" @click="goBack" type="button"><i class="icon icon-reply"></i> 返回</button>
        </div>
        
      </div>

    </div>
  </div>
</template>

<script>
import { readLabReceiveList , readLabReceiveDetail } from "@/api/lab"
import { formatDate } from '@/utils/index';
export default {
  data() {
    return {
      receiveList: [],
      search: {
        pageNum: 1,
        pageSize: 10,
        keyword: null,
        deptId: null,
        createTime: null,//日期查询
        submitState:"3"
      },
      total: 0,
      detailIO: true,
      detaildata:{},
      fullscreenLoading:true,
    }
  },

  methods: {
    goBack(){
      this.detailIO = true;
    },
    sfomartData(va){
      this.search.createTime=va;
    },
    lookDetil(sid) {
      // this.$router.push({path:'/LAB/entrust/receiveDetail'})
      this.fullscreenLoading = true;
      let obj=new Object();
      obj.id=sid;
      console.log(obj)
      readLabReceiveDetail(obj).then(res=>{
        console.log(res)
        this.detaildata=res.data;
        var sarr=this.detaildata.labSubmitProjects;
        for(let i in sarr){
          if(sarr[i].project=='物检'){
            sarr[i].type="success"
          }else if(sarr[i].project=='化验'){
            sarr[i].type="primary"
          }else{
            sarr[i].type="warning"
          }
        }
        this.fullscreenLoading = false;
        this.detailIO = false;
      }).catch(res=>{
        this.$message.error(res.msg);
        this.detailIO = true;
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

    readData() {
      this.fullscreenLoading = true;
      readLabReceiveList(this.search).then(response => {
        this.receiveList = response.data
        console.log(response)
        this.total = response.total // 总条数
        this.fullscreenLoading = false;
      }).catch(error => {
        this.$message.error(error.msg);
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
.border {
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 2px 2px #ccc;
}

.slist {
  margin-top:20px;
  li {
    float: left;
    line-height:30px;
    width: 25%;
  }
}
.slist30 {
  margin-top:10px;
  li {
    float: left;
    line-height:30px;
    width: 33.3%;
  }
}
</style>
