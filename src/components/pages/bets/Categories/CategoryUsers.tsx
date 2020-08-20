import { ReactElement } from "react";
import { Typography, Table } from "antd";
import { useBetSeasonUsers } from "../../../../modules/selector/BetSeasonUsers";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";

const roleNameMap = {
    user: 'bet-season-user-role-user',
    owner: 'bet-season-user-role-owner'
}

const columns = (t: WithTranslation['t']) => [
    {
      title: t('bet-season-user-name'),
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      title: t('bet-season-user-role'),
      dataIndex: 'userRole',
      key: 'userRole',
      render: (role) => roleNameMap[role],
    },
];

interface Props extends WithTranslation{
    name: string;
    seasonId: number;
    canManage: boolean;
}

const CategoryUsers = ({t, name, seasonId}: Props): ReactElement => {
    const users = useBetSeasonUsers(seasonId);

    return <>
        <Typography.Text strong>{t('bet-season-user-label')} "{name}"</Typography.Text>
        <Table dataSource={users} columns={columns(t)} rowKey={'id'} pagination={false} />

        <style jsx>{`
            .newButton {
                display: flex;
                margin-top: 20px;
                justify-content: flex-end;
            }    
        `}</style>
    </>;
}

export default i18nInstance.withTranslation('betSystem')(CategoryUsers);