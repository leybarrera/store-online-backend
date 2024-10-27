import { Sequelize } from 'sequelize'
import { DB_URI } from '../config/index.js'

const sequelize = new Sequelize(DB_URI, { logging: false, native: false })

export { sequelize }
