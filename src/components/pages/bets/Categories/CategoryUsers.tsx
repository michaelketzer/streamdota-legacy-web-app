import { ReactElement } from "react";
import { Typography, Table } from "antd";
import { useBetSeasonUsers } from "../../../../modules/selector/BetSeasonUsers";

const roleNameMap = {
    user: 'Benutzer',
    owner: 'Ersteller'
}

const columns = [
    {
      title: 'Name',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      title: 'Rolle',
      dataIndex: 'userRole',
      key: 'userRole',
      render: (role) => roleNameMap[role],
    },
];

interface Props {
    name: string;
    seasonId: number;
    canManage: boolean;
}

export default function CategoryUsers({name, seasonId}: Props): ReactElement {
    const users = useBetSeasonUsers(seasonId);

    return <>
        <Typography.Text strong>Benutzer für "{name}"</Typography.Text>
        <Table dataSource={users} columns={columns} rowKey={'id'} pagination={false} />

        <style jsx>{`
            .newButton {
                display: flex;
                margin-top: 20px;
                justify-content: flex-end;
            }    
        `}</style>
    </>;
}