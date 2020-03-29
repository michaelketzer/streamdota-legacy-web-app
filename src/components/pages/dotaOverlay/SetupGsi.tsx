import { ReactElement, useMemo } from "react";
import { downloadGsiConfig } from "../../../api/request";

export default function SetupGsi({gsiAuth}: {gsiAuth: string}): ReactElement {
    const onLoadGsi = async () => {
        await downloadGsiConfig();
    };
    const hasSetup = useMemo(() => gsiAuth.length > 0, [gsiAuth]);
    
    if(hasSetup) {
        return <div className={'gsiSetup'}>
            <h4>Dota-GSI ist bereits aufgesetzt. Funktioniert irgendwas nicht? Dann versuch die folgenden Steps noch mal:</h4>
            <div className={'listEntry'}>
                <div><b>1.</b> Erstelle dir eine neue Konfigurations Datei:</div>
                <div className={'download'} onClick={onLoadGsi}>Neue Dota-GSI konfiguration erstellen</div>
            </div>
            <div className={'listEntry'}>
                <div><b>2.</b> Ersetze die alte Konfigurationsdatei mit der Neuen unter: <i>steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration\</i></div>
            </div>
            <div className={'listEntry'}>
                <div><b>3.</b> Starte dein Dota neu</div>
            </div>

            <style jsx>{`
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
        <h4>Das Setup für Dota-GSI beinhält nur 3 Schritte:</h4>
        <div className={'listEntry'}>
            <div><b>1.</b> Zum Setup von Dota-GSI lediglich die folgende Datei herunterladen:</div>
            <div className={'download'} onClick={onLoadGsi}>Erstellen der Dota-GSI konfiguration</div>
        </div>
        <div className={'listEntry'}>
            <div><b>2.</b> Platziere die Konfigurationsdatei in dem Steam-Installationsordner unter: <i>steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration\</i></div>
        </div>
        <div className={'listEntry'}>
            <div><b>3.</b> Starte dein Dota neu</div>
        </div>

        <style jsx>{`
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