<template>
  <div style="padding-top:10px">
    <el-row :gutter="5" style="margin-right:0px">
      <el-col :span="4">
        <el-tree :data="deptList" style="overflow:auto" ref="checkImg" id="stree" :props="defaultProps" node-key="id" @node-click="nodeClick"></el-tree>
      </el-col>
      <el-col :span="20">
        <div class="toolbar">
          <el-row>
            <el-col :span="8">
              <span>{{companyName}}</span>
              <el-input style="display:line-block;width: 160px;" placeholder="值可以是账号,用户名,电话" icon="search" v-model="search.keyword" :on-icon-click="handleIconClick" @click.enter="handleIconClick">
              </el-input>
            </el-col>
            <el-col :span="6" :offset="10">
              <el-button type="text" icon="plus" @click="addUser">添加员工</el-button>
              <el-button type="text" @click="importData">批量导入</el-button>
              <el-button type="text">批量导出</el-button>
            </el-col>
          </el-row>
        </div>
        <el-table :data="userList" border v-loading="loadTableDate" style="width: 100%">
          <el-table-column prop="userName" label="员工">
          </el-table-column>
          <el-table-column prop="account" label="账号" min-width="120">
          </el-table-column>
          <el-table-column prop="deptName" label="主属部门" min-width="120">
          </el-table-column>
          <!-- <el-table-column prop="" label="领导部门">
              </el-table-column> -->
          <el-table-column prop="otherDeptName" label="附属部门">
          </el-table-column>
          <el-table-column prop="position" label="职务" min-width="200">
          </el-table-column>
          <el-table-column prop="phone" label="手机" min-width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="100">
            <template scope="scope">
              <el-button type="text" size="small" @click="editInfo(scope.$index,scope.row)">编辑</el-button>
              <el-dropdown @command="handleCommand($event,scope.$index)" trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <!-- <el-dropdown-item command="3">禁止登陆</el-dropdown-item> -->
                  <el-dropdown-item command="1">重置密码</el-dropdown-item>
                  <!-- <el-dropdown-item command="5">设置权限</el-dropdown-item> -->
                  <!-- <el-dropdown-item command="2">停用</el-dropdown-item> -->
                  <el-dropdown-item command="4">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[15, 25, 50, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>

    </el-row>
    <!-- 对话框 -->
    <!--添加或者更新用户对户框 -->
    <el-dialog title="用户信息" :visible.sync="dialogUserInfo">

      <el-form :model="userInfo" :rules="rules" ref="ruleForm">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="userInfo.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
          <el-input v-model="userInfo.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input type="email" v-model="userInfo.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="userInfo.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="userInfo.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="userInfo.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="入职时间" :label-width="formLabelWidth">
          <el-date-picker v-model="userInfo.entryTime" type="date" placeholder="选择日期" @change="sfomartData">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model="userInfo.staffNo" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="主属部门" :label-width="formLabelWidth">
          <el-select v-model="userInfo.deptId" filterable placeholder="" style="width:100%" @change="filterPosition">
            <el-option value="0" label="无"></el-option>
            <el-option v-for="item in deptInfo" :key="item.id" :label="item.deptName" :value="item.id"></el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="附属部门" :label-width="formLabelWidth">
          <el-select v-model="userInfo.otherDeptId" filterable placeholder="" style="width:100%">
            <el-option value="0" label="无"></el-option>
            <el-option v-for="item in deptInfo" :key="item.id" :label="item.deptName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位" :label-width="formLabelWidth">
          <el-select v-model="userInfo.positionId" placeholder="" style="width:100%">
            <el-option value="0" label="无"></el-option>
            <el-option v-for="item in positionList" :key="item.id" :label="item.positionTitle" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级" :label-width="formLabelWidth">
          <el-select v-model="userInfo.userSuperior" filterable placeholder="" style="width:100%">
            <el-option value="0" label="无"></el-option>
            <el-option v-for="a in userAllList" :key="a.id" :label="a.userName" :value="a.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserInfo = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 批量导入 -->
    <el-dialog title="数据导入" :visible.sync="dialogImportData">
      <h3>操作步骤:</h3>
      <p>1、下载《用户批量导入模板》</p>
      <p>2、打开下载表，将对应字段信息输入或者粘贴进本表。为保障粘贴信息被有效导入,请使用唇纹版或数字</p>
      <p>3、信息输入完毕，点击“浏览”按钮，选择excel文档</p>
      <p>4、点击“开始导入”,导入中如有任何疑问，请致电-------</p>
      <p>
        <a href="">立即下载《用户批量导入模板》</a>
      </p>
      <el-upload class="upload-demo" ref="upload" action="" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip"></div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogImportData = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
let id = 1000;

import { readDeptList, readUserList, updateUser, deleteUser, userSuperiorList, setUserStatus, getDeptInfo, getUserInfo, readsysPosition, getPositionInfo } from "@/api/oa"
import { resetPassword } from "@/api/login"

export default {
  name: 'UserDepartment',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== this.form.password) {
          callback(new Error('确认密码输入错误，请重新输入'));
      } else {
          callback();
      }
    };
    return {
      fileList: [],
      dialogImportData: false, //导入数据对话框
      loadTableDate: false,
      dialogUserInfo: false,
      formLabelWidth: '100px',
      isNew: true, // 用户信息是编辑模式还是增加模式
      editIndex: 0, // 编辑模式下，用户内容所在的索引
      search: {
        pageNum: 1,
        pageSize: 15,
        keyword: null,
        enable: 1,
        deptId: null,
        deptIdKey: null,
      },
      total: 0,
      companyName: '', // 公司名称 
      userList: [], // 用户列表
      defaultProps: {
        children: 'children',
        label: 'deptName'
      },
      deptList: [],
      deptListJiHe: [],//部门的list集合
      userInfo: {  // 绑定表单的用户信息
      },
      deptInfo: [], // 部门信息
      userAllList: [],
      sysPositionList: [],
      positionList: [],
      tempUserInfo: {  // 临时用户信息
        account: "",
        password: "",
        userName: "",
        sex: '1',
        phone: "",
        email: "",
        entryTime: "",
        staffNo: "",
        deptId: "",
        otherDeptId: "",
        positionId: "",
        userSuperior: '',
      },
      rules: {
        password: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        account: [
            { required: true, message: '请输入用户帐号', trigger: 'blur' }
        ],
        userName: [
            { required: true, message: '请输入用户名称', trigger: 'blur' }
        ]
      }
    }
  },
  
  methods: {
    getDept() {
      getDeptInfo().then(response => {
        this.deptInfo = response.data
      }).catch(error => {
        console.log('调用获取部门信息出错')
      })
    },
    filterPosition() {
      // getPositionInfo({ deptId: this.userInfo.deptId }).then(response => {
      //   console.log(response)
      //   this.sysPositionList = response.data;
      // }).catch(error => {
      // })
      // let newObj = new Object();
      // $.extend(true, newObj, this.sysPositionList);
      // if(this.userInfo.deptId == "0"){
      //   alert(this.userInfo.deptId);
      console.log(this.userInfo.deptId)
      // this.userInfo.positionId='0'
      this.positionList = [];
        this.sysPositionList.forEach((v , i)=>{
          if(v.deptId == this.userInfo.deptId){
            this.positionList.push(v)
          }
        })
      // }else{
      //    this.positionList = Object.assign({},this.sysPositionList)
      // }
      
    },
    sfomartData(va) {
      this.userInfo.entryTime = va;
    },
    getUser() {
      getUserInfo().then(response => {
        this.userAllList = response.data
      }).catch(error => {
        console.log('调用人员信息出错')
      })

    },
    getPostion() {
      getPositionInfo({}).then(response => {
        console.log(response)
        this.sysPositionList = response.data
        this.positionList = response.data
      }).catch(error => {
        console.log('调用人员信息出错')
      })

    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    importData() {
      this.fileList.splice(0)
      this.$nextTick(() => {
        this.dialogImportData = true
      })
    },

    importDataToBack() {
      this.dialogImportData = false
    },
    exportData() {

    },
    handleCommand($event, index) {
      console.log($event)
      // 1、获取id和修改状态
      let status = $event
      let id = this.userList[index].id

      if ($event == 1) {
        this.$confirm('密码将会重置为123456, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resetPassword({ id }).then(response => {
            switch (response.httpCode) {
              case 200:
                this.$notify.success({
                  title: '提示',
                  message: '密码重置成功'
                })
                break;

              default:
                break;
            }
          }).catch(error => {
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      } else if ($event == 4) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser({ id }).then(response => {
            console.log(response)
            switch (response.httpCode) {
              case 200:
                this.$notify.success({
                  title: '提示',
                  message: '删除成功'
                });
                this.userList.splice(index, 1)
                break;

              default:
                break;
            }
          }).catch(error => {
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }else if ($event == 5) {
        alert(1)
      }
      // 2、后台修改 deleteUser
      // setUserStatus(id, status).then(response => {
      //   switch (response.httpCode) {
      //     case 200:
      //       this.$notify.success({
      //         title: '提示',
      //         message: '用户状态设置成功'
      //       })
      //       break;

      //     default:
      //       break;
      //   }
      // }).catch(error => {
      // })
    },

    editInfo(index) {
      this.editIndex = index
      this.userInfo = Object.assign({}, this.userList[index]); // 把当前信息赋值给空内容，准备修改
      // this.userInfo.sex = Number(this.userInfo.sex)
      this.filterPosition()
      // console.log(this.userInfo)
      this.isNew = false
      this.dialogUserInfo = true
    },

    addUser() {
      // 1、初始化用户信息为新建用户状态
      this.isNew = true
      this.userInfo = Object.assign({}, this.tempUserInfo);
      
      // this.userInfo = JSON.parse(JSON.stringify(this.tempUserInfo))
      // 2、 显示对话框 
      // this.$nextTick(() => {
        this.dialogUserInfo = true
      // })

    },

    saveUser(formName) {
      this.$refs.ruleForm.validate(valid => {
        // console.log(valid)
        if (valid) {
          // 1、调用新建或者更新用户接口
          // alert(this.userInfo.positionId)
          this.positionList.forEach((val, ind)=>{
            if(this.userInfo.positionId == val.id){
              this.userInfo.position =  val.positionTitle;
            }else if(this.userInfo.positionId == 0){
              this.userInfo.position =  '';
            }
          })

          updateUser(this.userInfo, this.isNew).then(response => {
            // 2、接口处理完，处理各种信息，关闭对话框
            switch (response.httpCode) {
              case 409:
                this.$alert(response.msg, '系统提示', {
                  type: 'error'
                })
                break;
              case 200:
                if (this.isNew) {
                  this.$alert('用户信息新建成功', '系统提示', {
                    type: 'success',
                    callback: action => {
                      this.dialogUserInfo = false;
                      this.readData();
                    }
                  })
                } else {
                  this.$alert('用户信息修改成功', '系统提示', {
                    type: 'success',
                    callback: action => {
                      this.userList.splice(this.editIndex, 1, this.userInfo) // 前端显示
                      this.dialogUserInfo = false;
                      this.readData();
                    }
                  })
                }
                
                break;

              default:
                this.dialogUserInfo = false
                break;
            }

          }).catch(error => {

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },

    cmdTest() {
    },

    handleIconClick() {
      this.search.deptIdKey = '';
      this.readData()
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
      this.loadTableDate = true
      readUserList(this.search).then(response => {
        console.log(response)
        this.userList = response.data
        this.total = response.total // 总条数
        this.loadTableDate = false
      }).catch(error => {
        this.$notify({
          title: '提示',
          content: '数据加载出错！！',
          type: 'error'
        })
        this.loadTableDate = false
      })
    },

    nodeClick(item, node) {
      this.search.deptIdKey = item.id
      if (this.keyword === null) {
      } else {
        this.search.keyword = this.keyword
      }
      this.readData();
    },


    readTreeList() {
      readDeptList().then(response => {
        console.log(response)
        let result = response.data
        this.deptList = result
      }).catch(error => {
      })
    },
  },
  mounted() {
    var stree = document.getElementById('stree');
    let checkImg = this.$refs.checkImg;
    let clHeight = $(window).height()
    stree.style.height = clHeight - 80 + 'px';
    //checkImg.style.height=clHeight-80+'px';
    console.log(clHeight)
    this.readTreeList();
    this.getDept();
    this.getUser();
    this.getPostion();
    this.readData()

  }
};
</script>

<style>
.baseInfo {
  marin-bottom: 20px
}

.toolbar {
  margin-bottom: 10px;
}

.el-table .cell,
.el-table th>div {
  padding-left: 5px;
  padding-right: 5px;
}
</style>