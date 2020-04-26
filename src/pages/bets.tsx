import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import PageHeader from "../components/PageHeader";
import dynamic from "next/dynamic";

const BetTabs = dynamic(
    () => import('../components/pages/bets/BetTabs'),
    { ssr: false }
);

export default function Bets(): ReactElement {
    return <PageFrame title={'Wetten'}>
        <PageHeader title={'Wettsystem'} 
                    description={'Das Wettsystem erlaubt deinen Zuschauern auf ein Team oder dich bzw. gegen dich zu setzen wenn ein Spiel beginnt.'} />

        <BetTabs />
    </PageFrame>
}