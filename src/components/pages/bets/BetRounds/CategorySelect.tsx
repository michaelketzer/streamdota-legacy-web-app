import { ReactElement } from "react";
import { fetchUserBetSeasons } from "../../../../api/betSeason";
import { useAbortFetch } from "../../../../hooks/abortFetch";
import { BetSeason } from "../../../../api/@types/BetSeason";
import Loader from "../../../Loader";
import { Typography, Select } from "antd";

interface Props {
    season: number;
    setSeason: (season: number) => void;
}

export default function CategorySelect({season, setSeason}: Props): ReactElement {
    const [seasons] = useAbortFetch<BetSeason[]>(fetchUserBetSeasons);
    if(seasons) {
        return <>
            <Typography.Text strong>Kategorie</Typography.Text><br />
            <Select defaultValue={season} onChange={setSeason} style={{width: '200px'}}>
                {seasons.map(({id, name}) => <Select.Option key={id} value={id}>{name}</Select.Option>)}
            </Select>
        </>;
    }

    return <Loader />;
}