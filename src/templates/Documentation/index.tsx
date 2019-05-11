import React from 'react'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import RootLayout from '../../layout/Root'
import SidebarContents from '../../components/SidebarContents'
import { TableOfContents } from '../../components/TableOfContents'
import PreviousNext from '../../components/PreviousNext'

import './style.sass'

import { DengineConfig, DocsMeta } from '../../types'

interface DocumentationPageTemplateProps {
  pageContext: {
    dengineConfig: DengineConfig
    previous: DocsMeta
    next: DocsMeta
    frontmatter: {
      title: string
      parents: string[]
    }
    body: string
    sidebarTree: object
    version: string
  }
}

const DocumentationPageTemplate: React.SFC<DocumentationPageTemplateProps> = ({
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
export default DocumentationPageTemplate
