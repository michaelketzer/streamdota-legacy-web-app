import { ReactElement } from "react";
import Header from "./Header";
import HeroBanner from "./HeroBanner";
import StatsOverlay from "./StatsOverlay";
import Betting from "./Betting";
import Contact from "./Contact";
import Footer from "./Footer";
import RoshTimer from "./RoshTimer";
import LiveFeed from "./LiveFeed";
import Other from "./Other";
import { TransFN } from "../../../../i18n";

export default function Page(): ReactElement {
    return <>
        <Header />

        <HeroBanner />

        <StatsOverlay />

        <Betting />

        <RoshTimer />

        <LiveFeed />

        <Other />

        <Contact />

        <Footer />
    </>;
}