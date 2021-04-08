import React from "react";
import { Button, Divider, List, Popover, Typography } from "antd";
import { useProjects } from "../utils/http-type/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
  const { data: projects, isLoading } = useProjects();
  const pinProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
        <Divider />
        {props.projectButton}
      </List>
    </ContentContainer>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
