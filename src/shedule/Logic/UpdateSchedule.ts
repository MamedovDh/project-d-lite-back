import axios from 'axios'
import DBController from 'shedule/Controllers/DB.controller'

export async function UpdateSchedule(dbController : DBController) {
	const NikaName = await dbController.getNikaName()
	const schedule = createShedule(await getNikaData(NikaName))
	dbController.setSchedule(schedule)
}

async function getNikaData(nikaName: string) {
	const response = await axios(`https://lyceum.nstu.ru/rasp/${nikaName}`)
	return JSON.parse(response.data.split('=')[1].replace(';', ''))
}

const createShedule = (NIKA: any) => {
	const classSchedule = NIKA.CLASS_SCHEDULE['90']['034']

	let answer = []

	for (let i = 1; i <= 5; i++) {  // replace 5 to 6, if 6-day schedule
		let day: any = { lessons: [], rooms: [], teacher: [], number : []}
		for (const key in NIKA.CLASS_SCHEDULE['90']['034']) {

			if (key[0] === String(i)) {
				const current = NIKA.CLASS_SCHEDULE['90']['034'][key]

				day = {
					lessons: [...day.lessons, NIKA.SUBJECTS[current.s[0]]],
					rooms: [...day.rooms, NIKA.ROOMS[current.r[0]]],
					teacher: [...day.teacher, NIKA.TEACHERS[current.t[0]]],
					number : [...day.number, Number(`${key[1]}${key[2]}`)]
				}
			}
		}
		answer.push(day)
	}
	return answer
}