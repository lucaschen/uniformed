import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";

import pkg from "./package.json";

export default {
  input: "src/uniformed.js",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    },
    {
      file: "lib/uniformed.umd.js",
      format: "umd",
      name: "Uniformed"
    }
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    babel({
      plugins: ["external-helpers"]
    }),
    uglify()
  ]
};
