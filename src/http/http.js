//封装请求

import axios from 'axios';
import {URL} from '@/libs/base.js';
import {Message} from "element-ui";


const instance = axios.create({
    baseURL:URL,
    timeout:3000
})

//请求拦截器
instance.interceptors.request.use(function (config){
    let token=sessionStorage.getItem('token');
    if(token){
        config.headers=Object.assign(config.headers,{token,'Retry-after':3600})
    }
    return config;
},function(error){
    return Promise.reject(error);
});

instance.interceptors.response.use(function(response){
    if(response.status===200){
        return response.data;
    }
},function(error){
    let message="";
    if(error && error.response){
        switch(error.response.status){
            case 400:
                message='服务器无法理解请求格式';
                break;
            case 401:
                message='请求未授权';
                break;
            case 403:
                message='禁止访问';
                break;
            case 404:
                message="找不到与 URI 相匹配的资源";
                break;
            case 500:
                message="服务器错误";
                break;
            case 503:
                message="服务器暂时无法处理请求";
                break;
        }
    }
    Message({
        type:'error',
        message
    })
    return Promise.reject(error);
})




export default instance