import { ReactElement, useState } from "react";
import { PlayCircleFilled } from "@ant-design/icons";
import classNames from "classnames";

export enum Status {
    ready = 'ready',
    started = 'started',
    running = 'running',
    finished = 'finished'
}

export default function StatusTile({setStatus, status}: {status: Status; setStatus: (status: Status) => void}): ReactElement {

    function setWinner(winner: string): void {
        console.log('set winner', winner);
        setStatus(Status.ready);
    }

    return <div className={classNames('statusTileWrapper', status)}>
        {status === Status.ready && <>
            <div className={'value ready'} onClick={() => setStatus(Status.started)}>
                <PlayCircleFilled />
                <div className={'iconLabel'}>Wette starten</div>
            </div>
            <div className={'label'}>STATUS</div>
        </>}
        {status === Status.started && <>
            <div className={'value started'} onClick={() => setStatus(Status.running)}>Wetten laufen</div>
            <div className={'label'}>STATUS</div>
        </>}
        {status === Status.running && <>
            <div className={'value running'} onClick={() => setStatus(Status.finished)}>Spiel läuft</div>
            <div className={'label'}>STATUS</div>
        </>}
        {status === Status.finished && <>
            <div className={'value finished'}>Spiel fertig</div>
            <div className={'winnerSelect'}>
                <span className={'winnerA'} onClick={() => setWinner('a')}>A</span>
                <span className={'winnerOr'}>oder</span>
                <span className={'winnerB'} onClick={() => setWinner('b')}>B</span>
            </div>
            <div className={'label'}>WÄHLE DEN GEWINNER</div>
        </>}

        <style jsx>{`
            .winnerSelect {
                display: flex;
                align-items: center;
            }

            .winnerOr {
                color: #595959;
                font-weight: 500;
                font-size: 20px;
                line-height: 28px;
                margin: 0 18px;
            }

            .winnerA {
                font-weight: 500;
                font-size: 38px;
                line-height: 46px;
                color: #A8071A;
                cursor: pointer;
            } 

            .winnerB {
                font-weight: 500;
                font-size: 38px;
                line-height: 46px;
                color: #389E0D;
                cursor: pointer;
            } 

            .iconLabel {
                margin-left: 15px;
            }    

            .statusTileWrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;
                height: 100%;
            }

            .statusTileWrapper.ready {
                cursor: pointer;
            }

            .value {
                display: flex;
                align-items: center;
                font-size: 32px;
                line-height: 40px;
                font-weight: 500; 
            }

            .ready {
                color: #389E0D;
                font-size: 28px;
                line-height: 38px;
            }

            .started {
                color: #389E0D;
            }

            .running {
                color: #FAAD14;
            }

            .finished {
                color: #0050B3;
                font-size: 30px;
                line-height: 38px;
            }

            .label {
                font-size: 16px;
                line-height: 24px;
                text-align: center;
                color: #8C8C8C;
            }
        `}</style>
    </div>;
}