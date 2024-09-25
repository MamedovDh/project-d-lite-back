type FirstDay = {
	day : number
	month : number
	year : number
}

export interface IFormattingDate {
	getDaysOfWeek : () => string[]
	getCurrentDay : (firstDate : FirstDay, shift : number) => Date
	getFirstDate : () => FirstDay
}

export default class FormattingDate implements IFormattingDate {

	private NIKA_PERIODS

	constructor(NIKA_PERIODS : any){
		this.NIKA_PERIODS = NIKA_PERIODS
	}

	getDaysOfWeek = () : string[] => {
		const firstDate = this.getFirstDate()
		const daysOfWeek = []

		for(let i = 0; i <= 6; i ++){
			const currentDay = this.getCurrentDay(firstDate, i)
			daysOfWeek.push(
				[
					`${currentDay.getDate() <= 9 ? '0' + currentDay.getDate() : currentDay.getDate()}`,
					`${currentDay.getMonth() <= 8 ? '0' + (currentDay.getMonth() + 1) : currentDay.getMonth() + 1}`,
					`${currentDay.getFullYear()}`
				].join('.')
			)
		}

		return daysOfWeek
	}
	
	getCurrentDay = (firstDate : FirstDay, shift : number) : Date => {
		const currentDay = new Date()

		currentDay.setFullYear(firstDate.year)
		currentDay.setMonth(firstDate.month - 1)
		currentDay.setDate(firstDate.day + shift + 1)
		
		return currentDay
	}

	
	getFirstDate = () : FirstDay => {
		const from = this.NIKA_PERIODS.b.split('.')
	
		return {
			day : Number(from[0]),
			month : Number(from[1]),
			year : Number(from[2])
		}
	}
}