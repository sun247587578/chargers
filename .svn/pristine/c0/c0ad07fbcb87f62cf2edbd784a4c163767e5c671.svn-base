<template>
  <div>
    <el-row v-if="detailIO">
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
        <!-- <occupational-injury :sdata="listData"></occupational-injury> -->
        <el-table :data="listData" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border style="width: 120%">
          <el-table-column prop="deptName" label="部门" min-width="150"> </el-table-column>
          <el-table-column prop="userName" label="员工" min-width="150"> </el-table-column>

          <!-- <el-table-column prop="cardtype" label="证件类别" min-width="120"></el-table-column>
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

          <el-table-column prop="cardnumber" label="身份证号" min-width="300"></el-table-column>
          <el-table-column prop="tel" label="联系电话" min-width="120"></el-table-column>
          <el-table-column prop="mobil" label="手机" min-width="300"></el-table-column>
          <el-table-column prop="hurrytel" label="紧急联系电话" min-width="300"></el-table-column>
          <el-table-column prop="workDate" label="参加工作日期" min-width="300" :formatter="stateFormat1"></el-table-column>
          <el-table-column prop="checkType" label="工伤种类" min-width="300"></el-table-column>
          <el-table-column prop="checkdate" label="工伤日期" min-width="300" :formatter="stateFormat1"></el-table-column>
          <el-table-column prop="gsjddate" label="工伤鉴定日期" min-width="300" :formatter="stateFormat1"></el-table-column>
          <el-table-column prop="docnumber" label="单据号" min-width="300"></el-table-column>
          <el-table-column prop="state" label="处理状态" min-width="300"></el-table-column>
          <el-table-column prop="checkbegindate" label="医疗开始时间" min-width="300" :formatter="stateFormat1"></el-table-column>
          <el-table-column prop="checkenddate" label="医疗结束时间" min-width="300" :formatter="stateFormat1"></el-table-column>
          <el-table-column prop="cost" label="医疗费用/元" min-width="300"></el-table-column>
          <el-table-column prop="scbuj" label="伤残补助金/元" min-width="300"></el-table-column>
          <el-table-column prop="ylbuj" label="医疗补助金/元" min-width="300"></el-table-column>
          <el-table-column prop="ylbujsb" label="医疗补助金社保部分" min-width="300"></el-table-column>
          <el-table-column prop="ylbujgs" label="医疗补助金公司部分" min-width="300"></el-table-column>
          <el-table-column prop="jybzj" label="就业补助金/元" min-width="300"></el-table-column>
          <el-table-column prop="jybzjsb" label="就业补助金社保部分" min-width="300"></el-table-column>
          <el-table-column prop="jybzjgs" label="就业补助金公司部分" min-width="300"></el-table-column>
          <el-table-column prop="gspart" label="工伤部位" min-width="300"></el-table-column>
          <el-table-column prop="gsreason" label="工伤原因" min-width="300"></el-table-column>
          <el-table-column prop="process" label="处理过程" min-width="300"></el-table-column>
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
    <div v-else>
      <table class="table tableOcc">
        <tr>
          <td style="width:150px">部门 : </td>
          <td>
            <el-select v-model="form.deptId" filterable placeholder="部门" @change="filterUser" style="width:100%">
              <el-option v-for="item in deptList" :key="item.id" :label="item.deptName" :value="item.id"></el-option>
            </el-select>
          </td>
          <td style="width:150px">员工姓名 : </td>
          <td>
            <el-select v-model="form.userId" filterable placeholder="员工" style="width:100%">
              <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
            </el-select>
          </td>
          <td style="width:150px">工伤日期 : </td>
          <td> 
            <el-date-picker v-model="form.checkdate" type="date" placeholder="选择日期" style="width:100%" @change="sfomartData">
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td>身份证号 : </td>
          <td>
            <el-input v-model="form.cardnumber"></el-input>
          </td>
          <td>联系电话 : </td>
          <td>
            <el-input v-model="form.tel"></el-input>
          </td>
          <td>手机 : </td>
          <td>
            <el-input v-model="form.mobil"></el-input>
          </td>
        </tr>
        <tr>
          <td>紧急联系电话 : </td>
          <td>
            <el-input v-model="form.hurrytel"></el-input>
          </td>
          <td>参加工作日期 : </td>
          <td conspan = "3">
            <el-date-picker v-model="form.workDate" type="date" placeholder="选择日期" style="width:100%" @change="sfomartData1">
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td>处理状态 : </td>
          <td>
            <el-input v-model="form.state"></el-input>
          </td>
          <td>单据号 : </td>
          <td>
            <el-input v-model="form.docnumber"></el-input>
          </td>
          <td>工伤部位 : </td>
          <td>
            <el-input v-model="form.gspart"></el-input>
          </td>
        </tr>
        <tr>
          <td>工伤原因</td>
          <td colspan="5">
            <el-input v-model="form.gsreason" type="textarea"></el-input>
          </td>
        </tr>
        <tr>
          <td>医疗开始日期 : </td>
          <td>
            <el-date-picker v-model="form.checkbegindate" type="date" placeholder="选择日期" style="width:100%" @change="sfomartData2">
            </el-date-picker>
          </td>
          <td>医疗结束日期 : </td>
          <td>
            <el-date-picker v-model="form.checkenddate" type="date" placeholder="选择日期" style="width:100%" @change="sfomartData3">
            </el-date-picker>
          </td>
          <td>医疗费用 : </td>
          <td>
            <el-input v-model="form.cost"></el-input>
          </td>
        </tr>
        <tr>
          <td>伤残补助金 : </td>
          <td>
            <el-input v-model="form.scbuj"></el-input>
          </td>
          <td>工伤鉴定日期 : </td>
          <td>
            <el-date-picker v-model="form.gsjddate" type="date" placeholder="选择日期" style="width:100%" @change="sfomartData4">
            </el-date-picker>
          </td>
          <td>工伤种类 : </td>
          <td>
            <el-input v-model="form.checkType"></el-input>
          </td>
        </tr>
        <tr>
          <td>就业补助金 : </td>
          <td>
            <el-input v-model="form.jybzj"></el-input>
          </td>
          <td>就业补助金社保部分 : </td>
          <td>
            <el-input v-model="form.jybzjsb"></el-input>
          </td>
          <td>就业补助金公司部分 : </td>
          <td>
            <el-input v-model="form.jybzjgs"></el-input>
          </td>
        </tr>
        <tr>
          <td>医疗补助金 : </td>
          <td>
            <el-input v-model="form.ylbuj"></el-input>
          </td>
          <td>医疗补助金社保部分 : </td>
          <td>
            <el-input v-model="form.ylbujsb"></el-input>
          </td>
          <td>医疗补助金公司部分 : </td>
          <td>
            <el-input v-model="form.ylbujgs"></el-input>
          </td>
        </tr>
        <tr>
          <td>备注信息 : </td>
          <td>
            <el-input v-model="form.remark"></el-input>
          </td>
          <td>处理过程 : </td>
          <td colspan="3">
            <el-input v-model="form.process"></el-input>
          </td>
        </tr>
      </table>
      <div style="text-align:center">
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="quxiao">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { readInjuryList , updataInjury , deleteInjury } from "@/api/hr"
import { getUserInfo, getDeptInfo } from "@/api/oa"
import { occupationalInjury } from "./basicCompontent.js"

