<template>
  <div>
      <el-table :data="receiveList"  v-loading="fullscreenLoading" element-loading-text="拼命加载中"  border style="width: 100%">
          <el-table-column type="index" label="序号" min-width="80"></el-table-column>
          <el-table-column prop="createTime" label="宿舍编号" min-width="200"></el-table-column>
          <el-table-column prop="spec" label="宿舍地址" min-width="300"> </el-table-column>
          <el-table-column prop="labSubmitProjects" label="宿舍性别" :formatter="stateFormat" min-width="100"> </el-table-column>
          <el-table-column prop="product" label="部门" min-width="300"></el-table-column>
          <el-table-column prop="batchNumber" label="人员姓名" min-width="100"></el-table-column>
          <el-table-column prop="batchNumber" label="入住日期" min-width="300"></el-table-column>
          <el-table-column prop="batchNumber" label="入住人数" min-width="300"></el-table-column>
          <el-table-column prop="batchNumber" label="是否已搬出" min-width="100"></el-table-column>
          <el-table-column prop="batchNumber" label="搬出日期" min-width="100"></el-table-column>
          <el-table-column prop="batchNumber" label="床位号" min-width="100"></el-table-column>
          <el-table-column prop="batchNumber" label="备注" min-width="100"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template scope="scope">
              <el-button type="text" @click.native.prevent="lookDetil(receiveList[scope.$index].id , scope.$index)" size="small">查看</el-button>
              <el-button type="text" @click.native.prevent="lookDetil(receiveList[scope.$index].id , scope.$index)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
  </div>
</template>
<script>
export default {
  props:['sdata'],
  data(){
      return {

      }
  },
  methods:{

  },
  mounted(){
      
  }
}
</script>
<style lang="scss" scoped>

</style>
