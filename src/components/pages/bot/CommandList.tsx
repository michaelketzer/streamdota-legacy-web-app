import { ReactElement, useCallback, useState, useMemo } from "react";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { getCommands, updateCommand, createCommand, deleteCommand } from "../../../api/command";
import { Command } from "../../../api/@types/Command";
import React from "react";
import { Input, Button, Popconfirm, Checkbox } from "antd";
import {DeleteOutlined} from '@ant-design/icons';
import Loader from "../../Loader";
import TextArea from "antd/lib/input/TextArea";

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

interface Props {
    commandType?: Command['type'];
    replaceVars?: {[x: string]: string};
}

export default function CommandList({commandType = 'default', replaceVars = {}}: Props): ReactElement {
    const [commands, load] = useAbortFetch<Command[]>(getCommands);
    const [cmd, setCmd] = useState('');
    const [msg, setMsg] = useState('');
    const [act, setAct] = useState(false);

    const create = useCallback(async () => {
        if(msg.length > 0 && cmd.length > 0) {
            await createCommand(act, cmd, msg, commandType);
            await load();
            setCmd('');
            setMsg('');
        }
    }, [act, cmd, msg]);

    const commandsByType = useMemo(() => (commands || []).filter(({type}) => type === commandType), [commands, commandType]);

    if(commands) {
        return <div className={'commandsGrid'}>
            <div className={'label'}>Aktiv</div>
            <div className={'label'}>Command</div>
            <div className={'label'}>Antwort</div>
            <div className={'label'}></div>
            <div className={'label'}>Vorschau</div>

            {commandsByType.map(({active, id, command, message, noResponse, deleteAble}) => <React.Fragment key={id}>
                <div className={'activeBox'}>
                    <Checkbox defaultChecked={active} onChange={async (e) => {
                        await updateCommand(id, e.target.checked, command, message);
                        await load();
                    }}/>
                </div>
                <div>
                    <Input defaultValue={command} onBlur={async (e) => {
                        await updateCommand(id, active, e.target.value, message);
                        await load();
                    }} />
                </div>
                <TextArea defaultValue={message} disabled={noResponse === 1} rows={noResponse === 1 ? 1 : 2} onBlur={async (e) => {
                    await updateCommand(id, active, command, e.target.value);
                    await load();
                }} />
                <div>
    
                    <Popconfirm disabled={deleteAble === 0} title="Soll dieser Command wirklich gelöscht werden?" onConfirm={async () => {
                        await deleteCommand(id);
                        await load();
                    }} okText="Ja" cancelText="Nein">
                        <Button disabled={deleteAble === 0} type={'danger'} icon={<DeleteOutlined />} />
                    </Popconfirm>
                </div>
                <div>{createPreview(message, replaceVars)}</div>
            </React.Fragment>)}
    
            <div className={'activeBox'}>
                <Checkbox defaultChecked={act} onChange={(e) => setAct(e.target.checked)}/>
            </div>
            <div>
                <Input value={cmd} onChange={(e) => setCmd(e.target.value)} placeholder={'Command'} />
            </div>
            <TextArea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={'Antwort'} />
            <div></div>
                <div>{createPreview(msg, replaceVars)}</div>
            <div />
            <div />
            <div className={'createButton'}>
                <Button type={'primary'} onClick={create}>Erstellen</Button>
            </div>
    
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
                    grid-template-columns: max-content 170px 330px 60px 1fr;
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