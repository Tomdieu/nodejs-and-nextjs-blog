import {Sequelize} from "sequelize"
import config from "config"

const BASE_DIR = config.get<string>("BASE_DIR")

export const sequelize = new Sequelize({
    dialect:'sqlite',
    host:BASE_DIR+"/db.sqlite",
    logging:false
})

