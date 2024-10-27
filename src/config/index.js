import 'dotenv/config'

const { DB_URI, PORT = 3000 } = process.env

export { DB_URI, PORT }
