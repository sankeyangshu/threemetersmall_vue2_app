<!--
 * @Description: 新增地址页面
 * @Author: 王振
 * @Date: 2021-08-02 14:50:38
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 15:02:31
-->
<template>
  <div class="addressEdit">
    <!-- 头部导航条 开始 -->
    <van-nav-bar :title="navTitle" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 头部导航条 结束 -->

    <!-- 新增地址 开始 -->
    <div v-if="isEdit">
      <van-address-edit
        :area-list="areaList"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </div>
    <!-- 新增地址 结束 -->

    <!-- 修改地址 开始 -->
    <div v-else>
      <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        show-delete
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSecondSave"
        @delete="onDelete"
      />
    </div>
    <!-- 修改地址 结束 -->
  </div>
</template>

<script>
import { areaList } from "@vant/area-data"; // 导入省市区数据
import {
  postAddNewAddressAPI,
  getAddressDetailAPI,
  patchAddressAPI,
  deleteAddressAPI,
} from "@/api/address"; // 导入接口管理文件
import { Toast } from "vant";

export default {
  name: "AddressEdit",
  data() {
    return {
      isEdit: true, // 是否是新增地址
      navTitle: "新增地址", // 导航栏标题
      addressInfo: {}, // 收货人信息初始值
      areaList, // 省市区数据
    };
  },

  async mounted() {
    // 判断是否是新增地址
    const edit = this.$route.query.isAddressEdit;
    if (edit === "edit") {
      // 修改地址，显示修改地址组件
      this.isEdit = false;
      // 修改导航条标题
      this.navTitle = "修改地址";
      // 获取地址详情信息
      await getAddressDetailAPI({ id: Number(this.$route.query.addressId) }).then((res) => {
        this.addressInfo = res.data;
      });
    }
  },

  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.back();
    },

    // 新增地址
    async onSave(content) {
      try {
        const res = await postAddNewAddressAPI(content);
        if (res.code === 0) {
          Toast("成功");
          this.$router.back();
        }
      } catch (err) {
        // 添加地址失败
        Toast(err.message);
        return err; // 抛出异常
      }
    },

    // 修改地址
    async onSecondSave(content) {
      const res = await patchAddressAPI(content);
      if (res.code === 0) {
        Toast("成功");
        this.$router.back();
      }
    },

    // 删除地址
    async onDelete(content) {
      const res = await deleteAddressAPI({ id: content.id });
      if (res.code === 0) {
        Toast("删除成功");
        this.$router.back();
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../style/viriables.styl';

.addressEdit {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: $bgColor;
}
</style>
