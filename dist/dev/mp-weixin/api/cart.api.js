"use strict";
const utils_http = require("../utils/http.js");
const postMemberCartAPI = (data) => {
  return utils_http.http({
    method: "POST",
    url: "/cart/add",
    data
  });
};
const getMemberCartAPI = () => {
  return utils_http.http({
    method: "GET",
    url: "/cart/list"
  });
};
const deleteMemberCartAPI = (ids) => {
  return utils_http.http({
    method: "DELETE",
    url: "/cart/remove",
    data: ids
  });
};
const putMemberCartBySkuIdAPI = (id, data) => {
  return utils_http.http({
    method: "PUT",
    url: "/cart/edit",
    data: { id, ...data }
  });
};
const putMemberCartSelectedAPI = (data) => {
  return utils_http.http({
    method: "PUT",
    url: `/cart/selected?selected=${data.selected}`
  });
};
exports.deleteMemberCartAPI = deleteMemberCartAPI;
exports.getMemberCartAPI = getMemberCartAPI;
exports.postMemberCartAPI = postMemberCartAPI;
exports.putMemberCartBySkuIdAPI = putMemberCartBySkuIdAPI;
exports.putMemberCartSelectedAPI = putMemberCartSelectedAPI;
//# sourceMappingURL=cart.api.js.map
