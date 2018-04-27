// @flow

import React from "react";
import type { UniformedProp } from "uniformed";

type Props = {
  uniformed: UniformedProp
};

const Form = ({ uniformed }: Props) => {
  return (
    <div>
      <input onChange={uniformed.handlers.name} placeholder="Name" type="text" value={uniformed.state.name} />
      <input onChange={uniformed.handlers.email} placeholder="Email" type="text" value={uniformed.state.email} />
    </div>
  );
};

export default Form;
