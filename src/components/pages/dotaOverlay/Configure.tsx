import { ReactElement } from "react";
import { OverlayMethods } from "./Configuration";

function CheckBox({checked}: {checked: boolean}): ReactElement {
    return <div className={'checkbox'}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill={checked ? '#F15025' : '#CCC'} d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
        </svg>

        <style jsx>{`
            .checkbox {
                width: 40px;
                margin-right: 10px;
                flex-shrink: 0;
                margin-top: -5px;
            }    
        `}</style>
    </div>;
}

interface Props {
    method: OverlayMethods;
    setMethod: (method: OverlayMethods) => void;
}

export default function Configure({method, setMethod}: Props): ReactElement {
    return <div className={'methodsContainer'}>

        <div className={'method'} onClick={() => setMethod(OverlayMethods.dotaGsi)}>
            <CheckBox checked={method === OverlayMethods.dotaGsi} />
            <div className={'option'}>
                <h2>Dota GSI (Empfohlen)</h2>
                <br />
                <p className={'desc'}>Dota GSI (Dota Game State Integration) ist eine von Valve bereitgestellte Lösung um lokale Matchdetails mit einem Server zu synchronisieren. Die Kommunikation erfolgt ausschließlich vom Spiel zum Server und geht nicht umgekehrt. Wir empfangen nur die notwendigen Daten, heißt ob ein Spiel gewonnen oder verloren wurde.</p>
                <p className={'subDesc'}>Es gibt leider keine offizielle Dota 2 Dokumentation, weitere Details können aber in der CS:GO Dokumentation nachgelesen werden: <a href={'https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration'}>valvesoftware.com</a></p>
                <br />
                <div className={'list'}>Diese Methode bietet sich an, wenn:</div>
                <ul>
                    <li>man seine Profile auf <u>Dotabuff/Stratz privat</u> hat</li>
                    <li>man <u>mehrere Steam Accounts</u> hat</li>
                    <li>ein <u>schnelles Update</u> der Anzeige braucht</li>
                </ul>
            </div>
        </div>

        <div className={'method'} onClick={() => setMethod(OverlayMethods.steam)}>
            <CheckBox checked={method === OverlayMethods.steam} />
            <div className={'option'}>
                <h2>Steam Accounts</h2>
                <br />
                <p className={'desc'}>Steam Accounts nutzt anhand der Steam id die öffentlichen API's von Stratz.com und/oder Dotabuff alle 2 Minuten befragt werden, ob ein Spiel beendet wurde oder nicht. Die Abfrage erfolgt in dem Falle nicht auf unserem Server sondern im Frame selber.</p>
                <p className={'speed'}>Das Update im Overlay erfolgt alle 2 Minuten.</p>
                <br />
                <div className={'list'}>Diese Methode bietet sich an, wenn:</div>
                <ul>
                    <li>man seine Profile auf <u>Dotabuff/Stratz öffentlich</u> hat</li>
                    <li>man nur <u>einen Steam Account</u> hat</li>
                    <li>die <u>Geschwindigkeit</u> des Updates <u>egal</u> ist</li>
                </ul>
            </div>
        </div>

        <style jsx>{`
            .methodsContainer {
                padding: 0 20px;
            }

            .method {
                margin: 20px 0;
                padding: 15px;
                display: flex;
                border: 1px solid #CCC;
                border-radius: 8px;
                cursor: pointer;
            }

            .desc, .list, li {
                font-size: 14px;
            }
            .subDesc {
                font-size: 13px;
            }

            .list {
                margin-bottom: 5px;
            }

            ul {
                padding-left: 20px;
            }
        `}</style>
    </div>;
}