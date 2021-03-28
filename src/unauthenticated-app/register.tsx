import { useAuth } from "context/context-data/auth-context";
import React from "react";
import { Form, Input, Button } from "antd";

export const RegisterScreen = () => {
  const { register } = useAuth();

  // Ts: duck typing : API 编程
  const handleSubmit = (values: { username: string; password: string }) => {
    // const username = (event.currentTarget.elements[0] as HTMLFormElement).value
    // const password = (event.currentTarget.elements[1] as HTMLFormElement).value

    register(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button htmlType={"submit"} type={"primary"}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
