import { ReactElement, useEffect } from "react";
import { useAbortFetch } from "../../../../hooks/abortFetch";
import { BetRound } from "../../../../api/@types/BetRound";
import { getRounds, updateRound, deleteRound } from "../../../../api/betSeason";
import Loader from "../../../Loader";
import { Table, Popconfirm } from "antd";

const columns = (reload: () => void) => [
    {
      title: '#',
      dataIndex: 'round',
      key: 'round',
    },
    {
      title: 'Channel',
      dataIndex: 'displayName',
      key: 'username',
    },
    {
      title: 'Abstimmungen',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Team A/B',
      key: 'votes',
      render: ({aBets, bBets}) => `${aBets}/${bBets}`,
    },
    {
      title: 'Gewinner',
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: 'Aktionen',
      key: 'actions',
      render: ({id, result}) => <>
        <a onClick={async () => {
          await updateRound(id, {result: result === 'a' ? 'b' : 'a'});
          reload();
        }}>Gewinner ändern</a><br />
        <Popconfirm title="Soll diese Runde wirklich gelöscht werden?" onConfirm={async () => {
          await deleteRound(id);
          reload();
        }} okText="Ja" cancelText="Nein">
          <a>Löschen</a>
        </Popconfirm>
      </>
    },
];

export default function RoundsTable({season}: {season: number}): ReactElement {
    const [rounds, reload] = useAbortFetch<BetRound[]>(getRounds, season);
    
    useEffect(() => {
        reload();
    }, [season]);

    if(rounds) {
        return <Table dataSource={rounds} columns={columns(reload)} rowKey={'id'} pagination={false} />;
    }

    return <Loader/>;
}