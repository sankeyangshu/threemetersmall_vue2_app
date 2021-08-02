<!--
 * @Description: 首页
 * @Author: 王振
 * @Date: 2021-08-02 10:03:45
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-02 15:40:51
-->
<template>
  <div>
    <div class="wrapper">
      <!-- 通知栏 开始 -->
      <van-notice-bar
        mode="closeable"
        left-icon="volume-o"
        text="该项目仅为示例项目，不用做商业用途，仅供学习！"
      />
      <!-- 通知栏 结束 -->

      <!-- 搜索框 开始 -->
      <van-search
        v-model="keyword"
        shape="round"
        background="#3fbb47"
        placeholder="请输入搜索关键词"
      />
      <!-- 搜索框 结束 -->

      <!-- 轮播图 开始 -->
      <van-swipe :autoplay="3000" lazy-render class="wrapper__swipe">
        <van-swipe-item v-for="image in images" :key="image">
          <img :src="image" class="wrapper__swipe__img" />
        </van-swipe-item>
      </van-swipe>
      <!-- 轮播图 结束 -->

      <!-- 宫格 开始 -->
      <van-grid :border="false">
        <van-grid-item text="手机数码">
          <template #icon>
            <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
          </template>
        </van-grid-item>
        <van-grid-item text="新鲜水果">
          <template #icon>
            <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
          </template>
        </van-grid-item>
        <van-grid-item text="领券中心">
          <template #icon>
            <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
          </template>
        </van-grid-item>
        <van-grid-item text="日用百货">
          <template #icon>
            <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 宫格 结束 -->

      <!-- 猜你喜欢 开始 -->
      <van-divider :style="{ color: '#999999', borderColor: '#999999', padding: '0 16px' }">
        <van-icon name="fire" color="#ee0a24" />猜你喜欢
      </van-divider>
      <good-list :goodsList="goodsList"></good-list>
      <!-- 猜你喜欢 结束 -->

      <!-- 分割线 开始 -->
      <van-divider :style="{ color: '#999999', borderColor: '#999999', padding: '0 16px' }">
        我是有底线的
      </van-divider>
      <!-- 分割线 结束 -->
    </div>

    <!-- 底部tab 开始 -->
    <bottom-tabs :currentIndex="0"></bottom-tabs>
    <!-- 底部tab 结束 -->
  </div>
</template>

<script>
import BottomTabs from "@/components/BottomTabs.vue";
import GoodList from "@/components/GoodList.vue";
import { getGoodsListAPI } from "@/api/goods";
export default {
  name: "Home",
  components: { BottomTabs, GoodList },
  data() {
    return {
      keyword: "", // 搜索关键字
      images: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ], // 轮播图
      goodsList: [], // 商品列表
    };
  },

  async mounted() {
    // 初始化商品列表数据
    await this.getGoodsList();
  },

  methods: {
    // 获取商品列表数据
    async getGoodsList() {
      const data = { pageIndex: 0, pageSize: 10 }; // 请求参数
      const res = await getGoodsListAPI(data);
      if (res.code === 0 && res.data.goodsList.length !== 0) {
        this.goodsList = res.data.goodsList;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../style/viriables.styl';
@import '../../style/mixins.styl';

.wrapper {
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 100px;
  right: 0;
  background-color: $bgColor;

  .wrapper__swipe {
    margin: 10px auto;

    .wrapper__swipe__img {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
