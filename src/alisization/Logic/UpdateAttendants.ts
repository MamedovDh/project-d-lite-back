import DBController from 'alisization/Controllers/DB.controller'

export const updateAttendants = async (dbController: DBController) => {
	const lastDate = await dbController.getLastDate()
	const thisDate = new Date()

	if (thisDate.getDate() !== lastDate && (thisDate.getDay() !== 0 && thisDate.getDay() !== 6)) {
		const selectendAttendants: number = await dbController.getSelectedAttendants()
		
		await dbController.setLastDate(thisDate.getDate())
		await dbController.setSelectedAttendants(selectendAttendants !== 13 ? selectendAttendants + 1 : 1)

		return selectendAttendants !== 13 ? selectendAttendants + 1 : 1
	} else {
		return dbController.getSelectedAttendants()
	}
}