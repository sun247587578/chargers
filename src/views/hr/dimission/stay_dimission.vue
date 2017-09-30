<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <!-- <el-form-item>
            <el-select v-model="search.deptId" filterable placeholder="部门">
              <el-option v-for="item in deptList" :key="item.id" :label="item.deptName" :value="item.id"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-select v-model="search.userId" filterable placeholder="员工">
              <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="search.dimissionType" filterable placeholder="离职类型">
              <el-option label="全部" value=""></el-option>
              <el-option label="自动离职" value="自动离职"></el-option>
              <el-option label="退休" value="退休"></el-option>
              <el-option label="病退" value="病退"></el-option>
              <el-option label="辞退" value="辞退"></el-option>
            </el-select>
          </el-form-item> 
          <el-form-item>
            <el-select v-model="search.dimissionReason" filterable placeholder="离职原因">
              <el-option label="全部" value=""></el-option>
              <el-option label="辞职" value="辞职"></el-option>
              <el-option label="辞退" value="辞退"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item> 
          <!-- <el-form-item>
            <el-select v-model="search.dimissionReason" filterable placeholder="状态">
              <el-option label="全部" value=""></el-option>
              <el-option label="辞职" value="辞职"></el-option>
              <el-option label="辞退" value="辞退"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>  -->
          <el-form-item>
            <el-date-picker v-model="search.dimissionApplyDate" type="date" placeholder="申请日期" style="width:100%" @change="searchfomartData"></el-date-picker>
          </el-form-item>
         
          <el-form-item>
            <el-date-picker v-model="search.dimissionEntryDate" type="date" placeholder="入职日期" style="width:100%" @change="searchfomartData2"></el-date-picker>
          </el-form-item> 
          <el-form-item>
            <el-date-picker v-model="search.dimissionEffectDate" type="date" placeholder="离职生效日期" style="width:100%" @change="searchfomartData3"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="search" @click="readData">查询</el-button>
            <el-button type="warning" icon="delete2" @click="clearSearch">清空</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-table :data="listData" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border style="width: 120%">
          <el-table-column type="index" label="序号" width="120"></el-table-column>
          <el-table-column prop="userName" label="员工" min-width="150"> </el-table-column>
          <el-table-column prop="dimissionApplyDate" label="申请日期" min-width="200" :formatter="stateFormat1"></el-table-column>
          <el-table-column prop="dimissionEntryDate" label="入职日期" min-width="200" :formatter="stateFormat1"></el-table-column>
          <el-table-column prop="dimissionEffectDate" label="离职生效日期" min-width="200" :formatter="stateFormat1"></el-table-column>
          <el-table-column prop="dimissionType" label="离职类型" min-width="130"></el-table-column>
          <el-table-column prop="dimissionReason" label="离职原因" min-width="150"></el-table-column>
          <el-table-column prop="content" label="内容" min-width="150"></el-table-column>
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
    <el-dialog title="离职申请" :visible.sync="detailIO">
      <table class="table tableOcc">
        <tr>
          <!-- <td style="width:120px">部门 : </td>
          <td>
            <el-select v-model="form.deptId" filterable placeholder="部门" @change="filterUser" style="width:100%">
              <el-option v-for="item in deptList" :key="item.id" :label="item.deptName" :value="item.id"></el-option>
            </el-select>
          </td> -->
          <td>员工 : </td>
          <td style="text-align: left;" colspan="3">
            <el-select v-model="form.userId" filterable placeholder="员工" style="width:100%">
              <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>申请日期 : </td>
          <td>
            <el-date-picker v-model="form.dimissionApplyDate" type="date" placeholder="" style="width:100%" @change="sfomartData"></el-date-picker>
          </td>
          <td>申请离职日期 : </td>
          <td>
            <el-date-picker v-model="form.dimissionApplyGoDate" type="date" placeholder="" style="width:100%" @change="sfomartData1"></el-date-picker>
          </td>
        </tr>
        <tr>
          <td>入职日期 : </td>
          <td>
            <el-date-picker v-model="form.dimissionEntryDate" type="date" placeholder="" style="width:100%" @change="sfomartData2"></el-date-picker>
          </td>
          <td>离职生效日期 : </td>
          <td>
            <el-date-picker v-model="form.dimissionEffectDate" type="date" placeholder="" style="width:100%" @change="sfomartData3"></el-date-picker>
          </td>
        </tr>
        <tr>
          <td>离职类型 : </td>
          <td>
            <el-select v-model="form.dimissionType" style="width:100%">
              <el-option label="自动离职" value="自动离职"></el-option>
              <el-option label="退休" value="退休"></el-option>
              <el-option label="病退" value="病退"></el-option>
              <el-option label="辞退" value="辞退"></el-option>
            </el-select>
          </td>
          <td>离职原因 : </td>
          <td style="text-align:left">
            <el-select v-model="form.dimissionReason" style="width:100%">
              <el-option label="辞职" value="辞职"></el-option>
              <el-option label="辞退" value="辞退"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>内容</td>
          <td colspan="5">
            <el-input type="textarea" v-model="form.content"></el-input>
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
import { readYetDimissionList , deleteDimissionApply , updataDimissionApply } from "@/api/hr"
import { getUserInfo, getDeptInfo } from "@/api/oa"

export default {
  data() {
    return {
      fullscreenLoading: false,
      deptList: [],
      userList: [],
      userListcus: [],
      listData: [],
      search: {
        dimissionType: '',
        dimissionReason: '',
        dimissionApplyDate: null,
        dimissionApplyGoDate: null,
        dimissionEntryDate: null,
        dimissionEffectDate: null,
        userId: '',
        pageNum: 1,
        pageSize: 10,
      },
      form: {
        deptId: null,
        userId:null,
        dimissionApplyDate: null,
        dimissionApplyGoDate: null,
        dimissionEntryDate: null,
        dimissionEffectDate: null,
        dimissionType: null,
        dimissionReason: null,
        content: null,
      },
      formcus: {
        deptId: null,
        userId:null,
        dimissionApplyDate: null,
        dimissionApplyGoDate: null,
        dimissionEntryDate: null,
        dimissionEffectDate: null,
        dimissionType: null,
        dimissionReason: null,
        content: null,
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
      this.search.dimissionType = "";
      this.search.dimissionReason = "";
      this.search.dimissionApplyDate = "";
      this.search.dimissionApplyGoDate = "";
      this.search.dimissionEntryDate = "";
      this.search.dimissionEffectDate = "";
    
    },
    sfomartData(va) {
      this.form.dimissionApplyDate = va;
    },
    sfomartData1(va) {
      this.form.dimissionApplyGoDate = va;
    },
    sfomartData2(va) {
      this.form.dimissionEntryDate = va;
    },
    sfomartData3(va) {
      this.form.dimissionEffectDate = va;
    },
    searchfomartData(va) {
      this.search.dimissionApplyDate = va;
    },
    searchfomartData1(va) {
      this.search.dimissionApplyGoDate = va;
    },
    searchfomartData2(va) {
      this.search.dimissionEntryDate = va;
    },
    searchfomartData3(va) {
      this.search.dimissionEffectDate = va;
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
      updataDimissionApply(this.form).then(res => {
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
        deleteDimissionApply({ id: this.listData[index].id }).then(res => {
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
      readYetDimissionList(this.search).then(response => {
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