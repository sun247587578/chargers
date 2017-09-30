<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" :model="search" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="search.keyword" placeholder="请输入员工姓名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="search" @click="readData">查询</el-button>
                        <el-button type="success" icon="plus" @click="addData">添加试用员工</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-table :data="listData" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border style="width: 120%">
                    <el-table-column type="index" label="序号" width="120"></el-table-column>
                    <el-table-column prop="deptName" label="部门" min-width="150"> </el-table-column>
                    <el-table-column prop="userName" label="员工" min-width="150"> </el-table-column>

                    <el-table-column prop="position" label="职务" min-width="200"></el-table-column>
                    <el-table-column prop="email" label="邮箱" min-width="300"></el-table-column>
                    <el-table-column prop="enable" label="状态" min-width="120" :formatter="stateFormat"></el-table-column>

                    <el-table-column label="操作" width="120">
                        <template scope="scope">
                            <el-button type="text" @click.native.prevent="delayRecord( scope.$index)" size="small">延期</el-button>
                            <el-button type="text" @click.native.prevent="lookDetil( scope.$index)" size="small">查看</el-button>
                            <!-- <el-button type="text" @click.native.prevent="removeData( scope.$index)" size="small">删除</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
        <el-dialog title="试用期员工" :visible.sync="detailIO">

            <el-form :model="userInfo" :rules="rules" ref="ruleForm">
                <el-form-item label="姓名" :label-width="formLabelWidth = '100px' " prop="userName">
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
                <el-button @click="detailIO = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="延期" :visible.sync="dialogIO">

            <el-form :model="delayRecordForm">
                <el-form-item label="姓名" :label-width="formLabelWidth = '100px'" prop="userName">
                    {{delayRecordForm.userName}}
                </el-form-item>

                <el-form-item label="原转正日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="delayRecordForm.oldTransformDate" type="date" placeholder="选择日期" @change="sfomartData1" style="width:100%">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="新转正日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="delayRecordForm.newTransformDate" type="date" placeholder="选择日期" @change="sfomartData2" style="width:100%">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="原因" :label-width="formLabelWidth">
                    <el-input type="textarea" autosize placeholder="请输入内容" v-model="delayRecordForm.cause">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogIO = false">取 消</el-button>
                <el-button type="primary" @click="submitDelayRecord">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { readProbationList, deleteProbation, updataProbation , updataDelayRecord} from "@/api/hr"
import { getUserInfo, getDeptInfo, getPositionInfo } from "@/api/oa"

export default {
    data() {
        return {
            dialogIO: false,
            detailIO: false,
            fullscreenLoading: false,
            deptInfo: [], // 部门信息
            userAllList: [],
            sysPositionList: [],
            positionList: [],
            deptList: [],
            deptListJiHe: [],//部门的list集合
            listData: [],
            search: {
                keyword: '',
                pageNum: 1,
                pageSize: 10,
            },
            delayRecordForm: {
                oldTransformDate: null,
                newTransformDate: null,
                cause: null,
                userId: null,
                userName:'',
            },
            form: {
                deptId: null,
                userId: null,
                designer: null,
                getingDate: null,
                receiptNumber: null,
                rewardAmount: null,
                rewardAuthorizer: null,
                rewardDate: null,
                rewardReason: null,
                rewardStyle: null,
                rewardType: null,
                tenantId: null,
                remark: null,
            },
            userInfo: {  // 临时用户信息
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
            userInfocus: {
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
            selectChange: {
                deptName: '',
                position: ''
            },
            selectChangecus: {
                deptName: '',
                position: ''
            },
            rules: {
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                account: [
                    { required: true, message: '请输入用户帐号', trigger: 'blur' }
                ],
                userName: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' }
                ]
            },
            total: 0,
            detailIO: false,
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
            console.log(this.userInfo.deptId)
            this.positionList = [];
            this.sysPositionList.forEach((v, i) => {
                if (v.deptId == this.userInfo.deptId) {
                    this.positionList.push(v)
                }
            })
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
        sfomartData(va) {
            this.userInfo.entryTime = va;
        },
        sfomartData1(va) {
            this.form.oldTransformDate = va;
        },
        sfomartData2(va) {
            this.form.newTransformDate = va;
        },
        stateFormat(row, column) {
            let state = row[column.property];
            switch (state) {
                case '0':
                    return "在职";
                case '1':
                    return "离职";
                default:
                    return "在职";
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
            this.$refs.ruleForm.validate(valid => {
                // console.log(valid)
                console.log(this.userInfo.positionId)
                this.positionList.forEach((val, ind) => {
                    console.log(this.userInfo.positionId == val.id)
                    if (this.userInfo.positionId == val.id) {
                        this.userInfo.position = val.positionTitle;
                    } else if (this.userInfo.positionId == 0) {
                        this.userInfo.position = '';
                    }
                })
                if (valid) {
                    updataProbation(this.userInfo).then(res => {
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
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        submitDelayRecord() {
            updataDelayRecord(this.delayRecordForm).then(res => {
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
            this.userInfo = this.listData[index];
            this.filterPosition()
            this.detailIO = true;
        },
        delayRecord(index) {
            console.log(this.listData[index])
            this.delayRecordForm.userName = this.listData[index].userName;
            this.delayRecordForm.userId = this.listData[index].id;

            this.dialogIO = true;
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
                deleteProbation({ id: this.listData[index].id }).then(res => {
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
            this.userInfo = Object.assign({}, this.userInfocus)
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
            readProbationList(this.search).then(response => {
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
        // this.getUserDeptList();
        this.readData();
        this.getDept();
        this.getUser();
        this.getPostion();
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