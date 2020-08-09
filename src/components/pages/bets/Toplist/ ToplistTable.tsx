import { ReactElement, useMemo } from "react";
import Loader from "../../../Loader";
import { Table } from "antd";
import { useBetSeasonToplist } from "../../../../modules/selector/BetSeasonToplist";

const columns = [
    {
      title: '#',
      dataIndex: 'rank',
      key: 'round',
    },
    {
      title: 'User',
      dataIndex: 'name',
      key: 'username',
    },
    {
      title: 'Teilnahmen',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Richtige',
      dataIndex: 'won',
      key: 'correct',
    },
    {
      title: 'Rate',
      key: 'result',
      render: ({won, total}) => Math.floor((won * 100) / total) + '%',
    },
];

export default function ToplistTable({season, search}: {season: number; search: string}): ReactElement {
  const toplist = useBetSeasonToplist(season);

  const filteredRounds = useMemo(() => {
    if(toplist) {
      const withRank = toplist.map((data, index) => ({...data, rank: index + 1}));
      return withRank.filter(({username}) => username.includes(search.toLowerCase()));
    }
    return null;
  }, [toplist, search]);

  if(filteredRounds) {
      return <Table dataSource={filteredRounds} columns={columns} rowKey={'name'} pagination={false} />;
  }

  return <Loader/>;
}