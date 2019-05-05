const replacePath = require('./utils')
const path = require('path')

const dengineConfig = require('../dengine-config')

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
      acc.push({ parent: curr, items: [] })
      return acc
    },
    [{ parent: 'root', items: [] }]
  )
}

const constructUnorderedTree = ({ list, parentMap }) => {
  return list.reduce((acc, curr) => {
    if (Array.isArray(curr.parents)) {
      for (parent of curr.parents) {
        for (a of acc) {
          if (a.parent === parent) {
            a.items.push(curr)
          }
        }
      }
    } else {
      for (a of acc) {
        if (a.parent === 'root') {
          a.items.push(curr)
        }
      }
    }

    return acc
  }, parentMap)
}

const orderTree = unorderedTree => {
  if (
    !dengineConfig.documentationOrder ||
    !Array.isArray(dengineConfig.documentationOrder)
  ) {
    console.warning(
      'Has `documentationOrder` been specified in your dengine-config.js file?'
    )

    return []
  }

  return dengineConfig.documentationOrder.map(doco => {
    const branch = unorderedTree.find(ot => doco.parent === ot.parent)
    const twigs = doco.items.map(it => {
      return branch.items.find(bri => it === bri.title)
    })

    return { ...branch, items: twigs }
  })
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

  const unorderedTree = constructUnorderedTree({ list, parentMap })

  return orderTree(unorderedTree)
}

const buildDocsPages = async ({ createPage, graphql }) => {
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
