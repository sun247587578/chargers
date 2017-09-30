<template>
  <div class="lab">
    <el-row>
      <el-col :span="4">
        <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo" theme="dark">
          <el-menu-item-group title="选择列表">
            <el-menu-item index="1">
              <i class="el-icon-message"></i>检测报告</el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-message"></i>实验记录</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-col>
      <el-col :span="20" class="content">
        内容区域
      </el-col>
    </el-row>
  </div>
</template>

<script>

</script>

<style>
.el-menu-vertical-demo {
  width:240px;
  top:50px;
  position: fixed;
  bottom:0px;

}
.content{
  margin-left:250px;
  margin-top:5px;
}

</style>
