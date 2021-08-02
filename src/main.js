/*
 * @Description: 项目入口文件
 * @Author: 王振
 * @Date: 2021-06-28 16:19:03
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 11:12:17
 */
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import "normalize.css"; // 统一各个浏览器之间的显示差异
import "lib-flexible/flexible"; // 移动端分辨率适配—rem
import "./style/base.styl";
import "./style/border.styl";
import {
  Button,
  Icon,
  Search,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Image as VanImage,
  Divider,
  Cell,
  CellGroup,
  Empty,
  NavBar,
  Tab,
  Tabs,
  AddressList,
  AddressEdit,
  Card,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Field,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  Stepper,
  Toast,
  NoticeBar,
  Popup,
  List,
  SwipeCell,
} from "vant";

Vue.use(Button);
Vue.use(Icon);
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);
Vue.use(Divider);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Empty);
Vue.use(NavBar);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(AddressList);
Vue.use(AddressEdit);
Vue.use(Card);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Field);
Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Stepper);
Vue.use(Toast);
Vue.use(NoticeBar);
Vue.use(Popup);
Vue.use(List);
Vue.use(SwipeCell);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
});
