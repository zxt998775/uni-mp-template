"use strict";
const utils_http = require("../utils/http.js");
const getCategoryTopAPI = () => {
  return utils_http.http({
    method: "GET",
    url: "/category/top"
  });
};
const getGoodsByIdAPI = (id) => {
  return utils_http.http({
    method: "GET",
    url: "/goods/detail",
    data: { id }
  });
}
// 新增地址接口
const postMemberAddressAPI = (data) => {
  return utils_http.http({
    method: "POST",
    url: "/member/address",
    data
  });
};
const getMemberAddressAPI = () => {
  return utils_http.http({
    method: "GET",
    url: "/member/list"
  });
};
const getMemberAddressByIdAPI = (id) => {
  return utils_http.http({
    method: "GET",
    data: { id },
    url: `/member/address/detail`

  });
};
// 修改地址接口
// 修改地址接口
// 修改地址接口
const putMemberAddressByIdAPI = (id, data) => {
  return utils_http.http({
    // method: "PUT",
    method: "POST",
    url: `/member/updateAddress`,
    data: { id, ...data }
  })
}

/**
 * 删除收货地址
 * @param id 地址id(路径参数)
 */
export const deleteMemberAddressByIdAPI = (id: string) => {
  return http({
    method: 'DELETE',
    url: `/member/address?id=${id}`
  })
}
