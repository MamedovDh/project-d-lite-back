import cors from 'cors'
import express from 'express'
import { Config, JsonDB } from 'node-json-db'
import { API, PORT } from '../../config/index'
import DBController from '../schedule/Controllers/DB.controller'
import RequestController from '../schedule/Controllers/Request.controller'

const db = new JsonDB(new Config("./databases/Schedule.json", true, true, '/'));

const app = express()

app.use(cors())

const dbController = new DBController(db)
const reqController = new RequestController(dbController)

app.get(API.GET_ALL_SCHEDULE, reqController.getAll)

app.get(API.GET_TODAY_SCHEDULE, reqController.getToday)

app.get(API.GET_CURRENT_SCHEDULE, reqController.getCurrent)



app.listen(PORT.SCHEDSULE, async () => {
	console.log('schedule started')
})

