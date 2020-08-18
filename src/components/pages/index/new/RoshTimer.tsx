import { ReactElement } from "react";
import Frame from "./Frame";
import Title from "./Title";
import SubTitle from "./SubTitle";
import Row from "./Row";
import Sub from "./Sub";
import ContentTitle from "./ContentTitle";
import Highlight from "./Highlight";


export default function RoshTimer(): ReactElement {
    return <Frame>
        <Title>Casting tool - roshan timer</Title>
        <SubTitle>Enrich your casting stream with a roshan timer to let your viewers now the timings.</SubTitle>
        <Row>
            <Sub>
                <ContentTitle>Features</ContentTitle>
                <ul>
                    <li><Highlight>Aegis countdown</Highlight> see the expiration time for aegis</li>
                    <li><Highlight>Base countdown</Highlight> see the remaining base countdown after the aegis expired or was used</li>
                    <li><Highlight>Variable countdown</Highlight> see the variable time after the base time</li>
                    <li><Highlight>Smart</Highlight> the overlay will hide when roshan is alive</li>
                </ul>
            </Sub>
            <img src={'/images/preview/roshtimer_preview.jpg'} />
        </Row>
    </Frame>;
}