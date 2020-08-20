import { ReactElement, useMemo } from "react";
import Loader from "../../../Loader";
import { Table } from "antd";
import { useBetSeasonToplist } from "../../../../modules/selector/BetSeasonToplist";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";

const columns = (t: WithTranslation['t']) => [
    {
      title: '#',
      dataIndex: 'rank',
      key: 'round',
    },
    {
      title: t('bet-season-toplist-user'),
      dataIndex: 'name',
      key: 'username',
    },
    {
      title: t('bet-season-toplist-bets'),
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: t('bet-season-toplist-correct'),
      dataIndex: 'won',
      key: 'correct',
    },
    {
      title: t('bet-season-toplist-rate'),
      key: 'result',
      render: ({won, total}) => Math.floor((won * 100) / total) + '%',
    },
];

const ToplistTable = ({t, season, search}: {season: number; search: string} & WithTranslation): ReactElement => {
  const toplist = useBetSeasonToplist(season);

  const filteredRounds = useMemo(() => {
    if(toplist) {
      const withRank = toplist.map((data, index) => ({...data, rank: index + 1}));
      return withRank.filter(({username}) => username.includes(search.toLowerCase()));
    }
    return null;
  }, [toplist, search]);

  if(filteredRounds) {
      return <Table dataSource={filteredRounds} columns={columns(t)} rowKey={'name'} pagination={false} />;
  }

  return <Loader/>;
}

export default i18nInstance.withTranslation('betSystem')(ToplistTable);