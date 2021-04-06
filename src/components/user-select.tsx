import React from "react";
import { IdSelect } from "./id-select";
import { useUsers } from "../utils/http-type/users";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: user } = useUsers();
  return <IdSelect options={user || []} {...props} />;
};
