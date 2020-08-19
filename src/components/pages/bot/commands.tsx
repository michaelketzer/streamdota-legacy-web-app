import { ReactElement } from "react";
import CommandList from "./CommandList";
import { Typography, Tag } from "antd";
import Tags from "../../Commands/Tags";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../i18n";

const Commands = ({t}: WithTranslation): ReactElement => {
    return <>
        <div><Typography.Text strong>{t('commands-vars')}</Typography.Text></div>
        <div><Typography.Text>{t('commands-vars-sub')}</Typography.Text></div>

        <Tags tags={['uptime']} />

        <div><Typography.Text strong>{t('commands-title')}</Typography.Text></div>
        <CommandList />
    </>;
}

export default i18nInstance.withTranslation('bot')(Commands);