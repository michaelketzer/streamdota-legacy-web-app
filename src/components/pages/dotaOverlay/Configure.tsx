import { ReactElement } from "react";
import { OverlayMethods } from "./Configuration";
import { Typography, Radio } from "antd";

interface Props {
    method: OverlayMethods;
    setMethod: (method: OverlayMethods) => void;
}

export default function Configure({method, setMethod}: Props): ReactElement {
    return <>
        <Typography.Title level={3}><span className={'select'}>Wähle aus zwei technischen Möglichkeiten:</span></Typography.Title>

        <Radio.Group size={'large'} value={method}>
            <div className={'method'} onClick={() => setMethod(OverlayMethods.dotaGsi)}>
                <div className={'radio'}>
                    <Radio value={OverlayMethods.dotaGsi} />
                </div>
                <div>
                    <Typography.Title level={3}>Dota GSI (Empfohlen)</Typography.Title>
                    <p className={'desc'}>Dota GSI (Dota Game State Integration) ist eine von Valve bereitgestellte Lösung um lokale Matchdetails mit einem Server zu synchronisieren. Die Kommunikation erfolgt ausschließlich vom Spiel zum Server und geht nicht umgekehrt. Wir empfangen nur die notwendigen Daten, heißt ob ein Spiel gewonnen oder verloren wurde.</p>
                    <p className={'subDesc'}>Es gibt leider keine offizielle Dota 2 Dokumentation, weitere Details können aber in der CS:GO Dokumentation nachgelesen werden: <a href={'https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration'}>valvesoftware.com</a></p>
                    <div className={'list'}>Diese Möglichkeit bietet sich an, wenn:</div>
                    <div className={'item'}>
                        <img src={'/images/angleRight.svg'} alt={'angleRight'} />
                        <div className={'label'}>du deine Profile auf <b>Dotabuff/Stratz privat</b> hat</div>
                    </div>
                    <div className={'item'}>
                        <img src={'/images/angleRight.svg'} alt={'angleRight'} />
                        <div className={'label'}>du <b>mehrere Steam Accounts</b> hat</div>
                    </div>
                    <div className={'item'}>
                        <img src={'/images/angleRight.svg'} alt={'angleRight'} />
                        <div className={'label'}>du ein <b>schnelles Update</b> der Anzeige braucht</div>
                    </div>
                </div>
            </div>

            <div className={'method disabled'}>
                <div className={'radio'}>
                    <Radio value={OverlayMethods.steam} disabled />
                </div>
                <div>
                    <Typography.Title level={3}>Steam Accounts (noch nicht verfügbar)</Typography.Title>
                    <p className={'desc'}>Steam Accounts nutzt anhand der Steam id die öffentlichen API's von Stratz.com und/oder Dotabuff alle 2 Minuten befragt werden, ob ein Spiel beendet wurde oder nicht. Die Abfrage erfolgt in dem Falle nicht auf unserem Server sondern im Frame selber.</p>
                    <div className={'list'}>Diese Möglichkeit bietet sich an, wenn:</div>
                    <div className={'item'}>
                        <img src={'/images/angleRight.svg'} alt={'angleRight'} />
                        <div className={'label'}>du deine Profile auf <b>Dotabuff/Stratz öffentlich</b> hat</div>
                    </div>
                    <div className={'item'}>
                        <img src={'/images/angleRight.svg'} alt={'angleRight'} />
                        <div className={'label'}>du <b>nur einen Steam Account</b> hat</div>
                    </div>
                    <div className={'item'}>
                        <img src={'/images/angleRight.svg'} alt={'angleRight'} />
                        <div className={'label'}>dir die <b>Geschwindigkeit</b> des <b>Updates egal</b> ist</div>
                    </div>
                </div>
            </div>
        </Radio.Group>

        <style jsx>{`
            .select {
                color: #006D75;
            }

            .method {
                padding: 20px;
                background-color: #E8E8E8;
                border-radius: 8px;
                margin-bottom: 20px;
                display: flex;
                align-items: flex-start;
                color: #595959;
                cursor: pointer;
            }

            .disabled {
                cursor: default;
                background-color: #F5F5F5;
                color: #8C8C8C;
            }

            .disabled :global(h3) {
                color: #8C8C8C;
            }

            .desc {
                font-size: 16px;
                margin-bottom: 14px;
            }

            .subDesc {
                font-size: 14px;
                margin-bottom: 14px;
            }

            .list {
                font-size: 16px;
            }

            .radio {
                margin-top: 5px;
                margin-right: 5px;
            }

            .item {
                display: flex;
                align-items: center;
                margin-left: -2px;
            }

            .label {
                font-size: 14px;
                margin-left: 15px;
            }
        `}</style>
    </>;
}