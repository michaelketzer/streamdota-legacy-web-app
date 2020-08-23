import { ReactElement } from "react";
import CategoryForm from "./Categories/Form";
import { BetSeason } from "@streamdota/shared-types";
import { useDispatch } from "react-redux";
import { createBetSeason } from "../../../modules/reducer/BetSeason";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../i18n";

const FirstTimeSetup = ({t}: WithTranslation): ReactElement => {
    const dispatch = useDispatch();

    return <>
        <div className={'info'}>
            Hey,
            <div>{t('bet-season-first-time-setup')}</div>
            <div>{t('bet-season-first-time-setup-1')}</div>
            <div>{t('bet-season-first-time-setup-2')}</div>
        </div>

        <div className={'setupGrid'}>
            <div className="steps-content">
                <CategoryForm title={t('bet-season-create')} onFinish={async (data: Partial<BetSeason>) => {
                    await dispatch(createBetSeason(data));
                }}/>
            </div>
        </div>


        <style jsx>{`
            .info {
                margin-top: 25px;
                margin-bottom: 40px;
                font-size: 20px;
            }    

            .setupGrid {
                display: grid;
                grid-template-columns: 1fr;
                grid-column-gap: 40px;
            }
        `}</style>
    </>;
}

export default i18nInstance.withTranslation('betSystem')(FirstTimeSetup);