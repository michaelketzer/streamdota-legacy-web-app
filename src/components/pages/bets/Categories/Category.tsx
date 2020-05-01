import { ReactElement, useMemo, useEffect } from "react";
import { useAbortFetch } from "../../../../hooks/abortFetch";
import { BetSeason, BetSeasonUser } from "../../../../api/@types/BetSeason";
import { fetchUserBetSeasons, getUsers } from "../../../../api/betSeason";
import { Typography, Row, Col } from "antd";
import CurrentCategory from "./CurrentCategory";
import CategoryList from "./CategoryList";
import { User } from "../../../../api/@types/User";
import CategoryInvites from "./CategoryInvites";
import CategoryUsers from "./CategoryUsers";

export interface CategoryProps {
    seasons: BetSeason[];
    reload?: () => void;
    currentBetSeason?: number;
}

export default function Category({user, reloadUser}: {user: User; reloadUser: () => void}): ReactElement {
    const [seasons, load] = useAbortFetch<BetSeason[]>(fetchUserBetSeasons);
    const currentSeasonName = useMemo(() => (seasons && seasons.find(({id}) => id === user.betSeasonId).name) || '', [user, seasons]);
    const [users, reloadUsers] = useAbortFetch<BetSeasonUser[]>(getUsers, user.betSeasonId);
    const canManage = useMemo(() => users && users.find(({userRole}) => userRole === 'owner').id === user.id, [users]);

    useEffect(() => {
        if(user) {
            reloadUsers();
        }
    }, [user]);

    return <>
        <Typography.Paragraph>Kategorien ist gleichzusetzen mit einer “Season”. Wettrunden werden immer für eine aktuell ausgewählte Kategorie  gestartet. Du kannst hier alle Kategorien verwalten.</Typography.Paragraph>

        <div style={{margin: '30px 0'}} />

        <Row gutter={[50, 50]}>
            <Col span={12}>
                <CurrentCategory seasons={seasons} reload={load} currentBetSeason={user.betSeasonId} onChange={reloadUser} />
                <CategoryList seasons={seasons} reload={load} currentBetSeason={user.betSeasonId} canManage={canManage} />
            </Col>

            <Col span={12}>
                <CategoryInvites name={currentSeasonName} seasonId={user.betSeasonId} canManage={canManage} />
                <div style={{margin: '30px 0'}} />
                <CategoryUsers name={currentSeasonName} seasonId={user.betSeasonId} canManage={canManage} />
            </Col>
        </Row>
    </>;
}