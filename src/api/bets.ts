import { CurrentBetRound } from "../components/pages/bets/BetContext/state";
import { get } from "./request";
import { updateRound } from "./betSeason";

export async function fetchCurrentBetRound(abortController: AbortController): Promise<CurrentBetRound> {
    return await get<CurrentBetRound>('/bets/current', 'json', {signal: abortController.signal});
}

export async function setWinner(result: string): Promise<void> {
    const {id} = await get<CurrentBetRound>('/bets/current');
    await updateRound(+id, {result, status: 'finished'});
}