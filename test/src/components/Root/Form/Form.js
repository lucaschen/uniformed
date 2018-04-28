// @flow

import React, { Component } from "react";
import type { UniformedProp } from "uniformed";

type Props = {
  uniformed: UniformedProp
};

export default class Form extends Component<Props> {
  handleSubmit = async (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    await this.props.uniformed.handlers.submitForm();
    alert("Submit finished!");
  };

  render() {
    const { uniformed: { handlers, state } } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={handlers.name} placeholder="Name" type="text" value={state.name} />
        <input onChange={handlers.email} placeholder="Email" type="text" value={state.email} />
        <p>
          Let's reverse your name: <strong>{state.reversedName}</strong>!
        </p>
        <button disabled={state.submitting} type="submit">
          Submit{state.submitting && "ting..."}
        </button>
      </form>
    );
  }
}
