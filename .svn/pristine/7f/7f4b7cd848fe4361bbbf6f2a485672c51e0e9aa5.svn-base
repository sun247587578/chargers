<template>
    <div class="navbar">
        <el-row>
            <el-col :span="3" style="height:60px;">
                <div class="navbar-header" style="line-height: 60px;">
                    <img id="userImg" src="../../assets/user-head.png" style="height: 40px; width: 40px; border-radius: 50%;background-color: #fff;">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            {{loginUserName}}
                            <!-- <i class="el-icon-caret-bottom el-icon--right"></i> -->
                        </span>
                        <!-- <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>信息设置</el-dropdown-item>
                            <el-dropdown-item>退出</el-dropdown-item>
                        </el-dropdown-menu> -->
                    </el-dropdown>
                </div>
            </el-col>
            <el-col :span="17" ref="menu" class="navigation clearfix" id="navigation">
                <ul class="f-l nav clearfix">
                    <div class="nav-autolis f-l clearfix" style="overflow: hidden">
                        <li>
                            <a href="#">
                                <i class="fa fa-camera-retro"></i>
                            </a>
                        </li>
                        <li>
                            <router-link to="/announcement" class="vueRouterLink">
                                <a href="javascript:;">项 目</a>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/" class="vueRouterLink">
                                <a href="javascript:;">任 务</a>
                            </router-link>
                        </li>
                        <!-- <li>
                            <a href="./asset.html" target="_Blank">审 批</a>
                        </li> -->
                        <li>
                            <router-link to="/OA/daily/myDaily" class="vueRouterLink">
                                <a href="javascript:;">日报 </a>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/OA/announcement/companyAnnouncement" class="vueRouterLink">
                                <a href="javascript:;">公告</a>
                            </router-link>
                        </li>
                    </div>
                    <li class="more" style="color: rgb(102, 102, 102); background: rgb(45, 195, 232);">
                        <a href="jacascript:;" style="color: rgb(255, 255, 255);">更多应用</a>
                        <div class="more-list" style="width: 570px;color: rgb(102, 102, 102);">
                            <div>
                                <ul id="masonry" class="pos-r clearfix">

                                    <li class="pin" v-for="(item, index) in menus" :key="item.menuName">
                                        <dl>
                                            <dt>{{item.menuName}}</dt>
                                            <dd v-for="(menuItem, menuIndex) in item.children">
                                                <a href="javascript:;" @click="doMenu(index, menuIndex)" style="color = #333">
                                                <i class="d1"></i>{{menuItem.menuName}}</a>
                                            </dd>
                                        </dl>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </el-col>
            <el-col :span="3" :offset="1" style="height:60px">
                
                <el-dropdown @command="handleCommand" style="float:right;">
                    <span class="el-dropdown-link">
                        <!-- <i class="el-icon-caret-bottom el-icon--right" style='font-size:40px'></i> -->
                        <i class="fa fa-th" aria-hidden="true"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1">个人信息修改</el-dropdown-item>
                        <el-dropdown-item command="2">修改密码修改</el-dropdown-item>
                        <el-dropdown-item command="3">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown style="float:right">
                    <span class="el-dropdown-link">
                        <i class="fa fa-android" aria-hidden="true"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <div style="width:180px;height:180px">
                            <img src="/static/QRCode/Android.png" style="width:100%">
                        </div>
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
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
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
import { setPassword, getCurrentUserInfo, updateUserInfo  } from '@/api/login'
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
            },
            loginUserName:'',
        }
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'avatar',
            'name',
            'navbarMenus',
            'menus'
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
                            this.$nextTick(() => {
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
                    this.$store.dispatch('FedLogOut').then(() => {
                        this.$router.replace({ path: '/login' })
                    })
                    removeToken()
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
                    setPassword(this.form).then(response => {
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
        },
        waterfall () {
            var $aPin = $("#masonry>.pin");
            var iPinW = $aPin.eq(0).width();// 一个块框pin的宽
            var num = 3;//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
            var pinHArr = [];//用于存储 每列中的所有块框相加的高度。

            $aPin.each(function (index, value) {
                var pinH = $aPin.eq(index).height();
                if (index < num) {
                    pinHArr[index] = pinH; //第一行中的num个块框pin 先添加进数组pinHArr
                } else {
                    var minH = Math.min.apply(null, pinHArr);//数组pinHArr中的最小值minH
                    var minHIndex = $.inArray(minH, pinHArr);
                    $(value).css({
                        'position': 'absolute',
                        'top': minH,
                        'left': $aPin.eq(minHIndex).position().left
                    });
                    //数组 最小高元素的高 + 添加上的aPin[i]块框高
                    pinHArr[minHIndex] += $aPin.eq(index).height();//更新添加了块框后的列高
                }
            });
            var max = (Math.max.apply(null, pinHArr));
            $("#masonry").height(max);
            $(".more-list").hide();
        },
        doMenu(navIndex, menuIndex) {
            let  topMenu = this.menus[navIndex].menuUrl // 顶层菜单
            let subMenu = this.menus[navIndex].children[menuIndex].menuUrl // 二级菜单
            this.$store.dispatch('FilterModel', topMenu)
            let routePath = topMenu + '/' + subMenu + '/';
            this.$router.push({path: routePath});
        },
        getLoginUserName(){
            getCurrentUserInfo().then(response => {
                if (response.httpCode == 200) {
                    this.loginUserName = response.data.userName;
                    if(response.data.avatar){
                        // console.log(response.data.avatar)
                        // console.log($('#userImg'))
                        // $('#userImg').attr('src' ,'http://112.74.190.114://'+ response.data.avatar)
                    }
                } else {
                }
            }).catch(error => {
                this.$notify.error({
                    title: '提示',
                    message: error.msg

                })
            })
        }
    },
    mounted () {
        console.log(this.menus)
        this.waterfall();
        this.getLoginUserName()
        $(".more").mouseenter(function () {
            $(this).css({ background: "#fff", "color": "#666" }).children().css("color", "#666");
            $(this).find('a .Hui-iconfont').addClass('Hui-iconfont-rotate');
            $(".more-list").show();
        }).mouseleave(function () {
            $(this).css({ background: "#2DC3E8" }).children("a").css("color", "#fff")
            $(this).find('a .Hui-iconfont').removeClass('Hui-iconfont-rotate');
            $(".more-list").hide();
        })
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-dropdown-link{
    height: 60px;
    
    i{
        font-size: 25px;
        line-height: 60px;
        color: #efefef;
        cursor: pointer;
    }
}
.el-dropdown{
    padding: 0 20px;
    &:hover{
        background: #02aed9;
    }
}
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

#navigation {
    height: 60px;
    position: relative;
    z-index: 1002;
    line-height: 60px;
}

.navigation {
    box-sizing: content-box;
    z-index: 101;
}

.more .more-list {
    width: 510px;
    position: absolute;
    top: 60px;
    border-bottom: 1px solid #ccc;
    box-shadow: 0px 3px 10px #ccc;
    background: #ffffff;
}

.more .more-list li {
    float: left;
    width: 170px;
    padding-top: 10px;
    padding-bottom: 10px;
}

.more .more-list li dl {
    border-bottom: 1px solid #F1F1F1;
}

.more .more-list li dt {
    font-size: 14px;
    color: #666;
    font-weight: 600;
    margin-bottom: 10px;
}

.more .more-list li dd {
    color: #9F95B7;
    margin-bottom: 10px;
    position: relative;
    padding: 0 10px;
}

.more .more-list li dd:hover {
    background: #CCCCCC;
}

.navigation .nav>li,
.navigation .nav .nav-autolis>li {
    float: left;
    position: relative;
}

.nav>li:hover,
.nav .nav-autolis>li:hover {
    background: #02AED9;
    -moz-transition: all .2s ease-in;
    -webkit-transition: all .2s ease-in;
    -o-transition: all .2s ease-in;
    -ms-transition: all .2s ease-in;
    transition: all .2s ease-in;
}

.navigation .nav>li>a,
.navigation .nav .nav-autolis>li>a {
    display: block;
    padding: 0 10px;
    line-height: 60px;
    height: 60px;
    font-size: 16px;
    color: #fff;
    >a{
        color: #fff;
        &:focus{            
            text-decoration: none;
        };
        &:hover{            
            text-decoration: none;
        }
    }
    
}

.navigation .nav>li>a:hover,
.navigation .nav .nav-autolis>li>a:hover {
    text-decoration: none;
}


.el-menu-item.is-active {
    color: #3c1e1e;
}
.nav-autolis li {
    display: block;
    width: 80px;
    text-align: center;
}
.vueRouterLink{
    color:#fff;
    text-decoration: none;
}
</style>



