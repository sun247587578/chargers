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
                        <el-button type="success" icon="plus" @click="addData">转正申请</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-table :data="listData" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border style="width: 120%">
                    <el-table-column type="index" label="序号" width="120"></el-table-column>
                    <el-table-column prop="deptName" label="部门" min-width="150"> </el-table-column>
                    <el-table-column prop="userName" label="员工" min-width="150"> </el-table-column>
                    <el-table-column prop="subDate" label="提交日期" min-width="200" :formatter="stateFormat1"></el-table-column>
                    <el-table-column prop="hiredate" label="入职日期" min-width="200" :formatter="stateFormat1"></el-table-column>
                    <el-table-column prop="transformDate" label="转正日期" min-width="200" :formatter="stateFormat1"></el-table-column>
                    <!-- <el-table-column prop="creatTime" label="创建时间" min-width="200" :formatter="stateFormat1"></el-table-column> -->
                    <el-table-column prop="content" label="内容" min-width="200" :formatter="stateFormat1"></el-table-column>
                    <el-table-column label="操作" fixed="right" width="120">
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
        
        <el-dialog title="转正申请" :visible.sync="dialogIO">

            <el-form :model="form">
                <el-form-item label="姓名" :label-width="formLabelWidth = '100px'" prop="userName">
                    <el-select v-model="form.userId" filterable placeholder="员工" style="width:100%">
                        <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提交日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.subDate" type="date" placeholder="选择日期" @change="sfomartData" style="width:100%">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="入职日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.hiredate" type="date" placeholder="选择日期" @change="sfomartData1" style="width:100%">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="试用到期" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.transformDate" type="date" placeholder="选择日期" @change="sfomartData2" style="width:100%">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth">
                    <el-input type="textarea" autosize placeholder="请输入内容" v-model="form.content">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogIO = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { readRegularWorkerList, deleteRegularWorker, updataRegularWorker} from "@/api/hr"
import { getUser } from "@/api/oa"

export default {
    data() {
        return {
            dialogIO: false,
            fullscreenLoading: false,
            userList:null,
            listData:[],
            search: {
                keyword: '',
                pageNum: 1,
                pageSize: 10,
            },
            form: {
                deptId: null,
                userId: null,
                subDate: null,
                hiredate: null,
                transformDate: null,
                content: null
            },
            formcus: {
                deptId: null,
                userId: null,
                subDate: null,
                hiredate: null,
                transformDate: null,
                content: null
            },
            total: 0,
            detailIO: false,
        }
    },
    methods: {
        getUserList() {
            getUser({enable:4}).then(response => {
                this.userList = response.data
            }).catch(error => {
                console.log('调用人员信息出错')
            })
        },
        sfomartData(va) {
            this.form.subDate = va;
        },
        sfomartData1(va) {
            this.form.hiredate = va;
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
                    return "停职";
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
        onSubmit() {
            updataRegularWorker(this.form).then(res => {
                console.log(res)
                if (res.httpCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.readData();
                    this.dialogIO = false;
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
            this.dialogIO = true;
        },
        removeData(index) {
            console.log(this.listData[index])
            this.$confirm('确定要执行该操作吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteRegularWorker({ id: this.listData[index].id }).then(res => {
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
        addData() {
            this.form = Object.assign({}, this.formcus)
            this.dialogIO = true;
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
            readRegularWorkerList(this.search).then(response => {
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
    },
    mounted() {
        this.readData();
        this.getUserList();
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