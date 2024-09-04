export const PORT = 4000

export enum API {
	GET_ALL_SCHEDULE = '/getAllShedule',
	GET_CURRENT_SCHEDULE = '/getCurrentSchedule/:day',
	GET_ATTENDANTS = '/attendants'
}

export const TIME_OUT_REQUEST = 3600000