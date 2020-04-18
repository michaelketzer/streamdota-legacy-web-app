import { Command } from "./@types/Command";
import { get, patch, create, del } from "./request";

export async function getCommands(abortController: AbortController): Promise<Command[]> {
    return await get<Command[]>('/user/commands', 'json', {signal: abortController.signal});
}

export async function createCommand(command: string, message: string): Promise<Command[]> {
    return await create('/user/command', {command, message});
}

export async function updateCommand(id: number, active: boolean, command: string, message: string): Promise<Command[]> {
    return await patch('/user/command/' + id, {active, command, message});
}

export async function deleteCommand(id: number): Promise<Command[]> {
    return await del('/user/command/' + id);
}