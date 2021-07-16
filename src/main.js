/*
 * @Description: 项目入口文件
 * @Author: 王振
 * @Date: 2021-06-28 16:19:03
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-16 11:10:58
 */
import Vue from "vue";
import App from "./App";
import router from "./router";
import "normalize.css"; // 统一各个浏览器之间的显示差异
import "lib-flexible/flexible"; // 移动端分辨率适配—rem
import "./style/base.styl";
import "./style/border.styl";
import { Button } from "vant";

Vue.use(Button);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
});
