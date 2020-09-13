import { ReactElement, useCallback, useState, useMemo } from "react";
import React from "react";
import { Input, Button, Popconfirm, Checkbox } from "antd";
import {DeleteOutlined} from '@ant-design/icons';
import Loader from "../../Loader";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch } from "react-redux";
import { useUserCommands } from "../../../modules/selector/Command";
import { createCommand, updateCommand, deleteCommand } from "../../../modules/reducer/Command";
import { Command } from "@streamdota/shared-types";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../i18n";
import CommandAccess from "./CommandAccess";

const replace = {
    UPTIME: '4 Stunden und 20 Minuten',
    USER: 'griefcode',
    TOTAL_GAMES: '5',
    GAMES_WON: '3',
    GAMES_LOST: '2',
    WINNER: 'A',
    TOPLIST_STATS: '1. griefcode (5/8) 2. shokztv (5/9) ...',
    USER_BETS_CORRECT: '1',
    USER_BETS_WRONG: '1',
    USER_BETS_TOTAL: '2',
    USER_BETS_ACCURACY: '50%'

}

function createPreview(msg: string, vars: {[x: string]: string}): string {
    let replaced = msg;

    for(const [key, value] of Object.entries({...replace, ...vars})) {
        const regex = new RegExp(`{${key}}`, "g");
        replaced = replaced.replace(regex, value);
    }

    return replaced;
}

interface Props extends WithTranslation {
    commandType?: Command['type'];
    replaceVars?: {[x: string]: string};
    canCreate?: boolean;
}

const CommandList = ({t, commandType = 'default', replaceVars = {}, canCreate=true}: Props): ReactElement => {
    const commands = useUserCommands(commandType);
    const dispatch = useDispatch();
    const [cmd, setCmd] = useState('');
    const [msg, setMsg] = useState('');
    const [act, setAct] = useState(false);

    const create = useCallback(async () => {
        if(msg.length > 0 && cmd.length > 0) {
            dispatch(createCommand({active: act, command: cmd, message: msg, type: commandType}));
            setCmd('');
            setMsg('');
        }
    }, [act, cmd, msg]);

    if(commands) {
        return <div className={'commandsGrid'}>
            <div className={'label'}>{t('commands-list-active')}</div>
            <div className={'label'}>{t('commands-list-command')}</div>
            <div className={'label'}>{t('commands-list-response')}</div>
            <div className={'label'}>{t('commands-list-access')}</div>
            <div className={'label'}></div>
            <div className={'label'}>{t('commands-list-preview')}</div>

            {commands.map(({active, id, command, message, noResponse, deleteAble, ...props}) => <React.Fragment key={id}>
                <div className={'activeBox'}>
                    <Checkbox defaultChecked={active} onChange={async (e) => {
                        dispatch(updateCommand(id, {active: e.target.checked}));
                    }}/>
                </div>
                <div>
                    <Input defaultValue={command} onBlur={async (e) => {
                        dispatch(updateCommand(id, { command: e.target.value }));
                    }} />
                </div>
                <TextArea defaultValue={message} disabled={noResponse} rows={noResponse ? 1 : 2} onBlur={async (e) => {
                    dispatch(updateCommand(id, { message: e.target.value }));
                }} />
                <div>
                    <CommandAccess command={props} onChange={async (data: Partial<Command>) => {
                        dispatch(updateCommand(id, data));
                    }}/>
                </div>
                <div>
    
                    <Popconfirm disabled={!deleteAble} title={t('commands-list-delete')} onConfirm={async () => {
                        dispatch(deleteCommand(id));
                    }} okText={t('commands-list-delete-yes')} cancelText={t('commands-list-delete-no')}>
                        <Button danger disabled={!deleteAble} type={'primary'} icon={<DeleteOutlined />} />
                    </Popconfirm>
                </div>
                <div>{createPreview(message, replaceVars)}</div>
            </React.Fragment>)}
                
            {canCreate && <>
                <div className={'activeBox'}>
                    <Checkbox defaultChecked={act} onChange={(e) => setAct(e.target.checked)}/>
                </div>
                <div>
                    <Input value={cmd} onChange={(e) => setCmd(e.target.value)} placeholder={t('commands-list-command')} />
                </div>
                <TextArea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={t('commands-list-response')} />
                <div></div>
                <div></div>
                <div>{createPreview(msg, replaceVars)}</div>
                <div />
                <div />
                <div className={'createButton'}>
                    <Button type={'primary'} onClick={create}>{t('commands-list-create')}</Button>
                </div>
            </>}
    
            <style jsx>{`
                .activeBox {
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .label {
                    margin-bottom: -15px;
                    margin-top: 10px;
                }

                .commandsGrid {
                    display: grid;
                    grid-template-columns: max-content 170px 330px 300px 60px 1fr;
                    grid-column-gap: 20px;
                    grid-row-gap: 15px;
                }

                .createButton {
                    justify-self: flex-end;
                }
            `}</style>
        </div>;
    }

    return <Loader />;

}

export default i18nInstance.withTranslation('bot')(CommandList);