const replacePath = require('./utils')
const path = require('path')
const dengineConfig = require('../dengine-config')

const { convertToTree, pullPreviousNext } = require('./pageHelpers')

const stripVersion = str =>
  str
    .split('/__contents')[1]
    .split('/docs')[0]
    .replace('/', '')

const basePageQuery = async graphql => {
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
            fileAbsolutePath
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

  return result
}

const buildVersionPage = async ({
  createPage,
  createRedirect,
  basePageData,
}) => {
  const Template = path.resolve(
    `${__dirname}/../src/templates/Version/index.tsx`
  )

  const {
    data: {
      allMdx: { edges },
    },
  } = basePageData

  const versionArray = edges.map(({ node: { fileAbsolutePath } }) =>
    stripVersion(fileAbsolutePath)
  )

  const availableVersions = [...new Set(versionArray)]

  for await (version of availableVersions) {
    await createRedirect({
      fromPath: `/${version}`,
      toPath: `/${version}/docs/introduction`,
      redirectInBrowser: true,
      isPermanent: true,
    })
  }

  await createRedirect({
    fromPath: `/version`,
    toPath: `/versions`,
    redirectInBrowser: true,
    isPermanent: true,
  })

  await createPage({
    path: '/versions',
    component: Template,
    context: { siteTitle: dengineConfig.title, availableVersions },
  })
}

const buildDocsPages = async ({ createPage, basePageData }) => {
  const Template = path.resolve(
    `${__dirname}/../src/templates/Documentation.tsx`
  )

  const {
    data: {
      allMdx: { edges },
    },
  } = basePageData

  const sidebarTree = convertToTree(edges)

  for await (edge of edges) {
    const {
      node: {
        id,
        fields: { slug },
        code: { body },
        frontmatter,
        fileAbsolutePath,
      },
    } = edge

    const { previous, next } = pullPreviousNext({ sidebarTree, frontmatter })

    const version = stripVersion(fileAbsolutePath)

    createPage({
      path: replacePath(slug),
      component: Template,
      context: {
        siteTitle: dengineConfig.title,
        id,
        body,
        version,
        frontmatter,
        sidebarTree,
        previous,
        next,
      },
    })
  }
}

module.exports = exports.createPages = async ({
  actions: { createPage, createRedirect },
  graphql,
}) => {
  try {
    const basePageData = await basePageQuery(graphql)
    await Promise.all([
      buildDocsPages({ createPage, basePageData }),
      buildVersionPage({ createPage, createRedirect, basePageData }),
    ])

    return
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
