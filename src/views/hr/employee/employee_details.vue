<template>
  <div style="padding-top:10px">
    <el-row :gutter="5" style="margin-right:0px" v-if="detailIO">
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
              <!-- <el-button type="text" icon="plus" @click="addUser">添加员工</el-button>
                  <el-button type="text" @click="importData">批量导入</el-button>
                  <el-button type="text">批量导出</el-button> -->
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
              <!-- <el-button type="text" size="small" @click="removeData(scope.$index,scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 25, 50, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>

    </el-row>
    <div v-else>
      <div class="panel panel-info">
        <div class="panel-heading">
          基本信息
        </div>
        <div class="panel-body">

          <div class="w25 pull-left">姓名 : {{tempUserInfo.userName}}</div>
          <div class="w25 pull-left">部门 : {{tempUserInfo.deptName}}</div>
          <div class="w25 pull-left">职位 : {{tempUserInfo.postion}}</div>
          <div class="w25 pull-left">性别 : {{tempUserInfo.sex == 1 ? "男" : "女"}}</div>
        </div>
      </div>
      <div class="panel panel-warning">
        <div class="panel-heading">
          个人资料
        </div>
        <div class="panel-body">
          <table class="table tabTwoLeft">
            <tbody>
              <tr>
                <td> 身份证号 : </td>
                <td>
                  <el-input v-model="form.idNo"></el-input>
                </td>
                <td class="text-r">考勤卡号 : </td>
                <td>
                  <el-input v-model="form.attendanceCard"></el-input>
                </td>
                <td class="text-r"> 学历 :</td>
                <td>
                  <el-select v-model="form.education" placeholder="请选择" style="width:100%">
                    <el-option label="大专" value="大专"></el-option>
                    <el-option label="本科" value="本科"></el-option>
                    <el-option label="硕士" value="硕士"></el-option>
                    <el-option label="博士" value="博士"></el-option>
                    <el-option label="其它" value="其它"></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td> 出生日期 : </td>
                <td>
                  <el-date-picker type="date" v-model="form.birthDate" @change="sfomartData" style="width:100%"></el-date-picker>
                </td>
                <td class="text-r"> 毕业院校 : </td>
                <td>
                  <el-input v-model="form.graduateInstitution"></el-input>
                </td>
                <td class="text-r"> 民族 :</td>
                <td>
                  <el-input v-model="form.nation"></el-input>
                </td>
              </tr>
              <tr>
                <td> 政治面貌 : </td>
                <td>
                  <el-select v-model="form.politicalStatus" placeholder="请选择" style="width:100%">
                    <el-option label="群众" value="群众"></el-option>
                    <el-option label="预备党员" value="预备党员"></el-option>
                    <el-option label="党员" value="党员"></el-option>
                    <el-option label="其它" value="其它">
                    </el-option>
                  </el-select>
                </td>
                <td class="text-r">所学专业 : </td>
                <td>
                  <el-input v-model="form.major"></el-input>
                </td>
                <td class="text-r"> 婚姻状况 :</td>
                <td>
                  <el-select v-model="form.maritalStatus" placeholder="请选择" style="width:100%">
                    <el-option label="已婚" value="已婚"></el-option>
                    <el-option label="未婚" value="未婚"></el-option>
                    <el-option label="离异" value="离异">
                    </el-option>
                  </el-select>
                </td>

              </tr>
              <tr>
                <td class="text-r"> 籍贯 : </td>
                <td>
                  <!-- <input type="text" name="nativePlace" value="" class="form-control"> -->
                  <el-input v-model="form.nativePlace"></el-input>
                </td>
                <td> 家庭住址 : </td>
                <td>
                  <!-- <input type="text" name="homeAddress" value="" class="form-control"> -->
                  <el-input v-model="form.homeAddress"></el-input>
                </td>
                <td class="text-r"> 毕业日期 :</td>
                <td>
                  <el-date-picker type="date" v-model="form.graduateDate" @change="sfomartData1" style="width:100%"></el-date-picker>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="panel panel-primary">
        <div class="panel-heading">
          公司相关
        </div>
        <div class="panel-body">
          <table class="table tabTwoLeft">
            <tbody>
              <tr>
                <td class="text-r">联系人 :</td>
                <td>
                  <!-- <input type="text" name="contact" value="" class="form-control"> -->
                  <el-input v-model="form.contact"></el-input>
                </td>
                <td> 档案地址 : </td>
                <td>
                  <!-- <input type="text" name="fileAddress" value="" class="form-control"> -->
                  <el-input v-model="form.fileAddress"></el-input>
                </td>
                <td class="text-r">入职日期 : </td>
                <td>
                  <el-date-picker type="date" v-model="form.entryDate" @change="sfomartData2" style="width:100%"></el-date-picker>
                </td>
              </tr>
              <tr>
                <td class="text-r">职工类别 :</td>
                <td>
                  <!-- <div class="btn-group bootstrap-select"><button type="button" class="btn dropdown-toggle bs-placeholder btn-default" data-toggle="dropdown" role="button" title="请选择"><span class="filter-option pull-left">请选择</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open" role="combobox"><ul class="dropdown-menu inner" role="listbox" aria-expanded="false"><li data-original-index="1"><a tabindex="0" class="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span class="text">其它</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span class="text">正式</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select class="selectpicker" name="staffCategory" title="请选择" tabindex="-98"><option class="bs-title-option" value="">请选择</option>
    										<option value="其它">其它</option>
    										<option value="合同制">正式</option>
    									</select></div> -->
                  <el-select v-model="form.staffCategory" placeholder="请选择" style="width:100%">
                    <el-option label="其它" value="其它"></el-option>
                    <el-option label="合同制" value="合同制"></el-option>
                    </el-option>
                  </el-select>
                </td>
                <td> 工作场所 : </td>
                <td>
                  <!-- <input type="text" name="workplace" value="" class="form-control"> -->
                  <el-input v-model="form.workplace"></el-input>
                </td>
                <td class="text-r">个人爱好 : </td>
                <td>
                  <!-- <input type="text" name="personalHobby" value="" class="form-control"> -->
                  <el-input v-model="form.personalHobby"></el-input>
                </td>
              </tr>
              <tr>
                <td>上岗日期 : </td>
                <td>
                  <el-date-picker type="date" v-model="form.onBoardDate" @change="sfomartData3" style="width:100%"></el-date-picker>
                </td>
                <td class="text-r">手机 : </td>
                <td>
                  <!-- <input type="text" name="phone" value="" class="form-control"> -->
                  <el-input v-model="form.phone"></el-input>
                </td>
                <td class="text-r">工作电话 :</td>
                <td>
                  <!-- <input type="text" name="workPhone" value="" class="form-control"> -->
                  <el-input v-model="form.workPhone"></el-input>
                </td>
              </tr>
              <tr>
                <td> 岗位级别 : </td>
                <td>
                  <!-- <input type="text" name="postLevel" value="" class="form-control"> -->
                  <el-input v-model="form.postLevel"></el-input>
                </td>
                <td class="text-r">工作日期 : </td>
                <td>
                  <el-date-picker type="date" v-model="form.workDate" @change="sfomartData4" style="width:100%"></el-date-picker>
                </td>
                <td class="text-r">EMAIL :</td>
                <td>
                  <!-- <input type="text" name="email" value="" class="form-control"> -->
                  <el-input v-model="form.email"></el-input>
                </td>
              </tr>
              <tr>
                <td> QQ帐号 : </td>
                <td>
                  <!-- <input type="text" name="qq" value="" class="form-control"> -->
                  <el-input v-model="form.qq"></el-input>
                </td>
                <td class="text-r">技术职称 :</td>
                <td>
                  <!-- <input type="text" name="technicalTitle" value="" class="form-control"> -->
                  <el-input v-model="form.technicalTitle"></el-input>
                </td>
                <td class="text-r">职称日期 :</td>
                <td>
                  <el-date-picker type="date" v-model="form.titleDate" @change="sfomartData5" style="width:100%"></el-date-picker>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="panel panel-success">
        <div class="panel-heading">
          入职离职
        </div>
        <div class="panel-body">
          <table class="table tabTwoLeft">
            <tbody>
              <tr>
                <td> 合同开始 : </td>
                <td>
                  <el-date-picker type="date" v-model="form.contractStart" @change="sfomartData6" style="width:100%"></el-date-picker>
                </td>
                <td class="text-r">合同终止 :</td>
                <td>
                  <el-date-picker type="date" v-model="form.contractEnd" @change="sfomartData7" style="width:100%"></el-date-picker>
                </td>
                <td class="text-r">合同类别 : </td>
                <td>
                  <!-- <div class="btn-group bootstrap-select"><button type="button" class="btn dropdown-toggle bs-placeholder btn-default" data-toggle="dropdown" role="button" title="请选择"><span class="filter-option pull-left">请选择</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open" role="combobox"><ul class="dropdown-menu inner" role="listbox" aria-expanded="false"><li data-original-index="1"><a tabindex="0" class="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span class="text">其它</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span class="text">买卖合同</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select class="selectpicker" name="contractType" title="请选择" tabindex="-98"><option class="bs-title-option" value="">请选择</option>
    										<option value="其它">其它</option>
    										<option value="买卖合同">买卖合同</option>
    									</select></div> -->
                  <el-select v-model="form.contractType" placeholder="请选择" style="width:100%">
                    <el-option label="其它" value="其它"></el-option>
                    <el-option label="买卖合同" value="买卖合同">
                    </el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td> 试用开始 : </td>
                <td>
                  <el-date-picker type="date" v-model="form.trialStart" @change="sfomartData8" style="width:100%"></el-date-picker>
                </td>
                <td class="text-r">试用终止 :</td>
                <td>
                  <el-date-picker type="date" v-model="form.trialEnd" @change="sfomartData9" style="width:100%"></el-date-picker>
                </td>
                <td class="text-r">紧急电话 : </td>
                <td>
                  <!-- <input type="text" name="emergencyCall" value="" class="form-control"> -->
                  <el-input v-model="form.emergencyCall"></el-input>
                </td>
              </tr>
              <tr>
                <td> 实习开始 : </td>
                <td>
                  <el-date-picker type="date" v-model="form.practiceStart" @change="sfomartData10" style="width:100%"></el-date-picker>
                </td>
                <td class="text-r">实习结束 :</td>
                <td>
                  <el-date-picker type="date" v-model="form.practiceEnd" @change="sfomartData11" style="width:100%"></el-date-picker>
                </td>
                <td class="text-r">离职时间 : </td>
                <td>
                  <el-date-picker type="date" v-model="form.leaveDate" @change="sfomartData12" style="width:100%"></el-date-picker>
                </td>
              </tr>
              <tr>
                <td> 离职方式 : </td>
                <td>
                  <!-- <input type="text" name="leaveMethod" value="" class="form-control"> -->
                  <el-input v-model="form.leaveMethod"></el-input>
                </td>
                <td class="text-r">离职原因 :</td>
                <td>
                  <!-- <input type="text" name="leaveReson" value="" class="form-control"> -->
                  <el-input v-model="form.leaveReson"></el-input>
                </td>
                <td class="text-r">招聘来源 : </td>
                <td>
                  <!-- <input type="text" name="recruitSource" value="" class="form-control"> -->
                  <el-input v-model="form.recruitSource"></el-input>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="panel panel-danger">
        <div class="panel-heading">
          工资信息
        </div>
        <div class="panel-body">
          <table class="table tabTwoLeft">
            <tbody>
              <tr>
                <td> 工资类别 : </td>
                <td>
                  <!-- <input type="text" name="wageCategory" value="" class="form-control"> -->
                  <el-input v-model="form.wageCategory"></el-input>
                </td>
                <td class="text-r">扣税标准 :</td>
                <td>
                  <!-- <input type="text" name="standardDeduction" value="" class="form-control"> -->
                  <el-input v-model="form.standardDeduction"></el-input>
                </td>
                <td class="text-r">开户银行 : </td>
                <td>
                  <!-- <input type="text" name="bankDeposit" value="" class="form-control"> -->
                  <el-input v-model="form.bankDeposit"></el-input>
                </td>
              </tr>
              <tr>
                <td> 工资帐号 : </td>
                <td>
                  <!-- <input type="text" name="salaryAccount" value="" class="form-control"> -->
                  <el-input v-model="form.salaryAccount"></el-input>
                </td>
                <td class="text-r">养老帐号 :</td>
                <td>
                  <!-- <input type="text" name="pensionAccount" value="" class="form-control"> -->
                  <el-input v-model="form.pensionAccount"></el-input>
                </td>
                <td class="text-r">医保帐号 : </td>
                <td>
                  <!-- <input type="text" name="medicareAccount" value="" class="form-control"> -->
                  <el-input v-model="form.medicareAccount"></el-input>
                </td>
              </tr>
              <tr>
                <td> 失业帐号 : </td>
                <td>
                  <!-- <input type="text" name="unemployAccount" value="" class="form-control"> -->
                  <el-input v-model="form.unemployAccount"></el-input>
                </td>
                <td class="text-r">公积帐号 :</td>
                <td>
                  <!-- <input type="text" name="fundAccount" value="" class="form-control"> -->
                  <el-input v-model="form.fundAccount"></el-input>
                </td>
                <td class="text-r">其他帐号 : </td>
                <td>
                  <!-- <input type="text" name="otherAccount" value="" class="form-control"> -->
                  <el-input v-model="form.otherAccount"></el-input>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style="text-align:center">
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button type="warning">删除</el-button>
        <el-button type="" @click="detailIO = true">返回</el-button>
      </div>
    </div>

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
import { getUserDetail , updataUserDetail} from "@/api/hr"

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
      detailIO: true,
      fileList: [],
      dialogImportData: false, //导入数据对话框
      loadTableDate: false,
      dialogUserInfo: false,
      formLabelWidth: '100px',
      isNew: true, // 用户信息是编辑模式还是增加模式
      editIndex: 0, // 编辑模式下，用户内容所在的索引
      search: {
        pageNum: 1,
        pageSize: 10,
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
      },
      form: {
        attendanceCard: "",
        bankDeposit: "",
        birthDate: null,
        contact: "",
        contractEnd: null,
        contractStart: null,
        contractType: "",
        createBy: null,
        createTime: null,
        education: "",
        email: "",
        emergencyCall: "",
        enable: null,
        entryDate: null,
        fileAddress: "",
        fundAccount: "",
        graduateDate: null,
        graduateInstitution: "",
        homeAddress: "",
        id: null,
        idNo: "",
        keyword: "",
        leaveDate: null,
        leaveMethod: "",
        leaveReson: "",
        major: "",
        maritalStatus: "",
        medicareAccount: "",
        nation: "",
        nativePlace: "",
        onBoardDate: null,
        otherAccount: "",
        pensionAccount: "",
        personalHobby: "",
        phone: "",
        politicalStatus: "",
        postLevel: "",
        practiceEnd: null,
        practiceStart: null,
        qq: "",
        recruitSource: "",
        remark: "",
        salaryAccount: "",
        staffCategory: "",
        standardDeduction: "",
        technicalTitle: "",
        tenantId: null,
        titleDate: null,
        trialEnd: "",
        trialStart: "",
        unemployAccount: "",
        updateBy: null,
        updateTime: null,
        userId: null,
        wageCategory: "",
        workDate: null,
        workPhone: "",
        workplace: "",
      },
      formcus: {
        attendanceCard: "",
        bankDeposit: "",
        birthDate: null,
        contact: "",
        contractEnd: null,
        contractStart: null,
        contractType: "",
        createBy: null,
        createTime: null,
        education: "",
        email: "",
        emergencyCall: "",
        enable: null,
        entryDate: null,
        fileAddress: "",
        fundAccount: "",
        graduateDate: null,
        graduateInstitution: "",
        homeAddress: "",
        id: null,
        idNo: "",
        keyword: "",
        leaveDate: null,
        leaveMethod: "",
        leaveReson: "",
        major: "",
        maritalStatus: "",
        medicareAccount: "",
        nation: "",
        nativePlace: "",
        onBoardDate: null,
        otherAccount: "",
        pensionAccount: "",
        personalHobby: "",
        phone: "",
        politicalStatus: "",
        postLevel: "",
        practiceEnd: null,
        practiceStart: null,
        qq: "",
        recruitSource: "",
        remark: "",
        salaryAccount: "",
        staffCategory: "",
        standardDeduction: "",
        technicalTitle: "",
        tenantId: null,
        titleDate: null,
        trialEnd: "",
        trialStart: "",
        unemployAccount: "",
        updateBy: null,
        updateTime: null,
        userId: null,
        wageCategory: "",
        workDate: null,
        workPhone: "",
        workplace: "",
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
    sfomartData(va) {
      this.form.birthDate = va;
    },
    sfomartData1(va) {
      this.form.graduateDate = va;
    },
    sfomartData2(va) {
      this.form.entryDate = va;
    },
    sfomartData3(va) {
      this.form.onBoardDate = va;
    },
    sfomartData4(va) {
      this.form.workDate = va;
    },
    sfomartData5(va) {
      this.form.titleDate = va;
    },
    sfomartData6(va) {
      this.form.contractStart = va;
    },
    sfomartData7(va) {
      this.form.contractEnd = va;
    },
    sfomartData8(va) {
      this.form.trialStart = va;
    },
    sfomartData9(va) {
      this.form.trialEnd = va;
    },
    sfomartData10(va) {
      this.form.practiceStart = va;
    },
    sfomartData11(va) {
      this.form.practiceEnd = va;
    },
    sfomartData12(va) {
      this.form.leaveDate = va;
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


    editInfo(index) {
      console.log(this.userList[index])
      this.tempUserInfo = this.userList[index]
      this.form.userId = this.userList[index].id
      getUserDetail({ userId: this.userList[index].id }).then(response => {
        console.log(response.data)
        switch (response.httpCode) {
          case 200:
            this.form = response.data
            this.form.userId = this.userList[index].id
            this.detailIO = false
            break;

          default:
            break;
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: response.msg
        });
      });
      
    },
    submitForm(){
      updataUserDetail(this.form).then(response => {
        switch (response.httpCode) {
          case 200:
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            this.detailIO = true
            break;

          default:
            this.$message({
              type: 'info',
              message: response.msg
            });
            break;
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: response.msg
        });
      });
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

.w25 {
  width: 25%
}

.tabTwoLeft tr td:nth-child(odd) {
  text-align: right;
  display: table-cell;
  vertical-align: inherit;
}

.tabTwoLeft tr td:nth-child(even) {
  text-align: left;
  display: table-cell;
  vertical-align: inherit;
}
</style>