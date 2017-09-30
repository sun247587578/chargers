<template>
    <div>
        <el-row :gutter="20" style="margin-right:0px">
            <el-col :span="6">
                <el-tree :data="deptObj" label="deptObj.deptName" id="stree" style="overflow:auto" @node-click="nodeClick" node-key="id" :props="defaultProps"></el-tree>
            </el-col>
            <el-col :span="18" style="border:1px solid #ccc;padding:0">
                <div>
                    <p class="title" style="padding:10px">部门管理</p>
                </div>
                <div style="padding-right:15px;padding-top:15px;width:700px">

                    <el-form ref="deptForm" :model="deptForm" label-width="80px">
                        <el-form-item label="部门名称">
                            <el-input v-model="deptForm.deptName" placeholder="请输入部门名称"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="职位编号">
                          <el-input v-model="deptForm.positionNo"></el-input>
                        </el-form-item> -->

                        <el-form-item label="负责人">
                            <el-select v-model="deptForm.managerId" filterable placeholder="请选择部门负责人">
                                <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="上级部门">
                            <el-select v-model="deptForm.parentId" filterable placeholder="请选择上级部门">
                                <el-option label="无" :value="0"></el-option>
                                <el-option v-for="item in deptList" :key="item.id" :label="item.deptName" :value="item.id"></el-option>
                            </el-select>
                            <!-- <multiselect :options="deptList" v-model="deptForm.parentId"  :multiple="true"  :close-on-select="true"  placeholder="Pick some"  label="deptName"  track-by="id">
                            </multiselect> -->
                        </el-form-item>
                        <el-form-item label="部门排序" >
                            <el-input v-model="deptForm.sortNo" placeholder="请输入部门排序"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="备注">
                          <el-input type="textarea" v-model="deptForm.remark"></el-input>
                        </el-form-item> -->
                        <el-form-item>
                            <el-button type="primary" :loading="loading" @click.native.prevent="onSubmit">确认</el-button>
                            <el-button v-if="this.deptForm.id" type="warning" @click.native.prevent="deleteDeptData">删除</el-button>
                            <el-button type="text" @click.native.prevent="reseat">重置</el-button>
                        </el-form-item>
                    </el-form>

                </div>
            </el-col>

        </el-row>

    </div>
</template>

<script>
import { readDeptList, updataDept, getDeptInfo, getUserInfo , deleteDept} from "@/api/oa"
import Multiselect from 'vue-multiselect'
export default {
    components: { Multiselect },
    data() {
        return {
            loading: false,
            deptObj: [],
            deptList: [],
            userList: [],
            userListcus:[],
            deptForm: {
                deptName: null,
                managerId: null,
                parentId: null,
                sortNo: null,
                leaf: 0
            },
            deptFormcus: {
                deptName: null,
                managerId: null,
                parentId: null,
                sortNo: null,
                leaf: 0
            },
            defaultProps: {
                children: 'children',
                label: 'deptName',
            }
        };
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);

        },
        reseat(){
            this.deptForm = Object.assign({},this.deptFormcus);
            this.userList = Object.assign({},this.userListcus);
        },
        copeObj(obj1,obj2){
            if(typeof obj1 !== 'object' ||typeof obj2 !== 'object'){
                return
            }
            let obj =  Object.assign({} , obj2)
            let backObj = new Object
            for(var i in obj1){
                backObj[i] = obj[i]
            }
            backObj.id = obj.id
            return backObj
        },
        nodeClick(a, b, c) {
            console.log(a)
            if(a.parentId){
                a.parentId = a.parentId.toString();
            }else{
                a.parentId=null
            }
            if(a.managerId){
                    a.managerId = a.managerId.toString();
            }else{
                a.managerId=null
            }
            let newUserList = [];
            this.userListcus.forEach((v,i)=>{
                if(v.deptId == a.id || v.otherDeptId == a.id){
                    newUserList.push(v) 
                }
            })
            this.userList = newUserList ;
            this.copeObj(this.deptForm , a);
            var newObj = new Object();
            $.extend( true, newObj, this.deptForm , a);
            // this.schRegionsDetial = Object.assign({}, this.schRegions[index])
            // this.schRegionsDetial = newObj
            // this.deptForm = this.copeObj(this.deptForm , a);
            this.deptForm = newObj;
            this.deptForm.managerId = this.deptForm.managerId ? this.deptForm.managerId.toString() : '';
            // console.log(this.deptForm)
        },
        readTreeList() {
            readDeptList().then(response => {
                this.deptObj = response.data
            }).catch(error => {

            })
            getDeptInfo().then(response => {
                this.deptList = response.data
            }).catch(error => {

            })
        },
        getUserList() {
            getUserInfo().then(response => {
                console.log(response)
                this.userList = response.data
                this.userListcus = response.data
            }).catch(error => {

            })
        },
        deleteDeptData(){
            // deleteDept
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteDept({id:this.deptForm.id}).then(res => {
                    if (res.httpCode == 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        // this.$router.push({path: '/OA/daily/myDaily'});
                        this.readTreeList();
                        this.deptForm = Object.assign({},this.deptFormcus)
                        console.log(this.deptForm)
                    } else {
                        this.$message({
                            type: 'info',
                            message: res.msg
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
        onSubmit() {
            console.log(this.deptForm)
            this.loading = true
            if(this.deptForm.parentId){
                this.deptForm.parentId =  this.deptForm.parentId.toString()
            }
            if(this.deptForm.managerId){
                this.deptForm.managerId = this.deptForm.managerId.toString()
            }
            console.log(this.deptForm)
            updataDept(this.deptForm).then(res => {
                console.log(res)
                switch (res.httpCode) {
                    case 200:
                        this.$notify.success({
                            title: '提示',
                            message: '添加成功'
                        });
                        this.readTreeList();
                        this.getUserList();
                        break;
                    default:
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                        break;
                }
                this.loading = false
            }).catch(error => {
                console.log(error)
            })

        },

        //获取职位相关信息list
        getPosition() {
            getPositionInfo().then(response => {
                this.positionInfo = response.data;
            }).catch(error => {
            })
        },
        //获取部门相关信息list
        getDept() {
            getDeptInfo().then(response => {
                this.deptInfo = response.data
            }).catch(error => {
            })
        },
        resetForm(formName) {
            this.positionForm = Object.assign({}, this.positionFormcus)
        }
    },
    mounted() {
        var stree = document.getElementById('stree');
        let clHeight = $(window).height();
        stree.style.height = clHeight - 80 + 'px';
        this.readTreeList();
        this.getUserList();
        console.log(window.location)
        // this.getDept();
        // this.getPosition();
    },
};
</script>

<style  lang="scss" scoped>
.title {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    font-weight: 800;
}

.el-select {
    width: 100%;
}
</style>