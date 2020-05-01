import { ReactElement } from "react";
import { useAbortFetch } from "../../../../hooks/abortFetch";
import { BetSeason } from "../../../../api/@types/BetSeason";
import { fetchUserBetSeasons } from "../../../../api/betSeason";
import { Typography, Row, Col } from "antd";
import CurrentCategory from "./CurrentCategory";
import CategoryList from "./CategoryList";

export interface CategoryProps {
    seasons: BetSeason[];
    reload?: () => void;
}

export default function Category(): ReactElement {
    const [seasons, load] = useAbortFetch<BetSeason[]>(fetchUserBetSeasons);

    return <>
        <Typography.Paragraph>Kategorien ist gleichzusetzen mit einer “Season”. Wettrunden werden immer für eine aktuell ausgewählte Kategorie  gestartet. Du kannst hier alle Kategorien verwalten.</Typography.Paragraph>
        <Row gutter={[50, 50]}>
            <Col span={12}>
                <CurrentCategory seasons={seasons} reload={load} />
                <CategoryList seasons={seasons} reload={load} />
            </Col>
        </Row>
    </>;
}