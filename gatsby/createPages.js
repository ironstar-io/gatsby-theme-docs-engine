const replacePath = require('./utils')
const path = require('path')

module.exports = exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const Template = path.resolve(`src/templates/Template.tsx`)
  // sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000
  const result = await graphql(`
    {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw new Error(result.errors)
  }

  const {
    data: {
      allMdx: { edges },
    },
  } = result

  for await (edge of edges) {
    const {
      node: {
        id,
        fields: { slug },
      },
    } = edge

    createPage({
      path: replacePath(slug),
      component: Template,
      context: { id }, // additional data can be passed via context
    })
  }
}
