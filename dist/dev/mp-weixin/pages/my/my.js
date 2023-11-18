"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_modules_member = require("../../stores/modules/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my",
  setup(__props) {
    var _a;
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const orderTypes = [
      { type: 1, text: "待付款", icon: "icon-currency" },
      { type: 2, text: "待发货", icon: "icon-gift" },
      { type: 3, text: "待收货", icon: "icon-check" },
      { type: 4, text: "待评价", icon: "icon-comment" }
    ];
    const memberStore = stores_modules_member.useMemberStore();
    console.log("memberStore :>> ", (_a = memberStore.profile) == null ? void 0 : _a.avatar);
    return (_ctx, _cache) => {
      var _a2;
      return common_vendor.e({
        a: common_vendor.unref(memberStore).profile
      }, common_vendor.unref(memberStore).profile ? {
        b: (_a2 = common_vendor.unref(memberStore).profile) == null ? void 0 : _a2.avatar,
        c: common_vendor.t(common_vendor.unref(memberStore).profile.nickname || common_vendor.unref(memberStore).profile.account)
      } : {}, {
        d: common_vendor.unref(safeAreaInsets).top + "px",
        e: common_vendor.f(orderTypes, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: item.type,
            c: common_vendor.n(item.icon),
            d: `/pagesOrder/list/list?type=${item.type}`
          };
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d3687551"], ["__file", "D:/应用开发/前端/shop-online/uni-mp-template-own/src/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=my.js.map
