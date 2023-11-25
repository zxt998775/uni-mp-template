"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_elementChinaAreaData = require("../../utils/element-china-area-data.js");
const api_category_api = require("../../api/category.api.js");
const stores_modules_address = require("../../stores/modules/address.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  (_easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2)();
}
const _easycom_uni_swipe_action_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-swipe-action/uni-swipe-action.js";
if (!Math) {
  (_easycom_uni_swipe_action_item + _easycom_uni_swipe_action)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "address",
  setup(__props) {
    const addressList = common_vendor.ref([]);
    const getMemberAddressData = async () => {
      const res = await api_category_api.getMemberAddressAPI();
      addressList.value = res.result;
    };
    common_vendor.onShow(() => {
      getMemberAddressData();
    });
    const onDeleteAddress = (id) => {
      common_vendor.index.showModal({
        content: "删除地址？",
        success: async (res) => {
          if (res.confirm) {
            await api_category_api.deleteMemberAddressByIdAPI(id);
            getMemberAddressData();
          }
        }
      });
    };
    const onChangeAddress = (item) => {
      const addressStore = stores_modules_address.useAddressStore();
      addressStore.changeSelectedAddress(item);
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(addressList), (item, k0, i0) => {
          var _a, _b, _c;
          return common_vendor.e({
            a: common_vendor.t(item.receiver),
            b: common_vendor.t(item.contact),
            c: item.isDefault
          }, item.isDefault ? {} : {}, {
            d: common_vendor.t(common_vendor.unref(utils_elementChinaAreaData.d)[(_a = item.provinceCode) == null ? void 0 : _a.replace(/0+$/, "")]),
            e: common_vendor.t(common_vendor.unref(utils_elementChinaAreaData.d)[(_b = item.cityCode) == null ? void 0 : _b.replace(/0+$/, "")]),
            f: common_vendor.t(common_vendor.unref(utils_elementChinaAreaData.d)[(_c = item.countyCode) == null ? void 0 : _c.replace(/0+$/, "")]),
            g: common_vendor.t(item.address),
            h: `/pagesMember/address/address-form?id=${item.id}`,
            i: common_vendor.o(() => {
            }, item.id),
            j: common_vendor.o(($event) => onChangeAddress(item), item.id),
            k: common_vendor.o(($event) => onDeleteAddress(item.id), item.id),
            l: item.id,
            m: "4c11414a-1-" + i0 + ",4c11414a-0"
          });
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/应用开发/前端/shop-online/uni-mp-template-own/src/pagesMember/address/address.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=address.js.map
