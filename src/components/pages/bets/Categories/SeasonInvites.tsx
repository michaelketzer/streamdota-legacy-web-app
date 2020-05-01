import { ReactElement, useEffect } from "react";
import { Typography, Table, Button } from "antd";
import { useAbortFetch } from "../../../../hooks/abortFetch";
import { Invite } from "../../../../api/@types/BetSeason";
import { getInvites } from "../../../../api/betSeason";
import dayjs from "dayjs";
import classNames from "classnames";
import { PlusOutlined } from "@ant-design/icons";

interface Props {
    name: string;
    seasonId: number;
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

export default function SeasonInvites({name, seasonId}: Props): ReactElement {
    const [invites, reloadInvites] = useAbortFetch<Invite[]>(getInvites, seasonId);

    useEffect(() => {
        reloadInvites();
    }, [seasonId]);

    return <>
        <Typography.Text strong>Einladungen für "{name}"</Typography.Text>
        <Table dataSource={invites} columns={columns} rowKey={'inviteKey'} pagination={false} />
        <div className={'newButton'}>
            <Button type={'primary'} icon={<PlusOutlined />}>Neue Einladung</Button>
        </div>

        <style jsx>{`
            .newButton {
                display: flex;
                margin-top: 20px;
                justify-content: flex-end;
            }    
        `}</style>
    </>;
}