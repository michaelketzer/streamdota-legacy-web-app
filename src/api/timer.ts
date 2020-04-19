import { get, patch, create, del } from "./request";
import { Timer } from "./@types/Timer";

export async function getTimers(abortController: AbortController): Promise<Timer[]> {
    return await get<Timer[]>('/timer/list', 'json', {signal: abortController.signal});
}

export async function createTimer(active: boolean, period: number, message: string): Promise<Timer[]> {
    return await create('/timer/create', {active, period, message});
}

export async function updateTimer(id: number, active: boolean, period: number, message: string): Promise<Timer[]> {
    return await patch('/timer/' + id, {active, period, message});
}

export async function deleteTimer(id: number): Promise<Timer[]> {
    return await del('/timer/' + id);
}