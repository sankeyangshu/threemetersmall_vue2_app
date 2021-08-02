/*
 * @Description: 工具类中公共的函数
 * @Author: 王振
 * @Date: 2021-08-02 10:43:20
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 11:02:16
 */

import store from "@/store";

/**
 * 验证是否已登录
 * @returns Boolean类型，用来判断是否已登录
 */
export const checkLogin = () => {
  return store.getters.token !== "";
};
