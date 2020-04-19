import { ReactElement, useCallback, useState } from "react";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { getCommands, updateCommand, createCommand, deleteCommand } from "../../../api/command";
import { Command } from "../../../api/@types/Command";
import React from "react";
import { Input, Button, Popconfirm, Checkbox } from "antd";
import {DeleteOutlined} from '@ant-design/icons';
import Loader from "../../Loader";
import TextArea from "antd/lib/input/TextArea";

function createPreview(msg: string): string {
    const uptimeReplace = msg.replace(/\{UPTIME\}/, '4 Stunden und 20 Minuten');
    const userReplace = uptimeReplace.replace(/\{USER\}/, 'griefcode'); 
    return userReplace;
}

export default function CommandList(): ReactElement {
    const [commands, load] = useAbortFetch<Command[]>(getCommands);
    const [cmd, setCmd] = useState('');
    const [msg, setMsg] = useState('');
    const [act, setAct] = useState(false);

    const create = useCallback(async () => {
        if(msg.length > 0 && cmd.length > 0) {
            await createCommand(act, cmd, msg);
            await load();
            setCmd('');
            setMsg('');
        }
    }, [cmd, msg]);

    if(commands) {
        return <div className={'commandsGrid'}>
            <div className={'label'}>Aktiv</div>
            <div className={'label'}>Command</div>
            <div className={'label'}>Antwort</div>
            <div className={'label'}>Aktion</div>
            <div className={'label'}>Vorschau</div>

            {commands.map(({active, id, command, message}) => <React.Fragment key={id}>
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
                <TextArea defaultValue={message} onBlur={async (e) => {
                    await updateCommand(id, active, command, e.target.value);
                    await load();
                }} />
                <div>
    
                    <Popconfirm title="Soll dieser Command wirklich gelöscht werden?" onConfirm={async () => {
                        await deleteCommand(id);
                        await load();
                    }} okText="Ja" cancelText="Nein">
                        <Button type={'danger'} icon={<DeleteOutlined />} />
                    </Popconfirm>
                </div>
                <div>{createPreview(message)}</div>
            </React.Fragment>)}
    
            <div className={'activeBox'}>
                <Checkbox defaultChecked={act} onChange={(e) => setAct(e.target.checked)}/>
            </div>
            <div>
                <Input value={cmd} onChange={(e) => setCmd(e.target.value)} placeholder={'Command'} />
            </div>
            <TextArea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={'Antwort'} />
            <div></div>
                <div>{createPreview(msg)}</div>
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