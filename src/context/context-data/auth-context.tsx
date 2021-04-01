// 提供一个全局的context和Custom hook 供全局使用
import React, { ReactNode, useState } from "react";
import * as auth from "context/context-provider/auth-provider";
import { User } from "screens/project-list/search-pannel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/user-Async";
import { FullScreenError, FullScreenLoading } from "components/lib";

interface AutoForm {
  username: string;
  password: string;
}

// 利用token发送请求，初始化user
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// 1. 创建一个context
const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AutoForm) => Promise<void>;
      register: (form: AutoForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

// 2. 设置dev-tools中的displayname
AuthContext.displayName = "AuthContext";

// 3. 自定义Provider提供的数据(这里只关注数据，方法和函数在auth-provider中书写)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    setData: setUser,
  } = useAsync<User | null>();

  // function programming point free: 消除相同参数
  const login = (form: AutoForm) => auth.login(form).then(setUser);
  const register = (form: AutoForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) return <FullScreenLoading />;

  if (isError) {
    return <FullScreenError error={error}></FullScreenError>;
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    ></AuthContext.Provider>
  );
};

// 4. 暴露一个useAuth全局的Custom hook
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AutoProvider中使用");
  }
  return context;
};
