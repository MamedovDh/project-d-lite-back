import ExchangeSchedule from './ExchangeSchedule'
import FormattingDate from './FormattingDate'
import { FormattingSchedule } from './FormattingSchedule'

export const createShedule = (NIKA: any) => {

	let keySchedule
	for (const key in NIKA.CLASS_SCHEDULE)
		keySchedule = key

	const classSchedule = NIKA.CLASS_SCHEDULE[keySchedule]['034']
	const classExchange = NIKA.CLASS_EXCHANGE['034']

	const FormatDate = new FormattingDate(NIKA.PERIODS[keySchedule])
	const daysOfWeek = FormatDate.getDaysOfWeek()
	const Exchanges = new ExchangeSchedule(classExchange , daysOfWeek)

	let answer = []

	for (let i = 1; i <= 6; i++) {
		let day: any = { lessons: [], rooms: [], teacher: [], number: [] }
		for (const key in classSchedule) {

			if (key[0] === String(i)) {
				const current = classSchedule[key]

				day = {
					date : daysOfWeek[i - 1],
					lessons: [...day.lessons, [NIKA.SUBJECTS[current.s[0]], NIKA.SUBJECTS[current.s[1]]]],
					rooms: [...day.rooms, [NIKA.ROOMS[current.r[0]], NIKA.ROOMS[current.r[1]]]],
					teacher: [...day.teacher, [NIKA.TEACHERS[current.t[0]], NIKA.TEACHERS[current.t[1]]]],
					number: [...day.number, Number(`${key[1]}${key[2]}`)]
				}
			}	
		}
		answer.push(day)
	}

	return FormattingSchedule(Exchanges.setExchangeInSchedule(answer))
}


