import { ReactElement, useMemo } from "react";
import { downloadGsiConfig } from "../../../api/request";
import { ExclamationCircleOutlined, DownloadOutlined, WarningOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useStateValue } from "../../context/websocket/context";

interface Props {
    gsiAuth: string;
    gsiConnected: number;
    reload: () => void;
}
export default function SetupGsi({gsiAuth, gsiConnected, reload}: Props): ReactElement {
    const [{messages}] = useStateValue();

    const onLoadGsi = async () => {
        await downloadGsiConfig();
        await reload();
    };
    const hasSetup = useMemo(() => gsiAuth.length > 0, [gsiAuth]);
    
    if(hasSetup) {
        return <div className={'gsiSetup'}>
            {gsiAuth.length > 0 && (gsiConnected === 0 || messages.length === 0) && <>
                <div className={'status'}>
                    <WarningOutlined style={{fontSize: '22px'}} />
                    <div className={'label'}>Dota GSI ist konfiguriert, hat aber keine Verbindung</div>
                </div>
                <p>Du hast Dota GSI aufgesetzt und bisher wurde noch keine Verbindung aufgebaut, sobald eine eingehende Verbindung vorhanden ist ändert sich der Status. Für eine Verbindung musst du lediglich ein Spiel spielen.</p>
                <p>Du glaubst beim Setup ist was schief gelaufen? Dann kannst du es mit folgenden Schritten erneut versuchen:</p>
                <div className={'listEntry'}>
                    <div className={'createLabel'}><b>1.</b> Erstelle dir eine neue Dota GSI Konfigurationsdatei:</div>
                    <Button type={'primary'} onClick={onLoadGsi} icon={<DownloadOutlined />}>Neue Dota-GSI Konfiguration erstellen</Button>
                </div>
                <div className={'listEntry'}>
                    <div><b>2.</b> Platziere die Konfigurationsdatei in deinem Steamordner unter: <i>steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration\</i></div>
                </div>
                <div className={'listEntry'}>
                    <div><b>3.</b> Starte dein Dota neu</div>
                </div>
            </>}

            {gsiAuth.length > 0 && (gsiConnected === 1 || messages.length > 0) && <>
                <div className={'status success'}>
                    <CheckCircleOutlined style={{fontSize: '22px'}} />
                    <div className={'label'}>Dota GSI ist konfiguriert</div>
                </div>
            </>}

            <style jsx>{`
                .status {
                    display: flex;
                    align-items: center;
                    color: #FFA940;
                    font-size: 16px;
                    font-weight: 500;
                    margin-bottom: 25px;
                }

                .success {
                    color: #389E0D;
                }

                .label {
                    margin-left: 15px;
                }

                .createLabel {
                    margin-right: 15px;
                }

                .gsiSetup {
                    padding: 20px;
                }    

                .listEntry {
                    display: flex;
                    align-items: center;
                    margin-top: 5px;
                }

                .download {
                    border: 1px solid #CCC;
                    border-radius: 4px;
                    cursor: pointer;
                    padding: 5px 10px;
                    margin: 0 15px;
                    transition: background-color 120ms ease-in-out;
                    font-size: 12px;
                    text-transform: uppercase;
                }

                .download:hover {
                    background-color: rgba(0,0,0,.05);
                }
            `}</style>
        </div>
    }
    return <div className={'gsiSetup'}>
        <div className={'status'}>
            <ExclamationCircleOutlined style={{fontSize: '22px'}} />
            <div className={'label'}>Dota GSI ist noch nicht aufgesetzt</div>
        </div>

        <h4>Führe folgende Schritte aus um Dota GSI aufzusetzen:</h4>
        <div className={'listEntry'}>
            <div className={'createLabel'}><b>1.</b> Erstelle dir eine neue Dota GSI Konfigurationsdatei:</div>
            <Button type={'primary'} onClick={onLoadGsi} icon={<DownloadOutlined />}>Erstellen der Dota-GSI konfiguration</Button>
        </div>
        <div className={'listEntry'}>
            <div><b>2.</b> Platziere die Konfigurationsdatei in deinem Steamordner unter: <i>steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration\</i></div>
        </div>
        <div className={'listEntry'}>
            <div><b>3.</b> Starte dein Dota neu</div>
        </div>

        <style jsx>{`
            .status {
                display: flex;
                align-items: center;
                color: #CF1322;
                font-size: 16px;
                font-weight: 500;
                margin-bottom: 25px;
            }

            .label {
                margin-left: 15px;
            }

            .createLabel {
                margin-right: 15px;
            }

            .gsiSetup {
                padding: 20px;
            }    

            .listEntry {
                display: flex;
                align-items: center;
                margin-top: 5px;
            }

            .download {
                border: 1px solid #CCC;
                border-radius: 4px;
                cursor: pointer;
                padding: 5px 10px;
                margin: 0 15px;
                transition: background-color 120ms ease-in-out;
                font-size: 12px;
                text-transform: uppercase;
            }

            .download:hover {
                background-color: rgba(0,0,0,.05);
            }
        `}</style>
    </div>;
}