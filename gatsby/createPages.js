const replacePath = require('./utils')
const path = require('path')
const lodashGet = require('lodash.get')

const defaultDengineConfig = require('../dengine-config')
const defaultDengineContent = require('../dengine-content')

const {
  splitLocaleVersion,
  buildLocaleTrees,
  pullAvailableLocales,
  pullPreviousNext,
  buildVersionLocaleMap,
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
  availableLocales,
  localeSidebarTrees,
  versionLocaleMap,
  dengineConfig,
  dengineContent,
}) => {
  const Template = path.resolve(
    `${__dirname}/../src/templates/Version/index.tsx`
  )

  const {
    data: {
      allMdx: { edges },
    },
  } = basePageData

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
    const firstDocMap = Object.keys(localeSidebarTrees[locale]).reduce(
      (acc, version) => {
        acc.push({
          version,
          path: lodashGet(
            localeSidebarTrees[locale][version],
            '[0].items[0].path'
          ),
        })

        return acc
      },
      []
    )

    const overrides = require(`${process.cwd()}/__content/${locale}/docs/config.js`)

    await createPage({
      path: `/${locale}/versions`,
      component: Template,
      context: {
        dengineConfig,
        locale,
        firstDocMap,
        availableLocales,
        dengineConfig: {
          ...dengineConfig,
          ...(overrides.dengineConfig || {}),
        },
        dengineContent: {
          ...dengineContent[locale],
          ...(overrides.dengineContent || {}),
        },
        availableVersions: versionLocaleMap[locale],
      },
    })

    await createRedirect({
      fromPath: `/${locale}/version`,
      toPath: `/${locale}/versions`,
      redirectInBrowser: true,
      isPermanent: true,
    })
  }
}

const buildDocsPages = async ({
  createPage,
  basePageData,
  availableLocales,
  localeSidebarTrees,
  versionLocaleMap,
  dengineConfig,
  dengineContent,
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

    const sidebarTree = localeSidebarTrees[locale][version]
    const residingBranch = sidebarTree.find(({ items }) =>
      items.find(i => i.title === frontmatter.title)
    )

    const { previous, next } = pullPreviousNext({
      sidebarTree,
      targetObj: residingBranch,
      title: frontmatter.title,
    })

    const overrides = require(`${process.cwd()}/__content/${locale ||
      dengineConfig.defaultLocale}${
      version === 'latest' ? '' : `/${version}`
    }/docs/config.js`)

    const contentObj =
      dengineContent[locale] || dengineContent[dengineConfig.defaultLocale]

    createPage({
      path: replacePath(slug),
      component: Template,
      context: {
        dengineConfig: {
          ...dengineConfig,
          ...(overrides.dengineConfig || {}),
        },
        dengineContent: { ...contentObj, ...(overrides.dengineContent || {}) },
        relativePath: splitPath ? `/__content${splitPath}` : null,
        parent: (residingBranch && residingBranch.parent) || 'root',
        availableVersions: versionLocaleMap[locale],
        availableLocales,
        sidebarTree,
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

const buildIndexPage = async ({
  createPage,
  createRedirect,
  availableLocales,
  localeSidebarTrees,
  versionLocaleMap,
  dengineConfig,
  dengineContent,
}) => {
  const Template = path.resolve(`${__dirname}/../src/templates/Index/index.tsx`)
  const defaultFirstDoc = lodashGet(
    localeSidebarTrees[dengineConfig.defaultLocale],
    'latest[0].items[0].path'
  )

  if (defaultFirstDoc) {
    await createRedirect({
      fromPath: `/docs`,
      toPath: defaultFirstDoc,
      redirectInBrowser: true,
      isPermanent: true,
    })
  }

  if (dengineConfig.redirectIndex === true) {
    if (defaultFirstDoc) {
      await createRedirect({
        fromPath: `/`,
        toPath: defaultFirstDoc,
        redirectInBrowser: true,
        isPermanent: true,
      })
    }
  } else {
    const overrides = require(`${process.cwd()}/__content/${
      dengineConfig.defaultLocale
    }/docs/config.js`)

    await createPage({
      path: '/',
      component: Template,
      context: {
        availableLocales,
        dengineConfig: { ...dengineConfig, ...(overrides.dengineConfig || {}) },
        dengineContent: {
          ...dengineContent[dengineConfig.defaultLocale],
          ...(overrides.dengineContent || {}),
        },
        availableVersions: versionLocaleMap[dengineConfig.defaultLocale],
        locale: dengineConfig.defaultLocale,
        firstDoc: defaultFirstDoc,
      },
    })
  }

  const locales = Object.keys(dengineContent)

  for await (locale of locales) {
    const localeFirstDoc = lodashGet(
      localeSidebarTrees[locale],
      'latest[0].items[0].path'
    )

    if (dengineConfig.redirectIndex === true) {
      if (localeFirstDoc) {
        createRedirect({
          fromPath: `/${locale}`,
          toPath: localeFirstDoc,
          redirectInBrowser: true,
          isPermanent: true,
        })
      }
    } else {
      const overrides = require(`${process.cwd()}/__content/${locale}/docs/config.js`)

      await createPage({
        path: `/${locale}`,
        component: Template,
        context: {
          locale,
          availableLocales,
          dengineConfig: {
            ...dengineConfig,
            ...(overrides.dengineConfig || {}),
          },
          dengineContent: {
            ...dengineContent[locale],
            ...(overrides.dengineContent || {}),
          },
          availableVersions: versionLocaleMap[locale],
          firstDoc: localeFirstDoc,
        },
      })
    }
  }
}

module.exports = exports.createPages = async (
  { actions: { createPage, createRedirect }, graphql },
  {
    dengineContent = defaultDengineContent,
    dengineConfig = defaultDengineConfig,
  }
) => {
  try {
    const basePageData = await basePageQuery(graphql)
    const localeSidebarTrees = await buildLocaleTrees({
      basePageData,
    })
    const availableLocales = pullAvailableLocales(dengineContent)
    const versionLocaleMap = buildVersionLocaleMap(basePageData)

    await Promise.all([
      buildIndexPage({
        createPage,
        createRedirect,
        basePageData,
        availableLocales,
        localeSidebarTrees,
        dengineContent,
        dengineConfig,
        versionLocaleMap,
      }),
      buildDocsPages({
        createPage,
        basePageData,
        availableLocales,
        localeSidebarTrees,
        dengineContent,
        dengineConfig,
        versionLocaleMap,
      }),
      buildVersionsPage({
        createPage,
        createRedirect,
        basePageData,
        availableLocales,
        localeSidebarTrees,
        dengineContent,
        dengineConfig,
        versionLocaleMap,
      }),
    ])

    return
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
