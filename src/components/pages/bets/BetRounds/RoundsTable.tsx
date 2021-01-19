import { ReactElement, Dispatch } from "react";
import Loader from "../../../Loader";
import { Table, Popconfirm } from "antd";
import { useBetRounds } from "../../../../modules/selector/BetRound";
import { useDispatch } from "react-redux";
import { updateBetRound, deleteBetRound } from "../../../../modules/reducer/BetRound";
import i18nInstance from "../../../../i18n";
import { WithTranslation } from "next-i18next";
import { useCurrentUser } from "../../../../hooks/currentUser";
import { User } from "@streamdota/shared-types";
import dayjs from "dayjs";

const columns = (t: WithTranslation['t'], dispatch: Dispatch<any>,user: User) => [
    {
      title: '#',
      dataIndex: 'round',
      key: 'round',
    },
    {
      title: t('bet-season-round-channel'),
      dataIndex: 'displayName',
      key: 'username',
    },
    {
      title: t('bet-season-round-date'),
      key: 'date',
      render: ({created}) => dayjs.unix(created).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: t('bet-season-round-bets'),
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: t('bet-season-round-distribution'),
      key: 'votes',
      render: ({aBets, bBets}) => `${aBets}/${bBets}`,
    },
    {
      title: t('bet-season-round-winner'),
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: t('bet-season-round-status'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: t('bet-season-round-actions'),
      key: 'actions',
      render: ({id, status, betSeason, result}) => <>
      {status !== 'running' && <>
          <a onClick={async () => {
            dispatch(updateBetRound(id, {result: result.toLowerCase() === user.teamAName.toLowerCase() ? user.teamBName.toLowerCase() : user.teamAName.toLowerCase()}, betSeason));
          }}>{t('bet-season-round-actions-changeWinner')}</a><br />
          <Popconfirm title={t('bet-season-round-delete-info')} onConfirm={async () => {
            dispatch(deleteBetRound(id));
          }} okText={t('bet-season-round-delete-yes')} cancelText={t('bet-season-round-delete-no')}>
            <a>{t('bet-season-round-actions-delete')}</a>
          </Popconfirm>
        </>}
        {status === 'running' && <>
          <a onClick={async () => {dispatch(updateBetRound(id, {result: user.teamAName.toLowerCase(), status: 'finished'}, betSeason))}}>Set Winner to {user.teamAName}</a><br />
          <a onClick={async () => {dispatch(updateBetRound(id, {result: user.teamBName.toLowerCase(), status: 'finished'}, betSeason))}}>Set Winner to {user.teamBName}</a><br />
        </>}
      </>
    },
];

const RoundsTable = ({t, season}: {season: number} & WithTranslation): ReactElement => {
  const rounds = useBetRounds(season);
  const user = useCurrentUser();
  const dispatch = useDispatch();

  if(rounds) {
      return <Table dataSource={rounds} columns={columns(t, dispatch, user)} rowKey={'id'} pagination={false} />;
  }

    return <Loader/>;
}
export default i18nInstance.withTranslation('betSystem')(RoundsTable);