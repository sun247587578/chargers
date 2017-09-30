<template>
  <div>
    <el-row>
      <el-form :inline="true" :model="recordList" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="customDepts"  filterable :multiple="true" placeholder="请选择部门">
            <el-option v-for="item in depts" :key="item.id" :value="item.id" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="customUsers" filterable  :multiple="true" placeholder="请选择员工">
            <el-option v-for="item in users" :key="item.id" :value="item.id" :label="item.userName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期范围">
          <el-date-picker v-model="recordList.date" type="date" format="yyyy-MM-dd" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <!-- <el-button type="warning" @click="reset">清空</el-button> -->
          <el-button type="success" @click="reissue" class="pull-right">补卡</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table :data="records" ref="table" style="width: 100%" @current-change="toggleRowSelection" highlight-current-row border>
        <el-table-column prop="userName" label="员工">
        </el-table-column>
        <el-table-column prop="userDept" label="主属部门">
        </el-table-column>
        <el-table-column prop="createDate" label="日期">
        </el-table-column>
        <el-table-column prop="counts" label="当日打卡次数">
        </el-table-column>
        <el-table-column label="实际工作时长">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.allTime | formatDate }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="recordList.pageNum" :page-sizes="[10, 20, 25, 50]" :page-size="recordList.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-row>

    <transition name="slide-fade">
      <div class="sdetail" v-show="showDetail" @click.stop.prevent="">
        <el-row>
          <el-button :plain="true" type="danger" icon="close" class="close" @click="cmdClose"></el-button>
          <el-col :span="18" :offset="2">
            <div class="page-header">
              <h1>{{currentUser.userName}}
                <small>{{currentUser.userDept}}</small>
              </h1>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="line-height: 20px;">签到/签退时间</span>
            </div>
            <!-- <div v-for="item in recordDetailList" class="text item">

                  <el-alert v-if="item.signTime !=null" :title="item.signTime" type="success" :closable="false">
                  </el-alert>
                  <el-alert v-else title="未签到" type="error" :closable="false">
                  </el-alert>
                  <el-alert v-if="item.signOutTime !=null" :title="item.signOutTime" type="warning" :closable="false">
                  </el-alert>
                  <el-alert v-else title="未签退" type="error" :closable="false">
                  </el-alert>
                </div> -->

            <ul class="list-group">
              <template v-for="item in recordDetailList">
                <li v-if="item.signTime !=null" class="list-group-item list-group-item-success">
                  {{item.signTime}} 
                  <span class="label label-warning pull-right" @click="removeData(item)">删除</span>
                  <span class="label label-primary pull-right" style="margin-right:10px"  @click="compile(item)">修改</span>
                </li>
                <li v-else class="list-group-item list-group-item-danger">未签到
                  <!-- <span class="label label-primary pull-right" @click="reissueOut(item)">补卡</span> -->
                </li>
                <li v-if="item.signOutTime !=null" class="list-group-item list-group-item-warning">
                  {{item.signOutTime}} 
                  
                </li>
                <li v-else class="list-group-item list-group-item-danger">未签退
                  <!-- <span class="label label-primary pull-right" @click="reissueOut(item)">补卡</span> -->
                </li>
              </template>
            </ul>
          </el-card>
        </el-row>
        <el-card class="box-card" style="margin-top: 5px;">
          <div slot="header" class="clearfix">
            <span style="line-height: 20px;">打卡位置</span>
          </div>
          <div class="text item">
            <el-alert v-if="recordDetailList[0].signAddress" :title="recordDetailList[0].signAddress" type="success" :closable="false">
            </el-alert>
            <el-alert v-else :title="recordDetailList[0].signOutAddress" type="success" :closable="false">
            </el-alert>
          </div>
        </el-card>
        </el-row>
      </div>
    </transition>

    <el-dialog title="补卡" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="选择人员" :label-width="formLabelWidth">
          <el-select v-model="form.createBy" filterable placeholder="" style="width:100%">
            <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
            <!-- <el-option v-for="item in users" :key="item.id" :value="item.id" :label="item.userName"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="签到时间" :label-width="formLabelWidth">
          <!-- <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select> -->
          <el-date-picker v-model="form.signTime" type="datetime" placeholder="选择日期时间" style="width:100%" @change="sfomartData">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="签退时间" :label-width="formLabelWidth">
          <el-date-picker v-model="form.signOutTime" type="datetime" placeholder="选择日期时间" style="width:100%" @change="sfomartData1">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="reissueSubmit()">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="补卡" :visible.sync="reissueFormVisible">
      <el-form :model="form">
        <el-form-item label="签退时间" :label-width="formLabelWidth">
          <el-date-picker v-model="form2.signOutTime" type="datetime" placeholder="选择日期时间" style="width:100%" @change="sfomartData1">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reissueFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="reissueSubmitOut">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="updataVisible">
      <el-form :model="updataform">
        <el-form-item label="签退时间" :label-width="formLabelWidth">
          <el-date-picker v-model="updataform.signOutTime" type="datetime" placeholder="选择日期时间" style="width:100%" @change="sfomartData2">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="签到时间" :label-width="formLabelWidth">
          <el-date-picker v-model="updataform.signTime" type="datetime" placeholder="选择日期时间" style="width:100%" @change="sfomartData3">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updataVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitOut">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRecordList, getUserAndDept, getRecordByUserId , updateReissue , updataRecordByUserId , deleteRecordByUserId } from "@/api/checking"
