<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" :model="search" class="demo-form-inline">
                    <el-form-item label="">
                        <el-input v-model="search.indexName" placeholder="指标名称"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="">
        												<el-input v-model="search.product" placeholder="所属种类"></el-input>
        											</el-form-item> -->
                    <el-form-item label="">
                        <el-select v-model="search.indexType" placeholder="请选择指标类别">
                            <el-option v-for="v in selectList" :label="v.title" :key="v.id" :value="v.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="readData" icon="search">搜索</el-button>
                        <el-button type="success" @click="addData" icon="plus">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <!-- <el-button type="primary" size="small" @click="addClasses">添加班次</el-button>
                    <div class="clearfix"></div> -->
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>指标名称</th>
                            <th>检查内容</th>
                            <th>是否可用</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in dataList">
                            <td>{{index + 1}}</td>
                            <td>{{item.indexName}}</td>
                            <td>{{item.checkContent}}</td>
                            <!-- <td>{{item.description}}</td> -->
                            <td>{{item.enable ? '是' : '否'}}</td>
                            <td>
                                <el-button type="primary" icon="edit" size="small" @click="compile(item.id , index)"></el-button>
                                <el-button type="primary" icon="delete" size="small" @click="deleteFlight(item.id)"></el-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>

        <el-dialog title="指标库" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="指标名称">
                    <el-input v-model="form.indexName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="指标分类">
                    <el-select v-model="form.indexType" placeholder="请选择指标类别" style="width:100%">
                        <el-option v-for="v in selectList" :label="v.title" :key="v.id" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="检查内容">
                    <el-input type="textarea" v-model="form.checkContent"></el-input>
                </el-form-item>
                <el-form-item label="检查标准">
                    <el-input type="textarea" v-model="form.checkStandard"></el-input>
                </el-form-item>
                <el-form-item label="考核细别">
                    <el-input type="textarea" v-model="form.checkDistinction"></el-input>
                </el-form-item>
                <el-form-item label="是否可用">
                    <el-switch v-model="form.enable" on-text="" off-text="" on-value="0" off-value="1">
                    </el-switch>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="form.sort" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

import { getKpiList , updataKpi , deleteKpi } from "@/api/oa"

export default {
    data() {
        return {
            fullscreenLoading: true,
            dataList: null,
            selectList:[],
            dialogFormVisible: false,
            search: {
                pageNum: 1,
                pageSize: 10,
                indexType: null,
                indexName:null
            },
            total: 0,
            form: {
                indexName: null,
                indexType: null,
                checkContent: null,
                checkStandard: null,
                checkDistinction: null,
                sort: null,
                enable: '0',
            },
            formcus: {
                indexName: null,
                indexType: null,
                checkContent: null,
                checkStandard: null,
                checkDistinction: null,
                sort: null,
                enable: '0',
            }
        }
    },
    methods: {
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
        compile(sid, index) {
            this.form = Object.assign({}, this.dataList[index]); // 把当前信息赋值给空内容，准备修改
            this.dialogFormVisible = true
        },
        deleteFlight(sid) {
            // console.log(sid);
            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteKpi({ id: sid }).then(res => {
                    if (res.httpCode == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.readData()
                    } else {
                        this.$message({
                            type: 'info',
                            message: '删除失败'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                    this.$message({
                        type: 'info',
                        message: '删除失败'
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        readData() {
            this.fullscreenLoading = true;
            getKpiList(this.search).then(response => {
                this.dataList = response.page.records
                console.log(response)
                this.selectList = response.dicList;
                this.total = Number(response.page.total) // 总条数
                this.fullscreenLoading = false;
            }).catch(error => {
                console.log(error)
                this.$message.error(error.msg);
                this.fullscreenLoading = false;
            })
        },
        addData() {
            this.form = Object.assign({},this.formcus);
            this.dialogFormVisible = true;
        },
        handleSizeChange(val) {
            this.search.pageSize = val
            this.readData()
        },

        handleCurrentChange(val) {
            this.search.pageNum = val
            this.readData()
        },
    },
    mounted() {
        this.readData()
    }

}
</script>
<style lang="scss" scoped>
.panel-stitle {
    line-height: 32px;
    font-size: 15px;
}

.el-date-editor.el-input {
    width: 314px;
}
</style>