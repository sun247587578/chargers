<template>
  <el-menu mode="vertical" theme="dark" :default-active='$route.path'>
    <sidebar-item :routes='sidebarRouter' :modelName="currentModel"></sidebar-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import CustomSidebarItem from './CustomSidebarItem';
export default {
  components: { SidebarItem: CustomSidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'currentModel',
      'sidebarRouter'
    ]),
    currentRouter () {
      // 获取当前的模块
      let routers = this.$store.getters.permission_routers
      // url 格式如下 http://localhost:8000/#/oa/userManagement      
      let url = location.href
      let asynRouter = []
      if (url.includes('#')) { // 如果路由是hash模式
        let modelName = url.split('#')[1] // 获取模块名称
        modelName = '/' + modelName.split('/')[1] // 处理模块名，然后和路由表去比较
        let router = []
        router = routers.filter(item => {
          if (item.path == modelName) {
            return true
          }
        }
        )
        // 把选定的模块的子路由展开显示
        asynRouter = router[0].children.map(item => item)
      } else {
        asynRouter = routers
      }
      return asynRouter
    },
    currModel () { // 获取当前模块
      let routers = this.$store.getters.permission_routers
      // url 格式如下 http://localhost:8000/#/oa/userManagement      
      let url = location.href
      let asynRouter = []
      if (url.includes('#')) { // 如果路由是hash模式
        let modelName = url.split('#')[1] // 获取模块名称
        modelName = '/' + modelName.split('/')[1] // 处理模块名，然后和路由表去比较
        // 把选定的模块的子路由展开显示
        asynRouter = modelName
      } else {
        asynRouter = '/'
      }
      return asynRouter
    },
    sidebar () {
      let routers = this.$store.state.user.sidebarRouter
      if (routers == '') {
        this.$store.dispatch('setSidebarRouter')
        routers = this.$store.state.user.sidebarRouter
        return routers
      } else {
        return routers
      }
    }
  },
  mounted () {
    let routers = this.$store.state.user.sidebarRouter
    if (routers == '') {
      this.$store.dispatch('setSidebarRouter')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  min-height: 100%;
}
</style>
