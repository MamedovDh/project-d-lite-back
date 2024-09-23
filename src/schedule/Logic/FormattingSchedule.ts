export const FormattingSchedule = (schedule: any[]) => {

	const answer = []

	for (const item of schedule) {

		const day: any[] = []

		for (let i = 0; i < item.number.length; i += 2) {
			if (item.teacher[i][1] == null) {
				day.push({
					teacher: item.teacher[i].filter((Item: any) => Item != null).join(''),
					lessons: item.lessons[i].filter((Item: any) => Item != null).join(''),
					rooms: item.rooms[i].filter((Item: any) => Item != null).join(''),
					num: Math.round(item.number[i] ? item.number[i] / 2 : item.number[i - 1] / 2),
					separately : 0
				})
			} else {				
				day.push({
					teacher: item.teacher[i + 1],
					lessons: item.lessons[i],
					rooms: item.rooms[i],
					num: Math.round(item.number[i] ? item.number[i] / 2 : item.number[i - 1] / 2),
					separately : 1
				})
			}
		}

		answer.push(day)
	}

	return answer
}