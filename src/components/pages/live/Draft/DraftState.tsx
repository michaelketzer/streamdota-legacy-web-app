import { ReactElement } from "react";
import DraftEvent from "./DraftEvent";
import { DraftState as DraftData } from "./Draft";

interface Props {
    state: DraftData;
}

export default function Draftstate({state}: Props): ReactElement {
    return <div className={'gridTimeline'}>
        <DraftEvent team={'dire'} event={'ban'} heroId={state?.team3?.ban0_id} heroClass={state?.team3?.ban0_class} />
        <DraftEvent team={'radiant'} event={'ban'} heroId={state?.team2?.ban0_id} heroClass={state?.team2?.ban0_class}/>
        <DraftEvent team={'dire'} event={'ban'} heroId={state?.team3?.ban1_id} heroClass={state?.team3?.ban1_class}/>
        <DraftEvent team={'radiant'} event={'ban'} heroId={state?.team2?.ban1_id} heroClass={state?.team2?.ban1_class}/>
        <DraftEvent team={'dire'} event={'pick'} heroId={state?.team3?.pick0_id} heroClass={state?.team3?.pick0_class}/>
        <DraftEvent team={'radiant'} event={'pick'} heroId={state?.team2?.pick0_id} heroClass={state?.team2?.pick0_class}/>
        <DraftEvent team={'dire'} event={'pick'} heroId={state?.team3?.pick1_id} heroClass={state?.team3?.pick1_class}/>
        <DraftEvent team={'radiant'} event={'pick'} heroId={state?.team2?.pick1_id} heroClass={state?.team2?.pick1_class}/>
        <DraftEvent team={'dire'} event={'ban'} heroId={state?.team3?.ban2_id} heroClass={state?.team3?.ban2_class}/>
        <DraftEvent team={'radiant'} event={'ban'} heroId={state?.team2?.ban2_id} heroClass={state?.team2?.ban2_class}/>
        <DraftEvent team={'dire'} event={'ban'} heroId={state?.team3?.ban3_id} heroClass={state?.team3?.ban3_class}/>
        <DraftEvent team={'radiant'} event={'ban'} heroId={state?.team2?.ban3_id} heroClass={state?.team2?.ban3_class}/>
        <DraftEvent team={'dire'} event={'ban'} heroId={state?.team3?.ban4_id} heroClass={state?.team3?.ban4_class}/>
        <DraftEvent team={'radiant'} event={'ban'} heroId={state?.team2?.ban4_id} heroClass={state?.team2?.ban4_class}/>
        <DraftEvent team={'radiant'} event={'pick'} heroId={state?.team2?.pick2_id} heroClass={state?.team2?.pick2_class}/>
        <DraftEvent team={'dire'} event={'pick'} heroId={state?.team3?.pick2_id} heroClass={state?.team3?.pick2_class}/>
        <DraftEvent team={'radiant'} event={'pick'} heroId={state?.team2?.pick3_id} heroClass={state?.team2?.pick3_class}/>
        <DraftEvent team={'dire'} event={'pick'} heroId={state?.team3?.pick3_id} heroClass={state?.team3?.pick3_class}/>
        <DraftEvent team={'dire'} event={'ban'} heroId={state?.team3?.ban5_id} heroClass={state?.team3?.ban5_class}/>
        <DraftEvent team={'radiant'} event={'ban'} heroId={state?.team2?.ban5_id} heroClass={state?.team2?.ban5_class}/>
        <DraftEvent team={'dire'} event={'pick'} heroId={state?.team3?.pick4_id} heroClass={state?.team3?.pick4_class}/>
        <DraftEvent team={'radiant'} event={'pick'} heroId={state?.team2?.pick4_id} heroClass={state?.team2?.pick4_class}/>

        <style jsx>{`
            .gridTimeline {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 30px 0;
                height: 100px;
            }
        `}</style>
    </div>;
}