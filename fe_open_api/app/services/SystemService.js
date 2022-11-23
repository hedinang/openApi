import axios from "axios";
import { method } from "lodash";
import CONFIG from "./urlConfig";


class SystemService {
    execute(url, data, headers, method) {
        switch (method) {
            case 'POST':
                if (data !== '') {
                    return axios.post(url, data, headers)
                }
                else {
                    return axios.post(url, headers)
                }
            case 'PUT':
                return axios.put(url, data, headers);
            default:
                break;
        }
    }

    listService() {
        const url = CONFIG.LIST_SERVICE;
        return axios.get(url);
    }
    listGroup(id) {
        const url = CONFIG.LIST_GROUP.replace("{id}", id);
        return axios.get(url);
    }

    listEncryption() {
        const url = CONFIG.LIST_ENCRYPTION;
        return axios.get(url);
    }
    listApiMethod() {
        const url = CONFIG.LIST_API_METHOD
        return axios.get(url);
    }

    createService({ serviceName, serverUrl, group }) {
        const data = {
            name: serviceName,
            serverUrl: serverUrl,
            group: group,
            status: 'ACTIVE'

        }
        const url = CONFIG.CREATE_SERVICE;
        let a = axios.post(url, data);
        return a
    }
    updateService({ serviceName, serverUrl, group }, serviceId) {
        group = group.map(e => {
            if (e.isNew) return {
                groupName: e.groupName,
                priority: e.priority
            }
            return e
        })
        const data = {
            id: serviceId,
            name: serviceName,
            serverUrl: serverUrl,
            group: group,
            status: 'ACTIVE'
        }
        const url = CONFIG.UPDATE_SERVICE.replace('{id}', serviceId);
        let a = axios.put(url, data);
        return a
    }
    detailService(serviceId) {
        const url = CONFIG.DETAIL_SERVICE.replace('{id}', serviceId);
        let a = axios.get(url);
        return a
    }
    createApi({ apiName, method, group, encryption, hasRequestBody, defaultRequestBody, params }) {
        const data = {
            name: apiName,
            method: method,
            groupId: group,
            encryptionType: encryption,
            hasRequestBody: hasRequestBody,
            defaultRequestBody: defaultRequestBody,
            params: params,
            status: 'ACTIVE'
        }
        const url = CONFIG.CREATE_API;
        return axios.post(url, data);
    }
    detailApi(apiId) {
        const url = CONFIG.DETAIL_API.replace('{id}', apiId);
        let a = axios.get(url);
        return a
    }
    updateApi({ apiId, encryptionType, groupId, method, name, hasRequestBody, defaultRequestBody, params }) {
        const data = {
            name: name,
            method: method,
            groupId: groupId,
            encryptionType: encryptionType,
            hasRequestBody: hasRequestBody,
            defaultRequestBody: defaultRequestBody,
            params: params,
            status: 'ACTIVE'
        }
        const url = CONFIG.UPDATE_API.replace('{id}', apiId);;
        return axios.put(url, data);
    }
    deleteApi(apiId) {
        const url = CONFIG.DELETE_API.replace('{id}', apiId);
        let a = axios.delete(url);
        return a
    }
    deleteService(serviceId) {
        const url = CONFIG.DELETE_SERVICE.replace('{id}', serviceId);
        let a = axios.delete(url);
        return a
    }
}

export default new SystemService();
