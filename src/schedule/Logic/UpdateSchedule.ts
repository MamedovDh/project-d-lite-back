import axios from 'axios'
import DBController from 'schedule/Controllers/DB.controller'
import { FormattingSchedule } from './FormattingSchedule'

export async function UpdateSchedule(dbController: DBController) {
	const NikaName = await dbController.getNikaName()
	const schedule = createShedule(await getNikaData(NikaName))
	console.log('success update schedule')
	dbController.setSchedule(schedule)
}

async function getNikaData(nikaName: string) {
	let code = 0

	do {
		try {
			console.log("request data from", nikaName)
			const response = await axios.get(`https://lyceum.nstu.ru/rasp/${nikaName}`, {
				//@ts-ignore
				'Cache-Control': 'no-cache'
			})
			const json = response.data.split('A=')[1]
			return await JSON.parse(json.replaceAll(';', ''))
		} catch (e) { console.error(e) }
	} while (code !== 200)
}

const createShedule = (NIKA: any) => {
	let keySchedule
	for (const key in NIKA.CLASS_SCHEDULE)
		keySchedule = key

	const classSchedule = NIKA.CLASS_SCHEDULE[keySchedule]['034']

	let answer = []

	for (let i = 1; i <= 5; i++) {  // replace 5 to 6, if 6-day schedule
		let day: any = { lessons: [], rooms: [], teacher: [], number: [] }
		for (const key in NIKA.CLASS_SCHEDULE[keySchedule]['034']) {

			if (key[0] === String(i)) {
				const current = NIKA.CLASS_SCHEDULE[keySchedule]['034'][key]

				day = {
					lessons: [...day.lessons, [NIKA.SUBJECTS[current.s[0]], NIKA.SUBJECTS[current.s[1]]]],
					rooms: [...day.rooms, [NIKA.ROOMS[current.r[0]], NIKA.ROOMS[current.r[1]]]],
					teacher: [...day.teacher, [NIKA.TEACHERS[current.t[0]], NIKA.TEACHERS[current.t[1]]]],
					number: [...day.number, Number(`${key[1]}${key[2]}`)]
				}
			}
		}
		answer.push(day)
	}

	return FormattingSchedule(answer)
}


