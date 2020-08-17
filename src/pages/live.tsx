import { ReactElement, useState } from "react";
import PageFrame from "../components/PageFrame";
import ContextProvider from "../components/context/websocket/context";
import { initialState, reducer } from "../components/context/websocket/state";
import { useCurrentUser } from "../hooks/currentUser";
import PageHeader from "../components/PageHeader";
import { Alert } from "antd";
import LeagueIdSelector from "../components/pages/live/LeagueIdSelector";

export default function Live(): ReactElement {
    const user = useCurrentUser();
    const [leagueId, setLeagueId] = useState(12229);
    
    return <PageFrame title={'Live Feed'}>
        <PageHeader 
            title={'Live Feed'} 
            description={'Gathers data about current ingame actions, such as picks, bans & items and allows casters to display detailed stats on these actions.'} />

        <Alert message={
            <>
                Source league id should be the id of the league where the data is gathered from. The stratz API is used to gain these details. You can search for the revelant league here: <span className={'highlight'}>https://stratz.com/leagues</span>. By clicking on the league you will find the id in the url, like here: https://stratz.com/leagues/<span className={'highlight'}>11629</span>
            </>
        } type="info" />

        <div className={'leagueId'}>
            <LeagueIdSelector leagueId={leagueId} setLeagueId={setLeagueId} />
        </div>

        {user && <ContextProvider initialState={initialState} reducer={reducer} url={'wss://api.streamdota.de/dota-gsi/logs/' + user.frameApiKey}>
            
        </ContextProvider>}

        <style jsx>{`
            .highlight {
                color: #1890FF;
            }

            .leagueId {
                margin: 30px 0;
                display: inline-block;
            }
        `}</style>
    </PageFrame>
}