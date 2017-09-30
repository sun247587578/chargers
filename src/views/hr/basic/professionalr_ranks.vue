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

          <el-table-column prop="department" label="系别" min-width="300"></el-table-column>

          <el-table-column prop="professionalType" label="资格类别" min-width="120"></el-table-column>

          <el-table-column prop="major" label="专业" min-width="300"></el-table-column>

          <el-table-column prop="evaluateAgent" label="评审机关" min-width="300"></el-table-column>

          <el-table-column prop="certificateNumber" label="证书编号" min-width="300"></el-table-column>

          <el-table-column prop="certificateIssurer" label="发证机关" min-width="300"></el-table-column>

          <el-table-column prop="sentDate" label="授予日期" min-width="300"></el-table-column>

          <el-table-column prop="companyName" label="证书工作单位" min-width="300"></el-table-column>

          <el-table-column prop="languageType" label="外语语种" min-width="300"></el-table-column>

          <el-table-column prop="languageLevel" label="外语级别" min-width="300"></el-table-column>

          <el-table-column prop="languageMajor" label="外语专业类" min-width="300"></el-table-column>

          <el-table-column prop="passDate1" label="外语通过日期" min-width="300"></el-table-column>

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
    <el-dialog title="职称" :visible.sync="detailIO">
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
          <td>系别 : </td>
          <td>
            <el-input v-model="form.department"></el-input>
          </td>
          <td>资格类别 : </td>
          <td>
            <el-input v-model="form.professionalType"></el-input>
          </td>
        </tr>
        <tr>
          <td>专业 : </td>
          <td>
            <el-input v-model="form.major"></el-input>
          </td>
          <td>评审机关 : </td>
          <td>
            <el-input v-model="form.evaluateAgent"></el-input>
          </td>
        </tr>
        <tr>
          <td>证书编号 : </td>
          <td>
            <el-input v-model="form.certificateNumber"></el-input>
          </td>
          <td>发证机关 : </td>
          <td style="text-align:left">
            <el-input v-model="form.certificateIssurer"></el-input>
          </td>
        </tr>
        <tr>
          <td>授予日期 : </td>
          <td>
            <el-date-picker v-model="form.sentDate" type="date" placeholder="" style="width:100%" @change="sfomartData">
            </el-date-picker>
          </td>
          <td>证书工作单位 : </td>
          <td style="text-align:left">
            <el-input v-model="form.companyName"></el-input>
          </td>
        </tr>
        <tr>
          <td>外语语种 : </td>
          <td>
            <el-input v-model="form.languageType"></el-input>
          </td>
          <td>外语级别 : </td>
          <td style="text-align:left">
            <el-input v-model="form.languageLevel"></el-input>
          </td>
        </tr>
        <tr>
          <td>外语专业类 : </td>
          <td>
            <el-input v-model="form.languageMajor"></el-input>
          </td>
          <td>外语通过日期 : </td>
          <td style="text-align:left">
           <el-date-picker v-model="form.passDate1" type="date" placeholder="" style="width:100%" @change="sfomartData1">
            </el-date-picker>
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

  readProfessionalrRanksList,

  deleteProfessionalrRanks,

  updataProfessionalrRanks

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

        certificateIssurer: null,

        certificateNumber: null,

        clerkName: null,

        companyName: null,

        computerRemark: null,

        computerexamExcuse: null,

        createBy: null,

        createTime: null,

        declareDate1: null,

        declareDate2: null,

        department: null,

        deptId: null,

        deptName: null,

        enable: null,

        evaluateAgent: null,

        excuseReason1: null,

        excuseReason2: null,

        excuseReason3: null,

        keyword: null,

        lanexamExcuse: null,

        languageLevel: null,

        languageMajor: null,

        languageRemark: null,

        languageType: null,

        major: null,

        majortechExcuse: null,

        majortechRemark: null,

        passDate1: null,

        passDate2: null,

        passDate3: null,

        professionalType: null,

        promoptLevel: null,

        promoptLevel2: null,

        remark: null,

        remarkInformation: null,

        sentDate: null,

        subsidiary: null,

      },

      formcus: {


        deptId: null,

        userId: null,

        certificateIssurer: null,

        certificateNumber: null,

        clerkName: null,

        companyName: null,

        computerRemark: null,

        computerexamExcuse: null,

        createBy: null,

        createTime: null,

        declareDate1: null,

        declareDate2: null,

        department: null,

        deptId: null,

        deptName: null,

        enable: null,

        evaluateAgent: null,

        excuseReason1: null,

        excuseReason2: null,

        excuseReason3: null,

        keyword: null,

        lanexamExcuse: null,

        languageLevel: null,

        languageMajor: null,

        languageRemark: null,

        languageType: null,

        major: null,

        majortechExcuse: null,

        majortechRemark: null,

        passDate1: null,

        passDate2: null,

        passDate3: null,

        professionalType: null,

        promoptLevel: null,

        promoptLevel2: null,

        remark: null,

        remarkInformation: null,

        sentDate: null,

        subsidiary: null,

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

      this.form.sentDate = va;

    },

    sfomartData1(va) {

      this.form.passDate1 = va;

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

      updataProfessionalrRanks(this.form).then(res => {

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

        deleteProfessionalrRanks({

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

      readProfessionalrRanksList(this.search).then(response => {

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