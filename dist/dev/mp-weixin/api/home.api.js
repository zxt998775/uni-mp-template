"use strict";
const utils_http = require("../utils/http.js");
const getHomeBannerAPI = (distributionSite = 1) => {
  return utils_http.http({
    method: "GET",
    url: "/home/banner",
    data: {
      distributionSite
    }
  });
};
const getHomeCategoryAPI = () => {
  return utils_http.http({
    method: "GET",
    url: "/category/index"
  });
};
const getHomeHotAPI = () => {
  return utils_http.http({
    method: "GET",
    url: "/home/hot"
  });
};
const getHomeGoodsGuessLikeAPI = (data) => {
  return utils_http.http({
    method: "POST",
    url: "/goods/guessLike",
    data
  });
};
const getHotRecommendAPI = (data) => {
  return utils_http.http({
    method: "POST",
    url: "/goods/preference",
    data
  });
};
exports.getHomeBannerAPI = getHomeBannerAPI;
exports.getHomeCategoryAPI = getHomeCategoryAPI;
exports.getHomeGoodsGuessLikeAPI = getHomeGoodsGuessLikeAPI;
exports.getHomeHotAPI = getHomeHotAPI;
exports.getHotRecommendAPI = getHotRecommendAPI;
//# sourceMappingURL=home.api.js.map
