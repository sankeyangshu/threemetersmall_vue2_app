/*
 * @Description: 封装请求方法
 * @Author: 王振
 * @Date: 2021-08-02 10:41:18
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 10:43:02
 */
// 导入封装好的axios实例
import request from "./request";

// 封装get,post,put,delete请求
// 包裹请求方法的容器
const http = {
  /**
   * methods: 请求
   * url 请求地址
   * params 请求参数
   */
  // get请求
  get(url, params) {
    const config = {
      method: "get", // `method` 是创建请求时使用的方法
      url: url, // `url` 是用于请求的服务器 URL
    };
    if (params) {
      config.params = params;
    }

    return request(config);
  },
  // post请求
  post(url, params) {
    const config = {
      method: "post",
      url: url,
    };
    if (params) {
      config.data = params;
    }
    return request(config);
  },
  // patch请求
  patch(url, params) {
    const config = {
      method: "patch",
      url: url,
    };
    if (params) {
      config.data = params;
    }
    return request(config);
  },
  // delete请求
  delete(url, params) {
    const config = {
      method: "delete",
      url: url,
    };
    if (params) {
      config.params = params;
    }
    return request(config);
  },
};

// 导出
export default http;
