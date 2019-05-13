const dengineConfig = require('../dengine-config')

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
    const twigs = doco.items
      .map(it => {
        return branch.items.find(bri => it === bri.title)
      })
      .filter(Boolean)

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
  console.log({
    unorderedTree: unorderedTree.find(u => u.parent === 'root').items,
  })

  const x = orderTree(unorderedTree)
  console.log({
    x: x.find(u => u.parent === 'root').items,
  })

  return x
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
            (st, i) =>
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
            (st, i) =>
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

module.exports = {
  convertToTree,
  pullPreviousNext,
}
