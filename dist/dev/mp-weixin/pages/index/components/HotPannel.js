"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "HotPannel",
  props: {
    list: null
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.list, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.alt),
            c: common_vendor.f(item.pictures, (src, k1, i1) => {
              return {
                a: src,
                b: src
              };
            }),
            d: `/pages/hot/hot?type=${item.id}&title=${item.title}`,
            e: item.id
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/应用开发/前端/shop-online/uni-mp-template-own/src/pages/index/components/HotPannel.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=HotPannel.js.map
