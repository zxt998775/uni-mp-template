"use strict";
const common_vendor = require("../../common/vendor.js");
const api_home_api = require("../../api/home.api.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Guess",
  setup(__props, { expose }) {
    const pageParams = { page: 1, pageSize: 10 };
    const guessList = common_vendor.ref([]);
    const finish = common_vendor.ref(false);
    const getHomeGoodsGuessLikeData = async () => {
      if (finish.value === true) {
        return common_vendor.index.showToast({ icon: "none", title: "没有更多数据~" });
      }
      const res = await api_home_api.getHomeGoodsGuessLikeAPI(pageParams);
      guessList.value.push(...res.result.list);
      if (pageParams.page < res.result.pages) {
        pageParams.page++;
      } else {
        finish.value = true;
      }
    };
    common_vendor.onMounted(() => {
      getHomeGoodsGuessLikeData();
    });
    const resetData = () => {
      pageParams.page = 1;
      guessList.value = [];
      finish.value = false;
    };
    expose({
      resetData,
      getMore: getHomeGoodsGuessLikeData
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(guessList), (item, k0, i0) => {
          return {
            a: item.picture,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: item.id,
            e: `/pages/goods/goods?id=${item.id}`
          };
        }),
        b: common_vendor.t(common_vendor.unref(finish) ? "没有更多数据~" : "正在加载...")
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/应用开发/前端/shop-online/uni-mp-template-own/src/components/Guess/Guess.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=Guess.js.map
