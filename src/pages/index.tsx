import FullPageSlider from "../components/pages/index/FullPageSlider";

export default function Index() {
    return <>
        <div className={'headerWrapper'}>
            <div className={'header'}>
                StreamDota 
            </div>
        </div>

        <div className={'fullPageSlider'}>
            <FullPageSlider />
        </div>

        <style jsx>{`
            .header {
                height: 60px;
                font-size: 20px;
                max-width: 1024px;
                width: 100%;
                margin: 0 auto;
                line-height: 60px;
            }

            .fullPageSlider {
                width: 100%;
                height: calc(100vh - 60px);
            }

            .headerWrapper {
                box-shadow: -3px 0 20px 0 rgba(0,0,0,.5);
                position: sticky;
                top: 0px;
                z-index: 1;
                background-color: #FFF;
            }
        `}</style>
    </>;
}