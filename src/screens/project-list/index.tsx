import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/http-type/project";
import { useUsers } from "utils/http-type/users";
import { useProjectsSearchParams } from "./util";

export const ProjectListScreen = () => {
  // 参数
  const [param, setParam] = useProjectsSearchParams();
  // projects
  let { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  // users
  let { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
