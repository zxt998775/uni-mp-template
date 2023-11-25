"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(CartMain)();
}
const CartMain = () => "./components/CartMain.js";
const _sfc_main = {
  __name: "cart",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/应用开发/前端/shop-online/uni-mp-template-own/src/pages/cart/cart.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=cart.js.map
