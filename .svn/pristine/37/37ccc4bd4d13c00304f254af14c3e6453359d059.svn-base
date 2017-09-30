import fetch from '@/utils/fetch';

export function login(account, password, tenantId, checkCode) {
  const data = {
    account,
    password,
    tenantId,
    checkCode
  }
  const params = JSON.stringify(data)
  return fetch({
    url: '/api/login',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

export function getMenu() {
  return fetch({
    url: '/api/user/getMenu',
    method: 'get'
  });
}


export function getTenant(account) {
  return fetch({
    url: '/api/login/getTenant',
    method: 'get',
    params: { account }
  });
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post'
  });
}

/**
 * 获取当前用户登录信息
 */
export function  getCurrentUserInfo() {
  return fetch({
    url: 'api/user/read/current',
    method: 'get'
  })
}

/**
 *  新建或者更新用户
 * @param  data 用户信息 
 * @param  isNew 新建还是更新用户信息标志
 */
export function updateUserInfo( data ) {
  
 //1、格式化数据
 let params = JSON.stringify(data)
 //2、发送请求
 return fetch({
   url: '/api/user/update/person',
   method: 'post',
   data: params,
   headers: {
     'content-type': 'application/json'
   }
 });
}
// /update/password

// export function updatepassword( data ) {
  
//  //1、格式化数据
//  let params = JSON.stringify(data)
//  //2、发送请求
//  return fetch({
//    url: '/api/user/update/password',
//    method: 'post',
//    data: params,
//    headers: {
//      'content-type': 'application/json'
//    }
//  });
// }
/**
 * 修改设置当前用户的密码 
 * @param  passworld  新密码 
 * @param  oldPassworld 老密码
 */
export function setPassword(data) {
  
  let params = JSON.stringify(data)
  return fetch({
    url: '/api/user/update/password',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  })
}
// /user/update/resetUserPwd
/**
 * 修改设置当前用户的密码 
 * @param  passworld  新密码 
 * @param  oldPassworld 老密码
 */
export function resetPassword(data) {
  
  let params = JSON.stringify(data)
  return fetch({
    url: '/api/user/update/resetUserPwd',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  })
}


