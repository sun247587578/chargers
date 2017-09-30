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
                <el-table :data="listData" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border style="width: 100%">
                    <el-table-column prop="userName" label="员工姓名" min-width="150"> </el-table-column>
                    <el-table-column prop="deptName" label="部门" min-width="150"></el-table-column>
                    <!-- <el-table-column prop="batchNumber" label="公司" min-width="120"></el-table-column> -->
                    <el-table-column prop="fetchDate" label="获得日期" :formatter="stateFormat1" min-width="300"></el-table-column>
                    <el-table-column prop="skill" label="技能" min-width="300"></el-table-column>
                    <el-table-column prop="style" label="获得方式" min-width="300"></el-table-column>
                    <el-table-column prop="zsbh" label="证书编号" min-width="300"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template scope="scope">
                            <el-button type="text" @click.native.prevent="lookDetil(scope.$index)" size="small">查看</el-button>
                            <el-button type="text" @click.native.prevent="removeData(scope.$index)" size="small">删除</el-button>
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
                    <td style="width:150px">员工姓名 : </td>
                    <td>
                        <el-select v-model="form.userId" filterable placeholder="员工" style="width:100%" @change="findUserDetail">
                            <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
                        </el-select>
                    </td>
                    <td style="width:150px">部门 : </td>
                    <td style="text-align: left;">
                        {{selectChange.deptName}}
                    </td>
                    <td style="width:150px">奖励日期 : </td>
                    <td>
                        <el-date-picker v-model="form.fetchDate" type="date" placeholder="" style="width:100%" @change="sfomartData">
                        </el-date-picker>
                    </td>
                </tr>
                <tr>
                    <td>技能 : </td>
                    <td>
                        <el-input v-model="form.skill"></el-input>
                    </td>
                    <td>获取方式 : </td>
                    <td>
                        <el-input v-model="form.style"></el-input>
                    </td>
                    <td>证书编号 : </td>
                    <td>
                        <el-input v-model="form.zsbh" placeholder="">
                        </el-input>
                    </td>
                </tr>
                
                <!-- <tr>
                    <td>备注</td>
                    <td colspan="5">
                        <el-input type="textarea" v-model="form.remark"></el-input>
                    </td>
                </tr> -->

            </table>
            <div style="text-align:center">
                <el-button type="primary" @click="onSubmit">确认</el-button>
                <el-button @click="quxiao">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { readSkillList, deleteSkill, updataSkill } from "@/api/hr"
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
                deptId: '',
                userId: '',
                pageNum: 1,
                pageSize: 10,
            },
            form: {
                deptId: null,
                enable: null,
                fetchDate: null,
                remark: null,
                skill: null,
                style: null,
                tenantId: null,
                userId: null,
                zsbh: null

            },
            formcus: {
                deptId: null,
                enable: null,
                fetchDate: null,
                remark: null,
                skill: null,
                style: null,
                tenantId: null,
                userId: null,
                zsbh: null
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
            detailIO: true,
        }
    },
    methods: {
        clearSearch() {
            this.search.userId = "";
            this.search.deptId = "";
        },
        sfomartData(va) {
            this.form.birthday = va;
        },
        onSubmit() {
            updataSkill(this.form).then(res => {
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
            this.userList.forEach((v, i) => {
                if (v.id === this.form.userId) {
                    this.selectChange = v;
                }
            })
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
            this.$confirm('确定要执行该操作吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteSkill({ id: this.listData[index].id }).then(res => {
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
            }).catch(() => {
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
        stateFormat(row, column) {
            let state = row[column.property];
            switch (state) {
                case 1:
                    return "男";
                case 2:
                    return "女";
                default:
                    return "男";
            }
        },
        stateFormat1(row, column) {
            let state = row[column.property];
            console.log(typeof state)
            if (typeof state == 'string') {
                return state.substring(0, 10)
            } else {
                return ""
            }

        },
        readData() {
            this.fullscreenLoading = true;
            readSkillList(this.search).then(response => {
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