import { ReactElement, useCallback, useState } from "react";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { getCommands, updateCommand, createCommand, deleteCommand } from "../../../api/command";
import { Command } from "../../../api/@types/Command";
import React from "react";
import { Input, Button, Popconfirm } from "antd";
import {DeleteOutlined} from '@ant-design/icons';
import Loader from "../../Loader";

export default function CommandList(): ReactElement {
    const [commands, load] = useAbortFetch<Command[]>(getCommands);
    const [cmd, setCmd] = useState('');
    const [msg, setMsg] = useState('');

    const create = useCallback(async () => {
        if(msg.length > 0 && cmd.length > 0) {
            await createCommand(cmd, msg);
            await load();
            setCmd('');
            setMsg('');
        }
    }, [cmd, msg]);

    if(commands) {
        return <div className={'commandsGrid'}>
            {commands.map(({id, command, message}) => <React.Fragment key={id}>
                <Input defaultValue={command} onBlur={async (e) => {
                    await updateCommand(id, e.target.value, message);
                    await load();
                }} placeholder={'Command'} />
                <Input defaultValue={message} onBlur={async (e) => {
                    await updateCommand(id, command, e.target.value);
                    await load();
                }} placeholder={'Antwort'} />
                <div>
    
                    <Popconfirm title="Soll dieser Command wirklich gelöscht werden?" onConfirm={async () => {
                        await deleteCommand(id);
                        await load();
                    }} okText="Ja" cancelText="Nein">
                        <Button type={'danger'} icon={<DeleteOutlined />} />
                    </Popconfirm>
                </div>
            </React.Fragment>)}
    
            <Input value={cmd} onChange={(e) => setCmd(e.target.value)} placeholder={'Command'} />
            <Input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={'Antwort'} />
            <div><Button type={'primary'} onClick={create}>Erstellen</Button></div>
    
            <style jsx>{`
                .commandsGrid {
                    display: grid;
                    grid-template-columns: 200px 400px 100px;
                    grid-column-gap: 20px;
                    grid-row-gap: 15px;
                }
            `}</style>
        </div>;
    }

    return <Loader />;

}