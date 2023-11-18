"use strict";
const utils_http = require("../utils/http.js");
const postLoginWxMinAPI = (data) => {
  return utils_http.http({
    method: "POST",
    url: "/user/login/wxMin",
    data
  });
};
const postLoginWxMinSimpleAPI = (phoneNumber) => {
  return utils_http.http({
    method: "POST",
    url: "/user/login/wxMin/simple",
    data: {
      phoneNumber
    }
  });
};
const getMemberProfileAPI = () => {
  return utils_http.http({
    method: "GET",
    url: "/user/profile"
  });
};
const putMemberProfileAPI = (data) => {
  return utils_http.http({
    method: "PUT",
    url: "/user/profile",
    data
  });
};
exports.getMemberProfileAPI = getMemberProfileAPI;
exports.postLoginWxMinAPI = postLoginWxMinAPI;
exports.postLoginWxMinSimpleAPI = postLoginWxMinSimpleAPI;
exports.putMemberProfileAPI = putMemberProfileAPI;
//# sourceMappingURL=login.js.map
