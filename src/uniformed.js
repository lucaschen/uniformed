// @flow

import React, { type ComponentType, Component } from "react";

import checkConfigObj from "./checkConfigObj";
import fpSet from "./helpers/fpSet";
import getDisplayName from "./helpers/getDisplayName";

import type { ConfigurationType } from "./uniformed.flow";
export type { UniformedProp } from "./uniformed.flow";

type WrappedComponentState = {
  values: Object
};

export const uniform = (configObj: ConfigurationType) => (ComponentToWrap: ComponentType<Object>) => {
  if (!checkConfigObj(configObj)) throw new Error("Invalid configuration object!");

  class WrappedComponent extends Component<Object, WrappedComponentState> {
    handlers: ?{
      [string]: (any) => any
    } = null;

    constructor() {
      super();

      this.state = {
        values: { ...configObj.initialValues }
      };

      this.handlers = Object.keys(configObj.initialValues).reduce((handlerObj, keyName) => {
        handlerObj[keyName] = this.createHandler(keyName);
        return handlerObj;
      }, {});
    }

    createHandler = (keyName: string) => (evt: SyntheticEvent<HTMLInputElement>) => {
      this.setState({ values: fpSet(this.state.values, keyName, evt.currentTarget.value) });
    };

    render() {
      const uniformedObj = {
        handlers: this.handlers,
        state: this.state.values
      };

      return <ComponentToWrap {...this.props} uniformed={uniformedObj} />;
    }
  }

  WrappedComponent.displayName = `uniformed(${getDisplayName(WrappedComponent)})`;

  return WrappedComponent;
};
