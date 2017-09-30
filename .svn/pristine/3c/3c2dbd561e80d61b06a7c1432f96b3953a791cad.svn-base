<template>
  <div>

    <el-row>

      <el-col :span="24">

        <el-form :inline="true" :model="search" class="demo-form-inline">

          <el-form-item>

            <el-select v-model="search.deptId" filterable placeholder="部门">

              <el-option v-for="item in deptList" :key="item.id" :label="item.deptName" :value="item.id"></el-option>

            </el-select>

          </el-form-item>

          <el-form-item>

            <el-select v-model="search.userId" filterable placeholder="员工">

              <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>

            </el-select>

          </el-form-item>

          <el-form-item>

            <el-button type="primary" icon="search" @click="readData">查询</el-button>

            <el-button type="warning" icon="delete2" @click="clearSearch">清空</el-button>

            <el-button type="success" icon="plus" @click="addData">添加</el-button>

          </el-form-item>

        </el-form>

      </el-col>

      <el-col :span="24">

        <el-table :data="listData" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border style="width: 120%">

          <!-- <el-table-column type="index" label="序号" min-width="120"></el-table-column> -->

          <!-- <el-table-column prop="createTime" label="公司" min-width="200"></el-table-column> -->

          <el-table-column prop="deptName" label="部门" min-width="150"> </el-table-column>

          <el-table-column prop="userName" label="员工" min-width="150"> </el-table-column>

          <!-- <el-table-column prop="labSubmitProjects" label="员工" :formatter="stateFormat" min-width="120"> </el-table-column> -->

          <!-- <el-table-column prop="cardnumber" label="证件编号" min-width="300"></el-table-column>
      
        
      
                    <el-table-column prop="cardtype" label="证件类别" min-width="120"></el-table-column>
      
        
      
                    <el-table-column prop="cardclass" label="证件大类" min-width="120"></el-table-column>
      
        
      
                    <el-table-column prop="state" label="证件状态" min-width="120"></el-table-column>
      
        
      
                    <el-table-column prop="receivedate" label="授予日期" min-width="300" :formatter="stateFormat1"></el-table-column>
      
        
      
                    <el-table-column prop="headdate" label="有效期" min-width="300" :formatter="stateFormat1"></el-table-column>
      
        
      
                    <el-table-column prop="fzjg" label="发证机关" min-width="300"></el-table-column>
      
        
      
                    <el-table-column prop="ifcheck" label="是否要复检" :formatter="stateFormat" min-width="120"></el-table-column>
      
        
      
                    <el-table-column prop="nestcheck" label="上次复检日" min-width="300" :formatter="stateFormat1"></el-table-column>
      
        
      
                    <el-table-column prop="lastcheck" label="下次复检日" min-width="300" :formatter="stateFormat1"></el-table-column>
      
        
      
                    <el-table-column prop="checkperson" label="保管人" min-width="120"></el-table-column>
      
        
      
                    <el-table-column prop="savedate" label="保管日期" min-width="300" :formatter="stateFormat1"></el-table-column> -->

          <el-table-column prop="trainstyle" label="培训方式" min-width="300"></el-table-column>

          <el-table-column prop="pxxg" label="培训效果" min-width="120"></el-table-column>

          <el-table-column prop="pxteacher" label="培训教师" min-width="300"></el-table-column>

          <el-table-column prop="beginDate" label="开始日期" min-width="300" :formatter="stateFormat1"></el-table-column>

          <el-table-column prop="endDate" label="结束日期" min-width="300" :formatter="stateFormat1"></el-table-column>

          <el-table-column prop="pxts" label="培训天数" min-width="300"></el-table-column>

          <el-table-column prop="pxcj" label="培训成绩" min-width="300"></el-table-column>

          <el-table-column prop="pxjf" label="培训积分" min-width="300"></el-table-column>

          <el-table-column prop="pxfy" label="培训费用/元" min-width="300"></el-table-column>

          <el-table-column prop="cardnumber" label="证书号" min-width="300"></el-table-column>

          <el-table-column prop="orgdept" label="组织单位" min-width="300"></el-table-column>

          <el-table-column prop="pxjg" label="培训机构" min-width="300"></el-table-column>

          <el-table-column prop="traincontent" label="培训内容" min-width="300"></el-table-column>

          <el-table-column prop="docnumber" label="培训单据编号" min-width="300"></el-table-column>

          <el-table-column fixed="right" label="操作" width="120">

            <template scope="scope">

              <el-button type="text" @click.native.prevent="lookDetil( scope.$index)" size="small">查看</el-button>

              <el-button type="text" @click.native.prevent="removeData( scope.$index)" size="small">删除</el-button>
