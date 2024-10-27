import { PORT } from './src/config/index.js'
import { sequelize } from './src/lib/index.js'
import server from './src/server.js'

sequelize
  .sync({ logging: false, force: true })
  .then(() => {
    console.log('Base de datos conectada')
    server.listen(PORT, () => {
      console.log(`Server running in port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(`Error en la conexión: ${err.message}`)
  })
