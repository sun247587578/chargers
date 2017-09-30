<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="panel panel-info">
          <div class="panel-heading">
            <span class="panel-stitle">区域设置</span>
            <el-button type="primary" size="small" class="pull-right" @click="addArea">添加区域</el-button>
            <div class="clearfix"></div>
          </div>
          <div class="panel-body" v-loading="fullscreenLoading" element-loading-text="拼命加载中">
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>区域名称</th>
                  <th>是否可用</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in areaList">
                  <td>{{item.regionName}}</td>
                  <td>{{item.enable == 1 ? '不可用' : '可用'}}</td>
                  <td>
                    <el-button type="primary" icon="edit" size="small" @click="updateRegion(item.id , index)"></el-button>
                    <el-button type="primary" icon="delete" size="small" @click="deleteRegion(item.id)"></el-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="区域" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="区域名称">
            <el-input v-model="form.regionName" auto-complete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="是否可用">
            <el-radio-group v-model="form.isUse">
              <el-radio-button label="0">可用</el-radio-button>
              <el-radio-button label="1">不可用</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>

import { readRegionList , updateRegion , regionDelete } from "@/api/wk"

export default {
  data() {
    return {
      fullscreenLoading:true,
      dialogFormVisible:false,
      areaList: [],
      search: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      form: {
        regionName: null,
        isUse: 0,
      },
      formcus: {
        regionName: null,
        isUse: 0,
      },
    }
  },
  methods: {
    readData() {
      this.fullscreenLoading = true;
      // console.log(this.search)
      readRegionList(this.search).then(response => {
        this.areaList = response.data
        console.log(response.data)
        this.total = response.total // 总条数
        this.fullscreenLoading = false;
      }).catch(error => {
        console.log(error)
        this.$message.error(error.msg);
        this.fullscreenLoading = false;
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
    updateRegion(sid , index) {
      this.form = Object.assign({}, this.areaList[index]);
      this.form.id = sid;
      this.dialogFormVisible=true;
    },
    deleteRegion(sid) {
      // deleteRegion
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        regionDelete({id:sid}).then(res => {
          if (res.httpCode == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.readData()
          } else {
            this.$message({
              type: 'info',
              message: '删除失败'
            });
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            type: 'info',
            message: '删除失败'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    submitForm() {
      alert(this.form.regionName == null)
      if(this.form.regionName == null){
        return false
      }
      updateRegion(this.form).then(res => {
        if (res.httpCode == 200) {
          this.$message({
            type: 'success',
            message: '成功!'
          });
          this.readData();
          this.dialogFormVisible = false;
        } else {
          this.$message({
            type: 'info',
            message: '失败'
          });
        }
        
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '失败'
        });
        this.dialogFormVisible = false;
      })
    },
    addArea() {
      this.form = Object.assign({}, this.formcus);
      this.dialogFormVisible=true;
    }
  },
  mounted() {
    this.readData()
  }

}
</script>
<style lang="scss" scoped>

</style>