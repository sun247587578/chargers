<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <span class="svg-container">
          <icon-svg icon-class="jiedianyoujian"></icon-svg>
        </span>
        <el-input name="account" type="text" v-model.trim="loginForm.account" @blur="showTenant" autoComplete="on" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="mima"></icon-svg>
        </span>
        <el-input name="password" type="password" v-model.trim="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item v-if="isShowTenant" prop="tenantId" style="width:100%">
        <el-select v-model="loginForm.tenantId" placeholder="请选择单位">
          <el-option v-for="item in tenants" :key="item.id" :label="item.unitName" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="verify">
        <span class="svg-container">
          <icon-svg icon-class="mima"></icon-svg>
        </span>
        <el-input name="checkCode" type="text" @keyup.enter.native="handleLogin" v-model.trim="loginForm.checkCode" autoComplete="on" placeholder="验证码"></el-input>
		    <img ref="checkImg" class="login-img" src='/api/login/getCheckCode' @click="imgReload" />
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
        
      </el-form-item>
      <el-form-item>
        <el-button type="danger" style="width:100%;" @click.native.prevent="handleRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { getTenant } from '@/api/login'

export default {
  name: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 0) {
        callback(new Error('密码不能小于0位'));
      } else {
        callback();
      }
    };
    return {
      isShowTenant: false, // 用于控制地址的显示
      LoginOrRegister : true,
      tenants: [], // 用户的地址
      loginForm: {
        phone: null,
        password: '',
        checkCode: '',
        tenantId: null
      },
      loginRules: {
        email: [
          { required: true, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  mounted() {
    let checkImg = this.$refs.checkImg;
    checkImg.setAttribute('src', '/api/login/getCheckCode'+'?'+ new Date());
    console.log(this.$store)
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then(() => {            
			      this.loading = false;
            this.$router.push({ path: '/' });
          }).catch((res) => {
            this.loading = false;
            this.imgReload()
          });
        } else {
          return false;
        }
      });
    },
    imgReload(){
      let checkImg = this.$refs.checkImg;
      checkImg.setAttribute('src', '/api/login/getCheckCode'+'?'+ new Date());
    },
    handleRegister(){
      this.$router.push({ path: '/register' });
    },
    showTenant() {
      if(this.loginForm.account){
        getTenant(this.loginForm.account).then(response => {
          if (response.httpCode == 200) {
            this.tenants = response.data
            if (this.tenants.length > 0) {
              this.loginForm.tenantId = this.tenants[0].id
            }
            this.isShowTenant = true
          } else {
            this.tenants = []
            this.isShowTenant = false
            this.$notify.error({
              title: '错误',
              message: '没有找到用户对应的单位信息'
            });
          }
        }).catch()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}

.login-container {
  @include relative;
  height: 100vh;
  // background-color: #2d3a4b;
  background: url(../../assets/login/bg.jpg) no-repeat;

  background-size: 100%;
  .el-select {
    width: 100%;
    .el-input {
      width: 100%;
    }
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: #eeeeee;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #eeeeee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    background-color:rgba(0,0,0,0.5);
    border-radius: 5px;
    box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.2);
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .forget-pwd {
    color: #fff;
  }
  .login-img {
	float: left;
    position: absolute;
    right: 0px;
    top: 9px;
  }
}
</style>