export default {
  components: {
    occupationalInjury
  },
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
        userId:null,
        cardnumber: "",
        checkType: "",
        checkbegindate: null,
        checkdate: null,
        checkenddate: null,
        cost: null,
        docnumber: "",
        enable: null,
        gsjddate: null,
        gspart: "",
        gsreason: "",
        jybzj: null,
        jybzjgs: null,
        jybzjsb: null,
        mobil: "",
        process: "",
        scbuj: null,
        state: "",
        tel: "",
        tenantId: null,
        workDate: null,
        ylbuj: null,
        ylbujgs: null,
        ylbujsb: null

      },
      formcus: {
        deptId: null,
        userId:null,
        cardnumber: "",
        checkType: "",
        checkbegindate: null,
        checkdate: null,
        checkenddate: null,
        cost: null,
        docnumber: "",
        enable: null,
        gsjddate: null,
        gspart: "",
        gsreason: "",
        jybzj: null,
        jybzjgs: null,
        jybzjsb: null,
        mobil: "",
        process: "",
        scbuj: null,
        state: "",
        tel: "",
        tenantId: null,
        workDate: null,
        ylbuj: null,
        ylbujgs: null,
        ylbujsb: null
      },
      total: 0,
      detailIO: true,
    }
  },
  methods: {
    clearSearch() {
      this.search.userId = "";
      this.search.deptId = "";
    },
    sfomartData(va) {
      this.form.checkdate = va;
    },
    sfomartData1(va) {
      this.form.workDate = va;
    },
    sfomartData2(va) {
      this.form.checkbegindate = va;
    },
    sfomartData3(va) {
      this.form.checkenddate = va;
    },
    sfomartData4(va) {
      this.form.gsjddate = va;
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
      updataInjury(this.form).then(res => {
        console.log(res)
        if (res.httpCode == 200) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.readData();
          this.detailIO = true;
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
      this.detailIO = false;
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
        deleteInjury({ id: this.listData[index].id }).then(res => {
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
        console.log(res)
        this.$message({
            type: 'error',
            message: '操作失败'
          });
      });
    },
    quxiao() {
      this.detailIO = true;
    },
    addData() {
      this.form = Object.assign({}, this.formcus)
      this.selectChange = Object.assign({}, this.selectChangecus)
      this.detailIO = false;
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
      readInjuryList(this.search).then(response => {
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