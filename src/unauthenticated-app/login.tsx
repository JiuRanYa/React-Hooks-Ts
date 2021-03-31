import { useAuth } from "context/context-data/auth-context";
import React from "react";
import { Form, Input, Button } from "antd";
import { useAsync } from "utils/user-Async";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // Ts: duck typing : API 编程
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    // const username = (event.currentTarget.elements[0] as HTMLFormElement).value
    // const password = (event.currentTarget.elements[1] as HTMLFormElement).value

    try {
      await run(login(values));
    } catch (e) {
      onError(e);
    }
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
        <Button loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
