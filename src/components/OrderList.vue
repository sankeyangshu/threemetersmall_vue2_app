<!--
 * @Description: 订单列表组件
 * @Author: 王振
 * @Date: 2021-08-02 11:28:37
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 16:00:51
-->
<template>
  <div>
    <div class="total__order" v-for="item in orderList" :key="item.id">
      <div class="order__state">
        <div class="state__num">单号：{{ item.orderNum }}</div>
        <div class="state" v-if="item.orderStatus === '0'">待付款</div>
        <div class="state" v-else-if="item.orderStatus === '1'">已支付</div>
        <div class="state" v-else-if="item.orderStatus === '2'">代发货</div>
        <div class="state" v-else-if="item.orderStatus === '3'">待收货</div>
        <div class="state" v-else>交易成功</div>
      </div>
      <div class="order__goods" v-for="its in item.goodsId" :key="its.id">
        <van-card
          :num="its.goodsNumber"
          :price="its.goodsPrice"
          :title="its.goodsName"
          :thumb="its.goodsImg"
        >
          <template #desc>
            <div class="detail__sku">
              规格：<span v-for="(it, index) in its.spec" :key="index">{{ it }}</span>
            </div>
          </template>
        </van-card>
      </div>
      <div class="order__price">
        <div class="price__num">共1件</div>
        <div class="price__total">
          应付总额：<span>￥{{ item.totalPrice }}</span>
        </div>
      </div>
      <div class="order__btn">
        <van-button type="default" size="small" class="btn" @click="OnClickDeleteOrder(item.id)">
          删除订单
        </van-button>
        <van-button color="#d81d1d" size="small" class="btn" v-if="item.payStatus === '0'">
          去付款
        </van-button>
        <van-button
          color="#d81d1d"
          size="small"
          class="btn"
          v-if="item.payStatus === '1' && item.orderStatus === '1'"
        >
          催发货
        </van-button>
        <van-button color="#d81d1d" size="small" class="btn" v-if="item.orderStatus === '2'">
          确认收货
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderListAPI, deleteOrderAPI } from "@/api/order";
import { Toast } from "vant";
export default {
  name: "OrderList",
  data() {
    return {
      orderList: [], // 订单列表
    };
  },

  async mounted() {
    // 初始化订单列表数据
    await this.getOrderList();
  },

  methods: {
    // 获取订单列表数据
    async getOrderList() {
      const res = await getOrderListAPI({ pageIndex: 0, pageSize: 5 });
      if (res.code === 0) {
        // 格式化数据
        this.orderList = res.data.orderList.map((res) => {
          res.goodsId = JSON.parse(res.goodsId);
          return res;
        });
      }
    },

    // 删除订单
    async OnClickDeleteOrder(id) {
      // 删除订单
      const res = await deleteOrderAPI({ id });
      if (res.code === 0) {
        Toast.success("删除成功");
        // 刷新订单
        await this.getOrderList();
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../style/mixins.styl';

.total__order {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;

  .order__state {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d4d4d4;

    .state__num {
      font-size: 28px;
    }

    .state {
      font-size: 28px;
      color: #787878;
    }
  }

  .order__goods {
    border-bottom: 1px solid #d4d4d4;

    // 商品规格样式
    .detail__sku {
      margin-top: 10px;
      font-size: 28px;
      font-weight: normal;
      color: #999;
      @include ellipsis;

      span {
        margin-right: 10px;
      }
    }
  }

  .order__price {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;

    .price__num {
      margin: 0 10px;
      font-size: 28px;
    }

    .price__total {
      font-size: 28px;

      span {
        color: #d81d1d;
      }
    }
  }

  .order__btn {
    display: flex;
    justify-content: flex-end;

    .btn {
      margin-left: 20px;
    }
  }
}

.van-card {
  background-color: #fff;
}
</style>
