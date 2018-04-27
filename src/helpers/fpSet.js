// @flow
// returns a shallow copy of an object, with a specific key changed and nothing else

const fpSet = (obj: Object, key: string, value: any) => ({
  ...obj,
  [key]: value
});

export default fpSet;
