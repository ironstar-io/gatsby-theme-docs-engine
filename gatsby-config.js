const gatsbyConfigTheme = require('./gatsby/gatsbyConfigTheme')
const gatsbyConfigLocal = require('./gatsby/gatsbyConfigLocal')

module.exports =
  process.env.GATSBY_THEME_LOCAL === 'true'
    ? gatsbyConfigLocal
    : gatsbyConfigTheme
