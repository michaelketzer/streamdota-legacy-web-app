import { ReactElement, useCallback } from "react";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { fetchBotConfig, patchBotConfig } from "../../../api/user";
import { BotData } from "../../../api/@types/User";
import Loader from "../../Loader";
import { Checkbox, Input } from "antd";
import { UserOutlined } from '@ant-design/icons';

export default function Basic(): ReactElement {
    const config = useAbortFetch(fetchBotConfig);
    const patch = useCallback((data: Partial<BotData>) => patchBotConfig(data), []);

    if(config) {
        return <div className={'wrapper'}>
            <Checkbox defaultChecked={config.useBot} onChange={(e) => patch({useBot: e.target.checked})}>Channel Bot aktivieren</Checkbox>
            <br />
            <br />
            <div><b>Custom Bot Config</b></div>
            <div className={'inputGrid'}>
                <Input placeholder={'Bot Name'} 
                       prefix={<UserOutlined />} 
                       defaultValue={config.customBotName} 
                       onBlur={(e) => patch({customBotName: e.target.value})} />
                <Input placeholder={'Bot OAuth Token'} 
                       prefix={<UserOutlined />} 
                       defaultValue={config.customBotToken} 
                       onBlur={(e) => patch({customBotToken: e.target.value})} />
            </div>

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