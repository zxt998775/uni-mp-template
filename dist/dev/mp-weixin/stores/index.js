"use strict";
const common_vendor = require("../common/vendor.js");
require("./modules/member.js");
require("./modules/address.js");
const pinia = common_vendor.createPinia();
pinia.use(common_vendor.createUnistorage());
exports.pinia = pinia;
//# sourceMappingURL=index.js.map
