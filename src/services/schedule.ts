import express from 'express'
import { Config, JsonDB } from 'node-json-db'
import DBController from '../shedule/Controllers/DB.controller'
import RequestController from '../shedule/Controllers/Request.controller'
import { API, PORT } from './../../config/index'


const db = new JsonDB(new Config("./databases/Schedule.json", true, true, '/'));

const app = express()
const dbController = new DBController(db)
const reqController = new RequestController(dbController)

app.get(API.GET_ALL_SCHEDULE, reqController.getAll)

app.get(API.GET_CURRENT_SCHEDULE, reqController.getCurrent)



app.listen(PORT, async () => {
	console.log('schedule started')
})