import { getUserInfo } from "@/api/oa"

export default {
  data() {
    return {
      
      records: [],  // 查询出来的记录
      recordList: {  // 考勤记录查询对象
        users: '',
        depts: '',
        date: '',
        pageNum: 1,
        pageSize: 10
      },
      userList: [],
      customDepts: [],
      customUsers: [],
      users: [], // 用户信息
      depts: [],  // 部门信息
      total: 0, // 查询出的总记录
      year: 0,
      month: 0,
      day: 0,
      showDetail: false,
      recordDetailList: [{
        signAddress: null,
        signOutAddress: '测试地址'
      }],
      currentUser: {
        userName: '',
        userDept: ''
      },
      form: {
        createBy: '',
        signTime: '',
        signOutTime: '',
        type: 3
      },
      form2:{
        signOutTime:null,  // 小补卡 签退时间
        id:null  //给谁补卡
      },
      updataform:{
        signOutTime:null,  // 小补卡 签退时间
        id:null  //给谁补卡
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      reissueFormVisible:false,
      updataVisible:false
    }
  },
  mounted() {
    this.readUserAndDept()
    this.findList();
    this.getUserList();
  },
  methods: {
    compile(item){
      console.log(item)
      this.updataform = item;
      
      this.updataVisible = true
    },
    removeData(item){
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				deleteRecordByUserId({id:item.id}).then(res => {
					if (res.httpCode == 200) {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.findList();
            this.updataVisible = false;
            this.showDetail = false
					} else {
						this.$message({
							type: 'info',
							message: res.msg
						});
					}
				}).catch(err => {
          this.readData();
          this.showDetail = false
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
        });
        this.showDetail = false
			});
      
    },
    cmdClose() {
      this.showDetail = false
    },
    onSubmitOut(){
      updataRecordByUserId(this.updataform).then(res => {
        if (res.httpCode == '200') {
          this.$message({
            type: 'success',
            message: '成功!'
          });
          this.findList();
          this.updataVisible = false
        } else {
          this.$message({
            type: 'info',
            message: '失败'
          });
        }
        this.updataVisible = false
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '失败'
        });
        this.updataVisible = false
      });
      this.showDetail = false
    },
    reissue() {
      this.dialogFormVisible = true;
    },
    reissueSubmit(){
      updateReissue(this.form).then(res => {
        console.log(res.httpCode == 200)
        if (res.httpCode == '200') {
          this.$message({
            type: 'success',
            message: '成功!'
          });
          this.findList();
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
    reissueOut(obj) {
      console.log(obj)
      this.form2.id = obj.id
      this.form2.signOutTime = obj.signTime
      console.log(this.form2.signOutTime)
      this.reissueFormVisible = true;

    },
    reissueSubmitOut(){
      updateReissue(this.form2).then(res => {
        console.log(res.httpCode == 200)
        if (res.httpCode == '200') {
          this.$message({
            type: 'success',
            message: '成功!'
          });
          this.findList();
          this.showDetail = false
        } else {
          this.$message({
            type: 'info',
            message: '失败'
          });
        }
        this.reissueFormVisible = false
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '失败'
        });
        this.reissueFormVisible = false
      })
    },
    toggleRowSelection(currentRow, oldCurrentRow) {
      let createTime = currentRow.createDate
      let userId = currentRow.createUser
      this.currentUser = currentRow
      let objParams = {
        createTime,
        userId
      }
      getRecordByUserId(objParams).then(response => {
        console.log(response.data)
        this.recordDetailList = response.data
        this.showDetail = true
      }).catch(error => {
        console.log(error)
      })

    },
    reset() {
      let paramObj = {
        users: null,
        depts: null,
        date: null,
        pageNum: 1,
        pageSize: 10
      }
      this.recordList = Object.assign({}, this.recordList, paramObj)
      // this.findList();
    },
    onSubmit() {
      this.findList()
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.recordList.pageSize = val;
      this.recordList.pageNum = 1;
      this.findList()
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.recordList.pageNum = val;
      this.findList()
    },
    handleDate(date) {
      //获取年份
      let year = date.getFullYear();

      //获取当前月份
      let mouth = date.getMonth() + 1;

      //定义当月的天数；
      let days = date.getDate();
      if (mouth < 10) {
        mouth = '0' + mouth;
      }
      if (days < 10) {
        days = '0' + days
      }
      this.year = year
      this.month = mouth
      this.day = days
    },
    sfomartData(va){
      this.form.signTime=va;
    },
    sfomartData1(va){
      this.form.signOutTime=va;
    },
    sfomartData2(va){
      this.updataform.signOutTime=va;
    },
    sfomartData3(va){
      this.updataform.signTime=va;
    },
    findList() {
      this.recordList.depts = this.customDepts.join(',')
      this.recordList.users = this.customUsers.join(',')
      // if (this.recordList.date === '') {    // 第一次读取数据
      //   this.recordList.date = new Date()
      //   // this.recordList.date = '2017-07-20'
      // }
      if (this.recordList.date instanceof Date) { // 表示刚刚从日期选择器里面选择内容
        this.handleDate(this.recordList.date)   // 适配原来日期的处理方案
        this.recordList.date = this.year + '-' + this.month + '-' + this.day
      }
      getRecordList(this.recordList).then(response => {
        console.dir(response)
        this.total = response.total
        this.records = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    readUserAndDept() {
      getUserAndDept().then(response => {
        this.users = response.data.userList
        this.depts = response.data.deptList
      }).catch(error => {

      })
    },
    getUserList() {
      getUserInfo().then(response => {
        console.log(response)
        this.userList = response.data
      }).catch(error => {

      })
    },
  },
  filters: {
    formatDate(difference) {
      difference = difference*1000;
      if (difference >= 60 * 60 * 1000) {
        var thishours = Math.floor(difference / (60 * 60 * 1000));
        difference = difference - thishours * (60 * 60 * 1000);
        var thisMins = Math.floor(difference / (60 * 1000));
        return thishours + '小时' + thisMins + '分钟';
      } else if (difference >= 60 * 1000) {
        return Math.floor(difference / (60 * 1000)) + '分钟';
      } else {
        return Math.floor(difference / 1000) + '秒';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sdetail {
  position: fixed;
  top: 60px;
  right: 0px;
  width: 600px;
  height: 100%;
  padding-bottom: 60px;
  background: #fff;
  -webkit-box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.2), -2px 2px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.2), -2px 2px 2px rgba(0, 0, 0, 0.2);
  overflow: auto;
  z-index: 2;
  .close {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}

.text {
  font-size: 14px;
}

.item {
  padding: 5px 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  margin: 0 auto;
  width: 560px;
}

.el-card__body {
  padding: 10px;
}

.el-card__header {
  padding: 10px 20px;
  border-bottom: 1px solid #d1dbe5;
  box-sizing: border-box;
}

.list-group-item-warning {
  color: #8a6d3b;
  background-color: #fcf8e3;
  >span{
    cursor: pointer;
  }
}

.list-group-item-success {
  color: #3c763d;
  background-color: #dff0d8;
  >span{
    cursor: pointer;
  }
}

.list-group-item-danger {
  color: #a94442;
  background-color: #f2dede;
  span {
    cursor: pointer;
  }
}




/* 可以设置不同的进入和离开动画 */


/* 设置持续时间和动画函数 */

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */

{
  transform: translateX(10px);
  opacity: 0;
}
</style>