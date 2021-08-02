<!--
 * @Description: 收货地址列表页面
 * @Author: 王振
 * @Date: 2021-08-02 15:03:23
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 15:08:56
-->
<template>
  <div class="addressList">
    <!-- 头部导航条 开始 -->
    <van-nav-bar title="我的地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 头部导航条 结束 -->

    <!-- 地址列表 开始 -->
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
    <!-- 地址列表 结束 -->
  </div>
</template>

<script>
import { getAddressListAPI } from "@/api/address";

export default {
  name: "AddressList",
  data() {
    return {
      chosenAddressId: 1, // 当前选中地址的 id
      list: [], // 收货地址列表
    };
  },

  async mounted() {
    // 初始化地址列表
    await this.getAddressList();
  },

  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.back();
    },

    // 获取地址列表
    async getAddressList() {
      const { data } = await getAddressListAPI();
      this.list = data;
    },

    // 新增地址
    onAdd() {
      this.$router.push({
        name: "AddressEdit",
        query: {
          isAddressEdit: "notEdit", // 是否是新增地址,notEdit代表是新增地址，edit代表是修改地址
        },
      });
    },

    // 编辑地址
    onEdit(item) {
      this.$router.push({
        name: "AddressEdit",
        query: {
          addressId: item.id, // 地址id
          isAddressEdit: "edit", // 是否是新增地址,notEdit代表是新增地址，edit代表是修改地址
        },
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../style/viriables.styl';

.addressList {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: $bgColor;
}
</style>
