import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

const server = express()

server.use(cors())
server.use(express.json({ limit: '50mb' }))
server.use(cookieParser())
server.use(logger('dev'))

export default server
