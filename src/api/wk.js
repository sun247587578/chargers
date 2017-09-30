import fetch from '@/utils/fetch'

/**
 * 获取班次分页列表信息
 */
export function readFlightList(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-SCH-Web/schFlight/read/list',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}


//               /read/toEdit
/**
 * 获取班次分页列表信息-----无分页
 */
export function readFlight(data) {
    return fetch({
        url: '/charger-SCH-Web/schAllot/read/toEdit',
        method: 'get'
    })
}



// /charger-SCH-Web/schFlight/update修改班次
/**
 * 修改班次
 */
export function flightUpdate(data) {

    const params = JSON.stringify(data);

    return fetch({
        url: '/charger-SCH-Web/schFlight/update',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除班次
 */
export function flightDelete(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-SCH-Web/schFlight/delete',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

///charger-SCH-Web/schRegion/read/list 区域

/**
 * 区域列表分页
 */
export function readRegionList(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-SCH-Web/schRegion/read/list',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 添加区域
 */
export function updateRegion(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-SCH-Web/schRegion/update',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
* 删除区域
*/
export function regionDelete(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-SCH-Web/schRegion/delete',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}



// /charger-SCH-Web/schAllot/read/list
/**
 * 请求排班详细信息
 */
export function readAllotData(data) {
    if (data) {

    } else {
        data = ''
    }
    let params = '?assignDate=' + data
    // const params = JSON.stringify(data);
    return fetch({
        url: '/charger-SCH-Web/schAllot/read/list' + params,
        method: 'get',
    });
}
/**
 * 编辑排班信息
 */
export function regionUpdate(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-SCH-Web/schAllot/update',
        method: 'POST',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}



