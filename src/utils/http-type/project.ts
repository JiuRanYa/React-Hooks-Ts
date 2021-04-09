import { Project } from "./../../screens/project-list/list";
import { useAsync } from "utils/user-Async";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[], Error>(["projects", param], () =>
    client("projects", { data: param })
  );
};

// 注意: hook 只能在函数顶层使用
export const useEditProject = () => {
  // const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
  /*
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
  };*/
};

export const useAddProject = () => {
  //const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );

  /*const mutate = (params: Partial<Project>) => {
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
  };*/
};
