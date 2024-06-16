import * as dotenv from 'dotenv';

dotenv.config();

const variableConfig = {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 4010,
    dbUser: process.env.DB_USER,
    dbServer: process.env.DB_SERVER,
    dbPassword: process.env.DB_PASSWORD,
    dbDialect: process.env.DB_DIALECT,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,

}

export default variableConfig;