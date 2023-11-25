"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_elementChinaAreaData = require("../../utils/element-china-area-data.js");
const api_category_api = require("../../api/category.api.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
require("../../stores/modules/address.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "address-form",
  props: {
    id: null
  },
  setup(__props) {
    const query = __props;
    const form = common_vendor.ref({
      receiver: "",
      // 收货人
      contact: "",
      // 联系方式
      fullLocation: "",
      // 省市区(前端展示)
      provinceCode: "",
      // 省份编码(后端参数)
      cityCode: "",
      // 城市编码(后端参数)
      countyCode: "",
      // 区/县编码(后端参数)
      address: "",
      // 详细地址
      isDefault: 0
      // 默认地址，1为是，0为否
    });
    common_vendor.index.setNavigationBarTitle({ title: query.id ? "修改地址" : "新建地址" });
    const onRegionChange = (ev) => {
      form.value.fullLocation = ev.detail.value.join(" ");
      console.log("ev.detail.value :>> ", ev.detail.value);
      const [provinceCode, cityCode, countyCode] = ev.detail.code;
      Object.assign(form.value, { provinceCode, cityCode, countyCode });
    };
    const onSwitchChange = (ev) => {
      form.value.isDefault = ev.detail.value ? 1 : 0;
    };
    const rules = {
      receiver: {
        rules: [{ required: true, errorMessage: "请输入收货人姓名" }]
      },
      contact: {
        rules: [
          { required: true, errorMessage: "请输入联系方式" },
          { pattern: /^1[3-9]\d{9}$/, errorMessage: "手机号格式不正确" }
        ]
      },
      fullLocation: {
        rules: [{ required: true, errorMessage: "请选择所在地区" }]
      },
      address: {
        rules: [{ required: true, errorMessage: "请填写详细地址" }]
      }
    };
    const formRef = common_vendor.ref();
    const onSubmit = async () => {
      var _a;
      try {
        await ((_a = formRef.value) == null ? void 0 : _a.validate());
        if (query.id) {
          await api_category_api.putMemberAddressByIdAPI(query.id, form.value);
        } else {
          await api_category_api.postMemberAddressAPI(form.value);
        }
        common_vendor.index.showToast({ icon: "success", title: query.id ? "修改成功" : "添加成功" });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 400);
      } catch (error) {
        common_vendor.index.showToast({ icon: "error", title: "请填写完整信息" });
      }
    };
    const getMemberAddressByIdData = async () => {
      var _a, _b, _c;
      if (query.id) {
        const { result } = await api_category_api.getMemberAddressByIdAPI(query.id);
        form.value.fullLocation = utils_elementChinaAreaData.d[(_a = result.provinceCode) == null ? void 0 : _a.replace(/0+$/, "")] + " " + utils_elementChinaAreaData.d[(_b = result.cityCode) == null ? void 0 : _b.replace(/0+$/, "")] + " " + utils_elementChinaAreaData.d[(_c = result.countyCode) == null ? void 0 : _c.replace(/0+$/, "")];
        Object.assign(form.value, result);
      }
    };
    common_vendor.onLoad(() => {
      getMemberAddressByIdData();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(form).receiver,
        b: common_vendor.o(($event) => common_vendor.unref(form).receiver = $event.detail.value),
        c: common_vendor.p({
          name: "receiver"
        }),
        d: common_vendor.unref(form).contact,
        e: common_vendor.o(($event) => common_vendor.unref(form).contact = $event.detail.value),
        f: common_vendor.p({
          name: "contact"
        }),
        g: common_vendor.unref(form).fullLocation
      }, common_vendor.unref(form).fullLocation ? {
        h: common_vendor.t(common_vendor.unref(form).fullLocation)
      } : {}, {
        i: common_vendor.unref(form).fullLocation.split(" "),
        j: common_vendor.o(onRegionChange),
        k: common_vendor.p({
          name: "fullLocation"
        }),
        l: common_vendor.unref(form).address,
        m: common_vendor.o(($event) => common_vendor.unref(form).address = $event.detail.value),
        n: common_vendor.p({
          name: "address"
        }),
        o: common_vendor.unref(form).isDefault === 1,
        p: common_vendor.o(onSwitchChange),
        q: common_vendor.sr(formRef, "4c9e15a6-0", {
          "k": "formRef"
        }),
        r: common_vendor.p({
          rules,
          model: common_vendor.unref(form)
        }),
        s: common_vendor.o(onSubmit)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/应用开发/前端/shop-online/uni-mp-template-own/src/pagesMember/address/address-form.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=address-form.js.map
