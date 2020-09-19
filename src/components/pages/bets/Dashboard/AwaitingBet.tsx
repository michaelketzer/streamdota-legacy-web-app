import { Alert, Button, Spin } from "antd";
import { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "../../../../hooks/currentUser";
import { createBetRound } from "../../../../modules/reducer/BetRound";
import { useBetSeasons } from "../../../../modules/selector/BetSeason";


export default function AwaitingVote(): ReactElement | null {
    const user = useCurrentUser();
    const seasons = useBetSeasons();
    const activeSeason = seasons.find(({id}) => id === user?.betSeasonId);
    const dispatch = useDispatch();
    
    const startbet = useCallback(() => {
        dispatch(createBetRound());
    }, [dispatch]);

    if(activeSeason) {
        return <div className={'container'}>
            {user.streamDelay > 0 && <div className={'delayInfo'}>
                <Alert 
                    message="Stream Delay"
                    description={<>Du hast das Votesystem gerade mit einem Streamdelay von {user.streamDelay} Sekunden laufen!</>}
                    type="warning"
                    showIcon
                />
            </div>}
            <Spin size="large" />

            {activeSeason.type === 'ladder' && <div className={'ladderInfo'}>
                Warte auf Spiel...
                <div className={'subInfo'}>
                    Votes für Ladderkategorien starten automatisch nach dem Hero Showcase.
                </div>
            </div>}

            <div className={'start'}>
                <Button onClick={startbet} size={'large'} type={activeSeason.type === 'ladder' ? 'dashed' : 'primary'}>Voting {activeSeason.type === 'ladder' && <>&nbsp;manuell&nbsp;</>} starten</Button>
            </div>

            <style jsx>{`
                .container {
                    padding: 50px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                }    

                .ladderInfo {
                    margin-top: 20px;
                    color: #888;
                    text-align: center;
                    font-size: 16px;
                }

                .subInfo {
                    color: #999;
                    font-size: 12px;
                    margin-top: 10px;
                }

                .start {
                    margin-top: 50px;
                }
                
                .delayInfo {
                    margin-bottom: 50px;
                }
            `}</style>
        </div>;
    }

    return null;
}