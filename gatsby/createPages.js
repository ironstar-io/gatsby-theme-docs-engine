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

    await createPage({
      path: `/${locale}/versions`,
      component: Template,
      context: {
        dengineConfig,
        locale,
        firstDocMap,
        availableLocales,
        dengineContent: dengineContent[locale],
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

    const { previous, next } = pullPreviousNext({
      sidebarTree: localeSidebarTrees[locale][version],
      title: frontmatter.title,
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

const buildIndexPage = async ({
  createPage,
  availableLocales,
  localeSidebarTrees,
  dengineConfig,
  dengineContent,
}) => {
  const Template = path.resolve(`${__dirname}/../src/templates/Index/index.tsx`)
  const defaultFirstDoc = lodashGet(
    localeSidebarTrees[dengineConfig.defaultLocale],
    'latest[0].items[0].path'
  )

  await createPage({
    path: '/',
    component: Template,
    context: {
      dengineConfig,
      availableLocales,
      dengineContent: dengineContent[dengineConfig.defaultLocale],
      locale: dengineConfig.defaultLocale,
      firstDoc: defaultFirstDoc,
    },
  })

  const locales = Object.keys(dengineContent)

  for await (locale of locales) {
    const localeFirstDoc = lodashGet(
      localeSidebarTrees[locale],
      'latest[0].items[0].path'
    )

    await createPage({
      path: `/${locale}`,
      component: Template,
      context: {
        dengineConfig,
        availableLocales,
        locale,
        dengineContent: dengineContent[locale],
        firstDoc: localeFirstDoc,
      },
    })
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

    await Promise.all([
      buildIndexPage({
        createPage,
        basePageData,
        availableLocales,
        localeSidebarTrees,
        dengineContent,
        dengineConfig,
      }),
      buildDocsPages({
        createPage,
        basePageData,
        availableLocales,
        localeSidebarTrees,
        dengineContent,
        dengineConfig,
      }),
      buildVersionsPage({
        createPage,
        createRedirect,
        basePageData,
        availableLocales,
        localeSidebarTrees,
        dengineContent,
        dengineConfig,
      }),
    ])

    return
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
