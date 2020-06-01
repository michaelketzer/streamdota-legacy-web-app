import { Timer } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import {
	LOAD_TIMERS_REQUEST,
	LOAD_TIMERS_SUCCESS,
	LOAD_TIMERS_FAILURE,
	CREATE_TIMER_REQUEST,
	CREATE_TIMER_SUCCESS,
	CREATE_TIMER_FAILURE,
	UPDATE_TIMER_REQUEST,
	UPDATE_TIMER_FAILURE,
	UPDATE_TIMER_SUCCESS,
	DELETE_TIMER_REQUEST,
	DELETE_TIMER_FAILURE,
	DELETE_TIMER_SUCCESS,
} from './Actions';
import pick from 'lodash/pick';
import { timerEntitiesSelector } from '../selector/Timer';

export interface TimerState {
	[x: number]: Timer;
}

interface DeleteTimerAction {
	options: {
		urlParams: {
			timerId: number;
		};
	};
	type: typeof DELETE_TIMER_SUCCESS;
}

export const timer = new schema.Entity(
	'timer',
	{},
	{
		processStrategy: (timer: Timer) => ({
			...timer,
			active: Boolean(timer.active),
		}),
	}
);

const { addReducer, combinedReducer } = createReducer<TimerState>();

addReducer<DeleteTimerAction>(DELETE_TIMER_SUCCESS, (state, { options: { urlParams: { timerId } } }) => {
	const newState = { ...state };
	delete newState[timerId];
	return newState;
});

export const timerReducer = combinedReducer;

export function loadUserTimer(): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/timer/list`,
				schema: [ timer ],
				types: {
					requestType: LOAD_TIMERS_REQUEST,
					successType: LOAD_TIMERS_SUCCESS,
					failureType: LOAD_TIMERS_FAILURE,
				},
			},
		});
	};
}

export function createTimer(data: Omit<Timer, 'id'>): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/timer/create`,
				method: 'post',
				types: {
					requestType: CREATE_TIMER_REQUEST,
					successType: CREATE_TIMER_SUCCESS,
					failureType: CREATE_TIMER_FAILURE,
				},
				options: {
					data,
				},
			},
		});
		await dispatch(loadUserTimer());
	};
}

export function updateTimer(
	timerId: number,
	data: Partial<Pick<Timer, 'active' | 'message' | 'period'>>
): ActionDispatcher<Promise<void>> {
	return async (dispatch, getState) => {
		const userTimer = pick<Timer>(timerEntitiesSelector(getState())[timerId], [ 'active', 'message', 'period' ]);
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/timer/:timerId`,
				method: 'patch',
				types: {
					requestType: UPDATE_TIMER_REQUEST,
					successType: UPDATE_TIMER_SUCCESS,
					failureType: UPDATE_TIMER_FAILURE,
				},
				options: {
					urlParams: {
						timerId,
					},
					data: {
						...userTimer,
						...data,
					},
				},
			},
		});
		await dispatch(loadUserTimer());
	};
}

export function deleteTimer(timerId: number): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/timer/:timerId`,
				method: 'del',
				types: {
					requestType: DELETE_TIMER_REQUEST,
					successType: DELETE_TIMER_SUCCESS,
					failureType: DELETE_TIMER_FAILURE,
				},
				options: {
					urlParams: {
						timerId,
					},
				},
			},
		});
		await dispatch(loadUserTimer());
	};
}
