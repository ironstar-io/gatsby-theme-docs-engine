const replacePath = require('./utils')
const path = require('path')
const dengineConfig = require('../dengine-config')

const { convertToTree, pullPreviousNext } = require('./pageHelpers')

const splitLocaleVersion = str =>
  str
    .split('/__content')[1]
    .split('/docs')[0]
    .replace('/', '')
    .split('/')

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
              tags
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

const buildVersionsPage = async ({
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

  const versionLocaleMap = edges.reduce(
    (acc, { node: { fileAbsolutePath } }) => {
      const [locale, version] = splitLocaleVersion(fileAbsolutePath)

      if (acc[locale] && !acc[locale].includes(version)) {
        acc[locale].push(version)
      } else {
        acc[locale] = [version]
      }

      return acc
    },
    {}
  )

  const { defaultLocale } = dengineConfig

  await createRedirect({
    fromPath: `/version`,
    toPath: `/${defaultLocale || 'en'}/versions`,
    redirectInBrowser: true,
    isPermanent: true,
  })
  await createRedirect({
    fromPath: `/versions`,
    toPath: `/${defaultLocale || 'en'}/versions`,
    redirectInBrowser: true,
    isPermanent: true,
  })

  for await (locale of Object.keys(versionLocaleMap)) {
    for await (version of versionLocaleMap[locale]) {
      if (version) {
        await createRedirect({
          fromPath: `/${locale}/${version}`,
          toPath: `/${locale}/${version}/docs/introduction`,
          redirectInBrowser: true,
          isPermanent: true,
        })
      }
    }

    await createRedirect({
      fromPath: `/${locale}/version`,
      toPath: `/${locale}/versions`,
      redirectInBrowser: true,
      isPermanent: true,
    })

    await createPage({
      path: `/${locale}/versions`,
      component: Template,
      context: { dengineConfig, availableVersions: versionLocaleMap[locale] },
    })
  }
}

const buildLocalesPage = async ({
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

  const versionLocaleMap = edges.reduce(
    (acc, { node: { fileAbsolutePath } }) => {
      const [locale, version] = splitLocaleVersion(fileAbsolutePath)

      if (acc[locale] && !acc[locale].includes(version)) {
        acc[locale].push(version)
      } else {
        acc[locale] = [version]
      }

      return acc
    },
    {}
  )

  console.log({ versionLocaleMap })
  // await createRedirect({
  //   fromPath: `/locale`,
  //   toPath: `/locales`,
  //   redirectInBrowser: true,
  //   isPermanent: true,
  // })

  // await createPage({
  //   path: '/locales',
  //   component: Template,
  //   context: { dengineConfig, availableVersions },
  // })
}

const buildDocsPages = async ({ createPage, basePageData }) => {
  const Template = path.resolve(
    `${__dirname}/../src/templates/Documentation/index.tsx`
  )

  const {
    data: {
      allMdx: { edges },
    },
  } = basePageData

  const localeList = edges.map(
    ({ node: { fileAbsolutePath } }) => splitLocaleVersion(fileAbsolutePath)[0]
  )
  const availableLocales = [...new Set(localeList)]

  const localeSplitEdges = edges.reduce((acc, curr) => {
    const {
      node: { fileAbsolutePath },
    } = curr
    const [locale] = splitLocaleVersion(fileAbsolutePath)

    if (acc[locale]) {
      acc[locale].push(curr)
    } else {
      acc[locale] = [curr]
    }

    return acc
  }, {})

  const localeSidebarTrees = Object.keys(localeSplitEdges).reduce(
    (acc, curr) => {
      console.log({ locallllle: curr })
      acc[curr] = convertToTree(localeSplitEdges[curr])
      return acc
    },
    {}
  )

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

    const [locale, version] = splitLocaleVersion(fileAbsolutePath)
    const splitPath = fileAbsolutePath.split('__content')[1]

    const { previous, next } = pullPreviousNext({
      sidebarTree: localeSidebarTrees[locale],
      frontmatter,
    })

    createPage({
      path: replacePath(slug),
      component: Template,
      context: {
        dengineConfig,
        availableLocales,
        relativePath: splitPath ? `/__content${splitPath}` : null,
        sidebarTree: localeSidebarTrees[locale],
        id,
        body,
        version,
        locale,
        frontmatter,
        previous,
        next,
      },
    })
  }
}

const buildIndexPage = async ({ createPage }) => {
  const Template = path.resolve(`${__dirname}/../src/templates/Index/index.tsx`)

  await createPage({
    path: '/',
    component: Template,
    context: { dengineConfig },
  })
}

module.exports = exports.createPages = async ({
  actions: { createPage, createRedirect },
  graphql,
}) => {
  try {
    const basePageData = await basePageQuery(graphql)
    await Promise.all([
      buildDocsPages({ createPage, basePageData }),
      buildVersionsPage({ createPage, createRedirect, basePageData }),
      // buildLocalesPage({ createPage, createRedirect, basePageData }),
      buildIndexPage({ createPage, basePageData }),
    ])

    return
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
