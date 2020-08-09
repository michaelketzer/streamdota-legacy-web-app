import { ReactElement, useState, Dispatch } from "react";
import { Steps } from "antd";
import CategoryForm from "./Categories/Form";
import { BetSeason } from "@streamdota/shared-types";
import { useDispatch } from "react-redux";
import { createBetSeason } from "../../../modules/reducer/BetSeason";

const getSteps = (onSeasonCreated: () => void, dispatch: Dispatch<any>) => [
    {
      title: 'Kategorie',
      content: <CategoryForm title={'Neue Kategorie'} onFinish={async (data: Partial<BetSeason>) => {
        await dispatch(createBetSeason(data));
        onSeasonCreated();
      }}/>,
    },
];

export default function FirstTimeSetup(): ReactElement {
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(0);

    function next(): void {
        setCurrent(current + 1);
    }

    const steps = getSteps(next, dispatch);

    return <>
        <div className={'info'}>
            <div>Hey, es sieht so aus, als wenn du das erste mal hier bist.</div>
            <div>Damit es für dich einfacher ist dich erstmal zurecht zu finden, haben wir hier die ersten Schritte:</div>
        </div>

        <div className={'setupGrid'}>
            <Steps direction="vertical" size="small" current={current}>
            {steps.map(item => (
                <Steps.Step key={item.title} title={item.title}  description={' '} />
            ))}
            </Steps>

            <div className="steps-content">{steps[current].content}</div>
        </div>


        <style jsx>{`
            .info {
                margin-top: 15px;
                margin-bottom: 40px;
            }    

            .setupGrid {
                display: grid;
                grid-template-columns: max-content 1fr;
                grid-column-gap: 40px;
            }
        `}</style>
    </>;
}