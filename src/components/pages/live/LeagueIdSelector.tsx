import { ReactElement, useEffect } from "react";
import { Input } from "antd";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../i18n";


interface Props extends WithTranslation {
    leagueId: number;
    setLeagueId: (leagueId: number) => void;
}

const LeagueIdSelector = ({t, leagueId, setLeagueId}: Props): ReactElement => {

    useEffect(() => {
        setLeagueId(+(localStorage.getItem('leagueId') || 11850));
    }, []);

    return <>
        <div><b>{t('league-id-label')}</b></div>
        <Input value={leagueId} onChange={(e) => {
            localStorage.setItem('leagueId', e.target.value)
            setLeagueId(+e.target.value);
        }} />
    </>;
}

export default i18nInstance.withTranslation('liveFeed')(LeagueIdSelector);