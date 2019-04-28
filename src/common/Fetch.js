import HttpUtils from '@rich/react-native-richway-httputils';
import {LayerModal} from '@rich/react-native-richway-component';
import {baseUrl} from './Service';

export const get = (obj) => {
    if (obj.modal) {
        LayerModal.open();
    }
    let uri = baseUrl + obj.url;
    if (obj.url.length > 4) {
        const httpStr = obj.url.substr(0, 4);
        if (httpStr.toLowerCase() === `http`) {
            uri = obj.url;
        }
    }
    return new Promise((resolve, reject) => {
        HttpUtils.get(uri, obj.params, obj.header).then((res) => {
            resolve(res);
        }).catch((error) => {
            reject(new Error(error.message));
        }).finally(() => {
            if (obj.modal) {
                LayerModal.close();
            }
        });
    });
};

export const post = (obj) => {
    if (obj.modal) {
        LayerModal.open();
    }
    let uri = baseUrl + obj.url;
    if (obj.url.length > 4) {
        const httpStr = obj.url.substr(0, 4);
        if (httpStr.toLowerCase() === `http`) {
            uri = obj.url;
        }
    }
    return new Promise((resolve, reject) => {
        HttpUtils.post(uri, obj.params, obj.header).then((res) => {
            resolve(res);
        }).catch((error) => {
            reject(new Error(error.message));
        }).finally(() => {
            if (obj.modal) {
                LayerModal.close();
            }
        });
    });
};

export const put = (obj) => {
    if (obj.modal) {
        LayerModal.open();
    }
    return new Promise((resolve, reject) => {
        HttpUtils.put(baseUrl + obj.url, obj.params, obj.header || {}).then((res) => {
            resolve(res);
        }).catch((error) => {
            reject(new Error(error.message));
        }).finally(() => {
            if (obj.modal) {
                LayerModal.close();
            }
        });
    });
};
