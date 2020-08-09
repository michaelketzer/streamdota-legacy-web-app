import { ReactElement, Dispatch } from "react";
import Loader from "../../../Loader";
import { Table, Popconfirm } from "antd";
import { useBetRounds } from "../../../../modules/selector/BetRound";
import { useDispatch } from "react-redux";
import { updateBetRound, deleteBetRound } from "../../../../modules/reducer/BetRound";

const columns = (dispatch: Dispatch<any>) => [
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
          await dispatch(updateBetRound(id, {result: result === 'a' ? 'b' : 'a'}));
        }}>Gewinner ändern</a><br />
        <Popconfirm title="Soll diese Runde wirklich gelöscht werden?" onConfirm={async () => {
          await dispatch(deleteBetRound(id));
        }} okText="Ja" cancelText="Nein">
          <a>Löschen</a>
        </Popconfirm>
      </>
    },
];

export default function RoundsTable({season}: {season: number}): ReactElement {
  const rounds = useBetRounds(season);
  const dispatch = useDispatch();

  if(rounds) {
      return <Table dataSource={rounds} columns={columns(dispatch)} rowKey={'id'} pagination={false} />;
  }

    return <Loader/>;
}