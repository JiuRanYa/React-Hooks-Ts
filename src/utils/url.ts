import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "./index";

// ['name', 'personId'] => { name: string, personId: string } => 把输入框的内容映射到URL并保存
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParam, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((pre, key) => {
          return { ...pre, [key]: searchParam.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParam]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParam),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
  ] as const;
};
