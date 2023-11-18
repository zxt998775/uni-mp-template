"use strict";
const common_vendor = require("../../common/vendor.js");
const api_login = require("../../api/login.js");
const stores_modules_member = require("../../stores/modules/member.js");
require("../../utils/http.js");
require("../../stores/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    let code = "";
    common_vendor.onLoad(async () => {
      const res = await common_vendor.wx$1.login();
      code = res.code;
    });
    const sureToLogin = async () => {
      common_vendor.index.showLoading({ title: "正在登录", mask: true });
      const { result } = await api_login.postLoginWxMinAPI({ code });
      common_vendor.index.hideLoading();
      loginSuccess(result);
    };
    const loginSuccess = (profile) => {
      const memberStore = stores_modules_member.useMemberStore();
      memberStore.setProfile(profile);
      common_vendor.index.showToast({ icon: "success", title: "登录成功" });
      setTimeout(() => {
        common_vendor.index.switchTab({ url: "/pages/my/my" });
      }, 500);
    };
    const onGetphonenumberSimple = async () => {
      const { result } = await api_login.postLoginWxMinSimpleAPI("15062260839");
      loginSuccess(result);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(sureToLogin),
        b: common_vendor.o(onGetphonenumberSimple)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cdfe2409"], ["__file", "D:/应用开发/前端/shop-online/uni-mp-template-own/src/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=login.js.map
