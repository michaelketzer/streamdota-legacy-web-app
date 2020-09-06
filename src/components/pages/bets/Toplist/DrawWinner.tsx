import { ReactElement, useMemo, useCallback, useState, useRef } from "react";
import Modal from "antd/lib/modal/Modal";
import { useBetSeasonToplist } from "../../../../modules/selector/BetSeasonToplist";
import i18nInstance from "../../../../i18n";
import { WithTranslation } from "next-i18next";

interface Props extends WithTranslation {
    season: number;
    show: boolean;
    setShow: (show: boolean) => void;
}

const DrawWinner = ({season, show, setShow, t}: Props): ReactElement => {
    const toplist = useBetSeasonToplist(season);
    const containerRef = useRef<HTMLDivElement>();
    const [winner, setWinner] = useState<null | number>(null);

    const entries = useMemo(() => toplist.reduce((acc, entry) => {
        if(entry.won) {
            acc.push(...Array(+entry.won).fill(entry.name));
        }
        return acc;
    }, []), [toplist]);


    const drawWinner = useCallback(() => {
        const win = Math.floor(Math.random() * Math.floor(entries.length)) + 1;
        setWinner(win);
        //@ts-ignore
        containerRef.current.querySelector('[data-id="' + win + '"]').scrollIntoView({ behavior: 'smooth', block: 'center', duration: 1000});
    }, [entries]);
    
    return <Modal
    title={t('bet-toplist-random-winner-title-1') + ' - ' + entries.length + ' ' + t('bet-toplist-random-winner-title-2')}
    visible={show}
    onCancel={() => setShow(false)}
    okText={t('bet-toplist-random-winner-action-button')}
    cancelText={t('bet-toplist-random-winner-action-cancel')}
    onOk={drawWinner}
  >
      <div className={'entries'} ref={containerRef}>
        {entries.map((user, idx) => <div className={idx + 1 === winner ? 'winner' : ''} data-id={idx+1} key={idx}>{idx+1}. {user}</div>)}
      </div>

      <style jsx>{`
        .entries {
            max-height: 400px;
            overflow-y: scroll;
        }

        .winner {
            font-size: 2em;
            font-weight: bold;
            color: #FF6600;
        }
      `}</style>
  </Modal>
}
export default i18nInstance.withTranslation('betSystem')(DrawWinner);