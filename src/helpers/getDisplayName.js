// @flow

import type { ComponentType } from "react";

const getDisplayName = (Component: ?ComponentType<Object> | ?string) => {
  if (typeof Component === "string") {
    return Component;
  }

  if (!Component) {
    return "";
  }

  return Component.displayName || Component.name || "Component";
};

export default getDisplayName;
