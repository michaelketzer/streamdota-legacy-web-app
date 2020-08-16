import { ReactElement } from "react";
import Frame from "./Frame";
import Title from "./Title";
import Sub from "./Sub";
import SubTitle from "./SubTitle";
import ContentTitle from "./ContentTitle";
import Row from "./Row";
import Highlight from "./Highlight";


export default function StatsOverlay(): ReactElement {
    return <Frame id={'wl'}>
        <Title>Your Win/Loss Stats</Title>
        <SubTitle>Let your viewers know your daily dota progress by a fully customizable, automatic and smart win/loss-overlay!</SubTitle>
        <Row>
            <Sub>
                <ContentTitle>Features</ContentTitle>
                <ul>
                    <li><Highlight>Automatic</Highlight> you do not need to manually adjust any counter</li>
                    <li><Highlight>Instantly</Highlight> the stats will update within seconds after a win</li>
                    <li><Highlight>Customizable</Highlight> match the design your stream szene with ease</li>
                    <li><Highlight>Smart</Highlight> the overlay will hide if you close Dota</li>
                </ul>
            </Sub>

            <img src={'/images/preview/dotaWL.png'} />
        </Row>

        <style jsx>{`
            img {
                max-width: 400px;
                width: 100%;
                margin: 0 auto;
            }
        `}</style>
    </Frame>;
}