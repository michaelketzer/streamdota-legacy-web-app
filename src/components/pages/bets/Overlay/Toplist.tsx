import { ReactElement, useCallback } from "react";
import { useBetOverlay } from "../../../../modules/selector/BetOverlay";
import { useDispatch } from "react-redux";
import { BetOverlay } from "@streamdota/shared-types";
import { patchBetOverlay } from "../../../../modules/reducer/BetOverlay";
import { Typography, Switch } from "antd";
import Color from "../../dotaOverlay/Overlay/Color";
import FontSize from "../../dotaOverlay/Overlay/FontSize";
import ToplistOverlay from "./ToplistOverlay";

const toplist = [
    {name: 'rmiLEtAnCI', total: 18, won: 16},
    {name: 'rarSeMeNthEAcyCL', total: 16, won: 15},
    {name: 'UrDrIblect', total: 18, won: 15},
    {name: 'DaRNATHRIo', total: 15, won: 14},
    {name: 'IfY', total: 16, won: 14},
    {name: 'thYSmaiNTerahAnd', total: 14, won: 13},
    {name: 'hesPEdenEW', total: 14, won: 12},
    {name: 'hurSTIoNtEareAdU', total: 11, won: 11},
    {name: 'rarSeMeNthEAcyCL', total: 10, won: 10},
    {name: 'rarSeMeNthEAcyCL', total: 10, won: 8},
]

export default function Toplist(): ReactElement {
    const overlay = useBetOverlay();
    const dispatch = useDispatch();

    const patch = useCallback((data: Partial<BetOverlay>): void => {
        dispatch(patchBetOverlay(data));
    }, [dispatch]);
    
    return <div className={'setupGrid'}>
        <div className={'topGrid'}>
            <div>
                <Typography.Title level={3}>Farbe</Typography.Title>
                <Color label={'Hintergrund'} disableAlpha={false} value={overlay.toplistBackground} setValue={(toplistBackground) => patch({toplistBackground})}/>
                <Color label={'Schrift'} value={overlay.toplistFont} setValue={(toplistFont) => patch({toplistFont})}/>
            </div>

            <div>
                <Typography.Title level={3}>Schrift</Typography.Title>
                <FontSize fontSize={overlay.toplistFontSize} setFontSize={(toplistFontSize) => patch({toplistFontSize})} />
            </div>


            <div>
                <Typography.Title level={3}>Einstellungen</Typography.Title>
                <div className={'settingsGrid'}>
                    <Switch checked={overlay.toplistShowRank} onChange={(toplistShowRank) => patch({toplistShowRank})}/>
                    <div className={'label'} onClick={() => patch({toplistShowRank: !overlay.toplistShowRank})}>Zeige Rank (1. 2. 3.)</div>
                    <Switch checked={overlay.toplistShowTotalBets} onChange={(toplistShowTotalBets) => patch({toplistShowTotalBets})} />
                    <div className={'label'} onClick={() => patch({toplistShowTotalBets: !overlay.toplistShowTotalBets})}>Zeige Totale Wetten (/10)</div>
                    <Switch checked={overlay.toplistShowAccuracy} onChange={(toplistShowAccuracy) => patch({toplistShowAccuracy})} />
                    <div className={'label'} onClick={() => patch({toplistShowAccuracy: !overlay.toplistShowAccuracy})}>Zeige richtige Wettquote in Prozent</div>
                </div>
            </div>
        </div>


        <div className={'previewContainer'}>
            <Typography.Title level={3}>Vorschau</Typography.Title>
            <div className={'preview'}>
                <img className={'exampleBackground'} src={'/images/example_background_vertical.png'} />

                <div className={'toplist'}>
                    <ToplistOverlay overlay={overlay} list={toplist} />
                </div>
            </div>
        </div>

        <style jsx>{`
            .topGrid {
                display: grid;
                grid-template-columns: max-content max-content;
                grid-gap: 50px;
                justify-content: start;
                grid-template-rows: max-content max-content;
                margin-right: 100px;
                margin-bottom: 50px;
            }

            .settingsGrid {
                display: grid;
                grid-template-columns: max-content 1fr;
                grid-column-gap: 8px;
                grid-row-gap: 10px;
            }

            .toggle {
                display: flex;
                align-items: center;
            }

            .label {
                cursor: pointer;
            }

            .setupGrid {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }

            .previewContainer {
                height: 55em;
                width: 500px;
            }

            .preview {
                position: relative;
                padding: 20px;
                padding-top: 7rem;
            }

            .exampleBackground {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                object-fit: cover;
                object-position: 50% 50%;
                width: 100%;
            }

            .toplist {
                position: relative;
                top: 8em;
                right: -1em;
            }
        `}</style>
    </div>
}