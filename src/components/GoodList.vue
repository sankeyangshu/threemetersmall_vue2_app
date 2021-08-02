<!--
 * @Description: 商品卡片
 * @Author: 王振
 * @Date: 2021-08-02 10:30:34
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 16:38:28
-->
<template>
  <!-- 商品卡片 开始 -->
  <div class="goods__list">
    <div class="goods" v-for="item in goodsList" :key="item.id" @click="OnClickViewDetail(item.id)">
      <div class="goods__img">
        <van-image width="280" height="270" :src="item.goodsImg" />
      </div>
      <div class="goods__title">{{ item.goodsName }}</div>
      <div class="goods__price">￥{{ item.goodsPrice }}</div>
    </div>
  </div>
  <!-- 商品卡片 结束 -->
</template>

<script>
export default {
  name: "GoodList",
  props: {
    goodsList: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    OnClickViewDetail(id) {
      this.$router.push({
        name: "GoodsDetails",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../style/viriables.styl';
@import '../style/mixins.styl';

.goods__list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .goods {
    width: 49%;
    margin-bottom: 10px;
    background-color: #fff;

    .goods__img {
      margin-bottom: 8px;
      padding-top: 8px;
      center();
    }

    .goods__title {
      width: 90%;
      margin-bottom: 8px;
      padding-left: 16px;
      overflow: hidden;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: $fontColor;
      ellipsis-2();
    }

    .goods__price {
      width: 100%;
      margin-bottom: 10px;
      padding-left: 16px;
      ellipsis();
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: $priceColor;
    }
  }
}
</style>
