<!--
 * @Description: 商品详情页
 * @Author: 王振
 * @Date: 2021-08-02 15:09:41
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 16:31:05
-->
<template>
  <div class="goodsDetails">
    <!-- 头部导航条 开始 -->
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    />
    <!-- 头部导航条 结束 -->

    <!-- 轮播图 开始 -->
    <van-swipe :autoplay="3000" lazy-render class="goodsDetails__swipe">
      <van-swipe-item>
        <img :src="goodsImg" class="goodsDetails__img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图 结束 -->

    <!-- 商品名称 开始 -->
    <div class="product">
      <div class="product__price">
        <div class="proice__left">
          <span class="left__goodsPrice">￥{{ goodsPrice }}</span>
          <span class="left__linePrice">原价{{ linePrice }}</span>
        </div>
        <div class="price__right">已售{{ goodsSales }}件</div>
      </div>
      <div class="product__title">{{ goodsName }}{{ goodsInfo }}</div>
    </div>
    <!-- 商品名称 结束 -->

    <!-- 商品规格 开始 -->
    <div v-if="goodsName">
      <sku
        :specList="specList"
        :skuList="skuList"
        :skuImg="goodsImg"
        :skuTitle="goodsName"
        :skuPrice="goodsPrice"
        :goodsId="id"
        @SubmitSpec="SubmitSpec"
      ></sku>
    </div>
    <!-- 商品规格 结束 -->

    <!-- 商品详情 开始 -->
    <div class="product__details">
      <div class="details__title">商品详情</div>
      <div class="details__img">
        <van-image width="100%" fit="fill" :src="goodsDetail" />
      </div>
    </div>
    <!-- 商品详情 结束 -->

    <!-- 购买商品 开始 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="badge" @click="OnClickToCart" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="OnClickAddToCart(id, goodsName, goodsImg, goodsPrice)"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <!-- 购买商品 结束 -->
  </div>
</template>

<script>
import Sku from "@/components/Sku.vue";
import { Toast } from "vant";
import { getGoodsDetailAPI } from "@/api/goods";
import { getShoppingAPI, postAddShoppingAPI } from "@/api/shoppingcart";

export default {
  name: "GoodsDetails",
  components: { Sku },
  data() {
    return {
      id: 0, // 商品id
      goodsName: "", // 商品名称
      goodsInfo: "", // 商品介绍
      goodsPrice: "", // 商品价格
      linePrice: "", // 商品原价
      goodsSales: "", // 已售出多少
      specList: [], // 商品规格数组
      skuList: [], // 商品sku数组
      goodsImg: "", // 轮播图
      goodsDetail: "", // 商品详情
      badge: 0, // 购物车右上角徽标的内容
      shopParams: {
        goodsId: 0, // 商品id
        goodsName: "", // 商品名称
        goodsImg: "", // 商品头图
        goodsNumber: 0, // 商品数量
        goodsPrice: 0, // 商品价格
        spec: "", // 商品规格
        isChecked: true, // 是否选中了该商品
        isDelete: 0, // 是否删除了该商品
      }, // 加入购物车请求参数
    };
  },

  async mounted() {
    // 初始化商品详情数据
    await this.getGoodsDetails();
    // 初始化购物车列表数据
    await this.getShopping();
  },

  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.back();
    },

    // 获取后端传递的商品详情数据
    async getGoodsDetails() {
      const goodsid = this.$route.query.id; // 获取列表页面传递的商品id
      const res = await getGoodsDetailAPI({ id: Number(goodsid) });
      if (res.code === 0) {
        this.id = res.data.id;
        this.goodsName = res.data.goodsName;
        this.goodsInfo = res.data.goodsInfo;
        this.goodsPrice = res.data.goodsPrice;
        this.linePrice = res.data.linePrice;
        this.goodsSales = res.data.goodsSales;
        this.goodsImg = res.data.goodsImg;
        this.goodsDetail = res.data.goodsDetail;
        this.specList = res.data.specList;
        this.skuList = res.data.skuList;
      }
    },

    // 获取后端传递的购物车列表数据
    async getShopping() {
      const res = await getShoppingAPI({
        pageIndex: 0,
        pageSize: 100,
      });
      if (res.code === 0) {
        this.badge = res.data.count; // 获取购物车中商品数量
      }
    },

    // 获取选中的sku
    SubmitSpec(selectSpec) {
      this.shopParams.goodsNumber = selectSpec.purchaseNum;
      this.shopParams.spec = JSON.stringify(selectSpec.spec);
    },

    // 加入购物车
    async OnClickAddToCart(id, goodsName, goodsImg, goodsPrice) {
      this.shopParams.goodsId = id;
      this.shopParams.goodsName = goodsName;
      this.shopParams.goodsImg = goodsImg;
      this.shopParams.goodsPrice = Number(goodsPrice);
      // 判断用户是否选中规格
      if (this.shopParams.goodsNumber === 0 || this.shopParams.spec === "") {
        Toast("请先选择规格");
      } else {
        const res = await postAddShoppingAPI(this.shopParams);
        if (res.code === 0) {
          Toast("已经添加到购物车了哦！");
        }
      }
    },

    // 查看购物车
    OnClickToCart() {
      this.$router.push({ name: "Flow" });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../style/viriables.styl';
@import '../../style/mixins.styl';

.goodsDetails {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: $bgColor;
}

.goodsDetails__swipe {
  width: 100%;
  margin-bottom: 20px;
  background-color: #fff;

  .goodsDetails__img {
    width: 100%;
    height: 400px;
  }
}

.product {
  width: 100%;
  height: 160px;
  margin-bottom: 20px;
  background-color: #fff;

  .product__price {
    height: 60px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .proice__left {
      width: 70%;

      .left__goodsPrice {
        margin-right: 20px;
        font-size: 36px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: #d81d1d;
      }

      .left__linePrice {
        font-size: 24px;
        color: #747474;
        text-decoration: line-through;
      }
    }

    .price__right {
      width: 30%;
      height: 6px;
      line-height: 6px;
      text-align: right;
      color: #999;
    }
  }

  .product__title {
    height: 100px;
    padding: 0 20px;
    font-size: 28px;
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: #666666;
    ellipsis-2();
  }
}

.produce__sku {
  margin-bottom: 20px;

  .sku__title {
    margin-right: 8px;
    font-size: 28px;
    color: #999;
    vertical-align: middle;
  }

  .sku__detail {
    font-size: 28px;
    color: #333;
    vertical-align: middle;
  }
}

.product__details {
  width: 100%;
  margin-bottom: 100px;

  .details__title {
    width: 100%;
    height: 100px;
    background-color: #fff;
    center();
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: $fontColor;
  }

  .details__img {
    width: 100%;
  }
}
</style>
