const replacePath = require('./utils')
const path = require('path')
const dengineConfig = require('../dengine-config')
const dengineContent = require('../dengine-content')
const lodashGet = require('lodash.get')

const {
  splitLocaleVersion,
  buildLocaleTrees,
  pullPreviousNext,
} = require('./pageHelpers')

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
  localeSidebarTrees,
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

    const firstDoc = lodashGet(
      localeSidebarTrees,
      `[${locale}][0].items[0].path`
    )

    await createRedirect({
      fromPath: `/${locale}/version`,
      toPath: `/${locale}/versions`,
      redirectInBrowser: true,
      isPermanent: true,
    })

    await createPage({
      path: `/${locale}/versions`,
      component: Template,
      context: {
        dengineConfig,
        locale,
        firstDoc,
        dengineContent: dengineContent[locale],
        availableVersions: versionLocaleMap[locale],
      },
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

const buildDocsPages = async ({
  createPage,
  basePageData,
  availableLocales,
  localeSidebarTrees,
}) => {
  const Template = path.resolve(
    `${__dirname}/../src/templates/Documentation/index.tsx`
  )

  const {
    data: {
      allMdx: { edges },
    },
  } = basePageData

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
      sidebarTree: localeSidebarTrees[locale][version],
      frontmatter,
    })

    createPage({
      path: replacePath(slug),
      component: Template,
      context: {
        dengineConfig,
        dengineContent:
          dengineContent[locale] || dengineContent[dengineConfig.defaultLocale],
        relativePath: splitPath ? `/__content${splitPath}` : null,
        sidebarTree: localeSidebarTrees[locale][version],
        availableLocales,
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

const buildIndexPage = async ({ createPage, localeSidebarTrees }) => {
  const Template = path.resolve(`${__dirname}/../src/templates/Index/index.tsx`)
  const defaultFirstDoc = lodashGet(
    localeSidebarTrees,
    `[${dengineConfig.defaultLocale}][0].items[0].path`
  )

  await createPage({
    path: '/',
    component: Template,
    context: {
      dengineConfig,
      dengineContent: dengineContent[dengineConfig.defaultLocale],
      locale: dengineConfig.defaultLocale,
      firstDoc: defaultFirstDoc,
    },
  })

  const locales = Object.keys(dengineContent)

  for await (locale of locales) {
    const localeFirstDoc = lodashGet(
      localeSidebarTrees,
      `[${locale}][0].items[0].path`
    )

    await createPage({
      path: `/${locale}`,
      component: Template,
      context: {
        dengineConfig,
        dengineContent: dengineContent[locale],
        firstDoc: localeFirstDoc,
        locale,
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
    const { availableLocales, localeSidebarTrees } = buildLocaleTrees({
      basePageData,
    })
    console.log({
      availableLocales,
      localeSidebarTrees: localeSidebarTrees.jp.latest,
    })
    await Promise.all([
      buildIndexPage({
        createPage,
        basePageData,
        availableLocales,
        localeSidebarTrees,
      }),
      buildDocsPages({
        createPage,
        basePageData,
        availableLocales,
        localeSidebarTrees,
      }),
      buildVersionsPage({
        createPage,
        createRedirect,
        basePageData,
        localeSidebarTrees,
      }),
      // buildLocalesPage({ createPage, createRedirect, basePageData }),
    ])

    return
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
