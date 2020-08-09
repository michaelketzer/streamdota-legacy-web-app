import { ReactElement } from "react";
import { Form, Typography, Input, Select, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { BetSeason } from "@streamdota/shared-types";

interface Props {
    onFinish?: (data: Partial<BetSeason>) => Promise<void>;
    onValuesChange?: (data: Partial<BetSeason>) => void;
    data?: Partial<BetSeason>;
    title?: string;
    submitLabel?: string;
}

export default function CategoryForm({onFinish, onValuesChange, title, submitLabel = 'Erstellen', data = { description: '', name: '', type: 'ladder' }}: Props): ReactElement {
    return <>
        {title && <Typography.Title level={2}>{title}</Typography.Title>}

        <div className={'form'}>
            <Form
                name="basic"
                initialValues={data}
                onFinish={onFinish}
                onValuesChange={(_changed, allValues) => onValuesChange && onValuesChange(allValues)}
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
                        <Select.Option value="tournament">Turnier</Select.Option>
                        <Select.Option value="other" disabled>Sonstiges</Select.Option>
                    </Select>
                </Form.Item>

                {onFinish && <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {submitLabel}
                    </Button>
                </Form.Item>}
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