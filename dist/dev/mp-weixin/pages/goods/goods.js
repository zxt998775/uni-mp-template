"use strict";
const common_vendor = require("../../common/vendor.js");
const api_category_api = require("../../api/category.api.js");
const api_cart_api = require("../../api/cart.api.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Array) {
  const _easycom_vk_data_goods_sku_popup2 = common_vendor.resolveComponent("vk-data-goods-sku-popup");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_vk_data_goods_sku_popup2 + _easycom_uni_popup2)();
}
const _easycom_vk_data_goods_sku_popup = () => "../../components/vk-data-goods-sku-popup/vk-data-goods-sku-popup.js";
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_vk_data_goods_sku_popup + AddressPanel + ServicePanelVue + _easycom_uni_popup)();
}
const AddressPanel = () => "./components/AddressPanel.js";
const ServicePanelVue = () => "./components/ServicePanel.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "goods",
  props: {
    id: null
  },
  setup(__props) {
    const query = __props;
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const mode = common_vendor.ref(
      2
      /* Cart */
    );
    const openSkuPopup = (val) => {
      isShowSku.value = true;
      mode.value = val;
    };
    const goods = common_vendor.ref();
    const getGoodsByIdData = async () => {
      const res = await api_category_api.getGoodsByIdAPI(query.id);
      goods.value = res.result;
      localdata.value = {
        _id: res.result.id,
        name: res.result.name,
        goods_thumb: res.result.mainPictures[0],
        spec_list: res.result.specs.map((v) => ({ name: v.name, list: v.value })),
        sku_list: res.result.skus.map((v) => ({
          _id: v.id,
          goods_id: res.result.id,
          goods_name: res.result.name,
          image: v.cover,
          price: v.price * 100,
          // 注意：需要乘以 100
          stock: v.inventory,
          sku_name_arr: v.specs.map((vv) => vv.valueName)
        }))
      };
    };
    common_vendor.onLoad(() => {
      getGoodsByIdData();
    });
    const currentIndex = common_vendor.ref(0);
    const onChange = (ev) => {
      currentIndex.value = ev.detail.current;
    };
    const onTapImage = (url) => {
      common_vendor.index.previewImage({
        current: url,
        urls: goods.value.mainPictures
      });
    };
    const popup = common_vendor.ref();
    const popupName = common_vendor.ref();
    const openPopup = (name) => {
      var _a;
      popupName.value = name;
      (_a = popup.value) == null ? void 0 : _a.open();
    };
    const isShowSku = common_vendor.ref(false);
    const localdata = common_vendor.ref({});
    const skuPopuRef = common_vendor.ref();
    const selectArrText = common_vendor.computed(() => {
      var _a, _b;
      return ((_b = (_a = skuPopuRef.value) == null ? void 0 : _a.selectArr) == null ? void 0 : _b.join(" ").trim()) || "请选择商品规格";
    });
    const onAddCart = async (ev) => {
      await api_cart_api.postMemberCartAPI({ attrsText: selectArrText.value, count: ev.buy_num, id: ev.goods_id });
      common_vendor.index.showToast({ title: "添加成功" });
      isShowSku.value = false;
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      return common_vendor.e({
        a: common_vendor.sr(skuPopuRef, "e4f6d536-0", {
          "k": "skuPopuRef"
        }),
        b: common_vendor.o(onAddCart),
        c: common_vendor.o(($event) => common_vendor.isRef(isShowSku) ? isShowSku.value = $event : null),
        d: common_vendor.p({
          localdata: common_vendor.unref(localdata),
          mode: common_vendor.unref(mode),
          ["add-cart-background-color"]: "#FFA868",
          ["buy-now-background-color"]: "27BA9B",
          ["：actived-style"]: "{\n      color: '#27BA9B',\n      borderColor: '#27BA9B',\n      backgroundColor: '#E9F8F5'\n    }",
          modelValue: common_vendor.unref(isShowSku)
        }),
        e: common_vendor.f((_a = common_vendor.unref(goods)) == null ? void 0 : _a.mainPictures, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => onTapImage(item), item),
            b: item,
            c: item
          };
        }),
        f: common_vendor.o(onChange),
        g: common_vendor.t(common_vendor.unref(currentIndex) + 1),
        h: common_vendor.t((_b = common_vendor.unref(goods)) == null ? void 0 : _b.mainPictures.length),
        i: common_vendor.t((_c = common_vendor.unref(goods)) == null ? void 0 : _c.price),
        j: common_vendor.t((_d = common_vendor.unref(goods)) == null ? void 0 : _d.name),
        k: common_vendor.t((_e = common_vendor.unref(goods)) == null ? void 0 : _e.description),
        l: common_vendor.t(common_vendor.unref(selectArrText)),
        m: common_vendor.o(($event) => openSkuPopup(
          1
          /* Both */
        )),
        n: common_vendor.o(($event) => openPopup("address")),
        o: common_vendor.o(($event) => openPopup("service")),
        p: common_vendor.unref(popupName) === "address"
      }, common_vendor.unref(popupName) === "address" ? {
        q: common_vendor.o(($event) => {
          var _a2;
          return (_a2 = common_vendor.unref(popup)) == null ? void 0 : _a2.close();
        })
      } : {}, {
        r: common_vendor.unref(popupName) === "service"
      }, common_vendor.unref(popupName) === "service" ? {
        s: common_vendor.o(($event) => {
          var _a2;
          return (_a2 = common_vendor.unref(popup)) == null ? void 0 : _a2.close();
        })
      } : {}, {
        t: common_vendor.sr(popup, "e4f6d536-1", {
          "k": "popup"
        }),
        v: common_vendor.p({
          type: "bottom",
          ["background-color"]: "#fff"
        }),
        w: common_vendor.f((_f = common_vendor.unref(goods)) == null ? void 0 : _f.properties, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.value),
            c: item.name
          };
        }),
        x: common_vendor.f((_g = common_vendor.unref(goods)) == null ? void 0 : _g.productPictures, (item, k0, i0) => {
          return {
            a: item,
            b: item
          };
        }),
        y: common_vendor.f((_h = common_vendor.unref(goods)) == null ? void 0 : _h.similarProducts, (item, k0, i0) => {
          return {
            a: item.picture,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: item.id,
            e: `/pages/goods/goods?id=${item.id}`
          };
        }),
        z: common_vendor.o(($event) => openSkuPopup(
          2
          /* Cart */
        )),
        A: common_vendor.o(($event) => openSkuPopup(
          3
          /* Buy */
        )),
        B: ((_i = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _i.bottom) + "px"
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/应用开发/前端/shop-online/uni-mp-template-own/src/pages/goods/goods.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=goods.js.map
