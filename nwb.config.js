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
    }
  }
}
