import { ReactElement, useState, Dispatch } from "react";
import { Steps } from "antd";
import CategoryForm from "./Categories/Form";
import { BetSeason } from "@streamdota/shared-types";
import { useDispatch } from "react-redux";
import { createBetSeason } from "../../../modules/reducer/BetSeason";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../i18n";

const getSteps = (onSeasonCreated: () => void, dispatch: Dispatch<any>, t: WithTranslation['t']) => [
    {
      title: 'bet-season-label',
      content: <CategoryForm title={t('bet-season-create')} onFinish={async (data: Partial<BetSeason>) => {
        await dispatch(createBetSeason(data));
        onSeasonCreated();
      }}/>,
    },
];

const FirstTimeSetup = ({t}: WithTranslation): ReactElement => {
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(0);

    function next(): void {
        setCurrent(current + 1);
    }

    const steps = getSteps(next, dispatch, t);

    return <>
        <div className={'info'}>
            <div>{t('bet-season-first-time-setup')}</div>
            <div>{t('bet-season-first-time-setup-1')}</div>
        </div>

        <div className={'setupGrid'}>
            <Steps direction="vertical" size="small" current={current}>
            {steps.map(item => (
                <Steps.Step key={item.title} title={t(item.title)}  description={' '} />
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

export default i18nInstance.withTranslation('betSystem')(FirstTimeSetup);