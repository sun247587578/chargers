import fetch from '@/utils/fetch'

/**
 * 获取过程列表信息
 */
export function readProcessList(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-SPC-Web/app/spcProcess/read/list',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

/**
 * 获取过程列表分页信息
 */
export function getQRCodeList(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-SPC-Web/app/spcControlCode/read/list',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}


// spcLineName/read/list
/**
 * 获取生产线列表信息
 */
export function readLineNameList(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-SPC-Web/spcLineName/read/list',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 获取产品对应的分类
 */
export function readProjectDistinctList(data) {
    
        const params = JSON.stringify(data);
        return fetch({
            url: '/charger-LAB-Web/labSubmitProject/read/selectProjectDistinct',
            method: 'post',
            data: params,
            headers: {
                'content-type': 'application/json'
            }
        });
    }
/**
 * 获取产品对应的检验项目
 */
export function readInspectionClassList(data) {
    
        const params = JSON.stringify(data);
        return fetch({
            url: '/charger-LAB-Web/labSubmitProject/read/list',
            method: 'post',
            data: params,
            headers: {
                'content-type': 'application/json'
            }
        });
    }
/**
 * 新增产品对应的检验项目
 */
export function updataInspectionClassList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-LAB-Web/labSubmitProject',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 删除产品对应的检验项目
 */
export function deleteInspectionClassList(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-LAB-Web/labSubmitProject',
        method: 'delete',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}



/**
 * 获取检验项列表信息无分页
 */
export function readStruStandardList(data) {
    
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-LAB-Web/labSubmitProject/read/list',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}


// 

/**
 * 获取检验项列表信息无分页
 */
export function getSelectStruStandard(data) {
    
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-APS-Web/baseStruStandard/selectStruStandard',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 保存检验项
 */
export function updataSelectStruStandard(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-APS-Web/baseStruStandard/updateAll',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

