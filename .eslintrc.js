module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['react', 'react-hooks'],
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    //"import/no-extraneous-dependencies": 0,
    'comma-dangle': [
      1,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'react/forbid-prop-types': 0,
    'react/no-danger': 0,
    'react/jsx-no-target-blank': 0,
    'react/require-default-props': 0,
    'import/no-extraneous-dependencies': 2,
    'react/jsx-filename-extension': 0,
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          every: ['id'],
        },
        allowChildren: false,
      },
    ],
    // TODO: activate this one when it is ready
    // waiting for this: https://github.com/airbnb/javascript/pull/1482
    'jsx-a11y/href-no-hash': 0,
    // react hooks
    'react-hooks/rules-of-hooks': 'error',
  },
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack-development.config.js',
      },
    },
  },
};
