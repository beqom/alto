module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 3 versions', 'IE >= 11'],
        },
      },
    ],
    '@babel/preset-react',
  ],
};
