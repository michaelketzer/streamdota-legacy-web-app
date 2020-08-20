import { ReactElement, useEffect } from "react";
import { Typography, Table, Button } from "antd";
import dayjs from "dayjs";
import classNames from "classnames";
import { PlusOutlined } from "@ant-design/icons";
import { useBetSeasonInvites } from "../../../../modules/selector/BetSeasonInvites";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";

interface Props extends WithTranslation{
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

const columns = (t: WithTranslation['t']) => [
    {
      title: t('bet-season-invite-key'),
      dataIndex: 'inviteKey',
      key: 'inviteKey',
    },
    {
      title: t('bet-season-invite-created'),
      dataIndex: 'created',
      key: 'created',
      render: (ts) => dayjs.unix(ts).format('DD.MM.YYYY, HH:mm'),
    },
    {
      title: t('bet-season-invite-kestatusy'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => <InviteCell status={status} />
    },
];

const SeasonInvites = ({t, name, seasonId, canManage}: Props): ReactElement => {
    const invites = useBetSeasonInvites(seasonId);

    return <>
        <Typography.Text strong>{t('bet-season-invites-label')} "{name}"</Typography.Text>
        <Table dataSource={invites} columns={columns(t)} rowKey={'inviteKey'} pagination={false} />
        {canManage && <div className={'newButton'}>
            <Button type={'primary'} icon={<PlusOutlined />} disabled>{t('bet-season-invite-new')}</Button>
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

export default i18nInstance.withTranslation('betSystem')(SeasonInvites);