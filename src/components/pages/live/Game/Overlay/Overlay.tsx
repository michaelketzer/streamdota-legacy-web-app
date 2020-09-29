import { Button, Radio } from "antd";
import { ReactElement, useCallback, useState } from "react";
import { getDefaultHeader, post } from "../../../../../modules/middleware/Network";
import { PlayerState } from "../Game";
import ValueBars, { typeNameMap, useBarValues } from "./ValueBars";

export default function Overlay({playerState}: {playerState: PlayerState[]}): ReactElement {
    const [view, setView] = useState<keyof PlayerState>('net_worth');
    const [loading, setLoading] = useState(false);
    const values = useBarValues(view, playerState);

    const showStats = useCallback(async () => {
        if(!loading) {
            setLoading(true);
            await post(process.env.API_URL + '/casting/overlay', {data: {type: 'playerCompareGraph', data: values, dataType: view}}, getDefaultHeader());
            setTimeout(() => setLoading(false), 10000);
        }
    }, [loading, values, view]);

    return <>
        <div className={'overlay'}>
            <div className={'previewContainer'}>
                <img src={'/images/game_stats.png'} className={'liveFeedImage'} />
                <ValueBars playerState={playerState} accessKey={view}/>
            </div>
        </div>

        <div className={'view'}>
            <Radio.Group value={view} onChange={(e) => setView(e.target.value as keyof PlayerState)}>
                <Radio.Button value={'net_worth'}>{typeNameMap['net_worth']}</Radio.Button>
                <Radio.Button value={'gpm'}>{typeNameMap['gpm']}</Radio.Button>
                <Radio.Button value={'xpm'}>{typeNameMap['xpm']}</Radio.Button>
                <Radio.Button value={'hero_damage'}>{typeNameMap['hero_damage']}</Radio.Button>
                <Radio.Button value={'runes_activated'}>{typeNameMap['runes_activated']}</Radio.Button>
                <Radio.Button value={'camps_stacked'}>{typeNameMap['camps_stacked']}</Radio.Button>
                <Radio.Button value={'support_gold_spent'}>{typeNameMap['support_gold_spent']}</Radio.Button>
            </Radio.Group>
        </div>

        <div className={'showLive'}>
            <Button type="primary" danger loading={loading} onClick={showStats}>
                Show on stream
            </Button>
        </div>

        <style jsx>{`
            .overlay {
                pointer-events: none;
                height: 240px;
                overflow: hidden;
            }
            .previewContainer {
                pointer-events: none;
                position: relative;
            }
            .liveFeedImage {
                object-fit: cover;
                width: 100%;
                transform: scale(1.8);
                padding-top: 160px;
                z-index: 0;
                position: relative;
                pointer-events: none;
            }   

            .view {
                position: relative;
                margin-top: 50px;
                z-index: 2;
            } 

            .showLive {
                margin-top: 10px;
            }
        `}</style>
    </>;

}