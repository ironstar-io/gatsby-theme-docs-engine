import React from 'react'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import DocumentationLayout from '../layout/Documentation'

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
  }
}

const PageTemplate: React.SFC<PageTemplateProps> = ({
  pageContext: {
    frontmatter: { title, parents },
    siteTitle,
    body,
    sidebarTree,
    previous,
    next,
  },
}) => {
  console.log('rerender')
  return (
    <DocumentationLayout
      siteTitle={siteTitle}
      pageTitle={title}
      parents={parents}
      sidebarTree={sidebarTree}
      previous={previous}
      next={next}
    >
      <MDXRenderer>{body}</MDXRenderer>
    </DocumentationLayout>
  )
}
export default PageTemplate
