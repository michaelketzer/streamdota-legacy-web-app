import { ReactElement } from "react";
import { Form, Typography, Input, Select, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { BetSeason } from "@streamdota/shared-types";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";

interface Props extends WithTranslation {
    onFinish?: (data: Partial<BetSeason>) => Promise<void>;
    onValuesChange?: (data: Partial<BetSeason>) => void;
    data?: Partial<BetSeason>;
    title?: string;
    submitLabel?: string;
}

const CategoryForm = ({t, onFinish, onValuesChange, title, submitLabel = 'Erstellen', data = { description: '', name: '', type: 'ladder' }}: Props): ReactElement => {
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
                    label={t('bet-season-name')}
                    name="name"
                    rules={[{ required: true, message: t('bet-season-name-required') }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label={t('bet-season-description')} name="description">
                    <TextArea />
                </Form.Item>
                <Form.Item label="Typ" name="type">
                    <Select>
                        <Select.Option value="ladder">{t('bet-season-type-ladder')}</Select.Option>
                        <Select.Option value="tournament">{t('bet-season-type-tournament')}</Select.Option>
                        <Select.Option value="other" disabled>{t('bet-season-type-other')}</Select.Option>
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

export default i18nInstance.withTranslation('betSystem')(CategoryForm);