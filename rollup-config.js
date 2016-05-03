import babel from 'rollup-plugin-babel';

export default {
  entry: 'client/index.js',
  plugins: [ babel(), ],
  format: 'iife',
};
