import { ReactElement, useEffect } from "react";
import { Typography, Table, Button } from "antd";
import dayjs from "dayjs";
import classNames from "classnames";
import { PlusOutlined } from "@ant-design/icons";
import { useBetSeasonInvites } from "../../../../modules/selector/BetSeasonInvites";

interface Props {
    name: string;
    seasonId: number;
    canManage: boolean;
}

const statusName = {
    open: 'Offen',
    accepted: 'Angenommen',
    denied: 'Abgelehnt'
}

function InviteCell({status}: {status: 'open' | 'accepted' | 'denied' }): ReactElement {
    return <div className={classNames(status)}>
        {statusName[status]}

        <style jsx>{`
            .accepted {
                color: #389E0D;
            }

            .denied {
                color: #FA541C;
            }
        `}</style>
    </div>;
}

const columns = [
    {
      title: 'Key',
      dataIndex: 'inviteKey',
      key: 'inviteKey',
    },
    {
      title: 'Erstellt',
      dataIndex: 'created',
      key: 'created',
      render: (ts) => dayjs.unix(ts).format('DD.MM.YYYY, HH:mm'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <InviteCell status={status} />
    },
];

export default function SeasonInvites({name, seasonId, canManage}: Props): ReactElement {
    const invites = useBetSeasonInvites(seasonId);

    return <>
        <Typography.Text strong>Einladungen für "{name}"</Typography.Text>
        <Table dataSource={invites} columns={columns} rowKey={'inviteKey'} pagination={false} />
        {canManage && <div className={'newButton'}>
            <Button type={'primary'} icon={<PlusOutlined />} disabled>Neue Einladung</Button>
        </div>}

        <style jsx>{`
            .newButton {
                display: flex;
                margin-top: 20px;
                justify-content: flex-end;
            }    
        `}</style>
    </>;
}