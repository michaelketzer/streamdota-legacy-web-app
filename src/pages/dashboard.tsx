import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";

export default function Dashboard(): ReactElement {
    return <PageFrame title={'Dashboard'}>
        <h1>Willkommen auf streamdota.de</h1>


        <p>Aktuell ist diese Seite noch Work In Progress. Über die nächsten Wochen kommen immer weitere und neuere Features dazu.</p>
        <p>Wenn Ihr Probleme habt oder Bugs findet, bitte so schnell wie möglich an mich (<a href={'https://discordapp.com/channels/@me/148698273899610112/'}>GriefCode#1337</a>) in discord melden.</p>

        <br />
        <p>Da mich mehrere gefragt haben, unterstützden könnt Ihr mich über <a href={"https://paypal.me/gamershost"} target={'_blank'}>Paypal</a>. Ist aber nicht nötig, ich bin nicht darauf angewiesen und dieses Projekt ist ein reines Hobbyprojekt für mich. Das bedeutet aber nicht, dass es nur den Standard eines Hobbyprojektes hat, es hat für mich den gleichen Stellenwert wie ein bezahltes Projekt.</p>
        <br />

        Grüße,<br />
        Grief-Code
    </PageFrame>
}