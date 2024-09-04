import axios from 'axios'
import DBController from 'shedule/Controllers/DB.controller'
import { TIME_OUT_REQUEST } from '../../../config'

export async function CheckUpdate(dbController : DBController) : Promise<Boolean> {
	const lastTime = await dbController.getLastResponse()

	if(Date.now() - lastTime >= TIME_OUT_REQUEST){
		const currentNikaName = await dbController.getNikaName()
		const updateNikaName = await getUpdateNikaName()
		dbController.setLastResponse(Date.now())

		if(currentNikaName === updateNikaName) return true
		
		dbController.updateNikaName(updateNikaName)

		return false
	} else return true
}

async function getUpdateNikaName(){
	let code = 0;

	do {
		try{ console.log(123)
			const responseHtml = await axios.get('https://lyceum.nstu.ru/rasp/m.schedule.html',{
				//@ts-ignore
				'Cache-Control': 'no-cache' 
			})				
			return responseHtml.data.split('<script type="text/javascript"')[2].split('"')[1]
		} catch(e){ console.error(e) }
	} while (code !== 200)

}