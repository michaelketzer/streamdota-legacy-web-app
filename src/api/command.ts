import { Command } from "./@types/Command";
import { get, patch, create, del } from "./request";

export async function getCommands(abortController: AbortController): Promise<Command[]> {
    return await get<Command[]>('/command/list', 'json', {signal: abortController.signal});
}

export async function createCommand(active: boolean, command: string, message: string): Promise<Command[]> {
    return await create('/command/create', {active, command, message});
}

export async function updateCommand(id: number, active: boolean, command: string, message: string): Promise<Command[]> {
    return await patch('/command/' + id, {active, command, message});
}

export async function deleteCommand(id: number): Promise<Command[]> {
    return await del('/command/' + id);
}