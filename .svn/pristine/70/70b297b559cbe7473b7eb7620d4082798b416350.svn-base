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
          <!-- <el-table-column prop="product" label="职工类别" min-width="300"></el-table-column> -->
          <el-table-column prop="moveDate" label="异动日期" min-width="120" :formatter="stateFormat1"></el-table-column>
          <el-table-column prop="moveStyle" label="异动类型" min-width="300"></el-table-column>
          <el-table-column prop="olddept" label="原部门" min-width="300"></el-table-column>
          <el-table-column prop="newpost" label="部门岗位" min-width="300"></el-table-column>
          <el-table-column prop="oldpost" label="原部门岗位" min-width="300"></el-table-column>
          <el-table-column prop="oldlevel" label="原岗位级别" min-width="300"></el-table-column>
          <el-table-column prop="docnumber" label="单据号" min-width="300"></el-table-column>
          <el-table-column prop="state" label="员工状态" min-width="300"></el-table-column>
          <el-table-column prop="leavestyle" label="离职方式" min-width="300"></el-table-column>
          <el-table-column prop="leavereason" label="离职原因" min-width="300"></el-table-column>
          <el-table-column prop="remark" label="备注" min-width="300"></el-table-column>
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
    <el-dialog title="证件管理" :visible.sync="detailIO">
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
            <el-select v-model="form.userId" filterable placeholder="部门" style="width:100%">
              <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <!-- <td>职工类别 : </td>
          <td>
            <el-input v-model="form.cardnumber"></el-input>
          </td> -->
          <td>异动日期 : </td>
          <td colspan="3">
            <el-date-picker v-model="form.moveDate" type="date" placeholder="" style="width:100%" @change="sfomartData">
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td>异动类型 : </td>
          <td>
            <el-input v-model="form.moveStyle"></el-input>
          </td>
          <td>原部门 : </td>
          <td>
            <el-input v-model="form.olddept"></el-input>
            <!-- <el-select v-model="form.userId" filterable placeholder="部门" style="width:100%">
              <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
            </el-select> -->
          </td>
        </tr>
        <tr>
          <td>部门岗位 : </td>
          <td>
            <el-input v-model="form.newpost"></el-input>
          </td>
          <td>原部门岗位 : </td>
          <td style="text-align:left">
            <el-input v-model="form.oldpost"></el-input>
          </td>
        </tr>
        <tr>
          <td>原岗位级别 : </td>
          <td>
            <el-input v-model="form.oldlevel"></el-input>
          </td>
          <td>单据号 : </td>
          <td>
            <el-input v-model="form.docnumber"></el-input>
          </td>
        </tr>
        <tr>
          <td>员工状态 : </td>
          <td>
            <el-input v-model="form.state"></el-input>
          </td>
          <td>离职方式 : </td>
          <td>
            <el-input v-model="form.leavestyle"></el-input>
          </td>
        </tr>
        
        <tr>
          <td>离职原因 :</td>
          <td colspan="5">
            <el-input type="textarea" v-model="form.leavereason"></el-input>
          </td>
        </tr>
        <tr>
          <td>备注 :</td>
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
import { readTransferMoveList , deleteTransferMove , updataTransferMove } from "@/api/hr"
import { getUserInfo, getDeptInfo , getPositionInfo } from "@/api/oa"

export default {
  data() {
    return {
      fullscreenLoading: false,
      deptList: [],
      userList: [],
      positionList:[],
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
        userId:null,
        docnumber:null,
        focus:null,
        focusDes: null,
        leavereason: null,
        leavestyle:null,
        moveDate: null,
        moveStyle: null,
        newcompany: null,
        newdept: null,
        newlevel: null,
        newpost: null,
        oldcompany: null,
        olddept: null,
        oldlevel: null,
        oldpost: null,
        personname: null,
        remarkinfo: null,
        state: null,
        tenantId: null,
        updateFlg: null

      },
      formcus: {
        deptId: null,
        userId:null,
        docnumber:null,
        focus:null,
        focusDes: null,
        leavereason: null,
        leavestyle:null,
        moveDate: null,
        moveStyle: null,
        newcompany: null,
        newdept: null,
        newlevel: null,
        newpost: null,
        oldcompany: null,
        olddept: null,
        oldlevel: null,
        oldpost: null,
        personname: null,
        remarkinfo: null,
        state: null,
        tenantId: null,
        updateFlg: null
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
      this.form.startDate = va;
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
      // console.log(sid)
      let newUserList = new Array();
      this.userListcus.forEach((v, i) => {
        if (v.deptId == sid) {
          newUserList.push(v)
        }
      })
      this.userList = Object.assign({}, newUserList)

    },
    onSubmit() {
      updataTransferMove(this.form).then(res => {
        console.log(res)
        if (res.httpCode == 200) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.readData();
          this.detailIO = false;
        } else {
          this.$message({
            type: 'info',
            message: '操作失败'
          });
        }
      }).catch(err => {
        console.log(err)
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
      console.log(this.listData[index])
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTransferMove({ id: this.listData[index].id }).then(res => {
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
      readTransferMoveList(this.search).then(response => {
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

      });
      getPositionInfo().then(response => {
        this.postionList = response.data
      }).catch(error => {

      });
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