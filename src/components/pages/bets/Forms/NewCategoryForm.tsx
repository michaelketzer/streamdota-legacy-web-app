import { ReactElement } from "react";
import { Form, Typography, Input, Select, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { BetSeason } from "../../../../api/@types/BetSeason";
import { createUserBetSeason } from "../../../../api/betSeason";

interface Props {
    onCreated: () => void;
}

export default function NewCategoryForm({onCreated}: Props): ReactElement {
    const onFinish = async (data: Partial<BetSeason>) => {
        await createUserBetSeason(data);
        onCreated();
    };

    return <>
        <Typography.Title level={2}>Neue Kategorie</Typography.Title>

        <div className={'form'}>
            <Form
                name="basic"
                initialValues={{ description: '', name: '', type: 'ladder' }}
                onFinish={onFinish}
                layout={'vertical'}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Du musst einen Namen angeben!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Beschreibung" name="description">
                    <TextArea />
                </Form.Item>
                <Form.Item label="Typ" name="type">
                    <Select>
                        <Select.Option value="ladder">Ladder</Select.Option>
                        <Select.Option value="tournament">Tournier</Select.Option>
                        <Select.Option value="other" disabled>Sonstiges</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Erstellen
                    </Button>
                </Form.Item>
            </Form>
        </div>

        <style jsx>{`
            .form {
                max-width: 450px;
                width: 100%;
            }    
        `}</style>
    </>;
}