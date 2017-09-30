import fetch from '@/utils/fetch'


/**
 * 获取委托单列表信息
 */
export function readLabReceiveList(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-LAB-Web/labSubmitReport/read/page',
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
export function readLabReceiveDetail(data) {
    //data是传id
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-LAB-Web/labSubmitReport/read/detail',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
///labSubmitReportDetail/read/list


/**
 * 获取检验管理产品检测详细信息
 */
export function readCheckoutDetail(data) {
    //data是传id
    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-LAB-Web/labSubmitReportDetail/read/sample/detail',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}


/**
 * 获取过程溶液检测溶液列表信息
 */
export function readLabDetectionList(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-LAB-Web/labDetectionReport/read/page',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}

/**
 * 获取过程溶液检测溶液详情信息
 */
export function readLabDetectionDetail(data) {

    const params = JSON.stringify(data);
    return fetch({
        url: '/charger-LAB-Web/labDetectionReport/read/listTableDetail',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}



// /charger-LAB-Web/labSubmitReport/verify

/**
 * 执行审核
 */
export function LabAuditVerify(data) {
    
        const params = JSON.stringify(data);
        return fetch({
            url: '/charger-LAB-Web/labSubmitReport/verify',
            method: 'post',
            data: params,
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    /**
 * 检验列表接收
 */
export function LabReceive(data) {
    
        const params = JSON.stringify(data);
        return fetch({
            url: '/charger-LAB-Web/labSubmitReport/receive',
            method: 'post',
            data: params,
            headers: {
                'content-type': 'application/json'
            }
        });
    }

// /labSampleCode/read/qualifiedst
/**
 * 获取不合格列表信息
 */
export function readLabQualifiedList(data) {
    
        const params = JSON.stringify(data);
        return fetch({
            url: '/charger-LAB-Web/labSampleCode/read/qualified/list',
            method: 'post',
            data: params,
            headers: {
                'content-type': 'application/json'
            }
        });
    }
