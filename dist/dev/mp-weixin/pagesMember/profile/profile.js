"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_elementChinaAreaData = require("../../utils/element-china-area-data.js");
const api_login = require("../../api/login.js");
require("../../stores/index.js");
const stores_modules_member = require("../../stores/modules/member.js");
require("../../utils/http.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "profile",
  setup(__props) {
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const fullLocation = common_vendor.ref("");
    const profile = common_vendor.ref({});
    const getMemberProfileData = async () => {
      var _a, _b, _c, _d;
      const res = await api_login.getMemberProfileAPI();
      profile.value = res.result;
      console.log(profile.value);
      if (profile.value.provinceCode && profile.value.cityCode && profile.value.countyCode) {
        fullLocation.value = utils_elementChinaAreaData.d[(_a = profile.value.provinceCode) == null ? void 0 : _a.replace(/0+$/, "")] + " " + utils_elementChinaAreaData.d[(_b = profile.value.cityCode) == null ? void 0 : _b.replace(/0+$/, "")] + " " + utils_elementChinaAreaData.d[(_c = profile.value.countyCode) == null ? void 0 : _c.replace(/0+$/, "")];
      }
      profile.value.birthday = (_d = profile.value.birthday) == null ? void 0 : _d.split("T")[0];
    };
    common_vendor.onLoad(() => {
      getMemberProfileData();
    });
    const memberStore = stores_modules_member.useMemberStore();
    const onAvatarChange = () => {
      common_vendor.index.chooseMedia({
        // ⽂件个数
        count: 1,
        // ⽂件类型
        mediaType: ["image"],
        success: (res) => {
          const { tempFilePath } = res.tempFiles[0];
          common_vendor.index.uploadFile({
            url: "/user/profile/avatar",
            name: "file",
            // 后端数据字段名
            filePath: tempFilePath,
            // 新头像
            success: (res2) => {
              if (res2.statusCode === 200) {
                const avatar = JSON.parse(res2.data).result;
                profile.value.avatar = avatar;
                memberStore.profile.avatar = avatar;
                common_vendor.index.showToast({ icon: "success", title: "更新成功" });
              } else {
                common_vendor.index.showToast({ icon: "error", title: "出现错误" });
              }
            }
          });
        }
      });
    };
    const onGenderChange = (ev) => {
      profile.value.gender = parseInt(ev.detail.value);
    };
    const onBirthdayChange = (ev) => {
      profile.value.birthday = ev.detail.value;
    };
    let fullLocationCode = ["", "", ""];
    const onFullLocationChange = (ev) => {
      fullLocation.value = ev.detail.value.join(" ");
      fullLocationCode = ev.detail.code;
    };
    const onSubmit = async () => {
      const { nickname, gender, birthday, profession } = profile.value;
      console.log(fullLocationCode);
      console.log(birthday);
      const res = await api_login.putMemberProfileAPI({
        nickname,
        gender,
        birthday,
        profession,
        provinceCode: fullLocationCode[0],
        cityCode: fullLocationCode[1],
        countyCode: fullLocationCode[2]
      });
      memberStore.profile.nickname = res.result.nickname;
      common_vendor.index.showToast({ icon: "success", title: "保存成功" });
      setTimeout(() => {
        common_vendor.index.navigateBack();
      }, 400);
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e;
      return common_vendor.e({
        a: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.top) + "px",
        b: common_vendor.o(onAvatarChange),
        c: (_b = common_vendor.unref(profile)) == null ? void 0 : _b.avatar,
        d: common_vendor.t(common_vendor.unref(profile).account),
        e: common_vendor.unref(profile).nickname,
        f: common_vendor.o(($event) => common_vendor.unref(profile).nickname = $event.detail.value),
        g: ((_c = common_vendor.unref(profile)) == null ? void 0 : _c.gender) === 0,
        h: ((_d = common_vendor.unref(profile)) == null ? void 0 : _d.gender) === 1,
        i: common_vendor.o(onGenderChange),
        j: common_vendor.unref(profile).birthday
      }, common_vendor.unref(profile).birthday ? {
        k: common_vendor.t(common_vendor.unref(profile).birthday)
      } : {}, {
        l: /* @__PURE__ */ new Date(),
        m: common_vendor.unref(profile).birthday,
        n: common_vendor.o(onBirthdayChange),
        o: common_vendor.unref(fullLocation)
      }, common_vendor.unref(fullLocation) ? {
        p: common_vendor.t(common_vendor.unref(fullLocation))
      } : {}, {
        q: (_e = common_vendor.unref(fullLocation)) == null ? void 0 : _e.split(" "),
        r: common_vendor.o(onFullLocationChange),
        s: common_vendor.unref(profile).profession,
        t: common_vendor.o(($event) => common_vendor.unref(profile).profession = $event.detail.value),
        v: common_vendor.o(onSubmit)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/应用开发/前端/shop-online/uni-mp-template-own/src/pagesMember/profile/profile.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=profile.js.map
