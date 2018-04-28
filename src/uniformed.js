// @flow

import "babel-polyfill";
import React, { type ComponentType, Component } from "react";

import checkConfigObj from "./checkConfigObj";
import getDisplayName from "./helpers/getDisplayName";

import type { ConfigurationType, HandlersType } from "./uniformed.flow";
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

      const handlers = configObj.handlers ? this.connectHandlers(configObj.handlers) : {};
      Object.keys(configObj.initialValues).forEach(keyName => {
        if (keyName in handlers) return;
        handlers[keyName] = this.createBasicHandler(keyName);
      });

      this.handlers = handlers;
    }

    connectHandlers = (handlers: HandlersType) => {
      const connectedHandlers = {};
      for (const key in handlers) {
        const handler = handlers[key];
        connectedHandlers[key] = async (evt: SyntheticEvent<HTMLInputElement>) => {
          const handlerArgObj = { props: this.props, state: this.state.values, update: this.handleUpdate };
          if (key in configObj.initialValues) {
            // if the key exists, we pass in its value as a parameter to the handler
            handlerArgObj["$" + key] = evt.currentTarget.value;
          }
          await handler(handlerArgObj);
        };
      }
      return connectedHandlers;
    };

    createBasicHandler = (keyName: string) => (evt: SyntheticEvent<HTMLInputElement>) => {
      this.setState({ values: { ...this.state.values, [keyName]: evt.currentTarget.value } });
    };

    handleUpdate = (stateUpdates: Object) => {
      this.setState({ values: { ...this.state.values, ...stateUpdates } });
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
