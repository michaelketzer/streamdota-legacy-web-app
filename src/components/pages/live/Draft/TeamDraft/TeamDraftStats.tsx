import { ReactElement } from "react";
import { TeamDraftState } from "../Draft";
import DraftEntry from "./DraftEntry";
import TeamHeader from "./TeamHeader";

interface Props {
    state: TeamDraftState;
    bonus: number;
    active: boolean;
    time: number;
    team: 'radiant' | 'dire';
}

export default function TeamDraftStats({active, bonus, state, time, team}: Props): ReactElement {
    return <div className={'teamTile'}>
        <TeamHeader active={active} bonus={bonus} time={time} team={team} />
        <div className={'divider'} />
        <div className={'teamDraftGrid'}>
            <DraftEntry id={state?.ban0_id} name={state?.ban0_class} type={'ban'} idx={1} />
            <DraftEntry id={state?.ban1_id} name={state?.ban1_class} type={'ban'} idx={2} />
            <DraftEntry id={state?.pick0_id} name={state?.pick0_class} type={'pick'} idx={1} />
            <DraftEntry id={state?.pick1_id} name={state?.pick1_class} type={'pick'} idx={2} />
            <DraftEntry id={state?.ban2_id} name={state?.ban2_class} type={'ban'} idx={3} />
            <DraftEntry id={state?.ban3_id} name={state?.ban3_class} type={'ban'} idx={4} />
            <DraftEntry id={state?.ban4_id} name={state?.ban4_class} type={'ban'} idx={5} />
            <DraftEntry id={state?.pick2_id} name={state?.pick2_class} type={'pick'} idx={3} />
            <DraftEntry id={state?.pick3_id} name={state?.pick3_class} type={'pick'} idx={4} />
            <DraftEntry id={state?.ban5_id} name={state?.ban5_class} type={'ban'} idx={6} />
            <DraftEntry id={state?.pick4_id} name={state?.pick4_class} type={'pick'} idx={5} />
        </div>

        <style jsx>{`
            .teamTile {
                background-color: #FFF;
                padding: 15px 20px;
                box-shadow: 2px 2px 20px 0 rgba(0,0,0,.1);
            }

            .divider {
                margin: 10px 0;
                border-top: 1px solid #ddd;
            }

            .teamDraftGrid {
                display: grid;
                grid-template-columns: 1fr;
                grid-row-gap: 5px;
            }
        `}</style>

    </div>;
}