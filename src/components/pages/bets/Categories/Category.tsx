import { ReactElement, useMemo } from "react";
import { useAbortFetch } from "../../../../hooks/abortFetch";
import { BetSeason } from "../../../../api/@types/BetSeason";
import { fetchUserBetSeasons } from "../../../../api/betSeason";
import { Typography, Row, Col, Space } from "antd";
import CurrentCategory from "./CurrentCategory";
import CategoryList from "./CategoryList";
import { User } from "../../../../api/@types/User";
import { fetchCurrentUser } from "../../../../api/user";
import SeasonInvites from "./SeasonInvites";

export interface CategoryProps {
    seasons: BetSeason[];
    reload?: () => void;
    currentBetSeason?: number;
}

export default function Category(): ReactElement {
    const [seasons, load] = useAbortFetch<BetSeason[]>(fetchUserBetSeasons);
    const [user, reloadUser] = useAbortFetch<User>(fetchCurrentUser);
    const currentSeasonName = useMemo(() => (user && seasons && seasons.find(({id}) => id === user.betSeasonId).name) || '', [user, seasons]);

    return <>
        <Typography.Paragraph>Kategorien ist gleichzusetzen mit einer “Season”. Wettrunden werden immer für eine aktuell ausgewählte Kategorie  gestartet. Du kannst hier alle Kategorien verwalten.</Typography.Paragraph>

        <div style={{margin: '30px 0'}} />

        <Row gutter={[50, 50]}>
            <Col span={12}>
                <CurrentCategory seasons={seasons} reload={load} currentBetSeason={user && user.betSeasonId} onChange={reloadUser} />
                <CategoryList seasons={seasons} reload={load} currentBetSeason={user && user.betSeasonId} />
            </Col>

            <Col span={12}>
                {user && <SeasonInvites name={currentSeasonName} seasonId={user.betSeasonId} />}
            </Col>
        </Row>
    </>;
}