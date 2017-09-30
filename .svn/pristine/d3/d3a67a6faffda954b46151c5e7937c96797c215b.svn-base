<template>
    <div @click="s_stopPropagation">
        <el-row v-show="selectProductIO">
            <el-col :span="24">
                <el-form :inline="true" :model="search" class="demo-form-inline">
                    <el-form-item label="">
                        <el-input v-model="search.productName" placeholder="产品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input v-model="search.productNo" placeholder="产品编号"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-select v-model="search.enable" placeholder="状态">
                            <el-option label="可用" value="1"></el-option>
                            <el-option label="不可用" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search_date" icon="search">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <div class="clearfix">
                    <div class="button_box">
                        <div class="button_link" v-for="(item , index) in productList" @click="toEdit(index)">
                            {{item.productName}}
                            <span class="line line_top"></span>
                            <span class="line line_right"></span>
                            <span class="line line_bottom"></span>
                            <span class="line line_left"></span>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>

        <!-- 新增规格 -->
        <el-dialog title="检验项目" :visible.sync="specFormVisible">
            <el-form :model="specform">
                <el-form-item label="检验项名称" :label-width="formLabelWidth">
                    <el-input v-model="specform.value" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="检验项标题" :label-width="formLabelWidth">
                    <el-input v-model="specform.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="单位" :label-width="formLabelWidth">
                    <el-input v-model="specform.unit" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" :label-width="formLabelWidth">
                    <el-input v-model="specform.sort" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="specFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="specSubmit">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 产品对应的维护项 -->

        <div v-show="!selectProductIO">
            
            <el-collapse @change="handleChange">
                <el-collapse-item v-for="(item,index) in classificationList" :title="item.title" :key="item.title" :name="index">
                    <el-table :data="item.sdata" style="width: 98%">
                        <el-table-column prop="value" label="检验项名称">
                        </el-table-column>
                        <el-table-column prop="title" label="检验项标题">
                        </el-table-column>
                        <el-table-column prop="unit" label="排序">
                        </el-table-column>
                        <el-table-column prop="sort" label="排序">
                        </el-table-column>
                        <el-table-column label="操作" width="100">
                            <template scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                <el-button type="text" size="small" @click="removeData(scope.row , index , scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="text-align:center;padding-top:20px">
                        <el-button type="success" size="small" icon="plus" @click.native.prevent="addClassification(item.title , index)">新增</el-button>
                    </div>
                </el-collapse-item>
                
            </el-collapse>
            <div style="text-align:center;padding: 20px 0">
                    <el-button   @click.native.prevent="selectProductIO = true">返回</el-button>
                </div>
        </div>

    </div>
</template>
<script>
import { readBaseProcductList } from "@/api/base"
import { readProjectDistinctList, readInspectionClassList, updataInspectionClassList, deleteInspectionClassList } from "@/api/spc"


export default {
    data() {
        return {
            selectProduct: true,
            productList: [],
            selectProductIO: true,
            selectProductName: '',
            classificationList: [],
            classificationId: null,
            selectIndex: 0,
            addIndex: 0,
            search: {
                pageNum: 1,
                pageSize: 10,
                keyword: null,
                productName: '',
                enable: '',
                productNo: '',
                sort: ''
            },
            total: 0,
            specFormVisible: false,
            specform: {
                value: '',
                title: '',
                unit: '',
                sort: ''
            },
            specformcus: {
                value: '',
                title: '',
                unit: '',
                sort: ''
            },

            formLabelWidth: '120px',
        }
    },
    methods: {
        toEdit(index) {
            this.selectIndex = index;
            let sid = this.productList[index].id
            readProjectDistinctList({ productId: sid }).then(response => {
                if (response.data.length > 0) {
                    this.classificationList = [];

                    this.selectProductIO = false;
                    response.data.forEach((val, index) => {
                        let obj = { title: val }
                        readInspectionClassList({ productId: sid, project: val }).then(res => {
                            // console.log(res)
                            obj.sdata = res.data
                            this.classificationList.push(obj);
                        }).catch(err => {
                            console.log(err)
                        })
                    })
                }else{
                    this.$message({
                        type: 'error',
                        message: '该项暂无数据!'
                    });
                }

                console.log(this.classificationList)

            }).catch(error => {
                console.log(error)
            })

        },
        handleChange(a) {
            // console.log(a)
        },
        handleClick(a) {
            console.log(a);
            this.specform = Object.assign({}, a);
            this.specFormVisible = true;
        },
        addClassification(sname, index) {
            this.specFormVisible = true;
            this.specform = Object.assign({}, this.specformcus);
            this.addIndex = index;
            this.selectProductName = sname
        },

        specSubmit() {
            this.specform.productId = this.productList[this.selectIndex].id
            this.specform.project = this.selectProductName;
            let sid = this.productList[this.selectIndex].id
            // this.classificationList[0].sdata.push(this.sepcform)
            updataInspectionClassList(this.specform).then(res => {
                if (res.httpCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    readInspectionClassList({ productId: sid, project: this.selectProductName }).then(res => {
                        this.classificationList[this.addIndex].sdata = res.data
                    }).catch(err => {
                        console.log(err)
                    })
                    // this.classificationList[this.addIndex].sdata.push(this.specform)
                } else {
                    this.$message({
                        type: 'info',
                        message: '添加失败'
                    });
                }
                this.specFormVisible = false;
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '添加失败'
                });
                this.specFormVisible = false;
            })
        },

        removeData(obj, index, ind) {
            console.log(index)
            console.log(ind)
            let sid = obj.id
            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteInspectionClassList({ id: sid }).then(res => {
                    if (res.httpCode == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.classificationList[index].sdata.splice(ind, 1);
                    } else {
                        this.$message({
                            type: 'info',
                            message: '删除失败'
                        });
                    }
                }).catch(err => {
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

        deleteSpec(sid) {
            let that = this;
            let obj = new Object();
            obj.id = sid;
            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((e) => {
                deleteBaseSpec(obj).then(res => {
                    if (res.httpCode == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        that.readSpecificationsData()
                    } else {
                        this.$message({
                            type: 'info',
                            message: '删除失败'
                        });
                    }
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '删除失败'
                    });
                })
                window.event ? window.event.cancelBubble = true : e.stopPropagation()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
                window.event ? window.event.cancelBubble = true : e.stopPropagation();
            });
        },
        search_date() {
            //查询
            this.readData()
        },
        s_stopPropagation(e) {//阻止默认事件
            window.event ? window.event.cancelBubble = true : e.stopPropagation();
        },
        //分页条数改变的时候重新加载数据
        handleSizeChange(val) {
            this.search.pageSize = val
            this.readData()
        },
        //点击第几页
        handleCurrentChange(val) {
            this.search.pageNum = val
            this.readData()
        },
        //准备产品数据
        readData() {
            this.fullscreenLoading = true;
            readBaseProcductList(this.search).then(response => {
                this.productList = response.data
                this.total = response.total // 总条数
                this.fullscreenLoading = false;
            }).catch(error => {
                this.$message({
                    type: 'info',
                    message: '数据加载失败'
                });
                this.fullscreenLoading = false;
            })
        },
    },
    mounted() {

        this.readData();
    }

}
</script>

<style lang="scss" scoped>
table {
    tr {
        cursor: pointer;
        &:hover {
            background: #ebf2f9;
        }
    }
}

.right-side {
    .p-title {
        padding-left: 20px;
        font-size: 20px;
        color: #999;
        line-height: 30px;
        text-align: center;
    }
}

// .button_box{width:902px;margin:40px auto 0 auto;}
</style>

