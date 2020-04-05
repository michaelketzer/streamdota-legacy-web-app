import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";

export default function Dashboard(): ReactElement {
    return <PageFrame title={'Dashboard'}>
        <h1>Willkommen auf streamdota.de</h1>


        <p>Aktuell ist diese Seite noch Work In Progress. Über die nächsten Wochen kommen immer weitere und neuere Features dazu.</p>
        <p>Wenn Ihr Probleme habt oder Bugs findet, bitte so schnell wie möglich an mich (<a href={'https://discordapp.com/channels/@me/148698273899610112/'}>GriefCode#1337</a>) in discord melden.</p>

        <br />

        Grüße,<br />
        Grief-Code
    </PageFrame>
}