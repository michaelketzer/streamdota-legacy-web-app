import { CloseOutlined, DeleteOutlined, TrophyOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import dayjs from "dayjs";
import { ReactElement, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { loadDotaStats, removeGame } from "../../../modules/reducer/DotaStats";
import { useDotaStats } from "../../../modules/selector/DotaOverlay";
import { useMessageListener } from "../../context/websocket/MessageHandler";
import { isGsiWinnerMessage } from "../../context/websocket/state";


const columns = (dispatch: Dispatch<any>) => [
    {
      title: 'Datum',
      key: 'date',
      render: ({date}) => dayjs.unix(date).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: 'Gewonnen',
      key: 'won',
      render: ({won}) => won ? <TrophyOutlined /> : <CloseOutlined />,
    },
    {
      title: '',
      key: 'actions',
      render: ({date}) => <>
        <Popconfirm title={'Spiel löschen'} onConfirm={async () => dispatch(removeGame(date))} okText={'Löschen'} cancelText={'Abbrechen'}>
            <Button
            type={'primary'}
            danger
            icon={<DeleteOutlined />}
            />
        </Popconfirm>
      </>
    },
];

export default function DotaGamesTable(): ReactElement {
    const stats = useDotaStats();
    const tableData = useMemo(() => Object.values(stats || []).sort(({date: a, date: b}) => b-a), [stats]);
    const dispatch = useDispatch();
    const message = useMessageListener();

    useEffect(() => {
        if(message && isGsiWinnerMessage(message)) {
            dispatch(loadDotaStats());
        }
    }, [message]);

    return <Table dataSource={tableData} columns={columns(dispatch)} rowKey={'date'} pagination={false} />;
}