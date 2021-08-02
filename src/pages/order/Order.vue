<!--
 * @Description: 订单中心页面
 * @Author: 王振
 * @Date: 2021-08-02 15:41:34
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 15:44:51
-->
<template>
  <div class="order">
    <!-- 头部导航栏 开始 -->
    <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 头部导航栏 结束 -->

    <!-- 标签页 开始 -->
    <van-tabs v-model="active">
      <van-tab title="全部订单">
        <order-list></order-list>
      </van-tab>
      <van-tab title="待付款">由于个人无法申请支付功能，所以订单后续功能无法开发</van-tab>
      <van-tab title="待发货">由于个人无法申请支付功能，所以订单后续功能无法开发</van-tab>
      <van-tab title="待收货">由于个人无法申请支付功能，所以订单后续功能无法开发</van-tab>
    </van-tabs>
    <!-- 标签页 结束 -->
  </div>
</template>

<script>
import OrderList from "@/components/OrderList.vue";

export default {
  name: "Order",
  components: { OrderList },
  data() {
    return {
      active: "", // 当前激活标签对应的索引值，默认情况下启用第一个标签。
    };
  },
  mounted() {
    this.active = Number(this.$route.params.active); // 获取当前激活标签对应的索引值
  },
  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../style/viriables.styl';

.order {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: $bgColor;
}
</style>
