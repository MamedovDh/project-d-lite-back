import axios from 'axios'
import DBController from 'shedule/Controllers/DB.controller'

export async function CheckUpdate(dbController : DBController) : Promise<Boolean> {
	const currentNikaName = await dbController.getNikaName()

	const updateNikaName = await getUpdateNikaName()

	if(currentNikaName === updateNikaName) return true

	dbController.updateNikaName(updateNikaName)

	return false
}

async function getUpdateNikaName(){
	const responseHtml = await axios.get('https://lyceum.nstu.ru/rasp/m.schedule.html')				
		return responseHtml.data.split('<script type="text/javascript"')[2].split('"')[1]
}