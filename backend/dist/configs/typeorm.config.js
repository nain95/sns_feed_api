"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
exports.typeORMConfig = {
    type: 'mysql',
    host: 'mysql-ijeon.cfwsd0bywxpa.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    username: 'admin',
    password: 'dlsduq95',
    database: 'sns_api',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
};
//# sourceMappingURL=typeorm.config.js.map