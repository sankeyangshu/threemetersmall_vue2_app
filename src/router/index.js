/*
 * @Description:
 * @Author: 王振
 * @Date: 2021-06-28 16:19:03
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 15:57:03
 */
import Vue from "vue";
import Router from "vue-router";
import { checkLogin } from "@/utils/app";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Home",
    component: (resolve) => require(["@/pages/home/Home.vue"], resolve),
  },
  {
    path: "/category",
    name: "Category",
    component: (resolve) => require(["@/pages/category/Category.vue"], resolve),
  },
  {
    path: "/flow",
    name: "Flow",
    component: (resolve) => require(["@/pages/flow/Flow.vue"], resolve),
  },
  {
    path: "/mine",
    name: "Mine",
    component: (resolve) => require(["@/pages/mine/Mine.vue"], resolve),
  },
  {
    path: "/login",
    name: "Login",
    component: (resolve) => require(["@/pages/login/Login.vue"], resolve),
  },
  {
    path: "/addressList",
    name: "AddressList",
    component: (resolve) => require(["@/pages/addressList/AddressList.vue"], resolve),
  },
  {
    path: "/addressEdit",
    name: "AddressEdit",
    component: (resolve) => require(["@/pages/addressEdit/AddressEdit.vue"], resolve),
  },
  {
    path: "/goodsList",
    name: "GoodsList",
    component: (resolve) => require(["@/pages/goodsList/GoodsList.vue"], resolve),
  },
  {
    path: "/goodsDetails",
    name: "GoodsDetails",
    component: (resolve) => require(["@/pages/goodsDetails/GoodsDetails.vue"], resolve),
  },
  {
    path: "/order",
    name: "Order",
    component: (resolve) => require(["@/pages/order/Order.vue"], resolve),
  },
  {
    path: "/placeOrder",
    name: "PlaceOrder",
    component: (resolve) => require(["@/pages/placeOrder/PlaceOrder.vue"], resolve),
  },
];

// 创建 router 实例，然后传 `routes` 配置
const router = new Router({
  mode: "hash", // 强制使用hash模式进行导航，不能指望服务器支持history
  routes, // （缩写）相当于 routes: routes
});

// 判断用户是否登录
router.beforeEach((to, from, next) => {
  const isLogin = checkLogin(); // 获取用户是否登录状态
  const { name } = to;
  const isLoginOrRegister = name === "Login";
  isLogin || isLoginOrRegister ? next() : next({ name: "Login" });
});

// 导出路由
export default router;
