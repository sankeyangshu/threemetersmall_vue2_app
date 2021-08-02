/*
 * @Description: 用户登录注册接口管理
 * @Author: 王振
 * @Date: 2021-08-02 11:19:45
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 11:20:47
 */

// 导入http
import http from "../utils/http";

/**
 * @description: 用户注册
 * @param {*} params
 * @return {*}
 */
export function postRegisterAPI(params) {
  return http.post("/api/user/register", params);
}

/**
 * @description: 用户登录
 * @param {*} params
 * @return {*}
 */
export function postLoginAPI(params) {
  return http.post("/api/user/login", params);
}
