<template>
    <div class="register">
        <div class="container-fixed" style="padding-top:50px">
            <h1 style="text-align:center" class="company">畅哲云平台</h1>
            <h1 style="text-align:center" class="company">
                <small>企业注册</small>
            </h1>
            <div class="center-block register-form" style="width:600px">
                <el-form ref="form" :model="form" label-width="100px" v-show='registerNext'>
                    <el-form-item label="请输入手机号">
                        <el-col :span="18">
                            <el-input v-model="form.phone"></el-input>
                        </el-col>
                        <el-col :span="6" style="text-align:center">
                            <el-button type="text" :disabled="verification" @click="getVerification"> {{setTime}} </el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="请输入验证码" v-show="verification">
                        <el-col :span="18">
                            <el-input v-model="form.remark"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :disabled="!form.remark" @click="regNext">下一步</el-button>
                    </el-form-item>
                </el-form>
                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" v-show="!registerNext">
                    <el-form-item label="" prop="unitName">
                        <el-col :span="18">
                            <el-input v-model="ruleForm2.unitName" placeholder="请输入企业名称"></el-input>
                        </el-col>
                        <el-col :span="6" style="text-align:center">
                        </el-col>
                    </el-form-item>
                    <!-- <el-form-item  prop="name">
                                <el-input v-model="ruleForm2.name" placeholder="请输入企业名称"></el-input>
                            </el-form-item> -->
                    <el-form-item label="" prop="userName">
                        <el-col :span="18">
                            <el-input v-model="ruleForm2.userName" placeholder="请输入真实姓名"></el-input>
                        </el-col>
                        <el-col :span="6" style="text-align:center">

                        </el-col>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-col :span="18">
                            <el-input type="password" v-model="ruleForm2.password" placeholder="请输入密码"></el-input>
                        </el-col>
                        <el-col :span="6" style="text-align:center">

                        </el-col>
                    </el-form-item>
                    <el-form-item label="" prop="password1">
                        <el-col :span="18">
                            <el-input type="password" v-model="ruleForm2.password1" placeholder="请确认密码"></el-input>
                        </el-col>
                        <el-col :span="6" style="text-align:center">

                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>

import { validatePhone } from '@/utils/validate'
import { getRegisterCode, checkRegisterCode, registerCompany } from '@/api/register'

export default {
    data() {
        var checkAge = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('不能为空'));
            }

        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm2.password !== '') {
                    this.$refs.ruleForm2.validateField('password1');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            form: {
                phone: '',
                remark: null,
            },
            ruleForm2: {
                unitName: '',
                account: '',
                userName: '',
                password: '',
                password1: ''
            },
            verification: false,
            setTime: '获取验证码',
            registerNext: false,
            rules2: {
                unitName: [
                    { validator: checkAge, required: true, trigger: 'blur' }
                ],
                userName: [
                    { required: true, message: '请输入真实姓名', trigger: 'change' }
                ],
                password: [
                    { validator: validatePass, required: true, trigger: 'blur' }
                ],
                password1: [
                    { validator: validatePass2, required: true, trigger: 'blur' }
                ]

            }
        }
    },
    methods: {
        submitForm(formName) {
            console.log(1)
            this.$refs[formName].validate((valid) => {
                console.log(this.ruleForm2)
                if (valid) {
                    alert(1)
                    // registerCompany(this.ruleForm2).then(res => {
                    //     if (res.httpCode == 200) {
                    //         this.$message({
                    //             type: 'success',
                    //             message: '注册成功'
                    //         });
                    //         setTimeout(()=>{
                    //             this.$router.push({ path: '/login' });
                    //         },500)
                            
                    //     } else {
                    //         this.$message({
                    //             type: 'info',
                    //             message: '操作失败'
                    //         });
                    //     }
                    // }).catch(err => {
                    //     console.log(err)
                    //     this.$message({
                    //         type: 'info',
                    //         message: '操作失败'
                    //     });
                    // })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            console.log(2)
        },
        getVerification() {
            if (validatePhone(this.form.phone)) {

                getRegisterCode({ phone: this.form.phone }).then(res => {
                    console.log(res)
                    if (res.httpCode == 200) {

                        this.verification = true;
                        this.interval()
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

            } else {
                this.$message({
                    type: 'info',
                    message: '请输入正确的手机号'
                });
            }

        },
        regNext() {
            checkRegisterCode({ remark: this.form.remark }).then(res => {
                if (res.httpCode == 200) {
                    this.registerNext = false;
                    this.ruleForm2.account = this.form.phone
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
        interval() {
            let keepTime = 60;

            let intervalVerfication = setInterval(v => {
                keepTime--;
                this.setTime = keepTime + '秒后重新获取';
                console.log(this.setTime)
                if (keepTime <= 0) {
                    clearTimeout(intervalVerfication)
                    this.setTime = '获取验证码';
                    this.verification = false;
                }
            }, 1000)
            // clearTimeout (intervalVerfication)
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
.register {
    // position: absolute;
    width: 100%;
    height: 100%;
    background: #DCF9F2; // background: url(../../assets/login/bg.jpg) no-repeat;
    background-size: 100% 100%;
    .company {
        font-size: 50px;
        font-family: cursive;
        letter-spacing: 20px;
        text-shadow: #999 5px 5px 10px;
    }
    .register-form {
        border-radius: 5px;
        padding: 40px 20px;
        margin-top: 20px;
        background: #fff;
        box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.2);
    }
}
</style>
