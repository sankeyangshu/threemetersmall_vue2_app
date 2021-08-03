<!--
 * @Description: 商品sku组件
 * @Author: 王振
 * @Date: 2021-08-02 16:01:24
 * @LastEditors: 王振
 * @LastEditTime: 2021-08-03 09:33:47
-->
<template>
  <div>
    <!-- 商品sku单元格 开始 -->
    <van-cell is-link class="produce__sku" @click="OnClickShowSku">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="sku__title">选择：</span>
        <template v-if="!isShowSpec">
          <span class="sku__detail" v-for="(item, index) in specList" :key="index">
            {{ item.skuTitle }}
          </span>
        </template>
        <template v-else>
          <span class="sku__detail" v-for="item in selectSpec" :key="item">
            {{ item }}
          </span>
        </template>
      </template>
    </van-cell>
    <!-- 商品sku单元格 结束 -->

    <!-- 商品sku弹出层 开始 -->
    <van-popup v-model="isShowSku" position="bottom" :style="{ height: '50%' }">
      <div class="sku">
        <div class="sku__total">
          <div class="sku__total__img">
            <van-image width="100%" height="100%" :src="skuImg" />
          </div>
          <div class="sku__total__detail">
            <div class="detail__content">
              {{ skuTitle }}
            </div>
            <div class="detail__price">￥{{ skuPrice }}</div>
            <div class="detail__sku">
              请选择<span v-for="item in selectSpec" :key="item">{{ item }}</span>
            </div>
          </div>
        </div>
        <div class="sku__list" v-for="(items, index) in specArray" :key="index">
          <div class="sku__list__title">{{ items.title }}</div>
          <div class="sku__list__spec">
            <div
              class="spec__item"
              v-for="(item, index) in items.list"
              :key="index + item.name"
              :class="[
                selectSpec[items.title] === item.name ? 'spec__item-active' : '',
                item.able ? '' : 'spec__item-disabled',
              ]"
            >
              <span @click="changeSpec(items.title, item.name, item.able)">{{ item.name }}</span>
            </div>
          </div>
        </div>
        <div class="sku__num">
          <div class="num__title">购买数量</div>
          <van-stepper v-model="purchaseNum" max="99" disable-input />
        </div>
        <div class="sku__btn">
          <van-button
            type="primary"
            size="large"
            color="#3fbb47"
            @click="OnClickSubmit(selectSpec)"
          >
            确定
          </van-button>
        </div>
      </div>
    </van-popup>
    <!-- 商品sku弹出层 结束 -->
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  name: "Sku",
  props: {
    specList: {
      // 商品规格数据
      required: true,
      type: Array,
    },
    skuList: {
      // 商品sku数据
      required: true,
      type: Array,
    },
    goodsId: {
      // 商品id
      required: true,
      type: Number,
    },
    skuImg: {
      // 商品缩略图
      type: String,
    },
    skuTitle: {
      // 商品名称
      type: String,
    },
    skuPrice: {
      // 商品价格
      type: String,
    },
  },
  data() {
    return {
      specArray: [], // 规格数组
      skuArray: [], // sku数组
      selectSpec: {}, // 选择数据的对象
      isShowSku: false, // 控制商品sku弹出层的显示和隐藏
      isShowSpec: false, // 判断商品sku单元格上标题显示内容
      purchaseNum: 1, // 步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。
    };
  },
  created() {
    // 处理数据
    this.skuArray = this.skuList;
    // 初始化选择数据的对象
    console.log(this.specList);
    this.specList.forEach((item) => {
      // this.selectSpec = {
      //   [item.skuTitle]: "",
      // };
      this.$set(this.selectSpec, item.skuTitle, "");
    });
    // 将规格数据处理成我们视图所需要的数据类型
    this.specArray = this.specList.map((item) => {
      return {
        title: item.skuTitle,
        list: item.specList.map((its) => {
          return {
            name: its,
            //  判断是否可以选择
            able: this.isAble(item.skuTitle, its),
          };
        }),
      };
    });
  },

  methods: {
    // 判断规格是否可以被选择  核心函数 key当前的规格的title   value规格值
    isAble(key, value) {
      // 深拷贝 避免被影响
      let copySelectSpec = JSON.parse(JSON.stringify(this.selectSpec));
      // 用对象的好处就在这了 直接赋值当前验证项
      copySelectSpec[key] = value;
      // 用数组的 some 方法 效率高 符合条件直接退出循环
      let flag = this.skuArray.some((item) => {
        let i = 0;
        for (let k in copySelectSpec) {
          // eslint-disable-next-line eqeqeq
          if (copySelectSpec[k] != "" && item.spec.includes(copySelectSpec[k])) {
            // console.log(item)
            i++;
            // eslint-disable-next-line eqeqeq
          } else if (copySelectSpec[k] == "") {
            i++;
          }
        }
        // 符合下面条件就退出了 不符合会一直循环知道循环结束没有符合的条件就 return false 了
        // eslint-disable-next-line eqeqeq
        return i == this.specList.length;
      });
      // console.log(flag);
      return flag;
    },

    // 点击事件
    changeSpec(key, value, able) {
      // 不能被选中，直接返回
      if (!able) return;
      // 可以被选中
      if (this.selectSpec[key] === value) {
        this.selectSpec[key] = "";
      } else {
        this.selectSpec[key] = value;
      }
      // forEach循环改变原数组
      this.specArray.forEach((item) => {
        item.list.forEach((its) => {
          its.able = this.isAble(item.title, its.name);
          // console.log(its.name, its.able);
        });
      });
    },

    // 显示商品sku弹出层
    OnClickShowSku() {
      this.isShowSku = true;
    },

    // 确认选中的规格
    OnClickSubmit(spec) {
      // 判断是否选中了所有规格
      this.isShowSpec = Object.keys(spec).every((val) => {
        return spec[val] !== "";
      });
      if (this.isShowSpec) {
        let selectSpec = {
          spec,
          purchaseNum: this.purchaseNum,
        };
        // 选中了规格，隐藏sku弹出层
        this.isShowSku = false;
        this.$emit("SubmitSpec", selectSpec);
      } else {
        Toast("请选择完整规格");
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../style/mixins.styl';

.produce__sku {
  margin-bottom: 20px;

  .sku__title {
    margin-right: 8px;
    font-size: 28px;
    color: #999;
    vertical-align: middle;
  }

  .sku__detail {
    margin-right: 10px;
    font-size: 28px;
    color: #333;
    vertical-align: middle;
  }
}

.sku {
  width: 100%;
  height: 100%;

  &__total {
    width: 90%;
    margin: 0 auto;
    padding: 20px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #dcdfe6;

    &__img {
      width: 120px;
      height: 120px;
      margin-right: 20px;
    }

    &__detail {
      width: 530px;
      height: 120px;
      display: flex;
      flex-direction: column;

      .detail__content {
        width: 530px;
        height: 60px;
        ellipsis-2();
        font-size: 26px;
      }

      .detail__price {
        height: 30px;
        line-height: 30px;
        font-size: 30px;
        color: #d81616;
      }

      .detail__sku {
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        color: #909399;

        span {
          margin-left: 10px;
          font-size: 24px;
          color: #606266;
        }
      }
    }
  }

  &__list {
    width: 90%;
    margin: 0 auto;
    padding: 20px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;

    &__title {
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
      font-size: 26px;
      color: #606266;
    }

    &__spec {
      width: 100%;
      display: flex;
      flex-direction: row;

      .spec__item {
        display: inline-block;
        margin-right: 10px;
        border: 1px solid #303133;
        padding: 10px;

        span {
          cursor: pointer;
        }
      }

      .spec__item-active {
        border: 1px solid #303133;
        background-color: red;
        color: #fff;
      }

      .spec__item-disabled {
        color: #c0c4cc;
        cursor: not-allowed;
        background-image: none;
        background-color: #fff;
        border-color: #303133;
      }
    }
  }

  &__num {
    width: 90%;
    margin: 0 auto;
    padding: 20px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .num__title {
      font-size: 26px;
      color: #606266;
    }
  }

  &__btn {
    width: 100%;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    border: 1px solid #3fbb47;
  }
}
</style>
