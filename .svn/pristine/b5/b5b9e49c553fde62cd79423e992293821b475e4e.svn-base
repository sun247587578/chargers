<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item>
            <el-date-picker v-model="search.date" type="date" placeholder="入住日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="search.date" type="date" placeholder="搬出日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input v-model="search.user" placeholder="宿舍编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="search.num" filterable placeholder="部门">
              <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="search.num" filterable placeholder="员工">
              <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="search.num" filterable placeholder="宿舍性别">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="search.num" filterable placeholder="是否搬出">
              <el-option label="是" value="0"></el-option>
              <el-option label="否" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
            <el-button type="warning" icon="delete2" @click="clearSearch">清空</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        
      </el-col>
    </el-row>
  </div>
</template>
<script>

import { readDormitoryList } from "@/api/hr"
import { dormitory } from "./basicCompontent"

export default {
  data() {
    return {
      list:[],
      search: {
        user: '',
        region: '',
        date: '',
        num: '',
        sex:0,
        yesNo:0,
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      fullscreenLoading:true,
    }
  },
  methods: {
    clearSearch(){

    },
    onSubmit(){

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
      readDormitoryList(this.search).then(response => {
        this.list = response.data
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

</style>