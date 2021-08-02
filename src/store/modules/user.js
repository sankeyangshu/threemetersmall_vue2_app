/*
 * @Description: 用户 vuex 仓库
 * @Author: 王振
 * @Date: 2021-08-02 10:46:48
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 10:48:01
 */

const user = {
  state: {
    token: "", // 用户认证token
    userInfo: {}, // 用户基本信息
  },

  mutations: {
    // 保存用户token
    SET_TOKEN(state, value) {
      state.token = value;
    },
    // 保存用户基本信息
    SET_USERINFO(state, value) {
      state.userInfo = value;
    },
  },

  actions: {},
};

export default user;
