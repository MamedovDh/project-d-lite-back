import express from 'express'
import { PORT } from './../../config/index'

const app = express()

app.listen(PORT, () => {
	console.log('schedule started')
})