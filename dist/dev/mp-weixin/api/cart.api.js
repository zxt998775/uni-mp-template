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
const getMemberOrderPreAPI = () => {
  return utils_http.http({
    method: "GET",
    url: "/order/pre"
  });
};
const getMemberOrderPreNowAPI = (data) => {
  return utils_http.http({
    method: "POST",
    url: "/order/pre/now",
    data
  });
};
const postMemberOrderAPI = (data) => {
  return utils_http.http({
    method: "POST",
    url: "/order/submit",
    data
  });
};
const getMemberOrderByIdAPI = (id) => {
  return utils_http.http({
    method: "GET",
    url: "/order/info",
    data: { id }
  });
};
const getMemberOrderRepurchaseByIdAPI = (id) => {
  return utils_http.http({
    method: "GET",
    url: `/order/repurchase`,
    data: { id }
  });
};
const getPayMockAPI = (id) => {
  return utils_http.http({
    method: "GET",
    url: "/order/pay",
    data: { id }
  });
};
const getMemberOrderConsignmentByIdAPI = (id) => {
  return utils_http.http({
    method: "GET",
    data: { id },
    url: "/order/consignment"
  });
};
const putMemberOrderReceiptByIdAPI = (id) => {
  return utils_http.http({
    method: "PUT",
    url: `/order/receipt?id=${id}`
  });
};
const getMemberOrderLogisticsByIdAPI = (id) => {
  return utils_http.http({
    method: "GET",
    url: "/order/logistics",
    data: { id }
  });
};
const deleteMemberOrderAPI = (ids) => {
  return utils_http.http({
    method: "DELETE",
    url: `/order/delete`,
    data: ids
  });
};
const getMemberOrderCancelByIdAPI = (data) => {
  return utils_http.http({
    method: "PUT",
    url: "/order/cancel",
    data
  });
};
const getMemberOrderAPI = (data) => {
  return utils_http.http({
    method: "POST",
    url: `/order/page`,
    data
  });
};
exports.deleteMemberCartAPI = deleteMemberCartAPI;
exports.deleteMemberOrderAPI = deleteMemberOrderAPI;
exports.getMemberCartAPI = getMemberCartAPI;
exports.getMemberOrderAPI = getMemberOrderAPI;
exports.getMemberOrderByIdAPI = getMemberOrderByIdAPI;
exports.getMemberOrderCancelByIdAPI = getMemberOrderCancelByIdAPI;
exports.getMemberOrderConsignmentByIdAPI = getMemberOrderConsignmentByIdAPI;
exports.getMemberOrderLogisticsByIdAPI = getMemberOrderLogisticsByIdAPI;
exports.getMemberOrderPreAPI = getMemberOrderPreAPI;
exports.getMemberOrderPreNowAPI = getMemberOrderPreNowAPI;
exports.getMemberOrderRepurchaseByIdAPI = getMemberOrderRepurchaseByIdAPI;
exports.getPayMockAPI = getPayMockAPI;
exports.postMemberCartAPI = postMemberCartAPI;
exports.postMemberOrderAPI = postMemberOrderAPI;
exports.putMemberCartBySkuIdAPI = putMemberCartBySkuIdAPI;
exports.putMemberCartSelectedAPI = putMemberCartSelectedAPI;
exports.putMemberOrderReceiptByIdAPI = putMemberOrderReceiptByIdAPI;
//# sourceMappingURL=cart.api.js.map
