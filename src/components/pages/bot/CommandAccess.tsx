import { ReactElement, useMemo, useCallback } from "react";
import { Select } from "antd";
import { Command } from "@streamdota/shared-types";
import i18nInstance from "../../../i18n";
import { WithTranslation } from "next-i18next";

interface Props extends WithTranslation {
    command?: Partial<Command>;
    onChange: (data: Partial<Command>) => void;
}

const rights = [
    'userAccess',
    'tier1Access',
    'tier2Access',
    'tier3Access',
    'vipAccess',
    'modAccess',
    'streamerAccess',
];

const CommandAccess = ({command, onChange, t}: Props): ReactElement => {
    const selected = useMemo(() => {
        return rights.filter((right) => command && command[right]);
    }, [command]);

    const change = useCallback((values: string[]) => {
        const newData = rights.reduce<Partial<Command>>((acc, right) => {
            acc[right] = values.includes(right);
            return acc;
        }, {});
        onChange(newData);
    }, [onChange]);
    return <>
        <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder={t('access-select')}
            value={selected}
            onChange={change}
            >
                <Select.Option key={'userAccess'} value={'userAccess'}>{t('access-user')}</Select.Option>
                <Select.Option key={'tier1Access'} value={'tier1Access'}>{t('access-tier1')}</Select.Option>
                <Select.Option key={'tier2Access'} value={'tier2Access'}>{t('access-tier2')}</Select.Option>
                <Select.Option key={'tier3Access'} value={'tier3Access'}>{t('access-tier3')}</Select.Option>
                <Select.Option key={'vipAccess'} value={'vipAccess'}>{t('access-vip')}</Select.Option>
                <Select.Option key={'modAccess'} value={'modAccess'}>{t('access-mod')}</Select.Option>
                <Select.Option key={'streamerAccess'} value={'streamerAccess'}>{t('access-streamer')}</Select.Option>
        </Select>
    </>;
}

export default i18nInstance.withTranslation('bot')(CommandAccess);