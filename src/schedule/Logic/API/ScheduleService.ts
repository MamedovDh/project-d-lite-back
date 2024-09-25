import axios from 'axios'
import { CONFIG } from '../../../../config'


export default class ScheduleService {
	static async getUpdateNikaName(){
		let code = 0;

		do {
			try{ if (CONFIG.IsDev) console.log('request nikaName')
				const responseHtml = await axios.get('https://lyceum.nstu.ru/rasp/m.schedule.html')				
				return responseHtml.data.split('<script type="text/javascript"')[2].split('"')[1]
			} catch(e){ if (CONFIG.IsDev) console.error(e) }
		} while (code !== 200)
	}

	static async getNikaData(nikaName: string) {
		let code = 0

		do {
			try {
				if (CONFIG.IsDev) console.log("request data from", nikaName)
				const response = await axios.get(`https://lyceum.nstu.ru/rasp/${nikaName}`)
				const json = response.data.split('A=')[1]
				return await JSON.parse(json.replaceAll(';', ''))
			} catch (e) { if (CONFIG.IsDev) console.error(e) }
		} while (code !== 200)
	}

}