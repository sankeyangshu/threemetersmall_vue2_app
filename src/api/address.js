/*
 * @Description: 用户收货地址接口管理
 * @Author: 王振
 * @Date: 2021-08-02 11:21:51
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 11:22:39
 */

// 导入http
import http from "../utils/http";

/**
 * @description: 获取用户收货地址列表
 * @return 返回用户收货地址列表
 */
export function getAddressListAPI() {
  return http.get("/api/address/getaddress");
}

/**
 * @description: 新增用户收货地址
 * @param {*} params 收货地址参数
 * @return 返回新增地址是否成功的结果
 */
export function postAddNewAddressAPI(params) {
  return http.post("/api/address/addaddress", params);
}

/**
 * @description: 获取用户收货地址详情
 * @param {*} params 请求参数
 * @return 返回用户收货地址详情
 */
export function getAddressDetailAPI(params) {
  return http.get("/api/address/getaddressdetail", params);
}

/**
 * @description: 用户修改收货地址
 * @param {*} params 请求参数
 * @return 返回修改结果
 */
export function patchAddressAPI(params) {
  return http.patch("/api/address/modifyaddress", params);
}

/**
 * @description: 用户删除地址
 * @param {*} params 请求参数
 * @return 返回删除结果
 */
export function deleteAddressAPI(params) {
  return http.delete("/api/address/deladdress", params);
}
