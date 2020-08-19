import { ReactElement, useState } from "react";
import PageFrame from "../components/PageFrame";
import ContextProvider from "../components/context/websocket/context";
import { initialState, reducer } from "../components/context/websocket/state";
import { useCurrentUser } from "../hooks/currentUser";
import PageHeader from "../components/PageHeader";
import { Alert } from "antd";
import LeagueIdSelector from "../components/pages/live/LeagueIdSelector";
import getWebsocketUrl from "../modules/Router";
import LiveFeed from "../components/pages/live/LiveFeed";

export default function Live(): ReactElement {
    const user = useCurrentUser();
    const [leagueId, setLeagueId] = useState(0);
    
    return <PageFrame title={'Live Feed'}>
        <PageHeader 
            title={'Live Feed'} 
            description={'Zeigt Daten zu aktuellen in-game Ereignissen an, wie Picks und Bans, mit weitere Daten der aktuellen Liga'} />

        <Alert message={
            <>
                Die Liga ID ist die Liga von der die Daten zu Picks & Bans angezeigt wird. Dazu benutzen wir die stratz API. Die ID musst du leider selbst ermitteln unter folgendem Link: <span className={'highlight'}>https://stratz.com/leagues</span>. Einfach auf die entsprechende Liga klicken und aus der Browser URL die letzte Zahl kopieren, wie zB hier: https://stratz.com/leagues/<span className={'highlight'}>11629</span>
            </>
        } type="info" />

        <div className={'leagueId'}>
            <LeagueIdSelector leagueId={leagueId} setLeagueId={setLeagueId} />
        </div>

        {user && <ContextProvider initialState={initialState} reducer={reducer} url={getWebsocketUrl() + '/dota-gsi/live/' + user.frameApiKey}>
            <LiveFeed apiKey={user.frameApiKey} leagueId={leagueId} />
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