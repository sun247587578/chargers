<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="panel panel-info">
          <div class="panel-heading">
            <span class="panel-stitle">班次设置</span>
            <el-button type="primary" size="small" class="pull-right" @click="addClasses">添加班次</el-button>
            <div class="clearfix"></div>
          </div>
          <div class="panel-body" v-loading="fullscreenLoading" element-loading-text="拼命加载中">
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>班次名称</th>
                  <th>时间段</th>
                  <th>总时间</th>
                  <th>班次类型</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in classList">
                  <td>{{item.flightName}}</td>
                  <td>{{item.soTimeStart}} - {{item.soTimeEnd}}</td>
                  <td>{{item.sumTime}}</td>
                  <td>{{item.fightType == 1 ? '非工作':'工作'}}</td>
                  <td>
                    <el-button type="primary" icon="edit" size="small" @click="updateFlight(item.id , index)"></el-button>
                    <el-button type="primary" icon="delete" size="small" @click="deleteFlight(item.id)"></el-button>
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

    <el-dialog title="班次" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="班次名称">
          <el-input v-model="form.flightName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间段">
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

import { readFlightList , flightUpdate , flightDelete } from "@/api/wk"
import { DiffLong , fmtDate } from "@/utils/index"

function formcus(){
        this.flightName= null,
        this.soTimeStart= null,
        this.soTimeEnd=null,
        this.sumTime= null,
        this.fightType=0
      }


export default {
  data() {
    return {
      fullscreenLoading:true,
      classList: null,
      dialogFormVisible: false,
      search: {
        pageNum: 1,
        pageSize: 10,

      },
      total: 0,
      form: {
        flightName: null,
        soTimeStart: null,
        soTimeEnd: null,
        sumTime: null,
        fightType:0,
      }
    }
  },
  computed:{
    totalTime(){
      let timeNum=null;
      timeNum = this.form.soTimeEnd - this.form.soTimeStart
      if(!isNaN(timeNum)){
        if(timeNum<0){
          timeNum += 24*60*60*1000;
          
          return ""
        }else{
          return DiffLong(timeNum)
        }
        
      }else{
        return " 暂无 "
      }
      
    }
  },
  methods: {
    submitForm(){
      this.form.soTimeEnd = this.fmtHHss(this.form.soTimeEnd)
      this.form.soTimeStart = this.fmtHHss(this.form.soTimeStart)
      console.log(this.form)
      flightUpdate(this.form).then(res => {
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
    // 该函数无用 , 只为了在提交的时候将时间格式达到后台的要求
    fmtHHss(tim){

      let Hour = tim.getHours();
      let Minute = tim.getMinutes();
      if(Hour < 10){
        Hour += '0'
      }
      if(Minute < 10){
        Minute += '0'
      }
      return Hour+':'+Minute
    },
    //格式化时间用于显示
    fmtHHssShow(tim){
      var arr = tim.split(':')
      // console.log(arr)
      var sdate = new Date();
      sdate.setHours(arr[0])
      sdate.setMinutes(arr[1])
      return sdate
    },
    updateFlight(sid , index){
      this.form = Object.assign({}, this.classList[index]); // 把当前信息赋值给空内容，准备修改

      this.form.soTimeEnd = this.fmtHHssShow(this.form.soTimeEnd)
      this.form.soTimeStart = this.fmtHHssShow(this.form.soTimeStart)
      // console.log(this.form.soTimeStart)
      // this.form.soTimeEnd = 
      this.dialogFormVisible = true
    },
    deleteFlight(sid){
      // console.log(sid);
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        flightDelete({id:sid}).then(res => {
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
    calculateSumTime(va , num){
      let totTime = this.form.soTimeEnd - this.form.soTimeStart;
      // this.form.sumTime = this.form.soTimeEnd - this.form.soTimeStart;
      if(!isNaN(totTime)){
        if(totTime<0){
          totTime += 24*60*60*1000
        }
        totTime = DiffLong(totTime)


      }else{
        totTime =  ""
      }
      this.form.sumTime = totTime
      
    },
    readData() {
      this.fullscreenLoading = true;
      // console.log(this.search)
      readFlightList(this.search).then(response => {
        this.classList = response.data
        console.log(response.data)
        this.total = response.total // 总条数
        this.fullscreenLoading = false;
      }).catch(error => {
        console.log(error)
        this.$message.error(error.msg);
        this.fullscreenLoading = false;
      })
    },
    addClasses(){
      this.form = new formcus();
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