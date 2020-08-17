import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import ContextProvider from "../components/context/websocket/context";
import { initialState, reducer } from "../components/context/websocket/state";
import { useCurrentUser } from "../hooks/currentUser";
import SetupGsi from "../components/pages/dashboard/SetupGsi";
import { Typography } from "antd";

export default function Dashboard(): ReactElement {
    const user = useCurrentUser();
    
    return <PageFrame title={'Dashboard'}>
        <div className={'lastNews'}>

            <Typography.Title level={3}>Dota GSI</Typography.Title>
            <p className={'desc'}>Dota GSI (Dota Game State Integration) ist eine von Valve bereitgestellte Lösung um lokale Matchdetails mit einem Server zu synchronisieren. Die Kommunikation erfolgt ausschließlich vom Spiel zum Server und geht nicht umgekehrt. Wir empfangen nur die notwendigen Daten.</p>

            <p className={'subDesc'}>Es gibt leider keine offizielle Dota 2 Dokumentation, weitere Details können aber in der CS:GO Dokumentation nachgelesen werden: <a href={'https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration'}>valvesoftware.com</a></p>
                    
            <br />
            <p className={'important'}>Dota GSI <b>muss</b> aufgesetzt werden, da sonst alle Tools & Lösungen dieser Wesbite <b>nicht funktionieren</b>.</p>
            {user && <ContextProvider initialState={initialState} reducer={reducer} url={'wss://api.streamdota.de/dota-gsi/logs/' + user.frameApiKey}>
                <SetupGsi gsiAuth={user.gsiAuth} gsiConnected={user.gsiConnected} />
            </ContextProvider>}
        </div>

        <style jsx>{`
            .important {
                font-size: 16px;
            }
        `}</style>
    </PageFrame>
}