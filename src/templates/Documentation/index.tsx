import React from 'react'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import RootLayout from '../../layout/Root'
import SearchBox from '../../components/SearchBox'
import SidebarContents from '../../components/SidebarContents'
import TableOfContents from '../../components/TableOfContents'
import Feedback from '../../components/Feedback'
import PreviousNext from '../../components/PreviousNext'

import './style.sass'

import {
  DengineConfig,
  DengineContent,
  DocsMeta,
  SidebarTreeObject,
} from '../../types'

interface DocumentationPageTemplateProps {
  pageContext: {
    dengineConfig: DengineConfig
    dengineContent: DengineContent
    sidebarTree: Array<SidebarTreeObject>
    previous: DocsMeta
    next: DocsMeta
    frontmatter: {
      title: string
      parents: string[]
      tags: string[]
    }
    body: string
    relativePath: string
    firstDoc: string
    pageTitle: string
    parent: string
    version: string
    availableLocales: Array<{
      code: string
      name: string
    }>
    availableVersions: string[]
    locale: string
  }
}

const DocumentationPageTemplate: React.SFC<DocumentationPageTemplateProps> = ({
  pageContext: {
    frontmatter: { title, tags },
    dengineConfig,
    dengineContent,
    availableLocales,
    availableVersions,
    relativePath,
    parent,
    body,
    locale,
    sidebarTree,
    previous,
    next,
    version,
  },
}) => {
  const { repository, feedback, apiUrl } = dengineConfig

  return (
    <RootLayout
      dengineConfig={dengineConfig}
      dengineContent={dengineContent}
      availableLocales={availableLocales}
      availableVersions={availableVersions}
      pageTitle={title}
      locale={locale}
      version={version}
    >
      {dengineConfig.algoliaDocSearch &&
        dengineConfig.algoliaDocSearch.enabled === true && (
          <SearchBox></SearchBox>
        )}

      <div className="documentation-page main-wrapper">
        <SidebarContents tree={sidebarTree} parent={parent} />

        <div className="content-wrapper">
          <div className="content-body">
            {parent !== 'root' && <h5 className="breadcrumb">{parent}</h5>}
            <MDXRenderer>{body}</MDXRenderer>

            {Array.isArray(tags) && (
              <div className="tags">
                Tags:{' '}
                {tags.map((tag, i) => (
                  <span key={tag}>
                    {tag}
                    {i < tags.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            )}
          </div>

          {repository && repository.url && repository.branch && relativePath && (
            <div className="pr-warning">
              Notice something wrong?{' '}
              <a
                href={`${repository.url}/edit/${repository.branch}${relativePath}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Shoot us a PR!
              </a>
            </div>
          )}

          {feedback && feedback.show && (
            <Feedback
              apiUrl={apiUrl}
              apiPath={feedback.apiPath}
              page={relativePath.replace('/__content', '')}
            />
          )}

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
