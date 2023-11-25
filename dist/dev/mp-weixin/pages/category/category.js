"use strict";
const common_vendor = require("../../common/vendor.js");
const api_home_api = require("../../api/home.api.js");
const api_category_api = require("../../api/category.api.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
require("../../stores/modules/address.js");
if (!Array) {
  const _easycom_wSwiper2 = common_vendor.resolveComponent("wSwiper");
  _easycom_wSwiper2();
}
const _easycom_wSwiper = () => "../../components/wSwiper/wSwiper.js";
if (!Math) {
  _easycom_wSwiper();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "category",
  setup(__props) {
    const bannerList = common_vendor.ref([]);
    const getBannerData = async () => {
      const res = await api_home_api.getHomeBannerAPI(2);
      bannerList.value = res.result;
    };
    const categoryList = common_vendor.ref([]);
    const getCategoryTopData = async () => {
      const res = await api_category_api.getCategoryTopAPI();
      categoryList.value = res.result;
    };
    const subCategoryList = common_vendor.computed(() => {
      var _a;
      return ((_a = categoryList.value[activeIndex.value]) == null ? void 0 : _a.children) || [];
    });
    const activeIndex = common_vendor.ref(0);
    const isFinish = common_vendor.ref(false);
    common_vendor.onLoad(async () => {
      await Promise.all([getBannerData(), getCategoryTopData()]);
      isFinish.value = true;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(categoryList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.id,
            c: index === common_vendor.unref(activeIndex) ? 1 : "",
            d: common_vendor.o(($event) => activeIndex.value = index, item.id)
          };
        }),
        b: common_vendor.p({
          list: common_vendor.unref(bannerList)
        }),
        c: common_vendor.f(common_vendor.unref(subCategoryList), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.f(item.goods, (goods, k1, i1) => {
              return {
                a: goods.picture,
                b: common_vendor.t(goods.name),
                c: common_vendor.t(goods.price),
                d: goods.id,
                e: `/pages/goods/goods?id=${goods.id}`
              };
            }),
            c: item.id
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/应用开发/前端/shop-online/uni-mp-template-own/src/pages/category/category.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=category.js.map
