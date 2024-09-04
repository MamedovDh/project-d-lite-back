import DBController from 'alisization/Controllers/DB.controller'

export const UpdateAttendants = async (dbController: DBController) => {
	const lastDate = await dbController.getLastDate()
	const thisDate = new Date()

	if (thisDate.getDate() !== lastDate && (thisDate.getDay() !== 0 && thisDate.getDay() !== 6)) {
		dbController.setLastDate(thisDate.getDate())
		dbController.getSelectedAttendants().then((selectendAttendants: number) => {
			dbController.setSelectedAttendants(selectendAttendants !== 13 ? selectendAttendants + 1 : 1)
			return selectendAttendants !== 13 ? selectendAttendants + 1 : 1
		})
	} else {
		return await dbController.getSelectedAttendants()
	}
}