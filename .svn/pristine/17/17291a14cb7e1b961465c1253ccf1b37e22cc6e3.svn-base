<template>
    <div>
        <!-- <transition enter-active-class = 'animated flipInX' leave-active-class = 'animated zoomOut'> -->
        <el-row v-if="detailIO">
            <el-col :span="24">
                <el-form :inline="true" :model="search" class="demo-form-inline">
                    <el-form-item label="模板名称">
                        <el-input v-model="search.templateName" placeholder=""></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="readData" icon="search">搜索</el-button>
                        <el-button type="success" @click="addData" icon="plus">新增模板</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <div class="box12" v-for="(item,index) in dataList">
                    <h3 style="text-align:center">{{item.templateName}}</h3>
                    <!-- <img src="http://www.wpthemegenerator.com/wp-content/uploads/2012/06/Image.jpg"> -->
                    <div style="min-height:250px;overflow:hidden">
                        <p style="margin-bottom:5px">考核总分 :</p>
                        <p style="padding-left:5em">{{item.assessScore}}分</p>
                        <hr style="margin:0">
                        <p style="margin-bottom:5px">考核指标 :</p>
                        <p style="padding-left:5em">
                            <template v-if='item.commTemplateIndexs'>
                                <p class=" text-warning" v-for="( v , i ) in item.commTemplateIndexs"> {{i+1}} . {{v.indexName}}</p>
                            </template>

                        </p>
                        <hr style="margin:0">
                    </div>
                    <br />
                    <!-- <div class="fold_box12"></div> -->
                    <!-- <div class="fold2_box12"></div> -->
                    <el-button-group class="posa">
                        <el-button type="text" @click="compile(item.id , index)" icon="edit"></el-button>
                        <el-button type="text" icon="delete" @click="deleteData(item.id)" style="margin-left:10px"></el-button>
                    </el-button-group>
                    <div class="box12_ribbon"></div>
                </div>
                
            </el-col>
            <el-col :span="24" style="margin-top:20px">
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[8, 16, 32, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
        <!-- </transition> -->
        <!-- <transition enter-active-class = 'animated fadeIn' leave-active-class = 'animated zoomOut'> -->
        <!-- <div class="" v-if="!detailIO" > -->
        <div class="" v-if="!detailIO">
            <el-row>
                <el-form ref="form" :model="templateForm" label-width="80px">
                    <el-col :span="7">
                        <el-form-item label="模板名称">
                            <el-input v-model="templateForm.templateName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="考核总分">
                            <el-input v-model="templateForm.assessScore" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="模板说明">
                            <el-input v-model="templateForm.remark" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3" style="text-align : center">
                        <el-button type="success" @click="addKip" icon="plus">添加指标</el-button>
                    </el-col>
                </el-form>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <table class="table table-bordered" style="margin-top:10px">
                        <thead>
                            <tr>
                                <th>指标名称</th>
                                <th style="width:20%">权重</th>
                                <th>检查内容</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in templateForm.commTemplateIndexs">
                                <td>{{item.indexName}}</td>
                                <td>
                                    <!-- {{item.indexWeigh}} -->
                                    <el-input v-model="item.indexWeigh" auto-complete="off"></el-input>
                                </td>
                                <td>{{item.checkContent}}</td>
                                <td>
                                    <el-button type="primary" icon="delete" size="small" @click="deleteKpi(index)"></el-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-col>
            </el-row>
            <el-button @click="goBack">返回</el-button>
            <el-button type="primary" @click="submitTotal">提交</el-button>
        </div>
        <!-- </transition> -->

        <el-dialog title="模板库" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="模板名称">
                    <el-input v-model="form.templateName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="考核总分">
                    <el-input v-model="form.assessScore" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="模板说明">
                    <el-input v-model="form.remark" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="模板库" :visible.sync="dialogTransferVisible">

            <el-transfer filterable filter-placeholder="搜索" :props="{key: 'fakeId',label: 'indexName'}" :titles="['指标','添加']" v-model="kipIdList" :data="kipList">
            </el-transfer>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTransferVisible = false">取 消</el-button>
                <el-button type="primary" @click="TransferData">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

import { getTemplateList, deleteTemplate, updataTemplate , noPageKpiList , compileTemplate , deleteTemplateIndex} from "@/api/oa"

export default {
    data() {
        return {
            dataList: [],
            search: {
                pageNum: 1,
                pageSize: 8,
                templateName: null
            },
            detailIO: true,
            total: 0,
            form: {
                templateName: null,
                assessScore: null,
                remark: null,
            },
            dialogFormVisible: false,
            dialogTransferVisible: false,
            templateForm: {
                templateName: null,
                assessScore: null,
                remark: null,
                commTemplateIndexs: new Set(),
            },
            kipList:[], 
            kipListTotal:[],//获取所有的指标
            kipIdList: [],
        }
    },
    methods: {
        goBack(){
            this.detailIO = true;
            this.readData()
        },
        addData() {
            this.dialogFormVisible = true;
        },
        addKip() {
            this.dialogTransferVisible = true;
            // this.kipList = Object.assign([],this.kipListTotal);
            let newArr = new Array();
            $.extend(true, newArr, this.kipListTotal);
            this.kipList = newArr;
            this.templateForm.commTemplateIndexs.forEach(v=>{
                this.kipList.forEach((val,ind)=>{
                    console.log(v.fakeId == val.fakeId)
                    if(v.fakeId == val.fakeId){
                        // this.kipListDisable.push(ind)
                        val.disabled = true
                    }
                })
            });
            console.log(this.kipIdList)
            console.log(this.templateForm.commTemplateIndexs)
        },
        deleteKpi(index) {
            let sid = this.templateForm.commTemplateIndexs[index].id;
            if(sid){
                deleteTemplateIndex({id:sid}).then(res=>{
                    console.log(res)
                    if(res.httpCode == 200){
                        this.templateForm.commTemplateIndexs.splice(index, 1)
                    }else{
                        console.log(res)
                        this.$message({
                            type: 'info',
                            message: '网络不稳定 , 删除失败'
                        });
                    }
                }).catch(err=>{
                    console.log(res)
                    this.$message({
                        type: 'info',
                        message: '网络不稳定 , 删除失败'
                    });
                })
            }else{
                this.templateForm.commTemplateIndexs.splice(index, 1)
            }
            
            
        },
        TransferData(){
            console.log(this.kipIdList)
            // console.log(this.data2)
            // let arr = this.templateForm.commTemplateIndexs;
            this.kipIdList.forEach((v,i)=>{
                this.kipList.forEach((val,ind)=>{
                    if(v == val.fakeId){
                        val.indexWeigh=null;
                        // delete val.id;
                        // arr.push(val)
                        this.templateForm.commTemplateIndexs.push(val)
                    }
                })
            });
            
            // this.templateForm.commTemplateIndexs = arr
        },
        submitTotal(){
            console.log(JSON.stringify(this.templateForm))
            
            compileTemplate(this.templateForm).then(res => {
                if (res.httpCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '成功!'
                    });
                    this.readData();
                    this.detailIO = true;
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
            
            let newObj = new Object();
            $.extend(true, newObj, this.dataList[index]);
            this.templateForm = newObj;
            // console.log(this.dataList[index])
            console.log(this.templateForm)
            this.detailIO = false;
        },
        deleteData(sid) {
            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteTemplate({ id: sid }).then(res => {
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
        submitForm() {
            console.log(this.form)
            updataTemplate(this.form).then(res => {
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
        readData() {
            getTemplateList(this.search).then(response => {
                // console.log(JSON.stringify(response.data[3]))
                console.log(response)
                this.dataList = response.data;
                this.total = Number(response.total) // 总条数
                this.fullscreenLoading = false;
            }).catch(error => {
                console.log(error)
                this.$message.error(error.msg);
                this.fullscreenLoading = false;
            })
        },
        getNoPageKpiList(){
            noPageKpiList({}).then(response => {
                console.log(response)
                this.kipList = response.data;
                this.kipListTotal = response.data;
            }).catch(error => {
                console.log(error)
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
    },
    mounted() {
        this.readData()
        this.getNoPageKpiList()
    }
}
</script>
<style lang="scss" scoped>
.box12 {
    // margin: 40px auto;
    float: left;
    margin-top: 20px;
    margin-right: 20px;
    width: 300px;
    min-height: 310px;
    padding: 10px;
    position: relative;
    background: -webkit-gradient(linear, 0% 20%, 0% 92%, from(#f3f3f3), to(#fff), color-stop(.1, #f3f3f3));
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc; // -webkit-border-bottom-right-radius: 60px 60px;
    // -webkit-border-bottom-left-radius: 60px 60px;
    -webkit-box-shadow: -1px 2px 2px rgba(0, 0, 0, 0.2);
    .posa {
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
}


.box12:after {
    content: '';
    z-index: -10;
    width: 100px;
    height: 100px;
    position: absolute;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    display: inline-block;
    -webkit-box-shadow: 20px 20px 8px rgba(0, 0, 0, 0.2);
    -webkit-transform: rotate(0deg) translate(-45px, -20px) skew(20deg);
}

.fold_box12 {
    z-index: -10;
    width: 50px;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    -webkit-box-shadow: -20px 20px 8px rgba(0, 0, 0, 0.2);
    -webkit-transform: rotate(0deg) translate(40px, -20px) skew(-20deg);
}

.fold2_box12 {
    width: 25px;
    height: 20px;
    z-index: 20;
    background: white;
    position: absolute;
    bottom: 0;
    left: 0;
    background: -webkit-gradient(linear, 0% 20%, 50% 80%, from(#fff), to( #eee), color-stop(.1, #fff));
    -webkit-border-bottom-right-radius: 30px;
    -webkit-box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.3);
    -webkit-transform: rotate(103deg) skew(-3deg, -40deg) translate(-13px, -15px);
}

.box12_ribbon {
    content: '';
    position: absolute;
    top: -5px;
    left: 30%;
    width: 130px;
    height: 15px;
    background: -webkit-gradient(linear, 555% 20%, 0% 92%, from(rgba(0, 0, 0, 0.1)), to(rgba(0, 0, 0, 0.0)), color-stop(.1, rgba(0, 0, 0, 0.2)));
    border-left: 1px dashed rgba(0, 0, 0, 0.1);
    border-right: 1px dashed rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
}

.box12 img {
    width: 100%;
    margin-top: 15px;
}
.el-transfer-panel{
    width:300px;
}
</style>
