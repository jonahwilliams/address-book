import babel from 'rollup-plugin-babel';

export default {
  entry: 'client/index.js',
  globals: {
    'react': 'React'
  },
  plugins: [ babel() ],
  format: 'iife'
};
