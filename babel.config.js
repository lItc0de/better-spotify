process.env.VUE_CLI_BABEL_TARGET_NODE = true;
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins: [
    [
      'transform-imports',
      {
        vuetify: {
          transform: 'vuetify/es5/components/${member}', // eslint-disable-line
          preventFullImport: true,
        },
      },
    ],
  ],
};
