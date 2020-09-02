import { ReactElement, useCallback } from "react";
import { useBetOverlay } from "../../../../modules/selector/BetOverlay";
import { useDispatch } from "react-redux";
import { BetOverlay } from "@streamdota/shared-types";
import { patchBetOverlay } from "../../../../modules/reducer/BetOverlay";
import { Typography, Switch, InputNumber } from "antd";
import Color from "../../dotaOverlay/Overlay/Color";
import FontSize from "../../dotaOverlay/Overlay/FontSize";
import ToplistOverlay from "./ToplistOverlay";
import FrameLink from "../../dotaOverlay/Overlay/FrameLink";
import { useCurrentUser } from "../../../../hooks/currentUser";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";

const toplist = [
    {name: 'rmiLEtAnCI', total: 18, won: 16},
    {name: 'rarSeMeNthFFcyCL', total: 16, won: 15},
    {name: 'UrDrIblect', total: 18, won: 15},
    {name: 'DaRNATHRIo', total: 15, won: 14},
    {name: 'IfY', total: 16, won: 14},
    {name: 'thYSmaiNTerahAnd', total: 14, won: 13},
    {name: 'hesPEdenEW', total: 14, won: 12},
    {name: 'hurSTIoNtEareAdU', total: 11, won: 11},
    {name: 'rarSeMeNthEAcyCL', total: 10, won: 10},
    {name: 'rarSeMeTThEAcXL', total: 10, won: 8},
    {name: 'rmiLEXXCI', total: 10, won: 7},
    {name: 'rarSeMYthFFcyCL', total: 10, won: 7},
    {name: 'UrasrIblect', total: 10, won: 7},
    {name: 'DaRNDDRIo', total: 14, won: 6},
    {name: 'IXYCV', total: 5, won: 5},
    {name: 'thYSmaDDDahAnd', total: 5, won: 5},
    {name: 'hesPEAASnEW', total: 8, won: 5},
    {name: 'hurSTIDASareAdU', total: 8, won: 5},
    {name: 'rarSeMeFDcyCL', total: 9, won: 5},
    {name: 'rarSeMeTThEAXYCL', total: 12, won: 5},
]

const Toplist = ({t}: WithTranslation): ReactElement => {
    const overlay = useBetOverlay();
    const dispatch = useDispatch();
    const user = useCurrentUser();

    const patch = useCallback((data: Partial<BetOverlay>): void => {
        dispatch(patchBetOverlay(data));
    }, [dispatch]);
    
    return <div className={'setupGrid'}>
        <div className={'topGrid'}>
            <div>
                <Typography.Title level={3}>{t('bet-season-overlay-color')}</Typography.Title>
                <Color label={t('bet-season-overlay-background')} disableAlpha={false} value={overlay.toplistBackground} setValue={(toplistBackground) => patch({toplistBackground})}/>
                <Color label={t('bet-season-overlay-font')} value={overlay.toplistFont} setValue={(toplistFont) => patch({toplistFont})}/>
            </div>

            <div>
                <Typography.Title level={3}>{t('bet-season-overlay-font')}</Typography.Title>
                <FontSize fontSize={overlay.toplistFontSize} setFontSize={(toplistFontSize) => patch({toplistFontSize})} />

                <br />
                <br />

                <FrameLink access={'betting/toplist'} auth={user?.frameApiKey || ''} height={600} width={300} testing={true} />
            </div>

            <div>
                <Typography.Title level={3}>{t('bet-season-overlay-settings')}</Typography.Title>
                <div className={'settingsGrid'}>
                    <Switch checked={overlay.toplistShowRank} onChange={(toplistShowRank) => patch({toplistShowRank})}/>
                    <div className={'label'} onClick={() => patch({toplistShowRank: !overlay.toplistShowRank})}>{t('bet-season-overlay-showRank')}</div>
                    <Switch checked={overlay.toplistShowTotalBets} onChange={(toplistShowTotalBets) => patch({toplistShowTotalBets})} />
                    <div className={'label'} onClick={() => patch({toplistShowTotalBets: !overlay.toplistShowTotalBets})}>{t('bet-season-overlay-showTotal')}</div>
                    <Switch checked={overlay.toplistShowAccuracy} onChange={(toplistShowAccuracy) => patch({toplistShowAccuracy})} />
                    <div className={'label'} onClick={() => patch({toplistShowAccuracy: !overlay.toplistShowAccuracy})}>{t('bet-season-overlay-quota')}</div>
                </div>
                    
                <br />

                <div><b>{t('bet-season-overlay-maxEntry')}</b></div>
                <InputNumber min={0} max={20} value={overlay.toplistMaxEntry} onChange={(toplistMaxEntry) => patch({toplistMaxEntry: +toplistMaxEntry})} />

            </div>
        </div>


        <div className={'previewContainer'}>
            <Typography.Title level={3}>{t('bet-season-overlay-preview')}</Typography.Title>
            <div className={'preview'}>
                <img className={'exampleBackground'} src={'/images/example_background_vertical.png'} />

                <div className={'toplist'}>
                    <ToplistOverlay overlay={overlay} list={toplist.slice(0, overlay.toplistMaxEntry)} />
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

export default i18nInstance.withTranslation('betSystem')(Toplist);