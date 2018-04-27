export type HandlersArgs = {
  props: Object,
  state: Object,
  update: Object => void
};

export type HandlersType = {
  [string]: (HandlersArgs) => Object
};

export type ConfigurationType = {|
  handlers: HandlersType,
  initialValues: {
    [string]: any
  }
|};

export type UniformedProp = {
  handlers: Object,
  state: Object
};
