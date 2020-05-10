import { ReactElement, useMemo } from "react";

interface Props {
    aBets: number;
    bBets: number;
}

export default function BetDistribution({aBets, bBets}: Props): ReactElement {
    const percentage = useMemo(() => {
        if((aBets + bBets) > 0) {
            return (aBets * 100) / (aBets + bBets);
        }
        return 50;
    }, [aBets, bBets]);

    return <>
        <div className={'header'}>Wettverteilung</div>

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
                color: #A8071A;
            }

            .teamB {
                color: #389E0D;
            }

            .distributionSlider {
                width: 100%;
                background-color: #389E0D;
                border-radius: 8px;
                height: 12px;
            }

            .teamABets {
                background-color: #A8071A;
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