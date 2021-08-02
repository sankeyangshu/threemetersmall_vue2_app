<!--
 * @Description: 购物车页面
 * @Author: 王振
 * @Date: 2021-08-02 14:28:10
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 14:49:21
-->
<template>
  <div>
    <div class="flow">
      <!-- 空状态 开始 -->
      <van-empty description="亲，购物车里还没有商品哦" v-if="flowList.length == 0">
        <van-button round type="danger" class="bottom-button">去逛逛</van-button>
      </van-empty>
      <!-- 空状态 结束 -->

      <!-- 订单 开始 -->
      <div v-else>
        <van-swipe-cell v-for="item in flowList" :key="item.id">
          <div class="flow__list">
            <div class="list__details">
              <div class="details__check">
                <van-checkbox v-model="item.isChecked" checked-color="#ee0a24"></van-checkbox>
              </div>
              <div class="details__img" @click="OnClickViewDetail(item.goodsId)">
                <van-image fit="fill" width="140" height="140" :src="item.goodsImg" />
              </div>
              <div class="details__detail">
                <div class="detail__title">
                  {{ item.goodsName }}
                </div>
                <div class="detail__sku">
                  规格：<span v-for="(its, index) in item.spec" :key="index">{{ its }}</span>
                </div>
                <div class="detail__price">
                  <div class="price">￥{{ item.goodsPrice }}</div>
                  <van-stepper
                    v-model="item.goodsNumber"
                    max="99"
                    disable-input
                    @plus="OnPlusGoodsNum(item.id, item.goodsNumber)"
                    @minus="OnMinusGoodsNum(item.id, item.goodsNumber)"
                  />
                </div>
              </div>
            </div>
          </div>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete__button"
              @click="OnClickDeleteCart(item.id)"
            />
          </template>
        </van-swipe-cell>
      </div>
      <!-- 订单 结束 -->

      <!-- 为你推荐 开始 -->
      <van-divider :style="{ color: '#999999', borderColor: '#999999', padding: '0 16px' }">
        <van-icon name="fire" color="#ee0a24" />为你推荐
      </van-divider>
      <good-list :goodsList="goodsList"></good-list>
      <!-- 为你推荐 结束 -->

      <!-- 分割线 开始 -->
      <van-divider
        :style="{
          color: '#999999',
          borderColor: '#999999',
          padding: '0 16px',
          marginBottom: '100px',
        }"
      >
        我是有底线的
      </van-divider>
      <!-- 分割线 结束 -->

      <!-- 提交订单栏 开始 -->
      <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="allChecked" checked-color="#ee0a24"> 全选 </van-checkbox>
      </van-submit-bar>
      <!-- 提交订单栏 结束 -->
    </div>

    <!-- 底部tab 开始 -->
    <bottom-tabs :currentIndex="2"></bottom-tabs>
    <!-- 底部tab 结束 -->
  </div>
</template>

<script>
import BottomTabs from "@/components/BottomTabs.vue";
import GoodList from "@/components/GoodList.vue";
import { getShoppingAPI, patchUpdateShopAPI, deleteShoppingAPI } from "@/api/shoppingcart";
import { getGoodsListAPI } from "@/api/goods";
import { Toast } from "vant";

