<template>
  <div>
    <el-row>
			<el-col :span="24">
				<el-form :inline="true" :model="search" class="demo-form-inline">
					<el-form-item label="">
						<el-input v-model="search.title" placeholder="分类名称"></el-input>
					</el-form-item>
					<!-- <el-form-item label="">
												<el-input v-model="search.product" placeholder="所属种类"></el-input>
											</el-form-item> -->
					
					<el-form-item>
						<el-button type="primary" @click="readData" icon="search">搜索</el-button>
						<el-button type="success" @click="addData" icon="plus">新增</el-button>
					</el-form-item>
				</el-form>
			</el-col>
      <el-col :span="24">
            <!-- <el-button type="primary" size="small" @click="addClasses">添加班次</el-button>
            <div class="clearfix"></div> -->
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>分类名称</th>
                  <th>描述</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in dataList">
                  <td>{{index + 1}}</td>
                  <td>{{item.title}}</td>
                  <td>{{item.description}}</td>
                  <td>
                    <el-button type="primary" icon="edit" size="small" @click="compile(item.id , index)"></el-button>
                    <el-button type="primary" icon="delete" size="small" @click="deleteFlight(item.id)"></el-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
      </el-col>
    </el-row>

    <el-dialog title="指标" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="时间段">
          <el-time-picker v-model="form.soTimeStart" format="HH:mm" placeholder="" @change="calculateSumTime( 1)">
          </el-time-picker>
          -
          <el-time-picker v-model="form.soTimeEnd" format="HH:mm"  placeholder="" @change="calculateSumTime( 2)">
          </el-time-picker>
        </el-form-item>

        <el-form-item label="总时间">
          <span>{{totalTime}}</span>
        </el-form-item>
        <el-form-item label="班次类型">
          <el-radio-group v-model="form.fightType">
            <el-radio-button label="0">工作</el-radio-button>
            <el-radio-button label="1">非工作</el-radio-button>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import { getKpiClassifyList , updataKpiClassify , deleteKpiClassify } from "@/api/oa"


export default {
  data() {
    return {
      fullscreenLoading:true,
      classList: null,
      dataList:[],
      dialogFormVisible: false,
      search: {
        pageNum: 1,
        pageSize: 10,
        title:null
      },
      total: 0,
      form: {
        title: null,
      }
    }
  },
  methods: {
    submitForm(){
      updataKpiClassify(this.form).then(res => {
        if (res.httpCode == 200) {
          this.$message({
            type: 'success',
            message: '成功!'
          });
          this.readData();
        } else {
          this.$message({
            type: 'info',
            message: '失败'
          });
        }
        this.dialogFormVisible = false;
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '失败'
        });
        this.dialogFormVisible = false;
      })
    },
    compile(sid , index){
      this.form = Object.assign({}, this.dataList[index]); // 把当前信息赋值给空内容，准备修改
      this.dialogFormVisible = true
    },
    deleteFlight(sid){
      // console.log(sid);
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteKpiClassify({id:sid}).then(res => {
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
    readData() {
      this.fullscreenLoading = true;
      getKpiClassifyList(this.search).then(response => {
        this.dataList = response.data
        console.log(response)
        this.total = response.total // 总条数
        this.fullscreenLoading = false;
      }).catch(error => {
        console.log(error)
        this.$message.error(error.msg);
        this.fullscreenLoading = false;
      })
    },
    addData(){
      this.form = new Object();
      this.form.title = '';
      this.dialogFormVisible=true;
    },
    handleSizeChange(val) {
      this.search.pageSize = val
      this.readData()
    },

    handleCurrentChange(val) {
      this.search.pageNum = val
      this.readData()
    },
  },
  mounted() {
    this.readData()
  }

}
</script>
<style lang="scss" scoped>
.panel-stitle {
  line-height: 32px;
  font-size: 15px;
}

.el-date-editor.el-input {
    width: 314px;
}
</style>