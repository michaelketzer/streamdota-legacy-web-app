import { ReactElement } from "react";

export default function Configure(): ReactElement {
    return <div className={'configOptions'}>
        <div className={'col'}>
            <div className={'option'}>
                <h2>Dota GSI (Empfohlen)</h2>
                <br />
                <p className={'desc'}>Dota GSI (Dota Game State Integration) ist eine von Valve bereitgestellte Lösung um lokale Matchdetails mit einem Server zu synchronisieren. Die Kommunikation erfolgt ausschließlich vom Spiel zum Server und geht nicht umgekehrt. Außerdem empfangen wir nur die notwendigen Daten, heißt ob ein Spiel gewonnen oder verloren wurde.</p>
                <p className={'speed'}>Das Update im Overlay erfolgt sobald das Spiel gewonnen bzw. verloren wurde.</p>
                <br />
                <div className={'list'}>Diese Methode bietet sich an, wenn:</div>
                <ul>
                    <li>man seine Profile auf <u>Dotabuff/Stratz privat</u> hat</li>
                    <li>man <u>mehrere Steam Accounts</u> hat</li>
                    <li>ein <u>schnelles Update</u> der Anzeige braucht</li>
                </ul>
            </div>
        </div>
        <div className={'col'}>
            <div className={'option'}>
                <h2>Steam Accounts</h2>
                <br />
                <p className={'desc'}>Steam Accounts nutzt anhand der Steam id die öffentlichen API's von Stratz.com und/oder Dotabuff alle 2 Minuten befragt werden, ob ein Spiel beendet wurde oder nicht. Die Abfrage erfolgt in dem Falle nicht auf unserem Server sondern im Frame selber.</p>
                <p className={'speed'}>Das Update im Overlay erfolgt alle 2 Minuten.</p>
                <br />
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
            .configOptions {
                display: flex;
                margin: -40px;
            }

            .col {
                width: 50%;
                padding: 40px;
            }

            .option {
                border-radius: 8px;
                border: 1px solid #EEE;
                padding: 12px 15px;
            }

            ul {
                padding-left: 25px;
                margin-top: 10px;
            }

            li, .list {
                padding: 5px 0;
                color: #555;
            }

            .desc {
                font-style: italic;
                color: #777;
            }

            .speed {
                color: #999;
            }
        `}</style>
    </div>;
}