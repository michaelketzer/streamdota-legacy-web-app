import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";

export default function Dashboard(): ReactElement {
    return <PageFrame title={'Dashboard'}>
        <div className={'lastNews'}>
            <div>
                <h1>Update - 18.04.2020</h1>
                <p>
                    <div>Die letzte Woche wurde intensiv genutzt um unser User Interface zu überarbeiten.</div>
                    <div>Wir haben einige Dinge entfernt und neu organisiert um euch die Funktionen und Features zu vereinfachen.</div>
                </p>
                <p>
                    Die kommenden Tage wird das neue Design und die Anpassung der Features umgesetzt.
                </p>
                <p>
                    <div>In naher Zukunft sollte ein umfassendes Bot Feature umgesetzt sein und zusätzlich wird das Wettsystem umgesetzt.</div>
                    <div>Ebenfalls wird es bald besondere Tools für die Caster Szene geben. Die Domains "castdota.de" & "castdota.com" wurden dafür schon reserviert.</div>
                </p>
                Grüße,<br />
                Grief-Code

        

                <br />
                <br />
                <br />


                <h1>Willkommen auf streamdota.de</h1>


                <p>Aktuell ist diese Seite noch Work In Progress. Über die nächsten Wochen kommen immer weitere und neuere Features dazu.</p>
                <p>Wenn Ihr Probleme habt oder Bugs findet, bitte so schnell wie möglich an mich (<a href={'https://discordapp.com/channels/@me/148698273899610112/'}>GriefCode#1337</a>) in Discord melden.</p>

                <br />
                <p>Da mich mehrere gefragt haben, unterstützden könnt Ihr mich über <a href={"https://paypal.me/gamershost"} target={'_blank'}>Paypal</a>. Ist aber nicht nötig, ich bin nicht darauf angewiesen und dieses Projekt ist ein reines Hobbyprojekt für mich. Das bedeutet aber nicht, dass es nur den Standard eines Hobbyprojektes hat, es hat für mich den gleichen Stellenwert wie ein bezahltes Projekt.</p>
                <br />

                Grüße,<br />
                Grief-Code
            </div>
            <img src={'/images/heroes/clockwerk_400.png'} alt={'clockwerk'} />
        </div>
        <style jsx>{`
            .lastNews {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }    
        `}</style>
    </PageFrame>
}