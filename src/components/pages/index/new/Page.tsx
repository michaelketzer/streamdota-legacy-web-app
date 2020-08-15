import { ReactElement } from "react";
import Header from "./Header";
import HeroBanner from "./HeroBanner";

export default function Page(): ReactElement {
    return <>
        <Header />

        <HeroBanner />
    </>;
}