import fetch from '@/utils/fetch'


/**
 * 获取产品列表信息
 */
export function readBaseStruList(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-APS-Web/baseStru/read/page',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

/**
 * 获取产品列表信息无分页
 */
export function readProductList(data) {
    
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-APS-Web/baseProduct/read/list',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

/**
 * 添加修改产品信息
 */
export function addBaseStru(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-APS-Web/baseStru',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除产品信息
 */
export function deleteBaseProcduct(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-APS-Web/baseProduct',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

/**
* 单个产品详情
*/
export function editBaseProcduct(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-APS-Web/baseProduct/read/detail',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
* 获取委托单详细信息
*/
export function readBaseProcductDetail(data) {
    //data是传id
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-APS-Web/baseProduct/read/detail',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}


/**
* 获取规格列表
*/
export function readBaseSpecificationsList(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-APS-Web/baseSpec/read/page',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}


/**
 * 添加修改规格信息
 */
export function addBaseSpec(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-APS-Web/baseSpec',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

/**
 * 删除规格信息
 */
export function deleteBaseSpec(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-APS-Web/baseSpec',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}