/*
 * @Description: 商品接口管理
 * @Author: 王振
 * @Date: 2021-08-02 11:24:43
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 11:25:12
 */

// 导入http
import http from "../utils/http";

/**
 * @description: 获取商品列表数据
 * @param {*} params 请求参数-分类id，页面，每页多少条
 * @return {*}
 */
export function getGoodsListAPI(params) {
  return http.get("/api/goods/goodslist", params);
}

/**
 * @description: 获取商品详情数据
 * @param {*} params 请求参数，商品id
 * @return {*}
 */
export function getGoodsDetailAPI(params) {
  return http.get("/api/goods/goodsdetail", params);
}
