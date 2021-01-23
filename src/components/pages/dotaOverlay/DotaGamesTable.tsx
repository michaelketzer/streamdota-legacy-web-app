import { CloseOutlined, DeleteOutlined, TrophyOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import dayjs from "dayjs";
import { WithTranslation } from "next-i18next";
import { ReactElement, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import i18nInstance from "../../../i18n";
import { loadDotaStats, removeGame } from "../../../modules/reducer/DotaStats";
import { useDotaStats } from "../../../modules/selector/DotaOverlay";
import { useMessageListener } from "../../context/websocket/MessageHandler";
import { isGsiWinnerMessage } from "../../context/websocket/state";


const columns = (dispatch: Dispatch<any>, t: WithTranslation['t']) => [
    {
      title: t('stats-table-date'),
      key: 'date',
      render: ({date}) => dayjs.unix(date).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: t('stats-table-won'),
      key: 'won',
      render: ({won}) => won ? <TrophyOutlined /> : <CloseOutlined />,
    },
    {
      title: '',
      key: 'actions',
      render: ({date}) => <>
        <Popconfirm title={t('stats-table-delete-game')} onConfirm={async () => dispatch(removeGame(date))} okText={t('stats-table-delete')} cancelText={t('stats-table-cancel')}>
            <Button
            type={'primary'}
            danger
            icon={<DeleteOutlined />}
            />
        </Popconfirm>
      </>
    },
];

function DotaGamesTable({t}: WithTranslation): ReactElement {
    const stats = useDotaStats();
    const tableData = useMemo(() => Object.values(stats || []).sort(({date: a, date: b}) => b-a), [stats]);
    const dispatch = useDispatch();
    const message = useMessageListener();

    useEffect(() => {
        if(message && isGsiWinnerMessage(message)) {
            dispatch(loadDotaStats());
        }
    }, [message]);

    return <Table dataSource={tableData} columns={columns(dispatch, t)} rowKey={'date'} pagination={false} />;
}


export default i18nInstance.withTranslation('dotaWL')(DotaGamesTable);