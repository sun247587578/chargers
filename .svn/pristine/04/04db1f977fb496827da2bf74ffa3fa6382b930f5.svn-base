<template>
    <div id="group">
        <el-row v-show="detailIO">
            <el-col :span="24">
                <el-form :inline="true" :model="search" class="demo-form-inline">
                    <el-form-item label="">
                        <el-input v-model="search.struCode" placeholder="客户群编码"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input v-model="search.specName" placeholder="规格"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="">
        												<el-input v-model="search.product" placeholder="所属种类"></el-input>
        											</el-form-item> -->
                    <el-form-item label="">
                        <el-select v-model="search.enable" placeholder="状态">
                            <el-option label="可用" value="1"></el-option>
                            <el-option label="不可用" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchDate" icon="search">搜索</el-button>
                        <el-button type="success" @click="addGroup" icon="plus">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>客户群编码</th>
                            <th>所属种类</th>
                            <th>规格</th>
                            <!-- <th>入库种类</th> -->
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item , index) in groupList" @click.stop.prevent="rightSideShow(index)">
                            <td>{{item.struCode}}</td>
                            <td>{{item.product}}</td>
                            <td>{{item.specName}}</td>
                            <!-- <td>{{item.storage}}</td> -->
                            <td>
                                {{item.enable == '1'? '启用':'停用' }}
                            </td>
                            <td @click.stop.prevent>
                                <el-button type="warning" icon="share" @click.stop.prevent="compileProduct(item.id,index)" size="small"></el-button>
                                <el-button type="primary" icon="edit" @click="compileStru(index)" size="small"></el-button>
                                <el-button type="primary" icon="delete" @click.stop.prevent="removeStru(item.id,index)" size="small"></el-button>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>

                <!-- 新增产品 -->
                <el-dialog title="客户群" :visible.sync="dialogFormVisible">
                    <el-form :model="groupform" :rules="rules" ref="groupform">
                        <el-form-item label="所属种类" :label-width="formLabelWidth">
                            <!-- <el-input v-model="groupform.productId" auto-complete="off"></el-input> -->
                            <el-select v-model="groupform.productId" placeholder="请选择" style="width:100%" @change="changeRequest()">
                                <el-option v-for="item in productList" :key="item.id" :label="item.productName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="规格" :label-width="formLabelWidth">
                            <!-- <el-input v-model="groupform.spec" auto-complete="off"></el-input> -->
                            <el-select v-model="groupform.spec" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in specList" :key="item.id" :label="item.specName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="入库种类" :label-width="formLabelWidth">
        													<el-input v-model="groupform.storage" auto-complete="off"></el-input>
        												</el-form-item> -->
                        <el-form-item label="是否可用" :label-width="formLabelWidth">
                            <el-switch v-model="groupform.enable" on-text="" off-text="" on-value="1" off-value="0">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="结构代码" :label-width="formLabelWidth">
                            <el-input v-model="groupform.struCode" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="groupform.remark" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="groupSubmit('groupform')">确 定</el-button>
                    </div>
                </el-dialog>

            </el-col>
        </el-row>
        <el-dialog title="请选择关联的项目" :visible.sync="dialogSelectVisible">
            <div v-for="(item,index) in projectArr">
                <h4 class="text-warning">{{item.title}}</h4>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="v in item.sdata" :label="v" :key="v.id" @click="lookThis(v.id)">{{v.title}}</el-checkbox>
                </el-checkbox-group>
                <hr>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="checkProjectOver">确 定</el-button>
            </div>
        </el-dialog>
        <div v-show="!detailIO">

            <div>
                <table class="table table-bordered" style="margin-top:10px">
                    <thead>
                        <tr>
                            <th style="width:6%">序号</th>
                            <!-- <th style="width:12%"> 项目</th> -->
                            <th style="width:24%">项目</th>
                            <th style="width:30%">最大值</th>
                            <th style="width:30%">最小值</th>
                            <!-- <th  style="width:20%">平均值</th> -->
                            <th style="width:10%">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in checkeds">
                            <td>{{index + 1}}</td>
                            <!-- <td>{{item.project}}</td> -->
                            <!-- <td>{{item.standardName}}</td> -->
                            <td>
                                <el-select v-model="item.projectId" placeholder="请选择" style="width:100%">
                                    <el-option-group v-for="group in projectArr" :key="group.title" :label="group.title">
                                        <el-option v-for="item in group.sdata" :key="item.id" :label="item.value" :value="item.id">
                                        </el-option>
                                    </el-option-group>
                                </el-select>
                                <!-- <el-cascader
                                    expand-trigger="hover"
                                    :options="projectArr"
                                    v-model="item.projectId"
                                     :props="projectProps"
                                    @change="handleChange">
                                </el-cascader> -->
                            </td>
                            <td>
                                <el-input type="number" v-model.number="item.standardMinValue" @change="computations(item)"></el-input>
                            </td>
                            <td>
                                <el-input type="number" v-model.number="item.standardMaxValue" @change="computations(item)"></el-input>
                            </td>

                            <td>
                                <button class="btn btn-sm btn-warning" @click="removeProject(index)" type="button">删除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style="text-align:center">
                    <el-button type="warning" @click="addCorrelate">添加一行</el-button>
                    <el-button type="primary" @click="updataSelectStru">保存</el-button>
                    <el-button type="" @click="detailIO = true">返回</el-button>
                </div>
            </div>
        </div>
        <!-- 侧滑部分 -->
        <div class="right-side" v-bind:class="{ 'right-side-show' : isSide}" @click.stop.prevent>
            <p class="p-title">{{ groupListDetial.struCode}}</p>
            <el-tabs v-model="activeName">
                <el-tab-pane label="基本信息" name="first">

                    <ul class="list-group" style="padding:20px">
                        <li class="list-group-item" style="margin-bottom:10px">
                            所属种类 :
                            <span class="text-blue ml-10"> {{groupListDetial.product}}</span>
                        </li>
                        <li class="list-group-item">
                            规格 :
                            <span class="text-blue ml-10"> {{groupListDetial.specName}}</span>
                        </li>

                        <li class="list-group-item">
                            是否可用 :
                            <span class="text-blue ml-10"> {{groupListDetial.enable == '1' ? '可用' : '停用'}} </span>
                        </li>
                        <li class="list-group-item">
                            创建人 :
                            <span class="text-blue ml-10"> {{groupListDetial.createBy}} </span>
                        </li>
                        <li class="list-group-item">
                            客户群编码 :
                            <span class="text-blue ml-10"> {{groupListDetial.struCode}} </span>
                        </li>
                        <li class="list-group-item">
                            创建日期 :
                            <span class="text-blue ml-10"> {{groupListDetial.createTime}} </span>
                        </li>
                        <li class="list-group-item">
                            备注 :
                            <span class="text-blue ml-10"> {{groupListDetial.remark}} </span>
                        </li>
                    </ul>

                </el-tab-pane>
                <el-tab-pane label="客户列表" name="second">
                    <div style="padding-left:20px">
                        <el-form :inline="true" class="demo-form-inline">
                            <el-form-item label="客户名称">
                                <el-input size="small" placeholder="客户名称"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" icon="search" size="small">搜索</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div>
                        <el-table :data="specificationsList" highlight-current-row border style="width: 100%">
                            <el-table-column type="index" prop="index" label="序号" width="80">
                            </el-table-column>
                            <el-table-column prop="specName" label="客户名称" sortable width="180">
                            </el-table-column>
                            <el-table-column prop="specNo" label="客户电话" sortable width="180">
                            </el-table-column>
                            <el-table-column prop="enable" label="创建时间" width="180">
                            </el-table-column>
                            <el-table-column label="操作" fixed="right" width="180">
                                <template scope="scope">

                                    <el-button @click.native.prevent="deleteSpec(specificationsList[scope.$index].id)" type="text" size="small">
                                        移除
                                    </el-button>
                                </template>
                            </el-table-column>

                        </el-table>
                        <div class="block">
                            <el-pagination @size-change="twoSizeChange" @current-change="twoCurrentChange" :current-page="twoSearch.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="twoSearch.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="twoTotal">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { readBaseProcduct, readBaseSpec, readBaseStruList, addBaseStru, deleteBaseStru, readBaseCustomerList } from "@/api/base"
