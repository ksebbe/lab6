"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongodbConfig = void 0;
const getMongodbConfig = async (configService) => ({
    uri: configService.get('MONGO_URI'),
});
exports.getMongodbConfig = getMongodbConfig;
//# sourceMappingURL=mongodb.config.js.map