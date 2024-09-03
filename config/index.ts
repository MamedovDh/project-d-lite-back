export const PORT = 4000

export enum API {
	GET_ALL_SCHEDULE = '/getAllShedule',
	GET_CURRENT_SCHEDULE = '/getCurrentSchedule/:day',
}

export const TIME_OUT_REQUEST = 3600000