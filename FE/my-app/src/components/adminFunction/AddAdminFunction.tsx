import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { createAdminFunction, readAllAdminFunctions } from "../../store/reducers/adminFunctionSlice";

type FieldType = {
    name?: string,
    status?: string
}

export const AddAdminFunction = () => {
    const [adminFunction, setAdminFunction] = React.useState<IAdminFunction>({
        NAME: '',
        STATUS: '',
    });

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createAdminFunction(adminFunction));
        dispatch(readAllAdminFunctions());
        navigate("/read");
    }

    const handleAdminFunctionData = (e: React.FormEvent<HTMLInputElement>) => {
        const { id, value } = e.currentTarget;
        setAdminFunction((prevAdminFunction) => ({
            ...prevAdminFunction,
            [id]: value
        }))
    }

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="w-50 mx-auto">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Function Name: "
                    name="name"
                    rules={[{ required: true, message: 'Please input your function name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Status: "
                    name="status"
                    rules={[{ required: true, message: 'Please input your status!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}