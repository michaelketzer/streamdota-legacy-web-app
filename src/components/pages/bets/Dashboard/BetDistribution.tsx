import { ReactElement, useMemo } from "react";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";
import { useBetOverlay } from "../../../../modules/selector/BetOverlay";

interface Props extends WithTranslation {
    aBets: number;
    bBets: number;
    bets: number;
}

const BetDistribution = ({t, aBets, bBets, bets}: Props): ReactElement => {
    const overlay = useBetOverlay();
    const percentage = useMemo(() => {
        if((bets) > 0) {
            return (aBets * 100) / bets;
        }
        return 50;
    }, [aBets, bBets, bets]);

    return <>
        <div className={'header'}>{t('bet-dashboard-distribution')}</div>

        <div className={'distributionNumbers'}>
            <div className={'count teamA'}>{aBets}</div>
            <div className={'count teamB'}>{bBets}</div>
        </div>
        
        <div className={'distributionSlider'}>
            <div className={'teamABets'} style={{width: `${percentage}%`}}/>
        </div>

        <style jsx>{`
            .header {
                color: #8C8C8C;
                font-size: 16px;
                text-align: center;
            }

            .distributionNumbers {
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: space-between;
            }

            .count {
                font-size: 24px;
                font-weight: bold;
            }

            .teamA {
                color: ${overlay.distributionColorLeft || '#389E0D'};
            }

            .teamB {
                color: ${overlay.distributionColorRight || '#A8071A'};
            }

            .distributionSlider {
                width: 100%;
                background-color: ${overlay.distributionColorRight || '#A8071A'};
                border-radius: 8px;
                height: 12px;
            }

            .teamABets {
                background-color: ${overlay.distributionColorLeft || '#389E0D'};
                position: relative;
                height: 100%;
                transition: width 120ms ease-in-out;
                min-width: 10px;
                max-width: calc(100% - 10px);
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
            }

            .teamABets:after {
                content: ' ';
                position: absolute;
                top: -2px;
                bottom: -2px;
                width: 4px;
                right: -2px;
                background-color: #000;
                border-radius: 2px;
                height: calc(100% + 4px);
            }
            
        `}</style>
    </>;
}

export default i18nInstance.withTranslation('betSystem')(BetDistribution);