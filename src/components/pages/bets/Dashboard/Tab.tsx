import { ReactElement, useCallback } from "react";
import { useAbortFetch } from "../../../../hooks/abortFetch";
import { fetchCurrentUser, patchUser } from "../../../../api/user";
import { User } from "../../../../api/@types/User";
import { Switch } from "antd";
import { BetSeason } from "../../../../api/@types/BetSeason";
import { fetchUserBetSeasons } from "../../../../api/betSeason";
import FirstTimeSetup from "../FirstTimeSetup";
import Dashboard from "./Dashboard";


export default function Tab(): ReactElement {
    const [user, reload] = useAbortFetch<User>(fetchCurrentUser);
    const [seasons] = useAbortFetch<BetSeason[]>(fetchUserBetSeasons);

    const onToggleBets = useCallback(async () => {
        await patchUser({useBets: (user.useBets === 1 ? 0 : 1)});
        await reload();
    }, [user]);

    return <>
        <div className={'enableBets'} onClick={onToggleBets}>
            <Switch checked={Boolean(user && user.useBets)} />
            <div className={'label'}>Wettsystem aktivieren</div>
        </div>

        {user && user.useBets === 1 && seasons && seasons.length === 0 && <FirstTimeSetup />}
        {user && user.useBets === 1 && seasons && seasons.length > 0 && <Dashboard />}

        <style jsx>{`
            .enableBets {
                display: flex;
                align-items: center;
                cursor: pointer;
            }    

            .label {
                margin-left: 10px;
            }
        `}</style>
    </>;
}