"use strict";
const common_vendor = require("../../common/vendor.js");
const api_home_api = require("../../api/home.api.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Array) {
  const _easycom_wSwiper2 = common_vendor.resolveComponent("wSwiper");
  _easycom_wSwiper2();
}
const _easycom_wSwiper = () => "../../components/wSwiper/wSwiper.js";
if (!Math) {
  (common_vendor.unref(CustomNavbar) + _easycom_wSwiper + common_vendor.unref(CategoryPanel) + common_vendor.unref(HotPannel) + common_vendor.unref(Guess))();
}
const CustomNavbar = () => "./components/CustomNavbar.js";
const CategoryPanel = () => "./components/CategoryPanel.js";
const HotPannel = () => "./components/HotPannel.js";
const Guess = () => "../../components/Guess/Guess.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const bannerList = common_vendor.ref([]);
    const getHomeBannerData = async () => {
      const res = await api_home_api.getHomeBannerAPI();
      bannerList.value = res.result;
    };
    const categoryList = common_vendor.ref([]);
    const getHomeCategoryData = async () => {
      const res = await api_home_api.getHomeCategoryAPI();
      categoryList.value = res.result;
    };
    const hotList = common_vendor.ref([]);
    const getHomeHotData = async () => {
      const res = await api_home_api.getHomeHotAPI();
      hotList.value = res.result;
    };
    const isLoading = common_vendor.ref(false);
    common_vendor.onLoad(async () => {
      isLoading.value = true;
      await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()]);
      isLoading.value = false;
    });
    const guessRef = common_vendor.ref();
    const onScrolltolower = () => {
      var _a;
      (_a = guessRef.value) == null ? void 0 : _a.getMore();
    };
    const isTriggered = common_vendor.ref(false);
    const onRefresherrefresh = async () => {
      var _a;
      isTriggered.value = true;
      (_a = guessRef.value) == null ? void 0 : _a.resetData();
      await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()]);
      isTriggered.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          list: common_vendor.unref(bannerList)
        }),
        b: common_vendor.p({
          list: common_vendor.unref(categoryList)
        }),
        c: common_vendor.p({
          list: common_vendor.unref(hotList)
        }),
        d: common_vendor.sr(guessRef, "e6b82146-4", {
          "k": "guessRef"
        }),
        e: common_vendor.o(onRefresherrefresh),
        f: common_vendor.unref(isTriggered),
        g: common_vendor.o(onScrolltolower)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/应用开发/前端/shop-online/uni-mp-template-own/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
