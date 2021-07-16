// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {},
    "postcss-pxtorem": {
      //通过查阅文档我们可以看到 rootValue 支持两种参数类型：
      //数字：固定值
      //函数：动态计算返回
      //postcss-pxtorem 处理每个 CSS 文件的时候都会来调用这个函数
      //它会把被处理的 CSS 文件相关的信息通过参数传递给该函数
      //rootValue: 37.5,
      rootValue({ file }) {
        //将 vant 组件 rem 设置成 37.5  自己写的样式设置为 75 这样就不需要考虑二倍图 除二了
        return file.indexOf("vant") !== -1 ? 37.5 : 75;
      },
      propList: ["*"],
    },
  },
};
