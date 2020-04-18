import { ReactElement } from "react";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { fetchBotConfig } from "../../../api/user";
import Loader from "../../Loader";
import { Alert, Typography } from "antd";

export default function Basic(): ReactElement {
    const [config] = useAbortFetch(fetchBotConfig);

    if(config) {
        return <div className={'wrapper'}>
            <Alert message={<>
                Vergess nicht den Bot zum Mod zu machen, das verhindert Probleme mit dem Chat. Einfach <span style={{fontFamily: 'monospace'}}><Typography.Text code>/mod streamdotade</Typography.Text></span> im Chat schreiben!
            </>} type={'warning'} />
            <br />
            <Alert message={<>
                Du möchtest deinen eigenen Namen für den Bot haben? Dann schreib mich einfach bei Discord an! (<a href={'https://discordapp.com/channels/@me/148698273899610112/'}>GriefCode#1337</a>)
            </>} type={'info'} />

            <style jsx>{`
                .wrapper {
                    max-width: 800px;
                }

                .inputGrid {
                    display: grid;
                    align-items: center;
                    grid-template-columns: 1fr 1fr;
                    grid-column-gap: 20px;
                }    
            `}</style>
        </div>;
    }

    return <Loader />;
}