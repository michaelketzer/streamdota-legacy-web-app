import { Font } from "./@types/Font";
import { get } from "./request";

export async function fetchFonts(abortController: AbortController): Promise<Font[]> {
    return await get<Font[]>('/googleFonts', 'json', {signal: abortController.signal});
}