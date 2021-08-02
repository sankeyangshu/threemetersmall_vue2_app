/*
 * @Description: 订单接口管理
 * @Author: 王振
 * @Date: 2021-08-02 11:25:20
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 11:26:05
 */

// 导入http
import http from "../utils/http";

/**
 * @description: 获取订单列表
 * @param {*} params 订单列表请求参数
 * @return 返回订单列表
 */
export function getOrderListAPI(params) {
  return http.get("/api/order/getOrder", params);
}

/**
 * @description: 新增订单
 * @param {*} params 请求参数
 * @return {*} 返回提交结果
 */
export function postAddOrderAPI(params) {
  return http.post("/api/order/addOrder", params);
}

/**
 * @description: 修改订单
 * @param {*} params 请求参数
 * @return {*} 修改结果
 */
export function patchUpdateOrderAPI(params) {
  return http.patch("/api/order/changeOrder", params);
}

/**
 * @description: 删除订单
 * @param {*} params 请求参数
 * @return {*} 删除结果
 */
export function deleteOrderAPI(params) {
  return http.delete("/api/order/deleteOrder", params);
}
