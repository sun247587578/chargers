<template>
  <div>
    <el-row>
      <el-form :inline="true" :model="recordList" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="customDepts" filterable  clearable :multiple="true" placeholder="请选择部门">
            <el-option v-for="item in depts" :key="item.id" :value="item.id" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="customUsers" filterable  clearable :multiple="true" placeholder="请选择员工">
            <el-option v-for="item in users" :key="item.id" :value="item.id" :label="item.userName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期范围">
          <el-date-picker v-model="recordList.sdate" format="yyyy-MM" type="month" placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="warning" @click="reset">清空</el-button>
          <el-button type="success" @click="exportXls">导出</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>

    </el-row>
    <el-row>
      <table class="table table-bordered" style="table-layout:fixed">
        <thead>
          <tr>
            <th style="width:100px"></th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
            <th>13</th>
            <th>14</th>
            <th>15</th>
            <th>16</th>
            <th>17</th>
            <th>18</th>
            <th>19</th>
            <th>20</th>
            <th>21</th>
            <th>22</th>
            <th>23</th>
            <th>24</th>
            <th>25</th>
            <th>26</th>
            <th>27</th>
            <th>28</th>
            <th>29</th>
            <th>30</th>
            <th>31</th>
          </tr>
        </thead>
        <tbody id="tbody">

        </tbody>
      </table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="recordList.pageNum" :page-sizes="[10, 20, 25, 50]" :page-size="recordList.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import { getAttendanceRecord, getUserAndDept, exportAttendanceRecord } from "@/api/checking"
import { webUrl } from "@/api/constURL"

export default {
  data () {
    return {
      records: [],  // 查询出来的记录
      recordList: {  // 考勤记录查询对象
        users: '',
        depts: '',
        sdate: new Date(),
        pageNum: 1,
        pageSize: 10
      },
      customDepts: [],
      customUsers: [],
      users: [], // 用户信息
      depts: [],  // 部门信息
      total: 0, // 查询出的总记录
      days: 0,
      month: 0,
      year: 0,
    }
  },
  mounted () {
    this.readUserAndDept()
    this.readAttendanceRecord();
  },
  methods: {
    exportXls () {
      var users = this.recordList.users
      var depts = this.recordList.depts
      var dates = this.recordList.sdate

      let obj = {
        users,
        depts,
        dates
      }

      if (dates === undefined) { // 没有指定月份
        var today = new Date()
        let year = today.getFullYear()
        let month = today.getMonth() + 1
        if (month < 10) {
          month = "0" + month
        }
        obj.dates = year + '-' + month + '-01'  // 把日期型转换为数字型
      } else {  // 指定月份
        if (dates instanceof Date) {
          var today = obj.dates
          let year = today.getFullYear()
          let month = today.getMonth() + 1
          if (month < 10) {
            month = "0" + month
          }
          obj.dates = year + '-' + month + '-01'  // 把日期型转换为数字型
        } else { // 选择日期查询后数据类型会改变成字符串，所以做特殊处理
           obj.dates = dates + '-01'
        }
      }

      // 拼接接口
      let url = webUrl
      let api = '/charger-SCH-Web/viewAttendanceRecord/read/export?'
      let exportUrl = `${url}${api}users=${obj.users}&depts=${obj.depts}&dates=${obj.dates}`
      window.location = exportUrl
    },
    reset () {
      let paramObj = {
        users: null,
        depts: null,
        sdate: new Date(),
        pageNum: 1,
        pageSize: 10
      }
      this.recordList = Object.assign({}, this.recordList, paramObj)
      this.readAttendanceRecord();
    },
    onSubmit () {
      this.readAttendanceRecord()
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);
      this.recordList.pageSize = val;
      this.recordList.pageNum = 1;
      this.readAttendanceRecord()
    },
    handleCurrentChange (val) {
      //console.log(`当前页: ${val}`);
      this.recordList.pageNum = val;
      this.readAttendanceRecord()
    },
    readAttendanceRecord () {
      this.recordList.depts = this.customDepts.join(',')
      this.recordList.users = this.customUsers.join(',')
      if (this.recordList.sdate === null) {    // 第一次读取数据
        this.recordList.sdate = new Date()
      }
      if (this.recordList.sdate instanceof Date) { // 表示刚刚从日期选择器里面选择内容
        this.handleDate(this.recordList.sdate)   // 适配原来日期的处理方案
        this.recordList.sdate = this.year + '-' + this.month
      }

      getAttendanceRecord(this.recordList).then(response => {
        this.handleData(response) // 适配原来的处理方案
        this.total = response.total
      }).catch(error => {
        console.log(error)
      })
    },
    readUserAndDept () {
      getUserAndDept().then(response => {
        this.users = response.data.userList
        this.depts = response.data.deptList
      }).catch(error => {
      })
    },
    handleDate (date) {
      //获取年份
      var year = date.getFullYear();

      //获取当前月份
      var mouth = date.getMonth() + 1;

      //定义当月的天数；
      var days;

      //当月份为二月时，根据闰年还是非闰年判断天数
      if (mouth == 2) {
        days = year % 4 == 0 ? 29 : 28;

      }
      else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days = 31;
      }
      else {
        //其他月份，天数为：30.
        days = 30;
      }
      if (mouth < 10) {
        mouth = '0' + mouth;
      }
      this.month = mouth;
      this.days = days
      for (var i = 0; i < 31 - days; i++) {
        for (var a = 0; a < $('.table-bordered tr').length; a++) {
          $('.table-bordered tr').eq(a).children().eq(31 - i).hide()
        }
      }
      this.year = year;
    },
    handleData (data) { //数据处理
      if (data.httpCode = '200') {
        if (data.data != '' && data.data !== null && JSON.stringify(data.data) !== "{}") {
          $('#tbody').empty();
          for (var a in data.data) {
            var str = '<tr>'
              + '<td>' + a + '</td>'
            for (var b = 1; b < this.days + 1; b++) {
              if (b < 10) {
                b = '0' + b
              }

              if (data.data[a][this.year + '-' + this.month + '-' + b]) {
                var sContent = data.data[a][this.year + '-' + this.month + '-' + b];
                // console.log(sContent.length + "---")
                str += '<td>';
                var sflog = true;
                var str2 = '';
                var xing = '';
                var ww = 0;
                for (var c in sContent) {
                  if (ww != 0) {
                    str2 += ',';
                  }
                  ww++;
                  var flight = sContent[c].flightName == null ? '' : sContent[c].flightName;
                  //  console.log(sContent[c].outNormal)

                  if (sContent[c].outNormal == "0") {
                    sflog = false;
                  }
                  str2 += '<span style="color:green">' + flight + '</span>';
                }
                if (sflog) {
                  str += str2 + '</td>'

                } else {
                  str += '<span style="color:red">▲</span></td>'
                }
              } else {
                str += '<td title="无班次"></td>'
              }
            }
            str += '</tr>'
            $('#tbody').append(str)
          }
        } else {
          $('#tbody').empty();
          var thNum = $('table th').length;
          $("#tbody").append("<tr> <td colspan = '" + thNum + "'>   没有查找到数据！！！</td></tr>");
        }
      } else {
        $('#tbody').empty();
        var thNum = $('table th').length;
        $("#tbody").append("<tr> <td colspan = '" + thNum + "'>   没有查找到数据！！！</td></tr>");
      }
    }
  }
}
</script>

<style>

</style>