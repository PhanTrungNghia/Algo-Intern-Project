import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { createAdminFunction, readAllAdminFunctions } from "../../_store/reducers/adminFunctionSlice";

export const AddAdminFunction = () => {
    const [adminFunction, setAdminFunction] = React.useState<ICreateAdminFunction>({
        NAME: '',
        STATUS: '',
    });

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     dispatch(createAdminFunction(adminFunction));
    //     dispatch(readAllAdminFunctions());
    //     navigate("/read");
    // }

    // const handleAdminFunctionData = (e: React.FormEvent<HTMLInputElement>) => {
    //     const { id, value } = e.currentTarget;
    //     setAdminFunction((prevAdminFunction) => ({
    //         ...prevAdminFunction,
    //         [id]: value
    //     }))
    // }

    function generateRandomID(length: number): string {
        let result = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        const randomID = generateRandomID(9);
        // Tạo ID ngẫu nhiên
        // Tạo đối tượng adminFunction
        const adminFunction: ICreateAdminFunction = {
            ID: randomID,
            NAME: values.name,
            STATUS: values.status,
        };

        //Gọi dispatch với createAdminFunction
        dispatch(createAdminFunction(adminFunction));
        dispatch(readAllAdminFunctions());
        navigate("/read");
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
                    <Input />
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