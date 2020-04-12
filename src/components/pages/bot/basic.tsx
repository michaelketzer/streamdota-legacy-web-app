import { ReactElement, useCallback } from "react";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { fetchBotConfig, patchBotConfig, fetchCurrentUser } from "../../../api/user";
import { BotData } from "../../../api/@types/User";
import Loader from "../../Loader";
import { Checkbox, Input, Alert } from "antd";
import { UserOutlined } from '@ant-design/icons';
import ContextProvider from "../../context/websocket/context";
import { initialState, reducer } from "../../context/websocket/state";
import Logs from "./Logs";

export default function Basic(): ReactElement {
    const [config] = useAbortFetch(fetchBotConfig);
    const [user] = useAbortFetch(fetchCurrentUser);
    const patch = useCallback((data: Partial<BotData>) => patchBotConfig(data), []);

    if(config) {
        return <div className={'wrapper'}>
            <div>StreamDota Bot ist ein Chatbot welcher dir Unterhaltung, Informationen zum aktuellen Dota2 Spiel und Interaktionen mit dem Chat bietet.</div>

            <br />
            <Checkbox defaultChecked={config.useBot} onChange={(e) => patch({useBot: e.target.checked})}>StreamDota Bot aktivieren</Checkbox>
            <br />
            <br />
            <Alert message={<>
                Vergess nicht den Bot zum Mod zu machen, das verhindert Probleme mit dem Chat. Einfach "<span style={{fontFamily: 'monospace'}}>/mod streamdotade</span>" im Chat schreiben!
            </>} type={'warning'} />
            <br />
            <Alert message={<>
                Du möchtest deinen eigenen Namen für den Bot haben? Dann schreib mich einfach bei Discord an! (<a href={'https://discordapp.com/channels/@me/148698273899610112/'}>GriefCode#1337</a>)
            </>} type={'info'} />

            {user && <ContextProvider initialState={initialState} reducer={reducer} url={'wss://api.streamdota.de/user/bot/live/' + user.frameApiKey}>
                <Logs />
            </ContextProvider>}

            <style jsx>{`
                .wrapper {
                    max-width: 800px;
                }

                .inputGrid {
                    display: grid;
                    align-items: center;
                    grid-template-columns: 1fr 1fr;
                    grid-column-gap: 20px;
                }    
            `}</style>
        </div>;
    }

    return <Loader />;
}