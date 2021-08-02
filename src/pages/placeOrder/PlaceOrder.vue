<!--
 * @Description: 订单页面
 * @Author: 王振
 * @Date: 2021-08-02 15:45:48
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 15:56:47
-->
<template>
  <div class="placeOrder">
    <!-- 订单详情头部导航栏 开始 -->
    <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 订单详情头部导航栏 结束 -->

    <!-- 送货地址 开始 -->
    <div class="myAddress">
      <div class="address">
        <div class="left__icon">
          <van-icon name="location-o" size="36" />
        </div>
        <div class="myInfo">
          <div class="myInfo__detail">
            <span>{{ address.name }}</span>
            <span>{{ address.tel }}</span>
          </div>
          <div class="myInfo__address">{{ address.address }}</div>
        </div>
        <div class="right__icon">
          <van-icon name="arrow" size="36" />
        </div>
      </div>
    </div>
    <!-- 送货地址 结束 -->

    <!-- 商品 开始 -->
    <div v-for="item in goodsList" :key="item.id">
      <van-card
        :num="item.goodsNumber"
        :price="item.goodsPrice"
        :title="item.goodsName"
        :thumb="item.goodsImg"
      >
        <template #desc>
          <div class="detail__sku">
            规格：<span v-for="(its, index) in item.spec" :key="index">{{ its }}</span>
          </div>
        </template>
      </van-card>
    </div>
    <!-- 商品 结束 -->

    <!-- 配送方式 开始 -->
    <van-cell-group>
      <van-cell title="应付金额">
        <div class="total__price">￥{{ amountPayable }}</div>
      </van-cell>
      <van-cell title="商品总价" :value="`￥${totalPrice}`" />
      <van-cell title="运费" :value="`￥${freightPrice}`" />
      <van-cell title="发票信息" value="不需要发票" />
    </van-cell-group>
    <!-- 配送方式 结束 -->

    <!-- 订单金额 开始 -->
    <div class="sumbit">
      <van-button type="primary" block color="#d81d1d" @click="OnClickSubmit">提交订单</van-button>
    </div>
    <!-- 订单金额 结束 -->
  </div>
</template>

<script>
import { getAddressListAPI } from "@/api/address";
import { postAddOrderAPI } from "@/api/order";
import { deleteShoppingAPI } from "@/api/shoppingcart";
import { Toast } from "vant";

export default {
  name: "PlaceOrder",
  data() {
    return {
      goodsList: [], // 商品列表
      amountPayable: 0, // 应付金额
      totalPrice: 0, // 商品总价
      freightPrice: 0, // 运费
      address: {}, // 用户地址
      addressId: 1, // 所选地址id
    };
  },

  async mounted() {
    // 获取应付金额和商品总价
    this.totalPrice = Number(this.$route.query.totalPrice);
    this.amountPayable = Number(this.$route.query.totalPrice);
    // 获取商品列表
    this.goodsList = JSON.parse(String(this.$route.query.list));
    // 初始化默认地址
    await this.getDefault();
  },

  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.back();
    },

    // 获取默认地址
    async getDefault() {
      const { data } = await getAddressListAPI();
      // 获取默认地址
      for (let val of data) {
        if (val.isDefault) {
          this.address = val;
          this.addressId = Number(val.id); // 获取默认地址id
        }
      }
    },

    // 提交订单
    async OnClickSubmit() {
      let params = {
        addressId: this.addressId, // 所选地址id
        goodsId: String(this.$route.query.list), // 所选商品主体
        amountPayable: this.amountPayable, // 应付金额
        totalPrice: this.totalPrice, // 商品总价
        freightPrice: this.freightPrice, // 运费
        payStatus: 0, // 支付状态
        orderStatus: 0, // 订单状态
        isInvoice: false, // 是否需要发票
      };
      try {
        // 提交订单
        const res = await postAddOrderAPI(params);
        if (res.code === 0) {
          // 订单提交成功，删除购物车里的数据
          let list = JSON.parse(String(this.$route.query.list));
          for (let val of list) {
            await deleteShoppingAPI({ id: Number(val.id) });
          }
          Toast("订单提交成功");
          this.$router.back();
        }
      } catch (err) {
        Toast(err.message);
        return err; // 抛出异常
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../style/viriables.styl';
@import '../../style/mixins.styl';

.placeOrder {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: $bgColor;
}

.myAddress {
  background-color: #fff;
  padding: 20px 20px;
  margin-bottom: 20px;

  .address {
    display: flex;
    align-items: center;

    .left__icon {
      height: 120px;
      center();
    }

    .myInfo {
      width: 94%;
      height: 120px;
      display: flex;
      flex-direction: column;

      .myInfo__detail {
        height: 60px;
        display: flex;
        align-items: center;

        span {
          margin-right: 20px;
          font-size: 28px;
          font-weight: bold;
          color: #232323;
        }
      }

      .myInfo__address {
        height: 60px;
        font-size: 28px;
        color: #232323;
      }
    }

    .right__icon {
      height: 120px;
      center();
    }
  }
}

// 商品规格样式
.detail__sku {
  margin-top: 10px;
  font-size: 28px;
  font-weight: normal;
  color: #999;
  ellipsis();

  span {
    margin-right: 10px;
  }
}

.van-card {
  background-color: #fff;
}

.van-cell-group {
  margin: 20px 0;
}

.total__price {
  color: #e21323;
}

.sumbit {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
