import { ReactElement } from "react";
import { Input } from "antd";


interface Props {
    leagueId: number;
    setLeagueId: (leagueId: number) => void;
}

export default function LeagueIdSelector({leagueId, setLeagueId}: Props): ReactElement {

    return <>
        <div><b>Liga ID</b></div>
        <Input value={leagueId} onChange={(e) => setLeagueId(+e.target.value)} />
    </>;

}