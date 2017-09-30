<template>
    <div class="navbar">
        <el-row>
            <el-col :span="3" style="height:60px;">
                <div class="navbar-header" style="line-height: 60px;">
                    <img src="../../assets/user-head.png" style="height: 40px; width: 40px; border-radius: 50%;background-color: #fff;">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            冯
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>信息设置</el-dropdown-item>
                            <el-dropdown-item>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
            <el-col :span="17" style="height:60px" ref="menu">
                <el-menu class="el-menu-demo" mode="horizontal" @select="selectModel">
    
                    <el-menu-item index="home" style="border-bottom: 0px solid transparent;">
                        <router-link to="/">
                            <i class="el-icon-menu"></i>
                        </router-link>
                    </el-menu-item>
    
                    <el-menu-item index="task" style="border-bottom: 0px solid transparent;">任务</el-menu-item>
                    <el-menu-item index="schedule" style="border-bottom: 0px solid transparent;">
                        <i class="el-icon-date"></i>日程
                    </el-menu-item>
                    <el-submenu index="5" ref="submenu" style="border-bottom: 0px solid transparent;">
                        <template slot="title" style="border-bottom: 0px solid transparent;">更多应用</template>
                        <template v-for="item in navbarMenus" style="border-bottom: 0px solid transparent;">
                            <router-link :to="item.menuUrl">
                                <el-menu-item :index="item.menuUrl" style="color:#333">
                                    {{item.menuName}}
                                </el-menu-item>
                            </router-link>
                        </template>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="3" :offset="1" style="height:60px">
                <el-dropdown @command="handleCommand" style="float:right">
                    <span class="el-dropdown-link">
                        功能设置
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1">个人信息修改</el-dropdown-item>
                        <el-dropdown-item command="2">修改密码修改</el-dropdown-item>
                        <el-dropdown-item command="3">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    
        <!-- 个人密码修改对话框 -->
        <el-dialog title="个人密码设置" :visible.sync="dialogSetPassword" size="tiny" :modal="false">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPassword">
                    <el-input type="password" v-model="form.oldPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth" prop="password">
                    <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth" prop="pass1">
                    <el-input type="password" v-model="form.pass1" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogSetPassword = false">取 消</el-button>
                <el-button type="primary" @click="setpassword">确 定</el-button>
            </div>
        </el-dialog>
    
        <!-- 个人信息修改对话框 -->
        <el-dialog title="个人信息修改" :visible.sync="dialogCurrentUserInfo">
            <el-form :model="currentUserInfo">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="currentUserInfo.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="账号" :label-width="formLabelWidth">
                    <el-input v-model="currentUserInfo.account" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input type="email" v-model="currentUserInfo.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" :label-width="formLabelWidth">
                    <el-input v-model="currentUserInfo.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input type="password" v-model="currentUserInfo.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio-group v-model="currentUserInfo.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="入职时间" :label-width="formLabelWidth">
                    <el-date-picker v-model="currentUserInfo.entryTime" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="工号" :label-width="formLabelWidth">
                    <el-input v-model="currentUserInfo.staffNo" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="主属部门" :label-width="formLabelWidth">
                    <el-select v-model="currentUserInfo.deptId" clearable placeholder="" style="width:100%">
                        <el-option v-for="item in deptInfo" :key="item.id" :label="item.deptName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="附属部门" :label-width="formLabelWidth">
                    <el-select v-model="currentUserInfo.otherDeptId" clearable placeholder="" style="width:100%">
                        <el-option v-for="item in deptInfo" :key="item.id" :label="item.deptName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>    
                    <el-form-item label="岗位" :label-width="formLabelWidth">
                    </el-form-item>
                    <el-form-item label="上级" :label-width="formLabelWidth">
                    </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCurrentUserInfo = false">取 消</el-button>
                <el-button type="primary" @click="saveCurrentUserInfo">确 定</el-button>
            </div>
        </el-dialog>
    
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { removeToken } from '@/utils/auth'
import { setPassword, getCurrentUserInfo, updateUserInfo } from '@/api/login'
import { getDeptInfo } from "@/api/oa"

