import React from 'react'

import './style.sass'

const filterAnchorDetails = anchors => {
  let last_depth = 0
  anchors = [].slice.call(anchors).map(anchor => {
    let depth = parseInt(anchor.parentElement.nodeName[1])
    if (last_depth !== 0 && depth > last_depth) depth = last_depth + 1
    last_depth = depth
    return {
      href: '#' + anchor.parentElement.id,
      title: anchor.parentElement.innerText,
      depth: depth,
      children: [],
    }
  })
  constructTree(anchors)
  return anchors
}

const constructTree = list => {
  let deleteNode = []
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      if (list[i].depth + 1 === list[j].depth) {
        list[i].children.push(list[j])
        deleteNode.push(j)
      } else if (list[i].depth >= list[j].depth) break
    }
  }
  deleteNode.sort((a, b) => b - a).forEach(index => list.splice(index, 1))
}

export function TableOfContents() {
  const [anchors, setAnchors] = React.useState<any[]>([])

  React.useLayoutEffect(() => {
    const anchors = document.getElementsByClassName('post-toc-anchor')
    setAnchors(filterAnchorDetails(anchors))
  }, [])

  const loop = data =>
    data.map(item => {
      if (item.children.length > 0) {
        return (
          <React.Fragment>
            <a href={item.href} key={item.href}>
              {item.title}
            </a>
            {loop(item.children)}
          </React.Fragment>
        )
      }

      return (
        <a href={item.href} key={item.href}>
          {item.title}
        </a>
      )
    })

  return <div className="table-of-contents">{loop(anchors)}</div>
}
