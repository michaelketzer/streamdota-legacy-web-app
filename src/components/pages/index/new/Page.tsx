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

        <style jsx global>{`
            body {
                overflow-x: hidden;
                overflow-y: scroll;
                max-width: 100%;
                width: 100%;
            }
        `}</style>
    </>;
}