import { readStruStandardList, getSelectStruStandard , updataSelectStruStandard } from "@/api/spc"

function groupformcus() {
    // 添加的时候的构造函数
    this.productName = '',
    this.productId = '',
    this.spec = '',
    this.enable = 0,
    this.struCode = '',
    this.remark = '',
    this.storage = ''
}
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
    data() {
        return {
            checkAll: true,
            checkeds: [
            ],
            checked: [],
            cities: cityOptions,
            isIndeterminate: true,
            detailIO: true,
            specificationsList: [],
            groupList: [],
            groupListDetial: {},
            projectArr: [],
            struId: null,
            dialogSelectVisible: false,
            search: {
                pageNum: 1,
                pageSize: 10,
                product: '',
                enable: '',
                struCode: '',
                storage: '',
                specName: ''
            },
            total: 0,
            twoSearch: {
                pageNum: 1,
                pageSize: 10,
                product: '',
                enable: '',
                struCode: '',
                storage: '',
                specName: ''
            },
            twoTotal: 0,
            options: {
                target: '#group',
                text: '正在加载 .....'
            },
            groupform: {
                productName: '',
                productId: '',
                spec: '',
                enable: 0,
                struCode: '',
                remark: '',
                storage: ''
            },
            loading: false,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            isSide: false,
            activeName: 'first',
            productList: [],
            specList: [],
            rules: {
                productId: [
                    { required: true, message: '请选择所属种类', trigger: 'blur' }
                ],
                spec: [
                    { required: true, message: '请选择规格', trigger: 'change' }
                ],
                enable: [
                    { required: true, message: '是否启用', trigger: 'change' }
                ],
                struCode: [
                    { required: true, message: '请输入结构代码', trigger: 'change' }
                ]

            },
            projectProps:{
                children:'sdata',
                value:'id',
                label:'value'
            }
        }
    },
    methods: {
        removeProject(index){
            this.checkeds.splice(index , 1)
        },
        addCorrelate(){
            let obj = new Object();
            obj.standardMinValue = null;
            obj.standardAvgValue = null;
            obj.standardMaxValue = null;
            obj.projectId = '';
            obj.struId = this.struId;
            this.checkeds.push(obj)
        },
        lookThis(v) {
            console.log(v)
        },
        updataSelectStru(){
            updataSelectStruStandard(this.checkeds).then(res => {
                console.log(res)
                if (res.httpCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '成功!'
                    });
                    this.detailIO = true
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
        checkProjectOver() {
            this.checked.forEach((value, index) => {
                let obj = new Object;
                obj.projectId = value.id;
                obj.project = value.project;
                obj.struId = this.struId;
                obj.standardName = value.value;
                obj.standardMinValue = null;
                obj.standardAvgValue = null;
                obj.standardMaxValue = null;
                this.checkeds.push(obj);

                // this.checkeds.push(obj)
                // if(this.checkeds.length>0){
                //     console.log(this.checkeds[index])
                //     console.log(value.id)
                //     if(this.checkeds[index].projectId == value.id){
                //         console.log(1)
                //     }else{
                //         let obj = new Object;
                //         obj.projectId = value.id;
                //         obj.project = value.project;
                //         obj.struId = this.struId;
                //         obj.standardName = value.value;
                //         obj.standardMinValue =null;
                //         obj.standardAvgValue =null;
                //         obj.standardMaxValue =null;
                //         this.checkeds.push(obj)
                //     }
                // }else{
                //     let obj = new Object;
                //     obj.projectId = value.id;
                //     obj.project = value.project;
                //     obj.struId = this.struId;
                //     obj.standardName = value.value;
                //     obj.standardMinValue =null;
                //     obj.standardAvgValue =null;
                //     obj.standardMaxValue =null;
                //     this.checkeds.push(obj)
                // }
            })
            this.checkeds.find((val, ind, arr) => {
                console.log(val)
            })
            this.dialogSelectVisible = true;
        },
        handleCheckAllChange(event) {
            this.checkedCities = event.target.checked ? cityOptions : [];
            this.isIndeterminate = false;
            console.log(event)
        },
        handleCheckedCitiesChange(v) {
            console.log(v)
            // v.forEach((value,index)=>{
            // let obj = new Object;
            // obj.projectId = value.id;
            // obj.project = value.project;
            // obj.struId = this.struId;
            // obj.standardName = value.value;
            // obj.standardMinValue =null;
            // obj.standardAvgValue =null;
            // obj.standardMaxValue =null;
            // this.checkeds.forEach((val,ind)=>{
            //     if(val.projectId == value.id){
            //         console.log(1)
            //     }else{
            //         console.log(2)
            //     }
            // })

            // this.checkeds.push(obj)
            // if(this.checkeds.length>0){
            //     console.log(this.checkeds[index])
            //     console.log(value.id)
            //     if(this.checkeds[index].projectId == value.id){
            //         console.log(1)
            //     }else{
            //         let obj = new Object;
            //         obj.projectId = value.id;
            //         obj.project = value.project;
            //         obj.struId = this.struId;
            //         obj.standardName = value.value;
            //         obj.standardMinValue =null;
            //         obj.standardAvgValue =null;
            //         obj.standardMaxValue =null;
            //         this.checkeds.push(obj)
            //     }
            // }else{
            //     let obj = new Object;
            //     obj.projectId = value.id;
            //     obj.project = value.project;
            //     obj.struId = this.struId;
            //     obj.standardName = value.value;
            //     obj.standardMinValue =null;
            //     obj.standardAvgValue =null;
            //     obj.standardMaxValue =null;
            //     this.checkeds.push(obj)
            // }
            // })

        },
        computations(item) {
            console.log(item)

            if (item.standardMaxValue && item.standardMinValue) {
                item.standardAvgValue = (item.standardMaxValue + item.standardMinValue) / 2
            }
        },
        //准备客户群数据
        readData() {
            this.fullscreenLoading = true;
            readBaseStruList(this.search).then(response => {
                console.log(response.data)
                this.groupList = response.data
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
        searchDate() {
            //查询
            this.readData()
        },
        addGroup() {
            this.dialogFormVisible = true;
            this.groupform = new groupformcus();
        },

        compileProduct(sid, index) {
            // console.log(this.groupList[index].productId)
            this.struId = sid;
            let projectId = this.groupList[index].productId
            readStruStandardList({ productId: projectId }).then(response => {
                // console.log(response)
                let arr = response.data.map((d) => { return d.project });
                // console.log(new Set(arr))
                let setArr = new Set(arr);
                let newArr = Array.from(setArr)
                let ProjectArr = [];
                newArr.forEach((v, i) => {
                    let obj = { title: v }
                    let sdataList = response.data.filter((d) => {
                        if (v == d.project) {
                            return d
                        }
                    });
                    obj.sdata = sdataList;
                    obj.checkAll = true;
                    obj.checked = [];
                    ProjectArr.push(obj)
                });
                this.projectArr = ProjectArr;

                getSelectStruStandard({ struId: sid }).then(response => {
                    console.log(response);
                    this.checkeds = response.data
                }).catch(error => {
                    console.log(error)
                })


                this.detailIO = false;
                // this.dialogSelectVisible = true;
            }).catch(error => {
                console.log(error)
                // this.$message({
                // 	type: 'info',
                // 	message: '数据加载失败'
                // });
            })
            
        },
        compileStru(index) {
            this.groupform = Object.assign({}, this.groupList[index]);
            this.dialogFormVisible = true;
        },
        removeStru(sid) {
            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteBaseStru({ id: sid }).then(res => {
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
                    this.readData()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        groupSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addBaseStru(this.groupform).then(res => {
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
                } else {
                    this.$message({
                        type: 'info',
                        message: '失败'
                    });
                    return false;
                }
            });

        },
        handleSizeChange(val) {
            this.search.pageSize = val
            this.readData()
        },
        //点击第几页
        handleCurrentChange(val) {
            this.search.pageNum = val
            // this.readData()
        },
        twoSizeChange(val) {
            this.search.pageSize = val
        },
        twoCurrentChange(val) {
            this.search.pageNum = val
            // this.readData()
        },
        rightSideShow(index) {
            this.groupListDetial = this.groupList[index];
            this.isSide = true;
        },
        //弹出框隐藏
        rightSideHide() {
            this.isSide = false;
        },
        // 查所有产品和规格
        readProcduct() {
            readBaseProcduct({}).then(res => {
                this.productList = res.data
            }).catch(err => {
                console.log(err)
            });

        },
        changeRequest() {
            readBaseSpec({ productId: this.groupform.productId }).then(res => {
                this.specList = res.data;
                this.groupform.spec = '';
                // this.groupform.enable= 0,
                // this.groupform.struCode= '',
                // this.groupform.remark='',
                // this.groupform.storage= ''
            }).catch(err => {
            });
        },
        getCustomerList() {
            this.fullscreenLoading = true;
            readBaseCustomerList({}).then(response => {
                console.log(response)
                this.groupList = response.data
                this.twoTotal = response.total // 总条数
                this.fullscreenLoading = false;
            }).catch(error => {
                this.$message({
                    type: 'info',
                    message: '数据加载失败'
                });
                this.fullscreenLoading = false;
            })
        }



    },
    mounted() {
        this.readData();
        this.readProcduct();
        this.changeRequest();
        var that = this;
        $('.right-side').css('height', $(window).height() - 90 + 'px');
        $(window).resize(function() {
            $('.right-side').css('height', $(window).height() - 90 + 'px');
        });
        $(document).on('click', function() {
            that.rightSideHide()
        });
    }
}
</script>

<style lang="scss" scoped>
table {
    tr {
        cursor: pointer;
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
</style>

