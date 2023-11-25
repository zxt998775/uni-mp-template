"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_elementChinaAreaData = require("../../utils/element-china-area-data.js");
const stores_modules_address = require("../../stores/modules/address.js");
const api_cart_api = require("../../api/cart.api.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "create",
  props: {
    id: null,
    count: null,
    attrsText: null,
    OrderId: null
  },
  setup(__props) {
    const query = __props;
    const addressStore = stores_modules_address.useAddressStore();
    const selectAddress = common_vendor.computed(() => {
      var _a;
      return addressStore.selectedAddress || ((_a = orderPre.value) == null ? void 0 : _a.userAddresses.find((v) => v.isDefault));
    });
    common_vendor.onMounted(() => {
      getMemberOrderPreData();
    });
    const orderPre = common_vendor.ref();
    const getMemberOrderPreData = async () => {
      if (query.count && query.id) {
        const res = await api_cart_api.getMemberOrderPreNowAPI({
          id: query.id,
          count: query.count,
          attrsText: query.attrsText
        });
        orderPre.value = res.result;
      } else if (query.OrderId) {
        const res = await api_cart_api.getMemberOrderRepurchaseByIdAPI(query.OrderId);
        orderPre.value = res.result;
      } else {
        const res = await api_cart_api.getMemberOrderPreAPI();
        orderPre.value = res.result;
      }
    };
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const buyerMessage = common_vendor.ref("");
    const deliveryList = common_vendor.ref([
      { type: 1, text: "时间不限 (周一至周日)" },
      { type: 2, text: "工作日送 (周一至周五)" },
      { type: 3, text: "周末配送 (周六至周日)" }
    ]);
    const activeIndex = common_vendor.ref(0);
    const activeDelivery = common_vendor.computed(() => deliveryList.value[activeIndex.value]);
    const onChangeDelivery = (ev) => {
      activeIndex.value = ev.detail.value;
    };
    const onOrderSubit = async () => {
      var _a, _b;
      if (!((_a = selectAddress.value) == null ? void 0 : _a.id)) {
        return common_vendor.index.showToast({ icon: "none", title: "请选择收货地址" });
      }
      const res = await api_cart_api.postMemberOrderAPI({
        addressId: (_b = selectAddress.value) == null ? void 0 : _b.id,
        buyerMessage: buyerMessage.value,
        deliveryType: activeDelivery.value.type,
        goods: orderPre.value.goods.map((v) => ({ count: v.count, id: v.id, skus: v.attrsText })),
        payChannel: 2,
        payType: 1
      });
      console.log("关闭当前页面，跳转订单详情页，传递订单id");
      common_vendor.index.redirectTo({ url: `/pagesOrder/detail/detail?id=${res.result.id}` });
      console.log("跳转");
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      return common_vendor.e({
        a: common_vendor.unref(selectAddress)
      }, common_vendor.unref(selectAddress) ? {
        b: common_vendor.t(common_vendor.unref(selectAddress).receiver),
        c: common_vendor.t(common_vendor.unref(selectAddress).contact),
        d: common_vendor.t(common_vendor.unref(utils_elementChinaAreaData.d)[(_a = common_vendor.unref(selectAddress).provinceCode) == null ? void 0 : _a.replace(/0+$/, "")]),
        e: common_vendor.t(common_vendor.unref(utils_elementChinaAreaData.d)[(_b = common_vendor.unref(selectAddress).cityCode) == null ? void 0 : _b.replace(/0+$/, "")]),
        f: common_vendor.t(common_vendor.unref(utils_elementChinaAreaData.d)[(_c = common_vendor.unref(selectAddress).countyCode) == null ? void 0 : _c.replace(/0+$/, "")]),
        g: common_vendor.t(common_vendor.unref(selectAddress).address)
      } : {}, {
        h: common_vendor.f((_d = common_vendor.unref(orderPre)) == null ? void 0 : _d.goods, (item, k0, i0) => {
          return {
            a: item.picture,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.attrsText),
            d: common_vendor.t(item.payPrice),
            e: common_vendor.t(item.price),
            f: common_vendor.t(item.count),
            g: item.id,
            h: `/pages/goods/goods?id=${item.id}`
          };
        }),
        i: common_vendor.t(common_vendor.unref(activeDelivery).text),
        j: common_vendor.unref(deliveryList),
        k: common_vendor.o(onChangeDelivery),
        l: common_vendor.unref(buyerMessage),
        m: common_vendor.o(($event) => common_vendor.isRef(buyerMessage) ? buyerMessage.value = $event.detail.value : null),
        n: common_vendor.t((_e = common_vendor.unref(orderPre)) == null ? void 0 : _e.summary.totalPrice),
        o: common_vendor.t((_f = common_vendor.unref(orderPre)) == null ? void 0 : _f.summary.postFee),
        p: common_vendor.t((_g = common_vendor.unref(orderPre)) == null ? void 0 : _g.summary.totalPayPrice),
        q: !((_h = common_vendor.unref(selectAddress)) == null ? void 0 : _h.id) ? 1 : "",
        r: common_vendor.o(($event) => onOrderSubit()),
        s: ((_i = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _i.bottom) + "px"
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/应用开发/前端/shop-online/uni-mp-template-own/src/pagesOrder/create/create.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=create.js.map
