import { ReactElement, useEffect } from "react";
import { Input, Popover, Alert } from "antd";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../i18n";
import { InfoCircleOutlined } from "@ant-design/icons";


interface Props extends WithTranslation {
    leagueId: string;
    setLeagueId: (leagueId: string) => void;
}

const LeagueIdSelector = ({t, leagueId, setLeagueId}: Props): ReactElement => {

    useEffect(() => {
        setLeagueId(localStorage.getItem('leagueId'));
    }, []);

    return <>
        <div>
            <b>{t('league-id-label')}</b>&nbsp;
            <Popover title={t('league-id-label')} trigger="click" content={<div className={'popupContent'}>
                {t('league-info-start')} <a className={'highlight'} href={'https://stratz.com/leagues'} target={'_blank'}>https://stratz.com/leagues</a>{t('league-info-end')} https://stratz.com/leagues/<span className={'highlight'}>11629</span>
                <br />
                <br />
                {t('league-info-patch')}
            </div>}>
            <InfoCircleOutlined />
            </Popover>
        </div>
        <Input value={leagueId} onChange={(e) => {
            localStorage.setItem('leagueId', e.target.value)
            setLeagueId(e.target.value);
        }} />

        <style jsx>{`
            .popupContent {
                max-width: 400px;
            }
            .highlight {
                color: #1890FF;
            }

            .leagueId {
                margin: 30px 0;
                display: inline-block;
            }
        `}</style>
    </>;
}

export default i18nInstance.withTranslation('liveFeed')(LeagueIdSelector);
