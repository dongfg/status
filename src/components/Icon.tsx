import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";

const Icon = createFromIconfontCN({
  scriptUrl: process.env.NEXT_PUBLIC_ICONFONT,
});

const MixedIcon = ({ name }: { name: string }) => {
  if (!name) {
    return null;
  }
  if (name.startsWith("icon-")) {
    return <Icon type={name} style={{ fontSize: "32px" }} />;
  }
  return React.createElement(require("@ant-design/icons")[name]);
};

export default MixedIcon;
