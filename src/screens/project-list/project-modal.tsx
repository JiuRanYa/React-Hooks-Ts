import React from "react";
import { Button, Drawer } from "antd";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer onClose={close} width={"100%"} visible={projectModalOpen}>
      <h1>Project Model</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
