<template>
  <div id="app" style="position: absolute; width: 100%;height: 100%;">
    <router-view></router-view>
  </div>
</template>

<script>
// import 'zui/dist/js/zui.min.js'
export default {
  name: 'app'
}
</script>
<style lang="scss">
@import './styles/index.scss'; // 全局自定义的css样式
clearfix { 

  *zoom: 1; 

}
ul,ol {
     list-style: none;
     
 } 
.f-l{
  float: left;
}
.f-r{
  float:right;
}
 body {
    font-family: 'PingFangSC-Light','Hiragino Sans GB',Microsoft YaHei Light,Microsoft YaHei,Arial,sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;
    background-color: #fff;
    margin: 0;
}
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.clearfix:before, 

.clearfix:after { 

  display: table; 

  line-height: 0; 

  content: ""; 

} 
.clearfix:after { 

  clear: both; 

} 
p{
  margin:0;
}


//侧滑框
.right-side {
  width: 800px;
  height: 800px;
  top:90px;
  position: fixed;
  background: #efefef;
  right: -800px;
  border: 1px solid #ccc;
  transition-property: right;
  transition-duration: 0.3s;
  transition-timing-function: linear;
  overflow: auto;
}

.right-side-show {
  right: 0px;
}

.ml-10{
  margin-left:10px;
}




// 纸张内阴影效果

.wrap {
  width: 100%;
  min-height: 600px;
  background: #fff;
  padding: 10px;
}

.effect {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, .2), 0 0 40px rgba(0, 0, 0, .1) inset;
  position: relative;
}

.effect:before,
.effect:after {
  content: '';
  background: #fff;
  position: absolute;
  top: 50%;
  bottom: 0;
  left: 30px;
  right: 30px; // box-shadow: 0 0 30px rgba(0,0,0,.8);
  border-radius: 100px/10px;
  z-index: -1;
}

//富文本编辑
#quill-container {
    height: auto;
    min-height: 200px;
}




// 日报部分的
.cbp_tmtimeline li:first-child .cbp_tmicon {
    background: #00980b;
}

.cbp_tmtimeline>li .cbp_tmicon {
    width: 50px;
    height: 50px;
    line-height: 50px;
    border: 2px #fff solid;
    position: absolute;
    color: #fff;
    background: #46a4da;
    border-radius: 50%;
    text-align: center;
    left:6px;
}
.cbp_tmlabel {
    margin: 0 0 15px 80px;
    padding: 10px;
    font-size: 1.2em;
    font-weight: 300;
    line-height: 1.4;
    position: relative;
    border: 1px #ccc solid;
    border-radius: 5px;
    background: #fff;
    .daily-con{
        div{
            a,p{
                font-size: 15px;
            }
        }
    }
}
.cbp_tmtimeline:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #afdcf8;
    left: 30px;
}

.el-transfer-panel{
    width:300px;
}
.el-transfer-panel__body {
    padding-bottom: 36px;
    height: 335px;
}
.el-transfer {
    font-size: 14px;
        width: 665px;
    margin: 0 auto;
}
.el-transfer-panel__list.is-filterable {
    height: 269px;
}
</style>


