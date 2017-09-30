import fetch from '@/utils/fetch'


/**
 * 获取部门树信息
 */
export function readDeptList() {
  const data = {}
  const params = JSON.stringify(data)
  return fetch({
    url: '/api/dept/read/list',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 添加部门信息
 */
export function updataDept(data) {
  const params = JSON.stringify(data)
  return fetch({
    url: '/api/dept/update',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 删除部门信息
 */
export function deleteDept(data) {
  const params = JSON.stringify(data)
  return fetch({
    url: '/api/dept/delete',
    method: 'POST',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 获取职位树信息
 */
export function readsysPosition() {
  const data = {};
  const params = JSON.stringify(data);
  return fetch({
    url: '/api/sysPosition/read/list',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 * 根据条件读取用户信息
 * @param  data 条件 
 */
export function readUserList(data) {

  if (data.keyword === null) {
    delete data.keyword
  }
  const params = JSON.stringify(data)
  return fetch({
    url: '/api/user/read/list',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 *  新建或者更新用户
 * @param  data 用户信息 
 * @param  isNew 新建还是更新用户信息标志
 */
export function updateUser(data, isNew) {

  // 1、 如果是新添加用户，则删除ID号
  if (isNew) {
    delete data.id
  }
  //2、格式化数据
  let params = JSON.stringify(data)
  //3、发送请求
  return fetch({
    url: '/api/user/update',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

// /user/delete 
/**
 *  删除用户
 */
export function deleteUser(data, isNew) {

    let params = JSON.stringify(data)
    //3、发送请求
    return fetch({
      url: '/api/user/delete',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
    });
  }
/**
 *  新建或者更新职位
 * @param  data 职位信息 
 */
export function updatePosition(data) {

  
  //2、格式化数据
  let params = JSON.stringify(data)
  //3、发送请求
  return fetch({
    url: '/api/sysPosition/update',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

// /sysPosition/delete

/**
 * 删除职位
 * 
 */
export function deletePosition(data) {
  let params = JSON.stringify(data)

  return fetch({
    url: '/api/sysPosition/delete',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 * 查询用于放回用户的上级部门
 * 
 */
export function userSuperiorList() {
  // 1、 构造空对象
  let data = {}
  //2、格式化数据
  let params = JSON.stringify(data)
  //3、发送请求
  return fetch({
    url: '/api/read/queryList',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 * 设置用户状态
 * @param  id  用户id 
 * @param  status  用户状态
 */

export function setUserStatus(id, status = 1) {
  // 1、 构造空对象
  let data = {
    id,
    status
  }
  //2、格式化数据
  let params = JSON.stringify(data)
  //3、发送请求
  return fetch({
    url: '/api/user/delete',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 * 获取部门
 */
export function getDeptInfo() {
  let data = {}
  let params = JSON.stringify(data)

  return fetch({
    url: '/api/dept/read/queryList',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 获取职位
 */
export function getPositionInfo(data) {
  
  if(!data){
    let data = {}
  }
  let params = JSON.stringify(data)
  return fetch({
    url: '/api/sysPosition/read/queryList',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 * 获取菜单
 */
export function getMenuTree(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: '/api/menu/show',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
// menu/update
/**
 * 分配菜单
 */
export function setUserMenu(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: '/api/menu/update',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
//user/read/queryList

/**
 * 获取用户默认获取当前在值用户
 */
export function getUserInfo() {
  let data = {
    enable:1
  }
  let params = JSON.stringify(data)
  return fetch({
    url: '/api/user/read/queryList',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 * 获取用户可配置的 
 */
export function getUser(data) {
  
// 1 在值 2 离职 3 禁用 4 试用

  let params = JSON.stringify(data)
  return fetch({
    url: '/api/user/read/queryList',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 * 获取公告列表分页信息
 */
export function getAnnouncementList(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/sysCommAnnounce/read/list',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 获取我发布的公告列表分页信息
 */
export function getAnnouncementMyList(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/sysCommAnnounce/read/mylist',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 删除我发布的公告列表分页信息
 */
export function deltAnnouncementMyList(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/sysCommAnnounce',
    method: 'delete',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 发布公告
 */
export function updataAnnouncement(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/sysCommAnnounce/update',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
//http://112.74.190.114/api/charger-SYS-Web/sysJournal/read/list 
/**
 * 日报信息列表固定返回7天的日报
 */
export function getDailyList(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/sysJournal/read/list',
    method: 'put',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 * 发送日报
 */
export function updataDaily(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/sysJournal',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 * 我未读日报
 */
export function unReadDaily(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/sysJournal/read/myJournalListNotRead',
    method: 'put',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
//getOtherDailyList
/**
 * 获取发送给我的日报
 */
export function getOtherDailyList(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/sysJournal/read/myJournalList',
    method: 'put',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
// charger-SYS-Web/commDict/read/list
/**
 * 指标分类列表分页
 */
export function getKpiClassifyList(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commDict/read/list',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 * 添加指标分类
 */
export function updataKpiClassify(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commDict',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 * 删除指标分类
 */
export function deleteKpiClassify(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commDict',
    method: 'delete',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

// /commIndex/read/list
/**
 * 指标库列表分页
 */
export function getKpiList(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commIndex/read/list',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 指标库列表无分页
 */
export function noPageKpiList(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commIndex/read/queryList',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 * 添加指标库
 */
export function updataKpi(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commIndex',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 删除指标库
 */
export function deleteKpi(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commIndex',
    method: 'delete',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}


/**
 * 模板库列表分页
 */
export function getTemplateList(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commAssessTemplate/read/list',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 添加模板库
 */
export function updataTemplate(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commAssessTemplate',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 删除模板库
 */
export function deleteTemplate(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commAssessTemplate',
    method: 'delete',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

// /commAssessTemplate/updatTemplate
/**
 * 修改模板库
 */
export function compileTemplate(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commAssessTemplate/updatTemplate',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

// /commTemplateIndex
/**
 * 删除模板库关联的指标
 */
export function deleteTemplateIndex(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commTemplateIndex',
    method: 'delete',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}


// commAssessPlan/read/list

/**
 * 考核计划列表分页
 */
export function getAssessPlanList(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commAssessPlan/read/list',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 * 删除考核计划
 */
export function deleteAssessPlan(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commAssessPlan',
    method: 'delete',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 修改考核计划
 */
export function updataAssessPlan(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commAssessPlan',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 获取考核计划里面的下拉选项的内容
 */
export function getAssessPlanSelect(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commAssessPlan/read/toAddPlan',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}


/**
 * 我的任务列表分页
 */
export function getMyTaskList(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commTask/myTaskList',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 删除我的任务
 */
export function deleteMyTask(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commTask',
    method: 'delete',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 修改考核计划
 */
export function updataMyTask(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commTask',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}



/**
 * 考核统计列表分页        commAssessRecord/read list

 */
export function getAssessStatisticList(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commAssessRecord/read/numPage',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 * 考核统计详情        commAssessRecord/read list

 */
export function getAssessStatisticDetail(data) {
  let params = JSON.stringify(data)
  return fetch({
    url: 'api/commAssessRecord/read/list',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
