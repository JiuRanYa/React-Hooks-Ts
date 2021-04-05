import React from "react";
import { useState } from "react";
import { SearchPannel } from "./search-pannel";
import { List } from "./list";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/http-type/project";
import { useUsers } from "utils/http-type/users";
import { useUrlQueryParam } from "../../utils/url";

export const ProjectListScreen = () => {
  // 参数
  const [, setParam] = useState({
    name: "",
    personId: "",
  });
  const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param] = useUrlQueryParam(keys);
  // set debounce: 200ms
  const debounceParam = useDebounce(param, 200);
  // projects
  let { isLoading, error, data: list } = useProjects(debounceParam);
  // users
  let { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPannel param={param} setParam={setParam} users={users || []} />
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
