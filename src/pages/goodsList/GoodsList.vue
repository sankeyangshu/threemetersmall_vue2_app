<!--
 * @Description: 商品列表页
 * @Author: 王振
 * @Date: 2021-08-02 15:25:36
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 15:40:10
-->
<template>
  <div class="goodsList">
    <!-- 头部导航栏 开始 -->
    <van-nav-bar
      title="商品列表"
      left-text="返回"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    />
    <!-- 头部导航栏 结束 -->

    <!-- 搜索框 开始 -->
    <van-search v-model="value" placeholder="请输入搜索关键词" />
    <!-- 搜索框 结束 -->

    <!-- 商品列表 开始 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <div v-for="item in goodsList" :key="item.id">
        <van-card
          :price="item.goodsPrice"
          :origin-price="item.linePrice"
          :desc="item.goodsInfo"
          :title="item.goodsName"
          :thumb="item.goodsImg"
          @click="OnClickGoodsDetails(item.id)"
        />
      </div>
    </van-list>
    <!-- 商品列表 结束 -->
  </div>
</template>

<script>
import { getGoodsListAPI } from "@/api/goods";

export default {
  name: "GoodsList",
  data() {
    return {
      value: "", // 搜索关键词
      goodsList: [], // 商品列表
      loading: false, // 加载更多-是否处于加载状态
      finished: false, // 加载更多-是否已加载完成
      params: {
        categoryId: 0, // 分类id
        pageIndex: 0, // 页码
        pageSize: 10, // 每页多少条
      }, // 请求参数
    };
  },
  async mounted() {
    // 获取分类页面传递的分类id
    this.params.categoryId = this.$route.query.id;
    // 初始化商品列表
    await this.getGoodsList();
  },
  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.back();
    },

    // 获取商品列表
    async getGoodsList() {
      const res = await getGoodsListAPI(this.params);
      if (res.code === 0) {
        this.goodsList = res.data.goodsList; // 获取后端传递的列表数据
      }
    },

    // 上拉加载更多
    async onLoad() {
      this.params.pageIndex++; // 加载下一页
      await getGoodsListAPI(this.params).then((res) => {
        // 判断数据是否全部加载完成
        if (res.data.isEmpty) {
          this.finished = true;
          return;
        }
        // 获取到下一页数据
        this.goodsList = [...this.goodsList, ...res.data.goodsList];
        // 加载状态结束
        this.loading = false;
      });
    },

    // 查看商品详情
    OnClickGoodsDetails(id) {
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
@import '../../style/viriables.styl';

.goodsList {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: $bgColor;
}

.van-card {
  background-color: #fff;
  margin-bottom: 10px;
}
</style>
