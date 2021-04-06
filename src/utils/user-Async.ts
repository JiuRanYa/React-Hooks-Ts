import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultConfig = {
  throwOnError: false,
};

const defaultInitialState: State<null> = {
  data: null,
  stat: "idle",
  error: null,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      data: null,
      error,
      stat: "error",
    });

  // 用来触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new TypeError("请传入Promise类型");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        if (config.throwOnError) return Promise.reject(error);
        return error;
      });
  };

  return {
    ...state,
    setData,
    setError,
    run,
    isIdle: state.stat === "idle",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    isLoading: state.stat === "loading",
  };
};