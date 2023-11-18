"use strict";
const common_vendor = require("../../common/vendor.js");
const api_cart_api = require("../../api/cart.api.js");
const stores_modules_member = require("../../stores/modules/member.js");
require("../../utils/http.js");
require("../../stores/index.js");
if (!Array) {
  const _easycom_vk_data_input_number_box2 = common_vendor.resolveComponent("vk-data-input-number-box");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  (_easycom_vk_data_input_number_box2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2)();
}
const _easycom_vk_data_input_number_box = () => "../../components/vk-data-input-number-box/vk-data-input-number-box.js";
const _easycom_uni_swipe_action_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-swipe-action/uni-swipe-action.js";
if (!Math) {
  (_easycom_vk_data_input_number_box + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + common_vendor.unref(Guess))();
}
const Guess = () => "../../components/Guess/Guess.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cart",
  setup(__props) {
    const onChangeCount = (ev) => {
      api_cart_api.putMemberCartBySkuIdAPI(ev.index, { count: ev.value });
    };
    const memberStore = stores_modules_member.useMemberStore();
    const cartList = common_vendor.ref([]);
    const getMemberCartData = async () => {
      const res = await api_cart_api.getMemberCartAPI();
      cartList.value = res.result;
    };
    common_vendor.onShow(() => {
      if (memberStore.profile)
        getMemberCartData();
    });
    const onDeleteCart = (skuId) => {
      common_vendor.index.showModal({
        content: "是否删除",
        success: async (res) => {
          if (res.confirm) {
            await api_cart_api.deleteMemberCartAPI([skuId]);
            getMemberCartData();
          }
        }
      });
    };
    const onChangeSelected = (item) => {
      item.selected = !item.selected;
      api_cart_api.putMemberCartBySkuIdAPI(item.id, { selected: item.selected, count: item.count });
    };
    const isSelectedAll = common_vendor.computed(() => {
      return cartList.value.length && cartList.value.every((v) => v.selected);
    });
    const onChangeSelectedAll = () => {
      const _isSelectedAll = !isSelectedAll.value;
      cartList.value.forEach((item) => {
        item.selected = _isSelectedAll;
      });
      api_cart_api.putMemberCartSelectedAPI({ selected: _isSelectedAll });
    };
    const selectedCartList = common_vendor.computed(() => {
      return cartList.value.filter((v) => v.selected);
    });
    const selectedCartListCount = common_vendor.computed(() => {
      return selectedCartList.value.reduce((sum, item) => sum + item.count, 0);
    });
    const selectedCartListMoney = common_vendor.computed(() => {
      return selectedCartList.value.reduce((sum, item) => sum + item.count * item.nowPrice, 0).toFixed(2);
    });
    const gotoPayment = () => {
      if (selectedCartListCount.value === 0) {
        return common_vendor.index.showToast({
          icon: "none",
          title: "请选择商品"
        });
      }
      common_vendor.index.navigateTo({ url: "/pagesOrder/create/create" });
    };
    return (_ctx, _cache) => {
      return common_vendor.e(common_vendor.e({
        a: common_vendor.f(common_vendor.unref(cartList), (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => onChangeSelected(item), item.id),
            b: item.selected ? 1 : "",
            c: item.picture,
            d: common_vendor.t(item.name),
            e: common_vendor.t(item.attrsText),
            f: common_vendor.t(item.price),
            g: `/pages/goods/goods?id=${item.id}`,
            h: common_vendor.o(onChangeCount, item.id),
            i: "6e2b01b7-2-" + i0 + "," + ("6e2b01b7-1-" + i0),
            j: common_vendor.o(($event) => item.count = $event, item.id),
            k: common_vendor.p({
              min: 1,
              max: item.stock,
              index: item.id,
              modelValue: item.count
            }),
            l: common_vendor.o(($event) => onDeleteCart(item.id), item.id),
            m: item.id,
            n: "6e2b01b7-1-" + i0 + ",6e2b01b7-0"
          };
        })
      }, {
        b: common_vendor.o(onChangeSelectedAll),
        c: common_vendor.unref(isSelectedAll) ? 1 : "",
        d: common_vendor.t(common_vendor.unref(selectedCartListMoney)),
        e: common_vendor.t(common_vendor.unref(selectedCartListCount)),
        f: common_vendor.unref(selectedCartListCount) < 1 ? 1 : "",
        g: common_vendor.o(($event) => gotoPayment())
      }), {
        h: common_vendor.sr("guessRef", "6e2b01b7-3")
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/应用开发/前端/shop-online/uni-mp-template-own/src/pages/cart/cart.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=cart.js.map
