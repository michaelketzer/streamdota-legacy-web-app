import { ReactElement } from "react";
import DraftEvent from "./DraftEvent";
import { Draft2State } from "./Draft";

interface Props {
    state: Draft2State;
}

export default function DraftState({state}: Props): ReactElement {

    return <div className={'gridTimeline'}>
        <DraftEvent team={'radiant'} event={'ban'} heroId={state.radiant.ban0_id} heroClass={state.radiant.ban0_class} />
        <DraftEvent team={'dire'} event={'ban'} heroId={state.dire.ban0_id} heroClass={state.dire.ban0_class}/>
        <DraftEvent team={'radiant'} event={'ban'} heroId={state.radiant.ban1_id} heroClass={state.radiant.ban1_class}/>
        <DraftEvent team={'dire'} event={'ban'} heroId={state.dire.ban1_id} heroClass={state.dire.ban1_class}/>
        <DraftEvent team={'radiant'} event={'pick'} heroId={state.radiant.pick0_id} heroClass={state.radiant.pick0_class}/>
        <DraftEvent team={'dire'} event={'pick'} heroId={state.dire.pick0_id} heroClass={state.dire.pick0_class}/>
        <DraftEvent team={'radiant'} event={'pick'} heroId={state.radiant.pick1_id} heroClass={state.radiant.pick1_class}/>
        <DraftEvent team={'dire'} event={'pick'} heroId={state.dire.pick1_id} heroClass={state.dire.pick1_class}/>
        <DraftEvent team={'radiant'} event={'ban'} heroId={state.radiant.ban2_id} heroClass={state.radiant.ban2_class}/>
        <DraftEvent team={'dire'} event={'ban'} heroId={state.dire.ban2_id} heroClass={state.dire.ban2_class}/>
        <DraftEvent team={'radiant'} event={'ban'} heroId={state.radiant.ban3_id} heroClass={state.radiant.ban3_class}/>
        <DraftEvent team={'dire'} event={'ban'} heroId={state.dire.ban3_id} heroClass={state.dire.ban3_class}/>
        <DraftEvent team={'radiant'} event={'ban'} heroId={state.radiant.ban4_id} heroClass={state.radiant.ban4_class}/>
        <DraftEvent team={'dire'} event={'ban'} heroId={state.dire.ban4_id} heroClass={state.dire.ban4_class}/>
        <DraftEvent team={'radiant'} event={'pick'} heroId={state.radiant.pick3_id} heroClass={state.radiant.pick3_class}/>
        <DraftEvent team={'dire'} event={'pick'} heroId={state.dire.pick3_id} heroClass={state.dire.pick3_class}/>
        <DraftEvent team={'radiant'} event={'pick'} heroId={state.radiant.pick4_id} heroClass={state.radiant.pick4_class}/>
        <DraftEvent team={'dire'} event={'pick'} heroId={state.dire.pick4_id} heroClass={state.dire.pick4_class}/>
        <DraftEvent team={'radiant'} event={'ban'} heroId={state.radiant.ban5_id} heroClass={state.radiant.ban5_class}/>
        <DraftEvent team={'dire'} event={'ban'} heroId={state.dire.ban5_id} heroClass={state.dire.ban5_class}/>
        <DraftEvent team={'radiant'} event={'pick'} heroId={state.radiant.pick4_id} heroClass={state.radiant.pick4_class}/>
        <DraftEvent team={'dire'} event={'pick'} heroId={state.dire.pick4_id} heroClass={state.dire.pick4_class}/>

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