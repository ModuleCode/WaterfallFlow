import globalConfig from "@/global.config.js"
import { ElMessage } from 'element-plus'
import axios from 'axios'
import router from "./router"
const instance = axios.create({
    baseURL: '/api',
    timeout: 60000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

// http request 请求拦截器
instance.interceptors.request.use((config) => {
    let whiteList = globalConfig.whiteListApi
    let url = config.url
    let token = localStorage.getItem("token");

    if (whiteList.indexOf(url) === -1 && token) {
        config.headers.token = token;
    }
    return config;
}, error => {
    return Promise.reject(new Error(error))
})
// http response 响应拦截器
instance.interceptors.response.use(res => {
    const status = res.data.code || 200
    const message = res.data.message || "未知错误"
    if (status === 401) {
        ElMessage({ message: '你没有权限', grouping: true,type: 'error' })
        // router.replace({path:''})
        router.replace("/loginu")
        return Promise.reject(new Error(message))
    }
    if (status != 200) {
        ElMessage({ message, grouping: true,type: 'error' });
        return Promise.reject(new Error(message))
    }
    return res.data;
}, error => {
    ElMessage(error)
})

export default instance;