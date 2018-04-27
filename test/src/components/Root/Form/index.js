import { uniform } from "uniformed";

import Form from "./Form";

const configObj = {
  handlers: {
    name: ({ $name, props, state, update }) =>
      update({
        name: $name,
        reversedName: $name
          .split("")
          .reverse()
          .join("")
      }),
    submitForm: ({ props, state, update }) => {
      update({
        submitting: true
      });
      setTimeout(() => {
        update({
          submitting: false
        });
      }, 2000);
    }
  },
  initialValues: {
    email: "",
    name: "",
    reversedName: "",
    submitting: false
  }
};

export default uniform(configObj)(Form);
