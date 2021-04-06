import { User } from "screens/project-list/search-panel";
import { useAsync } from "utils/user-Async";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();

  // 依赖为param，当param变化时调用
  useEffect(() => {
    run(client("users", { data: cleanObject((param = {})) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
