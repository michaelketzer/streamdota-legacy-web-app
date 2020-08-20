import { ReactElement, useCallback } from "react";
import { useBetOverlay } from "../../../../modules/selector/BetOverlay";
import { useGoogleFont } from "../../../../modules/selector/GoogleFonts";
import FontSelector from "../../dotaOverlay/Overlay/FontSelector";
import { useDispatch } from "react-redux";
import { BetOverlay } from "@streamdota/shared-types";
import { patchBetOverlay } from "../../../../modules/reducer/BetOverlay";
import FontVariantSelection from "../../dotaOverlay/Overlay/FontVariantSelection";
import { Typography, Tabs } from "antd";
import Distribution from "./Distribution";
import Timer from "./Timer";
import Toplist from "./Toplist";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";

const Overlay = ({t}: WithTranslation): ReactElement => {
    const overlay = useBetOverlay();
    const rawFonts = useGoogleFont();
    const dispatch = useDispatch();

    const patch = useCallback((data: Partial<BetOverlay>): void => {
        dispatch(patchBetOverlay(data));
    }, [dispatch]);
    
    return <div>
        <Typography.Title level={2}>{t('bet-season-overlay-font')}</Typography.Title>
        <div className='fontSelection'>
            <FontSelector rawFonts={rawFonts} selected={overlay.fontFamily} setSelected={(fontFamily) => patch({fontFamily})}/>
        </div>
        
        <div className={'variant'}>
            <FontVariantSelection key={overlay.fontFamily} font={overlay.fontFamily} rawFonts={rawFonts} variant={overlay.fontVariant} setVariant={(fontVariant) => patch({fontVariant})} />
        </div>


        <Tabs defaultActiveKey="Wettverteilung" tabPosition={'left'} destroyInactiveTabPane>
            <Tabs.TabPane tab={t('bet-season-overlay-tab-distribution')} key={'Wettverteilung'}>
              <div className={'paneContent'}><Distribution /></div>
            </Tabs.TabPane>
            <Tabs.TabPane tab={t('bet-season-overlay-tab-timer')} key={'Timer'}>
              <div className={'paneContent'}><Timer /></div>
            </Tabs.TabPane>
            <Tabs.TabPane tab={t('bet-season-overlay-tab-toplist')} key={'Toplist'}>
              <div className={'paneContent'}><Toplist /></div>
            </Tabs.TabPane>
        </Tabs>

        <style jsx>{`
            .fontSelection {
                display: flex;
                flex-direction: row-reverse;
                justify-content: space-between;
            }

            .paneContent {
                padding: 0 20px;
            }

            .variant {
                margin-top: -50px;
                max-width: 300px;
                margin-bottom: 40px;
            }
        `}</style>
    </div>
}

export default i18nInstance.withTranslation('betSystem')(Overlay);