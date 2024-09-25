
type Exchage = {
	numLesson: number,
	date: string
}

export interface IExchangeSchedule {
	getExchanges: () => Exchage[]
}

export default class ExchangeSchedule implements IExchangeSchedule {

	private daysOfWeek: string[]
	private classExchanges: any

	constructor(classExchanges: any, getDaysOfWeek: string[]) {
		this.classExchanges = classExchanges
		this.daysOfWeek = getDaysOfWeek
	}

	setExchangeInSchedule = (schedule : any) : any[] => {
		const answer = schedule.map((daySchedule : any, numDay : number) => {
			return {...daySchedule, cancelled : this.updateExchanges(daySchedule.date)}
		})

		return answer
	}

	updateExchanges = (date : string) : number[] => {
		const exchanges = this.getExchanges()
		const answer : number[] = []

		for(let exchange of exchanges){
			if(exchange.date === date)
				answer.push(exchange.numLesson)
		}

		return answer
	}

	getExchanges = (): Exchage[] => {
		const answer: Exchage[] = []

		for (let date in this.classExchanges) {

			for (let lesson in this.classExchanges[date]) {

				for (let subject in this.classExchanges[date][lesson]) {

					if (this.classExchanges[date][lesson][subject] === 'F')
						answer.push({
							numLesson: Number(lesson),
							date: date
						})
				}
			}
		}
		return answer
	}

}