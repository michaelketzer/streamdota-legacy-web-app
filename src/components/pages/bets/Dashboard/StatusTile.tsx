import { ReactElement } from "react";
import { PlayCircleFilled } from "@ant-design/icons";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { createBetRound, updateBetRound } from "../../../../modules/reducer/BetRound";
import { useCurrentBetRound } from "../../../../modules/selector/BetRound";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";
import { useCurrentUser } from "../../../../hooks/currentUser";

const StatusTile = ({t, status}: {status: 'betting' | 'running' | 'finished'} & WithTranslation): ReactElement => {
    const dispatch = useDispatch();
    const currentBetRound = useCurrentBetRound();
    const user = useCurrentUser();

    return <div className={classNames('statusTileWrapper', status)} onClick={async () => {
        if(status === 'finished') {
            dispatch(createBetRound());
        }
    }}>
        {status === 'finished' && <>
            <div className={'value ready'}>
                <PlayCircleFilled />
                <div className={'iconLabel'}>{t('bet-dashboard-status-start')}</div>
            </div>
            <div className={'label'}>{t('bet-dashboard-status-label')}</div>
        </>}
        {status === 'betting' && <>
            <div className={'value started'}>{t('bet-dashboard-status-running')}</div>
            <div className={'label'}>{t('bet-dashboard-status-label')}</div>
        </>}
        {status === 'running' && <>
            <div className={'value finished'}>{t('bet-dashboard-status-finished')}</div>
            <div className={'winnerSelect'}>
                <span className={'winnerA'} onClick={async() => dispatch(updateBetRound(currentBetRound.id, {result: user.teamAName, status: 'finished'}))}>{user.teamAName}</span>
                <span className={'winnerOr'}>{t('bet-dashboard-status-finished-or')}</span>
                <span className={'winnerB'} onClick={async() => dispatch(updateBetRound(currentBetRound.id, {result: user.teamBName, status: 'finished', }))}>{user.teamBName}</span>
            </div>
            <div className={'label'}>{t('bet-dashboard-status-finished-label')}</div>
        </>}

        <style jsx>{`
            .winnerSelect {
                display: flex;
                align-items: center;
            }

            .winnerOr {
                color: #595959;
                font-weight: 500;
                font-size: 20px;
                line-height: 28px;
                margin: 0 18px;
            }

            .winnerA {
                font-weight: 500;
                font-size: 38px;
                line-height: 46px;
                color: #A8071A;
                cursor: pointer;
            } 

            .winnerB {
                font-weight: 500;
                font-size: 38px;
                line-height: 46px;
                color: #389E0D;
                cursor: pointer;
            } 

            .iconLabel {
                margin-left: 15px;
            }    

            .statusTileWrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;
                height: 100%;
            }

            .statusTileWrapper.ready {
                cursor: pointer;
            }

            .value {
                display: flex;
                align-items: center;
                font-size: 32px;
                line-height: 40px;
                font-weight: 500; 
            }

            .ready {
                color: #389E0D;
                font-size: 28px;
                line-height: 38px;
            }

            .started {
                color: #389E0D;
            }

            .running {
                color: #FAAD14;
            }

            .finished {
                color: #0050B3;
                font-size: 30px;
                line-height: 38px;
                cursor: pointer;
            }

            .label {
                font-size: 16px;
                line-height: 24px;
                text-align: center;
                color: #8C8C8C;
            }
        `}</style>
    </div>;
}

export default i18nInstance.withTranslation('betSystem')(StatusTile);