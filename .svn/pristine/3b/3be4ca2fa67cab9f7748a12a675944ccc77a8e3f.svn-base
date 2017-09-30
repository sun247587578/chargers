<template>
    <div>
    <template v-for="item in routes">
			<el-submenu :index="item.name" :key="item.name">
				<template slot="title">
					<icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>{{item.name}}
				</template> 
           <template v-for="child in item.children" v-if='!child.hidden'>
					<router-link class="menu-indent" :to="modelName + '/' + item.path + '/'+child.path" :key="modelName + '/' + item.path + '/'+child.path ">
						<el-menu-item :index="modelName + '/' + item.path+'/'+child.path">
							{{child.name}}
						</el-menu-item>
					</router-link>
				</template>
			</el-submenu>
      </template>      
    </div>
</template>

<script>
    export default {
      name: 'CustomSidebarItem',
      props: {
        routes: {
          type: Array
        },
        modelName:{
          type: String
        } 
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .svg-icon {
        margin-right: 10px;
    }
    .hideSidebar .menu-indent{
        display: block;
        text-indent: 10px;
    }
</style>