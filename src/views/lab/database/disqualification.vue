<template>
  <div>
    <h3>123</h3>
    <el-row>
      
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="序号" width="120">
          </el-table-column>
          <el-table-column prop="province" label="钢号/炉号" width="120">
          </el-table-column>
          <el-table-column prop="city" label="下盘时间" width="120">
          </el-table-column>
          <el-table-column prop="address" label="样品号" width="500">
          </el-table-column>
          <el-table-column prop="zip" label="机台号" width="120">
          </el-table-column>
          <el-table-column prop="zip" label="编号" width="120">
          </el-table-column>
          <el-table-column prop="zip" label="平直度" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template scope="scope">
              <el-button @click="handleClick()" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert(1)
      this.$router.push({path:'disqualificationDetil'})


    }
  },

  data() {
    return {
      formInline: {
        user: '',
        region: '',
        date: '',
        num:''
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
