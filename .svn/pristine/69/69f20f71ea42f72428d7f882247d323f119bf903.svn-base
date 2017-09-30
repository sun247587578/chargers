<template>
  <div>
    <el-row v-if="detailIO">
      <el-col :span="24">
        <el-form :model="search" :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-date-picker v-model="search.createTime" format="yyyy-MM-dd HH:mm:ss" type="datetime" @change="sfomartData" placeholder="选择开始时间">
            </el-date-picker>
            <el-date-picker v-model="search.taskEndDate" type="datetime" placeholder="选择结束时间" @change="sfomartData1">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <!-- <el-select placeholder="班次" v-model="search.classesId">
                          <el-option v-for="item in classesList" :label="item.classesName" :value="item.id" :key="item.value"></el-option>
                        </el-select> -->
            <el-input v-model="search.toTime" placeholder="任务名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="readData" icon="search">查询</el-button>
            <el-button type="success" @click="addData" icon="plus">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-table :data="dataList" :fit="true" :resizable="true" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border style="width: 100%">
          <el-table-column type="index" label="序号" width="120">
          </el-table-column>
          <el-table-column prop="taskName" label="任务名称" min-width="200">
          </el-table-column>
          <el-table-column prop="taskLeaderName" label="任务负责人" min-width="200">
          </el-table-column>
          <el-table-column prop="taskCptPercent" label="完成度" min-width="100">
          </el-table-column>
          <el-table-column prop="detectProject" label="完成状态" min-width="200" :formatter="stateFormat">
          </el-table-column>
          <el-table-column prop="createTime" label="开始时间" min-width="300">
          </el-table-column>
          <el-table-column prop="taskEndDate" label="截至时间" min-width="300">
          </el-table-column>
          <!-- <el-table-column prop="verifyState" label="状态" :formatter="stateFormat" width="300">
                          </el-table-column> -->
          <el-table-column fixed="right" label="操作" width="220">
            <template scope="scope">
              <el-button @click="lookDetil(dataList[scope.$index].id)" type="text" size="small">查看</el-button>
              <el-button @click="signDone(dataList[scope.$index].id)" type="text" size="small" v-if="dataList[scope.$index].detectProject == 2">标记已完成</el-button>
              <el-button @click="signDone(dataList[scope.$index].id)" type="text" size="small" v-else>标记未完成</el-button>
              <el-button @click="deleteData(dataList[scope.$index].id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <div v-else>
      <!-- <el-dialog title="任务" :visible.sync="dialogFormVisible"> -->
      <el-form ref="form" :model="form" label-width="150px">
        <table style="width:100%">
          <tr>
            <td>
              <el-form-item label="任务名称">
                <el-input v-model="form.taskName" auto-complete="off"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="负责人">
                <el-select v-model="form.taskLeaderId" placeholder="请选择指标类别" filterable style="width:100%">
                  <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td style="width:50%">
              <el-form-item label="到期日">
                <el-date-picker v-model="form.taskEndDate" type="datetime" placeholder="选择结束时间" @change="sfomartData1" style="width:100%">
                </el-date-picker>
              </el-form-item>
            </td>
            <td style="width:50%">
              <el-form-item label="紧急程度">
                <el-radio-group v-model="form.taskUrgentLevel">
                  <el-radio-button label="0">正常</el-radio-button>
                  <el-radio-button label="1">紧急</el-radio-button>
                  <el-radio-button label="2">非常紧急</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
        </table>

        <el-form-item label="参与人员">
          <el-select v-model="form.indexType" placeholder="请选择指标类别" multiple filterable style="width:100%">
            <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="进度">
          <div>
            <!-- <el-input type="textarea" v-model="form.checkStandard"></el-input> -->
            <el-slider v-model="form.taskCptPercent" show-input :step="10"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="任务详情">
          <vue-editor v-model="form.taskContent" :editorToolbar="customToolbar"></vue-editor>
        </el-form-item>
        <!-- <el-form-item label="是否可用">
            <el-switch v-model="form.enable" on-text="" off-text="" on-value="0" off-value="1">
            </el-switch>
          </el-form-item> -->
        <!-- <el-form-item label="关联任务表单">
            <el-input v-model="form.sort" auto-complete="off"></el-input>
          </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:right">
        <el-button @click="detailIO = true">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
      <!-- </el-dialog> -->
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { readLabDetectionList, readLabDetectionDetail } from "@/api/lab"
import { getMyTaskList, deleteMyTask, updataMyTask, getUserInfo } from "@/api/oa"
import { readbaseClassesList } from "@/api/base"

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      content: '<p></p>',
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['code-block', 'blockquote'],
        [{ 'font': 'picker' }]
      ],
      userList: [],
      dataList: [],
      classesList: [],
      detaildata: {},
      search: {
        pageNum: 1,
        pageSize: 10,
        taskEndDate: null,
        createTime: null,
        taskName: null
      },
      selectList: [],
      form: {
        taskName: null,
        taskEndDate: null,
        taskLeaderId: null,
        taskContent: null,
        taskUrgentLevel: 0,
      },
      formcus: {
        taskName: null,
        taskEndDate: null,
        taskLeaderId: null,
        taskContent: null,
        taskUrgentLevel: 0,
      },
      total: 0,
      detailIO: true,
      fullscreenLoading: true,
      dialogFormVisible: false,
    }
  },
  methods: {
    goBack() {
      this.detailIO = true;
    },
    sfomartData(va) {
      this.search.createTime = va;
    },
    sfomartData1(va) {
      this.search.taskEndDate = va;
    },
    signDone(id) {

    },
    deleteData(id) {

    },
    submitForm() {
      console.log(this.form)
      updataKpi(this.form).then(res => {
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
    stateFormat(row, column) {
      let state = row[column.property];
      switch (state) {
        case 2:
          return "已完成";
        default:
          return "进行中";
      }
    },
    addData() {
      this.form = Object.assign({}, this.formcus);
      this.dialogFormVisible = true;
    },
    lookDetil(sid) {
      console.log(sid)
      this.fullscreenLoading = true;
      readLabDetectionDetail({ id: sid }).then(res => {
        if (res.httpCode == 200) {
          console.log(res)
          this.detaildata = res.data;
          this.fullscreenLoading = false;
          this.detailIO = false;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        this.$message.error('网络出错了');
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
    searchData() {
      console.log(this.search)
      this.readData()
    },
    readClasses() {
      readbaseClassesList({}).then(res => {
        if (res.httpCode == 200) {
          console.log(res)
          this.classesList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(res => {
        this.$message.error(res.msg);
      })
    },
    getUserList() {
      getUserInfo().then(response => {
        console.log(response)
        this.userList = response.data
        // this.userListcus = response.data
      }).catch(error => {

      })
    },
    readData() {
      this.fullscreenLoading = true;
      console.log(this.search)
      // readLabDetectionList(this.search).then(response => {
      //   this.processList = response.data
      //   console.log(response.data)
      //   this.total = response.total // 总条数
      //   this.fullscreenLoading = false;
      // }).catch(error => {
      //   console.log(error)
      //   this.$message.error(error.msg);
      //   this.fullscreenLoading = false;
      // })
      getMyTaskList(this.search).then(response => {
        this.dataList = response.data
        console.log(response.data)
        this.total = response.total // 总条数
        this.fullscreenLoading = false;
      }).catch(error => {
        console.log(error)
        this.$message.error(error.msg);
        // this.fullscreenLoading = false;
      })
    },
  },
  mounted() {
    this.readData();
    this.readClasses();
    this.getUserList();
  }



}
</script>

<style lang="scss" scoped>
.el-table th>.cell {
  word-wrap: normal;
  text-overflow: ellipsis;
  line-height: 30px;
  width: 100%;
  padding-left: 29px;
  box-sizing: border-box;
}
</style>
