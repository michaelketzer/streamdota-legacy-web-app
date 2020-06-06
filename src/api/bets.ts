import { CurrentBetRound } from "../components/pages/bets/BetContext/state";
import { get } from "./request";

export async function fetchCurrentBetRound(abortController: AbortController): Promise<CurrentBetRound> {
    return await get<CurrentBetRound>('/bets/current', 'json', {signal: abortController.signal});
}

export async function setWinner(result: string): Promise<void> {
    const {id} = await get<CurrentBetRound>('/bets/current');
    console.log('TODO: implement setWinner')
}