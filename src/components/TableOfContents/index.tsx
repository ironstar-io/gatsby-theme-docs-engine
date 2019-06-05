import React, { useState, useLayoutEffect } from 'react'

import './style.sass'

const filterAnchorDetails = (anchors: any) => {
  let last_depth = 0
  anchors = [].slice.call(anchors).map((anchor: any) => {
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

const constructTree = (list: Array<any>) => {
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

interface AnchorItem {
  children: Array<AnchorItem>
  href: string
  title: string
  depth: number
}

const TableOfContents: React.FC = () => {
  const [anchors, setAnchors] = useState([])

  useLayoutEffect(() => {
    const anchors = document.getElementsByClassName('post-toc-anchor')
    setAnchors(filterAnchorDetails(anchors))
  }, [])

  const loop = (data: Array<AnchorItem>) =>
    data.map(item => {
      if (item.children.length > 0) {
        return (
          <React.Fragment key={item.href}>
            <a className={`depth-${item.depth}`} href={item.href}>
              {item.title}
            </a>
            {loop(item.children)}
          </React.Fragment>
        )
      }

      return (
        <a className={`depth-${item.depth}`} href={item.href} key={item.href}>
          {item.title}
        </a>
      )
    })
  console.log({ anchors })
  if (
    !Array.isArray(anchors) ||
    anchors.length === 0 ||
    !Array.isArray(anchors[0].children) ||
    anchors[0].children.length === 0
  ) {
    return <div className="table-of-contents" />
  }

  return (
    <div className="table-of-contents">
      <h4>In this article:</h4>
      {loop(anchors)}
    </div>
  )
}

export default TableOfContents
