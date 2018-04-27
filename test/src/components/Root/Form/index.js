import { uniform } from "uniformed";

import Form from "./Form";

const configObj = {
  initialValues: {
    name: "",
    email: ""
  }
};

export default uniform(configObj)(Form);
