import React from 'react'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { Layout } from 'antd'
import RootLayout from '../../layout/Root'
import { SidebarContents } from '../../components/SidebarContents'
import { TableOfContents } from '../../components/TableOfContents'
import PreviousNext from '../../components/PreviousNext'
const { Content } = Layout

import './style.sass'

import { DengineConfig } from '../../types'

interface PageTemplateProps {
  pageContext: {
    frontmatter: {
      title: string
      parents: string[]
    }
    body: string
    sidebarTree: object
    tree: object
    dir: object
    dengineConfig: DengineConfig
  }
}

const PageTemplate: React.SFC<PageTemplateProps> = ({
  pageContext: {
    frontmatter: { title, parents },
    dengineConfig,
    body,
    sidebarTree,
    previous,
    next,
    version,
  },
}) => {
  return (
    <RootLayout
      dengineConfig={dengineConfig}
      pageTitle={title}
      version={version}
      className="documentation-page"
    >
      <div className="documentation-page main-wrapper">
        <div>
          <SidebarContents tree={sidebarTree} parents={parents} />
        </div>

        <div className="content-wrapper">
          <div className="content-body">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
          <PreviousNext previous={previous} next={next} />
        </div>

        <div>
          <TableOfContents />
        </div>
      </div>
    </RootLayout>
  )
}
export default PageTemplate
