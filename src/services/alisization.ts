import express from 'express'
import { Config, JsonDB } from 'node-json-db'
import DBController from '../alisization/Controllers/DB.controller'
import RequestController from '../alisization/Controllers/Request.controller'
import { API, PORT } from './../../config/index'


const db = new JsonDB(new Config("./databases/Duty.json", true, true, '/'));

const app = express()
const dbController = new DBController(db)
const reqController = new RequestController(dbController)

app.get(API.GET_ATTENDANTS, reqController.getThis)

app.listen(PORT, async () => {
	console.log('alisization started')
})