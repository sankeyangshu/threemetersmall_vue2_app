/*
 * @Description: getters 文件
 * @Author: 王振
 * @Date: 2021-08-02 10:46:10
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 10:47:25
 */

const getters = {
  token: (state) => state.user.token, // 用户唯一标识token
};

export default getters;
