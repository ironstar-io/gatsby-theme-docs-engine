const replacePath = require('./utils')
const path = require('path')

const buildParents = list => {
  const parentsFull = list.reduce((acc, curr) => {
    if (Array.isArray(curr.parents)) {
      return [...acc, ...curr.parents]
    }
    return acc
  }, [])

  const parentsReduced = [...new Set(parentsFull)]

  return parentsReduced.reduce(
    (acc, curr) => {
      acc[curr] = []
      return acc
    },
    { root: [] }
  )
}

const convertToTree = data => {
  const list = data.map(edge => {
    const {
      node: {
        id,
        fields: { slug },
        frontmatter: { title, parents },
      },
    } = edge

    return {
      title,
      parents,
      path: slug,
      key: id,
    }
  })

  const parentMap = buildParents(list)

  return constructTree({ list, parentMap })
}

const constructTree = ({ list, parentMap }) => {
  return list.reduce((acc, curr) => {
    if (Array.isArray(curr.parents)) {
      for (parent of curr.parents) {
        acc[parent].push(curr)
      }
    } else {
      acc['root'].push(curr)
    }

    return acc
  }, parentMap)
}

module.exports = exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const Template = path.resolve(`${__dirname}/../src/templates/Template.tsx`)
  // sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000
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

  const sidebarTree = convertToTree(result.data.allMdx.edges)
  // const sidebarTree = sortTree(tree)

  for await (edge of edges) {
    const {
      node: {
        id,
        fields: { slug },
        code: { body },
        frontmatter,
      },
    } = edge

    createPage({
      path: replacePath(slug),
      component: Template,
      context: { id, body, frontmatter, sidebarTree }, // additional data can be passed via context
    })
  }
}
