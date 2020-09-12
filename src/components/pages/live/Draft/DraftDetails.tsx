import { ReactElement } from "react";
import { DraftState } from "./Draft";
import TeamDraftStats from "./TeamDraft/TeamDraftStats";

interface Props {
    state: DraftState;
}

export default function DraftDetails({state}: Props): ReactElement {
    const radiantActive = state.activeteam === 2;
    return <div className={'draftGrid'}>
        <TeamDraftStats active={radiantActive} bonus={state.radiant_bonus_time} time={radiantActive ? state.activeteam_time_remaining : 30} state={state.team2} team={'radiant'} />
        <TeamDraftStats active={!radiantActive} bonus={state.dire_bonus_time} time={!radiantActive ? state.activeteam_time_remaining : 30} state={state.team3} team={'dire'} />

        <style jsx>{`
            .draftGrid {
                margin-top: 50px;
                display: grid;
                grid-template-columns: .5fr .5fr;
                grid-column-gap: 40px;
            }    
        `}</style>
    </div>;
}