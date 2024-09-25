/** outside config */

export const CONFIG = {
	IsDev : true,
	ForcedUpdate : true
}

/** inside config */

export enum PORT {
	SCHEDSULE = 4000,
	ATTENDANTS = 4001
}

export enum API {
	GET_ALL_SCHEDULE = '/getAllSchedule',
	GET_CURRENT_SCHEDULE = '/getCurrentSchedule/:day',
	GET_TODAY_SCHEDULE = '/getTodaySchedule',
	GET_ATTENDANTS_TODAY = '/attendants-today',
	GET_ATTENDANTS_TOMMOROW = '/attendants-tomorrow'
}

export const TIME_OUT_REQUEST = 3600000