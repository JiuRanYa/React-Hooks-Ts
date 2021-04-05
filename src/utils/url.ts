import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParam, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((pre, key) => {
          return { ...pre, [key]: searchParam.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParam, keys]
    ),
    setSearchParam,
  ] as const;
};
