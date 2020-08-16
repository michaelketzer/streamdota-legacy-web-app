import { ReactElement } from "react";
import Header from "./Header";
import HeroBanner from "./HeroBanner";
import StatsOverlay from "./StatsOverlay";
import Betting from "./Betting";
import Casting from "./Casting";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Page(): ReactElement {
    return <>
        <Header />

        <HeroBanner />

        <StatsOverlay />

        <Betting />

        <Casting />

        <Contact />

        <Footer />
    </>;
}