module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'HighlightWithinTextarea',
      externals: {
        react: 'React',
        "draft-js": 'Draft',
        "prop-types": 'PropTypes',
      }
    },
  },
  webpack: {
    extra: {
      entry: './demo/src/index',
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
      module: {
        rules: [{test: /\.tsx$/, loader: 'ts-loader'}],
      },
    },
  }
}
