import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";

// transform personId: string to personId: number
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(() => {
      return { ...param, personId: Number(param.personId) || undefined };
    }, [param]),
    setParam,
  ] as const;
};
