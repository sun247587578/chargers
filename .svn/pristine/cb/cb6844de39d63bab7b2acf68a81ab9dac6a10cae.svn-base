import { login, getMenu, logout } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';


function handleData (item) {
  const localItem = {
    path: item.menuUrl,
    name: item.menuName
  }
  return localItem;
}

function mapRoles (menus) {
  menus.forEach(item => {
    let localItem = {}
    localItem = handleData(item)
    window.roles.push(localItem)
    if (localItem) {
      if (item.children && item.children.length) {
        mapRoles(item.children)
      }
    }
  })
}

function mapMenus (menus) {
  const arrayOfSquares = menus.map(item => {
    let localItem = {}
    localItem = handleData(item)
    if (localItem) {
      if (item.children && item.children.length) {
        localItem.children = mapMenus(item.children)
      }
      return localItem
    }
    return false;
  });
  return arrayOfSquares
}



const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],  // 根据后台权限菜单，前端路由权限表保存
    menus: [],
    navbarMenus: [],
    currentModel: '', // 保存当前使用的模块
    sidebarRouter: '', // 保存当前侧边栏的路由
    currentRouter: ''  // 从后台返回的菜单变换为有权限的路由
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_NAVBARMENUS: (state, menus) => {
      state.navbarMenus = menus
    },
    SET_MODEL: (state, model) => {
      state.currentModel = model
    },
    SET_CURRENTROUTER: (state, router) => {
      state.currentRouter = router
    },
    SET_SIDEBARROUTER: (state, router) => {
      state.sidebarRouter = router
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      const account = userInfo.account;
      return new Promise((resolve, reject) => {
        login(account, userInfo.password, userInfo.tenantId, userInfo.checkCode).then(response => {
          switch (response.httpCode) {
            case 303:
              alert(response.msg)
              this.loading = false;
              break;
            default:
              const data = {
                token: 'manger'
              }
              setToken(data.token)
              commit('SET_TOKEN', data.token);
              resolve()
              break;
          }
        }).catch(error => {
          reject(error)
        });
      });
    },


    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getMenu().then(response => {
          // 后台返回权限
          // console.log(response)
          const data = response.data;
          // commit('SET_NAME', data.name);
          commit('SET_MENUS', data);
          // 提炼出顶层菜单，放置于更多应用
          const navbarMenus = [];
          data.forEach(item => {
            const menu = {
              menuName: item.menuName,
              menuUrl: item.menuUrl
            }
            navbarMenus.push(menu)
          })
          // 处理所有菜单，用户核对路由表进行挂载
          const menus = mapMenus(data)
          // 根据后台的菜单权限数据，生成前端对应的权限表，
          // 为了和前端的路由匹配，制作成一维数组格式，用于稍后和前端路由表过滤匹配
          // 内容处理后先存放到window.roles, 然后在存放到数据中心的权限表
          // 数据例子如下[{path:'/OA', name: 'OA管理'},{path: 'userManagement',name: '用户管理'}]
          // 把后台权限表的多维数据转化为1位数组
          window.roles = []
          mapRoles(data)
          commit('SET_ROLES', window.roles);
          window.roles = []
          commit('SET_NAVBARMENUS', navbarMenus)
          commit('SET_CURRENTROUTER', menus)
          resolve(response);
        }).catch(error => {
          console.log(error)
          // this.$router.push({path: '/'});
          // window.location.href="http:www.baidu.com"
          removeToken();
          resolve();
          console.log('调用菜单接口出错');
          // reject(error);
        });
      });
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        removeToken();
        resolve();
      });
    },

    // 当前的模块
    FilterModel ({ commit, state }, model) {
      commit('SET_MODEL', model)
      sessionStorage.setItem('currentModel', model)
      // 找出当前模块对应的路由数据
      let routers = state.currentRouter
      let currentRouter = routers.filter(route => route.path === model)
      let sideRouter = currentRouter[0].children
      // 找出侧边栏路由数据
      commit('SET_SIDEBARROUTER', sideRouter)
      sessionStorage.setItem('sidebarRouter', JSON.stringify(sideRouter))

      // sideRouter.forEach((item,index) => {
      //   sessionStorage.setItem("sidebar"+index,JSON.stringify(item))
      // })
      // sessionStorage.setItem("index",sideRouter.length);
    },

    setSidebarRouter ({ commit }) {
      let sideRouter = [], model = ''
      // let index = parseInt(sessionStorage.getItem("index"))
      // for (let i =0; i<index; i++){
      //    sideRouter.push(JSON.parse(sessionStorage.getItem('sidebar'+i)))
      // }
      sideRouter = JSON.parse(sessionStorage.getItem('sidebarRouter'))
      commit('SET_SIDEBARROUTER', sideRouter)
      model = sessionStorage.getItem('currentModel')
      commit('SET_MODEL', model)
    }
  }
};

export default user;
