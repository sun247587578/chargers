import { asyncRouterMap, constantRouterMap } from '@/router/index';
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 比较路由是否在后台的权限表里面,返回true表示有权限，保留路由表中的该项，否则删除该项路由表
 * @param {*} path 当前路由的路径 
 * @param {*} name 路由的名称
 */
function compareRoles(path, name, roles) {
  if (path !== '*') {
    return roles.some( role => role.path === path && role.name === name)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
/* function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
} */

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap  路由表
 * @param menus  后台返回菜单
 */

function filterAsyncRouter(asyncRouterMap, menus) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(menus, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, menus)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

/**
 * 根据后台权限表自定义路由表
 * @param  asyncRouterMap 
 * @param  menus 
 */
function filterRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (compareRoles(route.path, route.name, roles)) {
      if (route.children && route.children.length) {
        route.children = filterRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}


const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    },
    /**
     * 根据后台返回的权限自动计算路由表
     * @param 
     */
    GenerateRoutesByMenus({ commit }, roles) {
      return new Promise(resolve => {
        let accessedRouters = []
        accessedRouters = filterRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }

  }
};

export default permission;
