import React from "react";
import { Button, Drawer } from "antd";

export const ProjectModal = (props: {
  projectModelOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={props.onClose}
      width={"100%"}
      visible={props.projectModelOpen}
    >
      <h1>Project Model</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
