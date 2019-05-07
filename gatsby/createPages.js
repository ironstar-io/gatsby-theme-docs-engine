const replacePath = require('./utils')
const path = require('path')

const { convertToTree, pullPreviousNext } = require('./pageHelpers')

const buildDocsPages = async ({ createPage, graphql }) => {
  const Template = path.resolve(`${__dirname}/../src/templates/Template.tsx`)
  const result = await graphql(`
    {
      site {
        siteMetadata {
          title
        }
      }
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              root
              parents
            }
            code {
              body
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

  console.log(JSON.stringify(edges))
  const sidebarTree = convertToTree(result.data.allMdx.edges)

  for await (edge of edges) {
    const {
      node: {
        id,
        fields: { slug },
        code: { body },
        frontmatter,
      },
    } = edge

    const { previous, next } = pullPreviousNext({ sidebarTree, frontmatter })

    createPage({
      path: replacePath(slug),
      component: Template,
      context: { id, body, frontmatter, sidebarTree, previous, next }, // additional data can be passed via context
    })
  }
}

module.exports = exports.createPages = async ({
  actions: { createPage },
  graphql,
}) => {
  try {
    await Promise.all([buildDocsPages({ createPage, graphql })])

    return
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
