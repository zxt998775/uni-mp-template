"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "ServicePanel",
  emits: ["close"],
  setup(__props, { emit }) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => emit("close"))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/应用开发/前端/shop-online/uni-mp-template-own/src/pages/goods/components/ServicePanel.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=ServicePanel.js.map