</template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="奖励" :visible.sync="detailIO">
      <table class="table tableOcc">
        <tr>
          <td style="width:120px">部门 : </td>
          <td>
            <el-select v-model="form.deptId" filterable placeholder="部门" @change="filterUser" style="width:100%">
              <el-option v-for="item in deptList" :key="item.id" :label="item.deptName" :value="item.id"></el-option>
            </el-select>
          </td>
          <td>员工 : </td>
          <td style="text-align: left;">
            <el-select v-model="form.userId" filterable placeholder="员工" style="width:100%">
              <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>培训分类 : </td>
          <td>
            <el-input v-model="form.traintype"></el-input>
          </td>
          <td>培训方式 : </td>
          <td>
            <el-input v-model="form.trainstyle"></el-input>
          </td>
        </tr>
        <tr>
          <td>开始日期 : </td>
          <td>
            <el-date-picker v-model="form.beginDate" type="date" placeholder="" style="width:100%" @change="sfomartData">
            </el-date-picker>
          </td>
          <td>结束日期 : </td>
          <td>
            <el-date-picker v-model="form.endDate" type="date" placeholder="" style="width:100%" @change="sfomartData1">
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td>培训效果 : </td>
          <td>
            <el-input v-model="form.pxxg"></el-input>
          </td>
          <td>培训教师 : </td>
          <td style="text-align:left">
            <el-input v-model="form.pxteacher"></el-input>
          </td>
        </tr>
        <tr>
          <td>培训成绩 : </td>
          <td>
            <el-input v-model="form.pxcj"></el-input>
          </td>
          <td>培训积分 : </td>
          <td style="text-align:left">
            <el-input v-model="form.pxjf"></el-input>
          </td>
        </tr>
        <tr>
          <td>培训费用(元) : </td>
          <td>
            <el-input v-model="form.pxfy"></el-input>
          </td>
          <td>证书号 : </td>
          <td style="text-align:left">
            <el-input v-model="form.cardnumber"></el-input>
          </td>
        </tr>
        <tr>
          <td>组织单位 : </td>
          <td>
            <el-input v-model="form.orgdept"></el-input>
          </td>
          <td>培训机构 : </td>
          <td style="text-align:left">
            <el-input v-model="form.pxjg"></el-input>
          </td>
        </tr>
        <tr>
          <td>单据编号 : </td>
          <td colspan="3">
            <el-input v-model="form.docnumber"></el-input>
          </td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="5">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </td>
        </tr>

      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailIO = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import {
  readTranList,
  deleteTran,
  updataTran
} from "@/api/hr"



import {
  getUserInfo,
  getDeptInfo
} from "@/api/oa"

export default {
  data() {
    return {
      fullscreenLoading: false,
      deptList: [],
      userList: [],

      userListcus: [],

      listData: [],

      search: {

        deptId: '',

        userId: '',

        pageNum: 1,

        pageSize: 10,

      },

      form: {
        deptId: null,

        userId: null,

        beginDate: null,

        cardnumber: null,

        createBy: null,

        createTime: null,

        docnumber: null,

        enable: null,

        endDate: null,

        keyword: null,

        orgdept: null,

        other1: null,

        other2: null,

        pxcj: null,

        pxfy: null,

        pxjf: null,

        pxjg: null,

        pxteacher: null,

        pxtime: null,

        pxts: null,

        pxxg: null,

        remark: null,

        tenantId: null,

        traincontent: null,

        trainstyle: null,

        traintype: null,

        ydqx: null,
      },


      formcus: {

        deptId: null,

        userId: null,

        beginDate: null,

        cardnumber: null,

        createBy: null,

        createTime: null,
        
        docnumber: null,

        enable: null,

        endDate: null,

        keyword: null,

        orgdept: null,

        other1: null,

        other2: null,

        pxcj: null,

        pxfy: null,

        pxjf: null,

        pxjg: null,

        pxteacher: null,

        pxtime: null,

        pxts: null,

        pxxg: null,

        remark: null,

        tenantId: null,

        traincontent: null,

        trainstyle: null,

        traintype: null,

        ydqx: null,

      },

      selectChange: {

        deptName: '',

        position: ''

      },

      selectChangecus: {
        deptName: '',
        position: ''
      },
      total: 0,
      detailIO: false,
    }
  },
  methods: {
    clearSearch() {
      this.search.userId = "";
      this.search.deptId = "";
    },
    sfomartData(va) {
      this.form.beginDate = va;
    },
    sfomartData1(va) {
      this.form.endDate = va;
    },
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
    filterUser(sid) {
      let newUserList = new Array();
      this.userListcus.forEach((v, i) => {
        if (v.deptId == sid) {
          newUserList.push(v)
        }
      })
      this.userList = Object.assign({}, newUserList)
    },
    onSubmit() {
      updataTran(this.form).then(res => {
        if (res.httpCode == 200) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.readData();
          this.detailIO = false;
        } else {
          console.log(res)
          this.$message({
            type: 'info',
            message: res.msg
          });
        }

      }).catch(err => {
        console.log(error)
        this.$message({
          type: 'info',
          message: '操作失败'
        });
      })
    },
    lookDetil(index) {
      this.form = this.listData[index];
      this.detailIO = true;
    },
    findUserDetail(sid) {
      this.userList.forEach((v, i) => {
        if (v.id === sid) {
          this.form.deptId = v.deptId;
          this.selectChange = v;
        }
      })
    },
    removeData(index) {
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTran({
          id: this.listData[index].id
        }).then(res => {
          if (res.httpCode == 200) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.readData();
          } else {
            this.$message({
              type: 'info',
              message: '操作失败'
            });
          }
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '操作失败'
          });
        })
      }).catch((res) => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    quxiao() {
      this.detailIO = true;
    },
    addData() {
      this.form = Object.assign({}, this.formcus)
      this.selectChange = Object.assign({}, this.selectChangecus)
      this.detailIO = true;
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
      readTranList(this.search).then(response => {
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
    getUserDeptList() {
      getUserInfo().then(response => {
        console.log(response)
        this.userList = response.data
        this.userListcus = response.data
      }).catch(error => {
      })
      getDeptInfo().then(response => {
        this.deptList = response.data
      }).catch(error => {
      })
    },
  },
  mounted() {
    this.getUserDeptList();
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