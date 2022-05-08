import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'mysql-ijeon.cfwsd0bywxpa.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    username: 'admin',
    password: 'dlsduq95',
    database: 'sns_api',
    entities: [__dirname+'/../**/*.entity.{js,ts}'],
    synchronize: true
}