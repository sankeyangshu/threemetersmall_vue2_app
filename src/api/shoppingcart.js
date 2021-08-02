/*
 * @Description: 购物车接口管理文件
 * @Author: 王振
 * @Date: 2021-08-02 11:26:41
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 11:27:22
 */

// 导入http
import http from "../utils/http";

/**
 * @description: 获取购物车列表数据
 * @param {*} params 请求参数-页面，每页多少条
 * @return {*}
 */
export function getShoppingAPI(params) {
  return http.get("/api/shoppingcart/getshopping", params);
}

/**
 * @description: 添加购物车
 * @param {*} params 请求参数
 * @return {*}
 */
export function postAddShoppingAPI(params) {
  return http.post("/api/shoppingcart/addshopping", params);
}

/**
 * @description: 更新购物车
 * @param {*} params 请求参数
 * @return {*}
 */
export function patchUpdateShopAPI(params) {
  return http.patch("/api/shoppingcart/updateshopping", params);
}

/**
 * @description: 删除购物车
 * @param {*} params 请求参数
 * @return {*}
 */
export function deleteShoppingAPI(params) {
  return http.delete("/api/shoppingcart/deleteshopping", params);
}