export default {
    data () {
        const validatePass = (rule, value, callback) => {
            if (value !== this.form.password) {
                callback(new Error('确认密码输入错误，请重新输入'));
            } else {
                callback();
            }
        };

        return {
            activeIndex: '1',
            input2: '',
            userInfo: {},
            deptInfo: [],
            dialogCurrentUserInfo: false,
            dialogSetPassword: false,
            currentUserInfo: {},
            form: {
                oldPassword: '',
                password: '',
                pass1: ''
            },
            formLabelWidth: '80px',
            rules: {
                oldPassword: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                pass1: [
                    { required: true, message: '请确保两次输入的密码一致', trigger: 'blur', validator: validatePass }
                ],
            }
        }
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'avatar',
            'name',
            'navbarMenus'
        ])
    },
    methods: {
        getDept () {

        },
        searchContent () {
        },

        handleCommand (command) {
            switch (parseInt(command)) {
                case 1:
                    getCurrentUserInfo().then(response => {
                        if (response.httpCode == 200) {
                            this.currentUserInfo = response.data
                            return Promise.resolve()
                        } else {
                            return Promise.reject(response)
                        }
                    }).then(() => {
                       getDeptInfo().then(response => {
                         this.deptInfo = response.data
                         this.$nextTick( () => {
                             this.dialogCurrentUserInfo = true
                         }) 
                       })
                    }).catch(error => {
                        this.$notify.error({
                            title: '提示',
                            message: error.msg

                        })
                    })
                    break;
                case 2:
                    this.form = {
                        oldPassword: '',
                        password: '',
                        pass1: ''
                    }
                    this.$nextTick(() => {
                        this.dialogSetPassword = true
                    })
                    break;
                case 3:
                    removeToken()
                    this.$router.replace({ path: '/login' })
                    break;
                default:
                    break;
            }
        },

        saveCurrentUserInfo () {
            // 1、调用新建或者更新用户接口
            updateUserInfo(this.currentUserInfo).then(response => {
                // 2、接口处理完，处理各种信息，关闭对话框
                switch (response.httpCode) {
                    case 200:
                        this.$alert('用户信息修改成功', '系统提示', {
                            type: 'success',
                            callback: action => {
                                this.dialogCurrentUserInfo = false
                            }
                        })
                        break;
                    default:
                        this.$alert(response.msg, '系统提示', {
                            type: 'error',
                            callback: action => {
                                this.dialogCurrentUserInfo = false
                            }
                        })
                        break;
                }

            }).catch(error => {

            })

        },

        setpassword () {

            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    // 数据检验通过进行修改
                    setPassword(this.form.password, this.form.oldPassword).then(response => {
                        switch (response.httpCode) {
                            case 200:
                                this.$alert('用户密码修改成功', '系统提示', {
                                    type: 'success',
                                    callback: action => {
                                        this.dialogSetPassword = false
                                    }
                                })
                                break;
                            default:
                                this.$alert(response.msg, '系统提示', {
                                    type: 'error',
                                    callback: action => {
                                        this.dialogSetPassword = false
                                    }
                                })
                                break;
                        }
                    }).catch(error => {
                    })
                }
            })
        },
        selectModel (index) {
            let custIndex = ['home', 'task', 'schedule']
            let coust1 = custIndex.findIndex(item => item == index)
            if (coust1 >= 0) {
                return 
            } else {
               this.$store.dispatch('FilterModel', index) 
            }
            
        }
    },
    mounted () {
        const elMenu = this.$refs.submenu.$el
        const submenuObj = this.$refs.submenu.$refs['submenu-title'];
        // submenuObj.style.height = '50px'
        // submenuObj.style.lineHeight = '50px'
        const dropMenu = elMenu.querySelector('ul')
        // dropMenu.style.top = '52px'
        dropMenu.style.width = '200px';
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {

    border-radius: 0px !important;
    background: #2dc3e8;
    height: 60px;
    line-height: 60px;
    padding-left: 15px;
    padding-right: 15px;
    margin-left: auto;
    margin-right: auto;
    .navbar-header {
        img {
            vertical-align: middle;
        }
        .dropdown-toggle {
            .caret {
                display: inline-block;
                width: 0;
                height: 0;
                margin-left: 2px;
                vertical-align: middle;
                border-top: 4px dashed;
                border-top: 4px solid \9;
                border-right: 4px solid transparent;
                border-left: 4px solid transparent;
            }
        }
    }
    .el-menu {
        background-color: #2dc3e8;
        .el-menu-item {
            color: #fff;
            &:hover {
                background: #02aed9;
            }
        }
        .el-submenu__title {
            color: #fff !important;
            .el-icon-caret-bottom {
                color: #fff;
            }
            &:hover {
                color: #333 !important;
            }
        }
    }
}

.el-menu--horizontal>.el-submenu:hover .el-submenu__title {
    border-bottom: 5px solid #20a0ff;
    color: red !important;
}


.el-menu-item.is-active {
    color: #3c1e1e;
}
</style>



