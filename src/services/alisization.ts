import express from 'express'
import { Config, JsonDB } from 'node-json-db'
import { API, PORT } from '../../config/index'
import DBController from '../alisization/Controllers/DB.controller'
import RequestController from '../alisization/Controllers/Request.controller'


const db = new JsonDB(new Config("./databases/Duty.json", true, true, '/'));

const app = express()
const dbController = new DBController(db)
const reqController = new RequestController(dbController)

app.get(API.GET_ATTENDANTS_TODAY, reqController.getToday)
app.get(API.GET_ATTENDANTS_TOMMOROW, reqController.getTommorow)

app.listen(PORT.ATTENDANTS, async () => {
	console.log('alisization started')
})