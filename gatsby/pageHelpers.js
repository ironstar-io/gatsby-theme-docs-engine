const dengineConfig = require('../dengine-config')
const dengineContent = require('../dengine-content')

const buildParents = list => {
  const parentsFull = list.reduce((acc, curr) => {
    if (Array.isArray(curr.parents)) {
      return [...acc, ...curr.parents]
    }
    return acc
  }, [])

  const parentsReduced = [...new Set([...parentsFull, 'root'])]

  return parentsReduced.map(parent => ({ parent, items: [] }))
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

const orderTree = ({ unorderedTree, locale }) => {
  if (
    !dengineContent[locale] ||
    !dengineContent[locale].documentationOrder ||
    !Array.isArray(dengineContent[locale].documentationOrder)
  ) {
    console.warning(
      `Has 'documentationOrder' been specified in your dengine-config.js file for the locale '${locale}'?`
    )

    return []
  }

  return dengineContent[locale].documentationOrder.map(doco => {
    const branch = unorderedTree.find(ot => doco.parent === ot.parent)
    const twigs = doco.items
      .map(it => {
        return branch.items.find(bri => it === bri.title)
      })
      .filter(Boolean)

    return { ...branch, items: twigs }
  })
}

const convertToTree = ({ edges, locale }) => {
  const list = edges.map(edge => {
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

  return orderTree({ unorderedTree, locale })
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

const buildLocaleTrees = ({ basePageData }) => {
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
      acc[curr] = convertToTree({ edges: localeSplitEdges[curr], locale: curr })
      return acc
    },
    {}
  )

  return {
    availableLocales,
    localeSidebarTrees,
  }
}

const splitLocaleVersion = str =>
  str
    .split('/__content')[1]
    .split('/docs')[0]
    .replace('/', '')
    .split('/')

module.exports = {
  splitLocaleVersion,
  convertToTree,
  buildLocaleTrees,
  pullPreviousNext,
}
