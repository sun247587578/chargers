<template>
  <div>
    <el-row>
      <el-col :span="24">
          <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="search.keyword" placeholder="请输入员工姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" @click="readData">查询</el-button>
            </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-table :data="listData" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border style="width: 120%">
          <el-table-column type="index" label="序号" width="120"></el-table-column>
          <!-- <el-table-column prop="deptName" label="部门" min-width="150"> </el-table-column> -->
          <el-table-column prop="userName" label="员工"> </el-table-column>

          <el-table-column prop="oldTransformDate" label="旧转正日期"  :formatter="stateFormat1"></el-table-column>
          <el-table-column prop="newTransformDate" label="新转正日期"  :formatter="stateFormat1"></el-table-column>
          <el-table-column prop="cause" label="原因"></el-table-column>
          <!-- <el-table-column prop="rewardAuthorizer" label="创建人" ></el-table-column> -->
          <el-table-column prop="createTime" label="创建时间"  :formatter="stateFormat1"></el-table-column>
          
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { readDelayRecordList } from "@/api/hr"

export default {
  data() {
    return {
      fullscreenLoading: false,
    
      listData: [],
      search: {
        keyword: '',
        pageNum: 1,
        pageSize: 10,
      },
      
      total: 0,
    }
  },
  methods: {
    
    stateFormat(row, column) {
      let state = row[column.property];
      switch (state) {
        case '0':
          return "是";
        case '1':
          return "否";
        default:
          return "否";
      }
    },
    stateFormat1(row, column) {
      let state = row[column.property];
      if (typeof state == 'string') {
        return state.substring(0, 10)
      } else {
        return ""
      }

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
      readDelayRecordList(this.search).then(response => {
        this.listData = response.data
        console.log(response.data)
        this.total = response.total // 总条数
        this.fullscreenLoading = false;
      }).catch(error => {
        this.$notify({
          title: '提示',
          content: '数据加载出错！！',
          type: 'error'
        })
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
.tableOcc {
  tr {
    td {
      line-height: 52px;
      text-align: right;
    }
  }
}
</style>