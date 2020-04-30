import { ReactElement } from "react";
import { useAbortFetch } from "../../../../hooks/abortFetch";
import { fetchCurrentUser, patchUser } from "../../../../api/user";
import { User } from "../../../../api/@types/User";
import { Select, Typography } from "antd";
import Loader from "../../../Loader";
import { BetSeason } from "../../../../api/@types/BetSeason";
import { fetchUserBetSeasons } from "../../../../api/betSeason";

export default function CurrentCategory(): ReactElement {
    const [user] = useAbortFetch<User>(fetchCurrentUser);
    const [seasons] = useAbortFetch<BetSeason[]>(fetchUserBetSeasons);

    if(user && seasons) {
        return <>
            <Typography.Text strong>Aktuelle Kategorie</Typography.Text><br />
            <Select defaultValue={user.betSeasonId} style={{width: '200px'}} onChange={(betSeasonId) => patchUser({betSeasonId})}>
                {seasons.map(({id, name}) => <Select.Option key={id} value={id}>{name}</Select.Option>)}
            </Select>
        </>;
    }

    return <Loader />;
}