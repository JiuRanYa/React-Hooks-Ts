import { Project } from "./../../screens/project-list/list";
import { useAsync } from "utils/user-Async";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchProjects = () =>
    client("projects", { data: cleanObject((param = {})) });

  // 依赖为param，当param变化时调用
  useEffect(() => {
    run(fetchProjects(), { reloading: fetchProjects });
  }, [param]);

  return result;
};

// 注意: hook 只能在函数顶层使用
export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();

  const mutate = (params: Partial<Project>) => {
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};