export default {
  name: "Flow",
  components: { BottomTabs, GoodList },
  data() {
    return {
      flowList: [], // 购物车列表
      goodsList: [], // 商品列表数据
    };
  },

  computed: {
    // 计算购物车商品总金额
    totalPrice() {
      const list = JSON.parse(JSON.stringify(this.flowList));
      let count = 0;
      if (list) {
        for (let i = 0; i < list.length; i++) {
          const element = list[i];
          if (element.isChecked) {
            count += element.goodsPrice;
          }
        }
      }
      return Number((count * 100).toFixed(2));
    },
    // 计算购物车是否全选
    allChecked() {
      const list = JSON.parse(JSON.stringify(this.flowList));
      let result = true;
      if (list) {
        for (let i = 0; i < list.length; i++) {
          const element = list[i];
          if (!element.isChecked) {
            result = false;
          }
        }
      }
      return result;
    },
  },

  async mounted() {
    // 初始化购物车列表数据
    await this.getShoppingList();
    // 初始化为你推荐商品列表数据
    await this.getGoodsList();
  },

  methods: {
    // 获取购物车列表数据
    async getShoppingList() {
      const { data } = await getShoppingAPI({
        pageIndex: 0,
        pageSize: 100,
      });
      if (data.shoppingList.length !== 0) {
        this.flowList = data.shoppingList.map((res) => {
          res.spec = JSON.parse(res.spec);
          res.goodsPrice = res.goodsPrice * res.goodsNumber;
          return res;
        });
      }
    },

    // 查看购物车商品详情
    OnClickViewDetail(id) {
      this.$router.push({
        name: "GoodsDetails",
        query: {
          id,
        },
      });
    },

    // 更新购物车数据-增加购物车商品数量
    async OnPlusGoodsNum(id, num) {
      const res = await patchUpdateShopAPI({
        id,
        goodsNumber: num + 1, // 商品数量
      });
      if (res.code === 0) {
        // 更新购物车列表数据
        await this.getShoppingList();
      }
    },

    // 更新购物车数据-减少购物车商品数量
    async OnMinusGoodsNum(id, num) {
      const res = await patchUpdateShopAPI({
        id,
        goodsNumber: num - 1, // 商品数量
      });
      if (res.code === 0) {
        // 更新购物车列表数据
        await this.getShoppingList();
      }
    },

    // 删除购物车数据
    async OnClickDeleteCart(id) {
      const res = await deleteShoppingAPI({ id });
      if (res.code === 0) {
        // 更新购物车列表数据
        await this.getShoppingList();
      }
    },

    // 提交订单
    onSubmit() {
      let result = this.flowList.some((val) => {
        return val.isChecked;
      });
      if (result) {
        // 格式化数组，只获取数组中选中的数据
        let list = JSON.parse(JSON.stringify(this.flowList)).filter((res) => {
          return res.isChecked;
        });
        this.$router.push({
          name: "PlaceOrder",
          query: {
            list: JSON.stringify(list),
            totalPrice: this.totalPrice / 100,
          },
        });
      } else {
        Toast("请选择要购买的商品");
      }
    },

    // 获取为你推荐商品列表
    async getGoodsList() {
      const data = { pageIndex: 0, pageSize: 10 }; // 请求参数
      await getGoodsListAPI(data).then((res) => {
        if (res.data.goodsList.length !== 0) {
          this.goodsList = res.data.goodsList;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../style/viriables.styl';
@import '../../style/mixins.styl';

.flow {
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 100px;
  right: 0;
  background-color: $bgColor;
}

.flow__list {
  width: 100%;
  background-color: #fff;
  margin-top: 10px;

  .list__details {
    padding: 10px;
    display: flex;
    align-items: center;

    .details__check {
      width: 66px;
      height: 180px;
      center();
      margin-right: 10px;
    }

    .details__img {
      width: 180px;
      height: 180px;
      margin-right: 20px;
    }

    .details__detail {
      height: 180px;
      display: flex;
      flex-direction: column;

      .detail__title {
        width: 280px;
        margin-bottom: 20px;
        font-size: 28px;
        font-weight: normal;
        color: #232323;
        ellipsis();
      }

      .detail__sku {
        width: 280px;
        margin-bottom: 20px;
        font-size: 28px;
        font-weight: normal;
        color: #999;
        ellipsis();

        span {
          margin-right: 10px;
        }
      }

      .detail__price {
        width: 320px;
        display: flex;
        justify-content: space-between;

        .price {
          width: 120px;
          font-size: 36px;
          font-family: SourceHanSansCN;
          font-weight: 400;
          color: #e21323;
        }
      }
    }
  }
}

.delete__button {
  height: 100%;
}

.van-submit-bar {
  bottom: 100px;
}

.bottom-button {
  width: 320px;
  height: 80px;
}
</style>
