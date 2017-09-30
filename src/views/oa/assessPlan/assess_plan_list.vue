<template>
    <div>
        <!-- <transition enter-active-class = 'animated flipInX' leave-active-class = 'animated zoomOut'> -->
        <el-row v-if="detailIO">
            <el-col :span="24">
                <el-form :inline="true" :model="search" class="demo-form-inline">
                    <el-form-item label="">
                        <el-input v-model="search.assessCycle" placeholder="考核名称"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-select v-model="search.assessCycle" placeholder="请选择指标类别">
                            <el-option v-for="v in dicList" :label="v.title" :key="v.id" :value="v.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="">
                        <el-select v-model="search.assessObjectType" placeholder="请选择考核类型" style="width:100%">
                            <el-option label="人" value="9"></el-option>
                            <el-option label="部门" value="8"></el-option>
                            <el-option label="职位" value="10"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="readData" icon="search">搜索</el-button>
                        <el-button type="success" @click="addData" icon="plus">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <div class="box12" v-for="(item,index) in dataList">
                    <h3 style="text-align:center">{{item.planName}}</h3>
                    <!-- <img src="http://www.wpthemegenerator.com/wp-content/uploads/2012/06/Image.jpg"> -->
                    <div style="min-height:250px;overflow:hidden">
                        <p style="margin-bottom:5px">考核期限</p>
                        <p style="padding-left:5em">{{item.startTime | fmtYYMMDD}} 至 {{item.endTime | fmtYYMMDD}}</p>
                        <hr style="margin:0">
                        <p style="margin-bottom:5px">考核对象 :</p>
                        <p style="padding-left:5em">
                            <template v-if='item.assessObjectStr'>
                                <!-- <p class=" text-warning" v-for="( v , i ) in item.commTemplateIndexs"> {{i+1}} . {{v.indexName}}</p> -->
                                <el-tag type="success" v-for="( v , i ) in item.assessObjectStr" :key="i" style="margin-left:10px;margin-top:5px">{{ v }}</el-tag>
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

        <!-- </transition> -->

        <el-dialog title="考核计划" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="计划名称">
                    <el-input v-model="form.planName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="考核周期">
                    <el-select v-model="form.assessCycle" placeholder="请选择考核周期" style="width:100%">
                        <el-option v-for="v in dicList" :label="v.title" :key="v.id" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考核对象类型">
                    <el-select v-model="form.assessObjectType" placeholder="请选择考核类型" style="width:100%" @change="clearAssessObject">
                        <el-option label="人" value="9"></el-option>
                        <el-option label="部门" value="8"></el-option>
                        <el-option label="职位" value="10"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考核对象">
                    <el-select v-show="form.assessObjectType == 9" multiple filterable v-model="form.assessObject" placeholder="请选择考核对象" style="width:100%">
                        <el-option v-for="item in userList"  :key="item.id" :label="item.userName" :value="'#'+item.id+'#'"></el-option>
                    </el-select>
                    <el-select v-show="form.assessObjectType == 8" multiple filterable v-model="form.assessObject" placeholder="请选择考核对象" style="width:100%">
                        <el-option v-for="item in deptList" :key="item.id" :label="item.deptName" :value="'#'+item.id+'#'"></el-option>
                    </el-select>
                    <el-select v-show="form.assessObjectType == 10" multiple filterable v-model="form.assessObject" placeholder="请选择考核对象" style="width:100%">
                        <el-option v-for="item in positionList" :key="item.id" :label="item.positionTitle" :value="'#'+item.id+'#'"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考核模板">
                    <el-select v-model="form.templateId" placeholder="请选择考核模板" style="width:100%">
                        <el-option v-for="v in tempList" :label="v.templateName" :key="v.id" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker v-model="form.startTime" type="date" placeholder="选择开始时间" @change="sfomartData" style="width:100%">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker v-model="form.endTime" type="date" placeholder="选择结束时间" @change="sfomartData1" style="width:100%">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="检查标准">
                    <el-input type="textarea" v-model="form.checkStandard" auto-complete="off"></el-input>
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

import { getAssessPlanList, deleteAssessPlan, updataAssessPlan, getAssessPlanSelect } from "@/api/oa"
import { getDeptInfo, getUserInfo, getPositionInfo } from "@/api/oa"

export default {
    data() {
        return {
            dataList: [],
            search: {
                pageNum: 1,
                pageSize: 8,
                assessCycle: null,
                assessObjectType: null
            },
            detailIO: true,
            total: 0,
            form: {
                planName: null,
                assessCycle: null,
                assessObjectType: null,
                assessObject:[],
                templateId: null,
                startTime: null,
                endTime: null,
                checkStandard: null

            },
            formcus: {
                planName: null,
                assessCycle: null,
                assessObjectType: null,
                assessObject:[],
                templateId: null,
                startTime: null,
                endTime: null,
                checkStandard: null
            },
            dialogFormVisible: false,
            selectList:[],
            tempList: [],
            dicList: [],
            deptList: [],
            userList: [],
            positionList: [],

        }
    },
    methods: {
        sfomartData(va) {
            this.form.startTime = va;
        },
        sfomartData1(va) {
            this.form.endTime = va;
        },
        addData() {
            let newObj = new Object();
            $.extend(true, newObj, this.formcus);
            this.form = newObj;
            this.dialogFormVisible = true;
        },
        clearAssessObject(){
            this.form.assessObject=[];
        },
        compile(sid, index) {
            let newObj = new Object();
            $.extend(true, newObj, this.dataList[index]);
            this.form = newObj;
            this.form.assessObject = this.form.assessObject.split(',')
            console.log(this.form)
            // console.log(this.dataList[index])
            this.dialogFormVisible = true;
        },
        deleteData(sid) {
            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteAssessPlan({ id: sid }).then(res => {
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
            
            // let str = ''
            // this.form.assessObject.forEach((v,i)=>{
            //     str +='#'+ v +'#,'
            // })
            // str.substring(0,str.length - 1);
            // this.form.assessObject = str
            this.form.assessObject =  this.form.assessObject.join(',')
            console.log(this.form)

            console.log(JSON.stringify(this.form))
            updataAssessPlan(this.form).then(res => {
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
            getAssessPlanList(this.search).then(response => {
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
        getNoPageKpiList() {
            getAssessPlanSelect({}).then(response => {
                // console.log(response)
                this.dicList = response.dicList;
                this.tempList = response.tempList;
            }).catch(error => {
                console.log(error)
            })
            getUserInfo().then(response => {
                // console.log(response)
                this.userList = response.data
                this.userListcus = response.data
            }).catch(error => {

            })
            
            //获取部门相关信息list
            getDeptInfo().then(response => {
                // console.log(response)
                this.deptList = response.data
            }).catch(error => {
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
    },
    filters: {
        fmtYYMMDD(state) {
            if (typeof state == 'string') {
                return state.substring(0, 10)
            } else {
                return ""
            }
        }
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

.el-transfer-panel {
    width: 300px;
}
</style>
