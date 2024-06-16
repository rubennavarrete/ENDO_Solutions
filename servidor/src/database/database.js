import { Sequelize } from 'sequelize';
import variableConfig from "../config/variables.config.js"

const sequelize = new Sequelize(
    variableConfig.dbDatabase,
    variableConfig.dbUser,
    variableConfig.dbPassword,
    {
        host: variableConfig.dbServer,
        dialect: variableConfig.dbDialect,
        port: variableConfig.dbPort,
    }
)

export default sequelize;