/*
 * @Description: vuex 入口文件
 * @Author: 王振
 * @Date: 2021-08-02 10:45:21
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 10:48:25
 */
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import user from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
  },
  getters,
});

export default store;
