const constructUnorderedTree = ({
  list,
  parentMap,
  documentationOrder = [],
}) => {
  return list.reduce((acc, curr) => {
    const filteredParent = documentationOrder.filter(doco =>
      doco.items.includes(curr.title)
    )

    for (parentObj of filteredParent) {
      for (a of acc) {
        if (a.parent === parentObj.parent) {
          a.items.push(curr)
        }
      }
    }

    return acc
  }, parentMap)
}

const orderTree = ({ unorderedTree, documentationOrder }) => {
  if (!documentationOrder) {
    console.warning(
      `Has 'documentationOrder' been specified in your config.js file for this locale and version?`
    )

    return []
  }

  return documentationOrder.map(doco => {
    const branch = unorderedTree.find(ot => doco.parent === ot.parent)
    const twigs = doco.items
      .map(it => {
        return branch.items.find(bri => it === bri.title)
      })
      .filter(Boolean)

    return { ...branch, items: twigs }
  })
}

const convertToTree = ({ edges, locale, version }) => {
  const list = edges.map(edge => {
    const {
      node: {
        id,
        fields: { slug },
        frontmatter: { title },
      },
    } = edge

    return {
      title,
      path: slug,
      key: id,
    }
  })

  const { documentationOrder } = require(`${process.cwd()}/__content/${locale}${
    version === 'latest' ? '' : `/${version}`
  }/docs/config.js`)

  const parentMap = documentationOrder.map(doco => ({
    parent: doco.parent,
    items: [],
  }))

  const unorderedTree = constructUnorderedTree({
    list,
    parentMap,
    documentationOrder,
  })

  // console.log({ unorderedTree })

  return orderTree({ unorderedTree, documentationOrder })
}

const buildLocaleTrees = ({ basePageData }) => {
  const {
    data: {
      allMdx: { edges },
    },
  } = basePageData

  const localeList = edges.map(
    ({ node: { fileAbsolutePath } }) => splitLocaleVersion(fileAbsolutePath)[0]
  )

  const localeSplitEdges = edges.reduce((acc, curr) => {
    const {
      node: { fileAbsolutePath },
    } = curr
    const [locale, version] = splitLocaleVersion(fileAbsolutePath)

    if (acc[locale]) {
      if (!version) {
        acc[locale].latest = [...(acc[locale].latest || []), curr]
        return acc
      }

      acc[locale][version] = [...(acc[locale][version] || []), curr]
      return acc
    }

    acc[locale] = {}
    if (!version) {
      acc[locale].latest = [...(acc[locale].latest || []), curr]
      return acc
    }

    acc[locale][version] = [...(acc[locale][version] || []), curr]
    return acc
  }, {})

  return Object.keys(localeSplitEdges).reduce((acc, locale) => {
    acc[locale] = Object.keys(localeSplitEdges[locale]).reduce((a, version) => {
      a[version] = convertToTree({
        edges: localeSplitEdges[locale][version],
        locale,
        version,
      })
      return a
    }, {})
    return acc
  }, {})
}

const pullAvailableLocales = dengineContent => {
  return Object.keys(dengineContent).map(
    locale => dengineContent[locale].localeInfo
  )
}

const pullPreviousNext = ({ sidebarTree, frontmatter: { parents, title } }) => {
  if (Array.isArray(parents)) {
    const targetParent = parents[0]
    const parentObj = sidebarTree.find(st => st.parent === targetParent)

    if (!parentObj) {
      return { previous: null, next: null }
    }

    const findFirstCut = parentObj => {
      return parentObj.items.reduce(
        (acc, curr, i) => {
          if (
            parentObj.items[i + 1] &&
            parentObj.items[i + 1].title === title
          ) {
            acc.previous = curr
          }

          if (
            parentObj.items[i - 1] &&
            parentObj.items[i - 1].title === title
          ) {
            acc.next = curr
          }

          return acc
        },
        { previous: null, next: null }
      )
    }

    const findSecondCut = prevNextFirstCut => {
      const findPreviousInParent = () => {
        if (prevNextFirstCut.previous) {
          return prevNextFirstCut.previous
        }
        if (sidebarTree[0].parent !== targetParent) {
          const previousParent = sidebarTree.find(
            (_, i) =>
              sidebarTree[i + 1] && sidebarTree[i + 1].parent === targetParent
          )

          if (!previousParent || !Array.isArray(previousParent.items)) {
            return null
          }

          return previousParent.items[previousParent.items.length - 1]
        }

        return null
      }

      const findNextInParent = () => {
        if (prevNextFirstCut.next) {
          return prevNextFirstCut.next
        }
        if (sidebarTree[sidebarTree.length - 1].parent !== targetParent) {
          const nextParent = sidebarTree.find(
            (_, i) =>
              sidebarTree[i - 1] && sidebarTree[i - 1].parent === targetParent
          )

          if (!nextParent || !Array.isArray(nextParent.items)) {
            return null
          }

          return nextParent.items[0]
        }

        return null
      }

      return { previous: findPreviousInParent(), next: findNextInParent() }
    }

    const prevNextFirstCut = findFirstCut(parentObj)

    return findSecondCut(prevNextFirstCut)
  }

  return { previous: null, next: null }
}

const splitLocaleVersion = str => {
  const [locale, version] = str
    .split('/__content')[1]
    .split('/docs')[0]
    .replace('/', '')
    .split('/')

  return [locale, version ? version : 'latest']
}

module.exports = {
  splitLocaleVersion,
  convertToTree,
  buildLocaleTrees,
  pullAvailableLocales,
  pullPreviousNext,
}
