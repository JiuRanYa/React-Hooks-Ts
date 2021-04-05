import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === null || value === undefined || value === "";

// 清除对象中为空的值
export const cleanObject = (object: { [key: string]: unknown }) => {
  // assign外部object，防止对象引用修改造成的污染
  const result = { ...object };

  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });

  return result;
};

// didMounted , excute once: Custom hook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // Todo: 依赖项加入callback会造成无线循环
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// debounce a value
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化的时候设置定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完之后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(val: T[]) => {
  const [value, setValue] = useState(val);

  const removeIndex = (deleteIndex: number) => {
    const copy = [...value];
    copy.splice(deleteIndex, 1);
    setValue(copy);
  };

  const add = (target: T) => {
    setValue([...value, target]);
  };

  const clear = () => {
    setValue([]);
  };

  return {
    value,
    setValue,
    clear,
    removeIndex,
    add,
  };
};

// 刷新页面
export const resetRoute = () => (window.location.href = window.location.origin);
