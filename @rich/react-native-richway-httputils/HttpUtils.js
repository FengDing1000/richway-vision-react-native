/**
 * 网络请求工具封装，采用 fetch 加 Promise实现
 * @author tiankechuan
 * @date 2017-12-11 15:37:39
 */

import {InteractionManager} from 'react-native';

const timeout = 60000;

// 打印请求日志
function fetchLog(fetchWay, headers, url, sendTime, formData, response) {
    const header = `${fetchWay} URL:`;
    const time = `${((new Date()).getTime() - sendTime) / 1000}秒`;
    try {
        console.group(header, url);
        console.log('耗  时:', time);
        console.log('消息头:', headers);
        console.log('参  数:', formData);
        console.log('数  据:', response);
        console.groupEnd();
    } catch (e) {
        console.log(e);
    }
}

/**
 * GET 请求
 * @param url 请求的url，必传
 * @param params 请求参数，如果不需要则不传
 * @param headers 请求头，如果不需要则不传
 * @returns {Promise}
 */


const get = async function (Url, params, Headers) {
    let url = Url;
    let headers = Headers || {};
    // 为保证动画流畅，这里等待动画结束再返回结果
    await InteractionManager.runAfterInteractions();
    // 参数不为空
    if (params) {
        const paramArr = [];
        // 参数拼接
        Object.keys(params).forEach(key => paramArr.push(`${key}=${params[key]}`));
        if (url.search(/\?/) === -1) {
            url += `?${paramArr.join('&')}`;
        } else {
            url += `&${paramArr.join('&')}`;
        }
    }

    const timeoutRequest = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('请求超时'));
        }, timeout);
    });

    const request = new Promise(((resolve, reject) => {
        const sendTime = new Date().getTime();
        fetch(url, {
            method: 'GET',
            headers,
            credentials: 'include'
        })
            .then(response => response.json())
            .then((response) => {
                fetchLog('GET', headers, url, sendTime, params, response);
                if (response.success) {
                    resolve(response);
                } else if (response.message.indexOf('Token invalid!') !== -1) {
                    reject(new Error('登录过期'));
                } else {
                    reject(new Error(response.message));
                }
            })
            .catch((error) => {
                if (error.message === 'Network request failed') {
                    fetchLog('GET', headers, url, sendTime, params, error);
                    reject(new Error('网络请求超时！'));
                } else {
                    fetchLog('GET', headers, url, sendTime, params, error);
                    reject(new Error(error.message));
                }
            })
    }));

    return Promise.race([request, timeoutRequest]);
};

/**
 * POST请求
 * @param url 请求的url，必传
 * @param params 请求参数，(FormData对象)如果不需要则不传
 * @param headers headers 请求头，如果不需要则不传
 * @returns {Promise}
 */

const post = async function (Url, params, Headers) {
    let url = Url;
    let headers = Headers || {};
    let formParams;
    // 为保证动画流畅，这里等待动画结束再返回结果
    await InteractionManager.runAfterInteractions();
    if (Object.prototype.toString.call(params) === '[object String]' && headers['Content-Type'] !== 'application/json') {
        headers['Content-Type'] = 'application/json'
    }
    formParams = params;

    const timeoutRequest = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('请求超时'));
        }, timeout);
    });

    const request = new Promise(((resolve, reject) => {
        const sendTime = new Date().getTime();
        fetch(url, {
            method: 'POST',
            headers,
            body: formParams,
            credentials: 'include'
        })
            .then(response => response.json())
            .then((response) => {
                fetchLog('POST', headers, url, sendTime, params, response);
                if (response.success) {
                    resolve(response);
                } else if (response.message.indexOf('Token invalid!') !== -1) {
                    reject(new Error('登录过期'));
                } else {
                    reject(new Error(response.message));
                }
            })
            .catch((error) => {
                if (error.message === 'Network request failed') {
                    fetchLog('POST', headers, url, sendTime, params, error);
                    reject(new Error('网络请求超时！'));
                } else {
                    fetchLog('POST', headers, url, sendTime, params, error);
                    reject(new Error(error.message));
                }
            })
    }));

    return Promise.race([request, timeoutRequest]);
};

/**
 * PUT请求
 * @param url 请求的url，必传
 * @param params 请求参数，(FormData对象)如果不需要则不传
 * @param headers headers 请求头，如果不需要则不传
 * @returns {Promise}
 */

const put = async function (Url, params, Headers) {
    let url = Url;
    let headers = Headers || {};
    await InteractionManager.runAfterInteractions();
    if (params) {
        const paramArr = [];
        // 参数拼接
        Object.keys(params).forEach(key => paramArr.push(`${key}=${params[key]}`));
        if (url.search(/\?/) === -1) {
            url += `?${paramArr.join('&')}`;
        } else {
            url += `&${paramArr.join('&')}`;
        }
    }

    const timeoutRequest = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('请求超时'));
        }, timeout);
    });

    const request = new Promise(((resolve, reject) => {
        const sendTime = new Date().getTime();
        fetch(url, {
            method: 'PUT',
            headers,
            credentials: 'include'
        })
            .then(response => response.json())
            .then((response) => {
                fetchLog('PUT', headers, url, sendTime, params, response);
                if (response.success) {
                    resolve(response);
                } else if (response.message.indexOf('Token invalid!') !== -1) {
                    reject(new Error('登录过期'));
                } else {
                    reject(new Error(response.message));
                }
            })
            .catch((error) => {
                if (error.message === 'Network request failed') {
                    fetchLog('PUT', headers, url, sendTime, params, error);
                    reject(new Error('网络请求超时！'));
                } else {
                    fetchLog('PUT', headers, url, sendTime, params, error);
                    reject(new Error(error.message));
                }
            })
    }));

    return Promise.race([request, timeoutRequest]);
};

/**
 * DELETE请求
 * @param url 请求的url，必传
 * @param params 请求参数，(FormData对象)如果不需要则不传
 * @param headers headers 请求头，如果不需要则不传
 * @returns {Promise}
 */

const Delete = async function (Url, params, Headers) {
    let url = Url;
    let headers = Headers || {};
    let formParams;
    // 为保证动画流畅，这里等待动画结束再返回结果
    await InteractionManager.runAfterInteractions();
    if (Object.prototype.toString.call(params) === '[object String]' && headers['Content-Type'] !== 'application/json') {
        headers['Content-Type'] = 'application/json'
    }
    formParams = params;

    const timeoutRequest = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('请求超时'));
        }, timeout);
    });

    const request = new Promise(((resolve, reject) => {
        const sendTime = new Date().getTime();
        fetch(url, {
            method: 'DELETE',
            headers,
            body: formParams,
            credentials: 'include'
        })
            .then(response => response.json())
            .then((response) => {
                fetchLog('DELETE', headers, url, sendTime, params, response);
                if (response.success) {
                    resolve(response);
                } else if (response.message.indexOf('Token invalid!') !== -1) {
                    reject(new Error('登录过期'));
                } else {
                    reject(new Error(response.message));
                }
            })
            .catch((error) => {
                if (error.message === 'Network request failed') {
                    fetchLog('DELETE', headers, url, sendTime, params, error);
                    reject(new Error('网络请求超时！'));
                } else {
                    fetchLog('DELETE', headers, url, sendTime, params, error);
                    reject(new Error(error.message));
                }
            })
    }));

    return Promise.race([request, timeoutRequest]);
};

export default {
    post,
    get,
    put,
    Delete
};
