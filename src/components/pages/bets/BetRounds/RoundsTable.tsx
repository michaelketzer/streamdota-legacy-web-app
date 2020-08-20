import { ReactElement, Dispatch } from "react";
import Loader from "../../../Loader";
import { Table, Popconfirm } from "antd";
import { useBetRounds } from "../../../../modules/selector/BetRound";
import { useDispatch } from "react-redux";
import { updateBetRound, deleteBetRound } from "../../../../modules/reducer/BetRound";
import i18nInstance from "../../../../i18n";
import { WithTranslation } from "next-i18next";

const columns = (t: WithTranslation['t'], dispatch: Dispatch<any>) => [
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
      title: t('bet-season-round-actions'),
      key: 'actions',
      render: ({id, result}) => <>
        <a onClick={async () => {
          await dispatch(updateBetRound(id, {result: result === 'a' ? 'b' : 'a'}));
        }}>{t('bet-season-round-actions-changeWinner')}</a><br />
        <Popconfirm title={t('bet-season-round-delete-info')} onConfirm={async () => {
          await dispatch(deleteBetRound(id));
        }} okText={t('bet-season-round-delete-yes')} cancelText={t('bet-season-round-delete-no')}>
          <a>{t('bet-season-round-actions-delete')}</a>
        </Popconfirm>
      </>
    },
];

const RoundsTable = ({t, season}: {season: number} & WithTranslation): ReactElement => {
  const rounds = useBetRounds(season);
  const dispatch = useDispatch();

  if(rounds) {
      return <Table dataSource={rounds} columns={columns(t, dispatch)} rowKey={'id'} pagination={false} />;
  }

    return <Loader/>;
}
export default i18nInstance.withTranslation('betSystem')(RoundsTable);