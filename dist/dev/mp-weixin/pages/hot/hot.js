"use strict";
const common_vendor = require("../../common/vendor.js");
const api_home_api = require("../../api/home.api.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
require("../../stores/modules/address.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "hot",
  props: {
    type: null,
    title: null
  },
  setup(__props) {
    const query = __props;
    console.log("query", query);
    common_vendor.index.setNavigationBarTitle({ title: query.title });
    const bannerPicture = common_vendor.ref("");
    const subTypes = common_vendor.ref([]);
    const activeIndex = common_vendor.ref(0);
    const getHotRecommendData = async () => {
      const res = await api_home_api.getHotRecommendAPI({
        page: 1,
        pageSize: 10,
        subType: query.type
      });
      bannerPicture.value = res.result.bannerPicture;
      subTypes.value = res.result.subTypes;
    };
    common_vendor.onLoad(() => {
      getHotRecommendData();
    });
    const onScrolltolower = async () => {
      const currsubTypes = subTypes.value[activeIndex.value];
      if (currsubTypes.goodsItems.page < currsubTypes.goodsItems.pages) {
        currsubTypes.goodsItems.page++;
      } else {
        currsubTypes.finish = true;
        return common_vendor.index.showToast({ icon: "none", title: "没有更多数据了~" });
      }
      const res = await api_home_api.getHotRecommendAPI({
        subType: currsubTypes.id,
        page: currsubTypes.goodsItems.page,
        pageSize: currsubTypes.goodsItems.pageSize
      });
      const newsubTypes = res.result.subTypes[activeIndex.value];
      currsubTypes.goodsItems.list.push(...newsubTypes.goodsItems.list);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(bannerPicture),
        b: common_vendor.f(common_vendor.unref(subTypes), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.id,
            c: index === common_vendor.unref(activeIndex) ? 1 : "",
            d: common_vendor.o(($event) => activeIndex.value = index, item.id)
          };
        }),
        c: common_vendor.f(common_vendor.unref(subTypes), (item, index, i0) => {
          return {
            a: common_vendor.f(item.goodsItems.list, (goods, k1, i1) => {
              return {
                a: goods.picture,
                b: common_vendor.t(goods.name),
                c: common_vendor.t(goods.price),
                d: goods.id,
                e: `/pages/goods/goods?id=${goods.id}`
              };
            }),
            b: common_vendor.t(item.finish ? "没有更多数据了~" : "正在加载..."),
            c: item.id,
            d: common_vendor.unref(activeIndex) === index,
            e: common_vendor.o(onScrolltolower, item.id)
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/应用开发/前端/shop-online/uni-mp-template-own/src/pages/hot/hot.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=hot.js.map
