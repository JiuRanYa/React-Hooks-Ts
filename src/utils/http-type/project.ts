import { Project } from "./../../screens/project-list/list";
import { useAsync } from "utils/user-Async";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();

  // 依赖为param，当param变化时调用
  useEffect(() => {
    run(client("projects", { data: cleanObject((param = {})) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
