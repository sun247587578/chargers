/**
 * 考勤管理各种接口调用
 */

import fetch from '@/utils/fetch'

/**
 * 查询考勤方案表（考勤地点 考勤方案）
 */
export function readCheckingList (data = {}) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-ACC-Web/accAttendanceProgramme/read/list',
        method: 'PUT',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

/**
 * 读取考勤方案部门列表
 * @param {*} data 
 */
export function getDepts(data = {}) {
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-ACC-Web/accAttendanceProgramme/dept/read/list',
        method: 'PUT',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });    
}

/**
 * 删除考勤方案表
 * @param {*} data 
 */
export function deleteCheckingPlus(data = {}){
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-ACC-Web/accAttendanceProgramme/delete',
        method: 'DELETE',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });     
}

/**
 * 更新考勤方案表
 */
export function updateCheckingPlus (data = {}) {
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-ACC-Web/accAttendanceProgramme/update',
        method: 'POST',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

/**
 * 添加考勤方案
 */

/**
 * 读取考勤列表
 */
export function getRecordList (data = {}) {
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-SCH-Web/viewAttendanceRecord/record/list',
        method: 'POST',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

/**
 * 读取用户表和部门表 
 */

export function getUserAndDept (data = {}) {
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-SCH-Web/viewAttendanceRecord/userAndDept/list',
        method: 'POST',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    })
}

export function getAttendanceRecord (data = {}) {
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-SCH-Web/viewAttendanceRecord/read/detail',
        method: 'POST',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    })
}

/**
 * 根据用户ID查找出相关的考勤记录
 * @param {*} data 对象 用户id和建立的时间 
 */
export function getRecordByUserId (data = {}) {
    const params = JSON.stringify(data);
    console.log(params)
    return fetch({
        url: '/charger-ACC-Web/accAttendanceProgramme/read/listRecord',
        method: 'POST',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    })
}


/**
 * 修改相关的考勤记录
 * 
 */
export function updataRecordByUserId (data = {}) {
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-ACC-Web//accAttendanceProgramme/update/mend',
        method: 'POST',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    })
}
/**
 * 删除相关的考勤记录
 * 
 */
export function deleteRecordByUserId (data = {}) {
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-ACC-Web/accAttendanceProgramme/delRecord',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    })
}
/**
 * 补卡接口
 */
export function updateReissue(data) {
    
        const params = JSON.stringify(data);
        return fetch({
            url: '/charger-ACC-Web/accAttendanceProgramme/update/mend',
            method: 'POST',
            data: params,
            headers: {
                'content-type': 'application/json'
            }
        });
    }




// 高德地图 key
export const MapKey = '49352f470c7ddcd7ca49d9bdea926767'
// 地图限定城市
export const MapCityName = '北京'
