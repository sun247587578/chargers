<template>
    <div class="app-wrapper" style="overflow: hidden;">
        <div class="navbar-warpper">
            <navbar></navbar>
        </div>
        <div class="main-container">
            <div>
                <div class="sidebar-wrapper">
                    <sidebar class="sidebar-container"></sidebar>
                </div>
                <div style="margin-left:190px;">
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </div>   
    </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout';

export default {
    name: 'layout',
    components: {
        Navbar,
        Sidebar,
        AppMain
    },
    computed: {
        sidebar () {
            return this.$store.state.app.sidebar;
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    .main-container {
        min-height: 100%;
        transition: all .28s ease-out;
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: auto;
        padding-bottom: 80px;
    }
}

.sidebar-wrapper {
  width: 180px;
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  transition: all .28s ease-out;
}

.sidebar-container {
  transition: all .28s ease-out;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: -17px;
  overflow-y: scroll;
}
</style>
