<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="委托日期 :">
            <el-date-picker v-model="formInline.date" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="委托批次 :">
            <el-input v-model="formInline.user" placeholder="委托批次"></el-input>
          </el-form-item>
          <el-form-item label="送样数量 :">
            <el-input v-model="formInline.num" placeholder="送样数量"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="序号" width="120">
          </el-table-column>
          <el-table-column prop="province" label="委托日期" width="120">
          </el-table-column>
          <el-table-column prop="city" label="规格" width="120">
          </el-table-column>
          <el-table-column prop="address" label="检查项目" width="500">
          </el-table-column>
          <el-table-column prop="zip" label="样品种类" width="120">
          </el-table-column>
          <el-table-column prop="zip" label="送样数量" width="120">
          </el-table-column>
          <el-table-column prop="zip" label="送样数量" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template scope="scope">
              <el-button @click="handleClick"  type="text" size="small">查看</el-button>
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
      console.log(1);
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
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
