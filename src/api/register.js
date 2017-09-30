import fetch from '@/utils/fetch';


/**
 * 获取验证码
 */
export function getRegisterCode(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: '/api/regin/getCode',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
/**
 * 验证验证码
 */
export function checkRegisterCode(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: '/api/regin/checkCode',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}
// /regin
/**
 * 验证验证码
 */
export function registerCompany(data) {
    const params = JSON.stringify(data);
    return fetch({
        url: '/api/regin',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    });
}